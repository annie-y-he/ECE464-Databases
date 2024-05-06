import s from "./page.module.scss";
const BP = process.env.NEXT_PUBLIC_BASE_PATH;
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

import {
  book as Book, 
} from '@prisma/client';

export default function Shelf() {
  const { data: token } = useSession();

  const [book, setBook] = useState<Book[]>([])

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

  const getUploads = async () => {
    const response = await fetch( BP + '/api/shelf/uploads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });
  
    const body = await response.json();
    console.log(body.data);
    setBook(body.data);
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
    console.log(body.data);
    setBook(body.data);
  }

  return (
    <div className={s.shelf}>
      <div>
        <button onClick={getUploads}>uploads</button>
        {/* <button>publications</button> */}
        <button onClick={getFollows}>books</button>
        {/* <button>authors</button>
        <button>series</button>
        <button>tags</button>
        <button>users</button>
        <button>authors</button>
        <button>publisher</button>
        <button>language</button> */}
      </div>
      <div className={s.lib}>
        {book.map((item, index) => (
          <p key={index} className={s.book}>{item.bname}</p>
        ))}
      </div>
      
    </div>
  );
}