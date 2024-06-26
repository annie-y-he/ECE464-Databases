import s from "./page.module.scss";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';

import {
  book as Book, 
  publication as Publication, 
  tag as Tag, 
  series as Series, 
  author as Author, 
  publisher as Publisher, 
  language as Language 
} from '@prisma/client';
const BP = process.env.NEXT_PUBLIC_BASE_PATH;

interface UpAuth extends Omit<Author, 'aid'> {
  role: string;
  wbook: boolean;
};
interface UpBook extends Pick<Book, 'bname' | 'description'> {
  tags: string;
};
interface UpPub extends Pick<Publication, 'edition' | 'isbn'>, Pick<Series, 'sname'>, Pick<Publisher, 'pname'> {
  psid: string;
  year: string;
  langs: string;
  file: string | ArrayBuffer;
  cover: string | ArrayBuffer;
};
interface AllBook extends Book {
  followed: boolean;
}


const AuthorField = ({index, authors, setAuthors} : React.HTMLProps<HTMLDivElement> & {index: number; authors: UpAuth[]; setAuthors: React.Dispatch<React.SetStateAction<UpAuth[]>>}) => {

  const [author, setAuthor] = useState(authors[index]);

  const handleUpdate = () => setAuthors(a => [...a.slice(0, index), author, ...a.slice(index + 1)]);

  return <div>
    <label>
      Author Name
      <input type="text" 
        onChange={(e) => setAuthor({...author, aname: e.target.value})}
        value={author.aname}
        onBlur={handleUpdate}
      />
    </label>

    <label>
      Author Description
      <textarea 
        onChange={(e) => setAuthor({...author, description: e.target.value})}
        value={author.description}
        onBlur={handleUpdate}
      ></textarea>
    </label>

    <label>
      Author Date of Birth
      <input type="date"
        onChange={(e) => setAuthor({...author, dob: e.target.value})}
        value={author.dob}
        onBlur={handleUpdate}
      />
    </label>

    <label>
      Is Book Author
      <input type="checkbox"
        onChange={(e) => {
          setAuthor({...author, wbook: e.target.checked});
          handleUpdate();
        }}
        checked={author.wbook}
      />
    </label>
    <label>
      Author Role
      <input type="text"
        onChange={(e) => setAuthor({...author, role: e.target.value})}
        value={author.role}
        onBlur={handleUpdate}
      />
    </label>
    <button onClick={() => {
      setAuthors(a => a.splice(index, 1))
    }}>Delete Author</button>
    <hr />
  </div>
}

const nbooks = 20;

export default function Nav() {
  const { data: token } = useSession();
  const [upload, setUpload] = useState(false);
  const [allBooks, setAllBooks] = useState<AllBook[]>([])
  const emptyBook = {
    bname: "",
    description: "",
    tags: "",
  }
  const emptyPub = {
    edition: "",
    isbn: "",
    sname: "",
    psid: "",
    pname: "",
    year: "",
    langs: "",
    file: "",
    cover: "",
  }
  const emptyAuth = {
    aname: "",
    description: "",
    dob: "",
    role: "",
    wbook: false,
  }
  const [book, setBook] = useState<UpBook>(emptyBook)
  const [publication, setPublication] = useState<UpPub>(emptyPub)
  const [authors, setAuthors] = useState<UpAuth[]>([]);
  const [bookDisplay, setBookDisplay] = useState<any>();
  useEffect(() => {getBooks(setAllBooks)}, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log( JSON.stringify({
      book, publication, authors
    }));
    const response = await fetch( BP + '/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token, book, publication, authors
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Insert failed:', errorData);
    } else {
      console.log("success");
    }
  };

  const getBooks = async (setAllBooks: React.Dispatch<React.SetStateAction<AllBook[]>>) => {
    const follows = await getFollows();
    console.log(follows);
    const followed_bid = follows.map((item: any) => item.bid)
    console.log(followed_bid);
    const response = await fetch( BP + '/api/library', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  
    const body = await response.json();

    const allBook = body.data.map((item: Book) => {
      return {...item, followed: followed_bid.includes(item.bid)}
    })
    setAllBooks(allBook);
  }

  const getFollows = async () => {
    const response = await fetch( BP + '/api/shelf/follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });
  
    const body = await response.json();
    return body.data;
  }

  const getPubs = async (bid: string) => {
    const response = await fetch( BP + '/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bid }),
    });
  
    const body = await response.json();
    setBookDisplay(body.data);
    console.log(bookDisplay);
  }


  const sendLike = async (method: string, bid: string) => {
    const response = await fetch( BP + '/api/follow', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token, fid: bid, type: "book" }),
    });
  
    const body = await response.json();
    console.log(body);
  }

  const handleFileChange = (event: any, is: string) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (is == 'cover') {
            setPublication({...publication, cover: event.target.result});
          } else {
            setPublication({...publication, file: event.target.result});
          }
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(bookDisplay);
  }, [bookDisplay])

  return (
    <div>
      { upload ? <form className={s.upload} onSubmit={handleSubmit}>
          <h1>Book</h1>
          <label>
            Book Name
            <input type="text" onChange={(e) => setBook({...book, bname: e.target.value})} value={book.bname}/>
          </label>
          <label>
            Description
            <textarea onChange={(e) => setBook({...book, description: e.target.value})} value={book.description}></textarea>
          </label>
          <label>
            Tags
            <input type="text" onChange={(e) => setBook({...book, tags: e.target.value})} value={book.tags}/>
          </label>
          <h1>Publication</h1>
          <label>
            Edition
            <input type="text" onChange={(e) => setPublication({...publication, edition: e.target.value})} value={publication.edition}/>
          </label>
          <label>
            Upload PDF
            <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'file')}/>
          </label>
          <label>
            Cover Image
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')}/>
          </label>
          <label>
            ISBN
            <input type="text" onChange={(e) => setPublication({...publication, isbn: e.target.value})} value={publication.isbn}/>
          </label>
          <label>
            Publisher
            <input type="text" onChange={(e) => setPublication({...publication, pname: e.target.value})} value={publication.pname}/>
          </label>
          <label>
            Year Published
            <input type="text" onChange={(e) => setPublication({...publication, year: e.target.value})} value={publication.year}/>
          </label>
          <label>
            Language
            <input type="text" onChange={(e) => setPublication({...publication, langs: e.target.value})} value={publication.langs}/>
          </label>
          <label>
            Series
            <input type="text" onChange={(e) => setPublication({...publication, sname: e.target.value})} value={publication.sname}/>
          </label>
          <label>
            PSID
            <input type="text" onChange={(e) => setPublication({...publication, psid: e.target.value})} value={publication.psid}/>
          </label>

          <h1>Author</h1>
          {authors.map((item, index) => (
            <AuthorField key={index} index={index} authors={authors} setAuthors={setAuthors}/>
          ))}
          <button type="button" onClick={() => setAuthors(a => [...a, emptyAuth])}>Add Author</button>
          <div>
            <button type="submit">save</button>
            <button type="button" onClick={() => {
              setBook(emptyBook);
              setPublication(emptyPub);
              setAuthors([]);
            }}>clear</button>
          </div>
        </form> : bookDisplay ? <div className={s.detail}>
          <button className={s.btn} onClick={() => setBookDisplay(undefined)}>close</button>
          <h1>{bookDisplay.bname}</h1>
          <p>{bookDisplay.description}</p>
          <div className={s.tags}>{bookDisplay.bookHasTag.map((item: any, index: number) => <div>{item.tag.tname}</div>)}</div>
          <div className={s.lib}>
            {bookDisplay.publications ? bookDisplay.publications.map((item: Publication, index: number) => (
              <div key={index} className={s.book} onClick={() => console.log(item)}>
                {item.cover && <Image src={item.cover} alt="Base64 Encoded Image" width={0} height={0} />}
                <p className={s.edition}>{item.edition || "?"}</p>
              </div>
            )) : <div>no publication</div>}
          </div>
        </div> : <div className={s.lib}>
          {allBooks.map((item, index) => (
            <div key={index} className={s.book} onClick={() => getPubs(item.bid)}>
              <p>{item.bname}</p>
              <label>
                Favorite -
                <input type="checkbox" checked={item.followed} onChange={(e) => {
                  if (!item.followed) {
                    sendLike('POST', item.bid);
                  } else {
                    sendLike('DELETE', item.bid);
                  }
                  setAllBooks(books => [...books.slice(0, index), {...item, followed: !item.followed}, ...books.slice(index + 1)])
                }}
                onClick={(e) => e.stopPropagation()}/>
              </label>
            </div>
          ))}
        </div>
      }
      <h1 className={s.reload} onClick={() => getBooks(setAllBooks)}><div>⟳</div></h1>

      <h1 className={s.plus} onClick={() => setUpload(!upload)} style={{transform: upload ? 'rotate(45deg)' : '', transition: 'transform 150ms ease',}}><div>＋</div></h1>
    </div>
  );
}