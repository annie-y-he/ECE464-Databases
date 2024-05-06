import s from "./page.module.scss";
import { useState } from 'react';
const BP = process.env.NEXT_PUBLIC_BASE_PATH;

const handler = async (obj: any) => {
  const response = await fetch( BP + '/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  const body = await response.json();
  console.log(body);
}

export default function Search() {
  // if is admin, can edit user from search

  const [query, setQuery] = useState("");

  return (
    <div className={s.search}>
      <input type='text' onChange={(e) => setQuery(e.target.value)} value={query}/>
      <button onClick={() => handler({query})}>search</button>
    </div>
  );
}