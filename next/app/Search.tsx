import s from "./page.module.scss";
import { useState } from 'react';
const BP = process.env.NEXT_PUBLIC_BASE_PATH;

import {
  book as Book, 
} from '@prisma/client';

const handler = async (obj: any, setBooks: React.Dispatch<React.SetStateAction<Book[]>>) => {
  const response = await fetch( BP + '/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  const body = await response.json();
  console.log(body);
  setBooks(body.data);
}

export default function Search() {
  // if is admin, can edit user from search

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  return (
    <div className={s.search}>
      <input type='text' onChange={(e) => setQuery(e.target.value)} value={query}/>
      <button onClick={() => handler({query}, setBooks)}>search</button>
      <div className={s.lib}>
        {books.map((item, index) => (
          <p key={index} className={s.book}>{item.bname}</p>
        ))}
      </div>
    </div>
  );
}