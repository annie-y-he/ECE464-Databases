'use client';

// import Nav from "./Nav";
import Home from "./Home";
import { getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react"
const BP = process.env.NEXT_PUBLIC_BASE_PATH;
import { useState } from 'react';
import s from "./page.module.scss";
const buttons = ["library", "shelf", "profile", "search"]
import { useSession } from "next-auth/react";
import Lib from './Lib';
import Shelf from './Shelf';
import Prof from './Prof';
import Search from './Search';

const Nav = ({ setPage }:{setPage: React.Dispatch<React.SetStateAction<string>>}) => {
  const { data: session } = useSession();

  // if is admin, add user tab
  // if (session?.token.role == "admin") {
  if (session?.user) return (
    <div className={s.nav}>
      {buttons.map((btn, i) => (
        <button key={i} className={s.navbtn} onClick={() => setPage(btn)}>{btn}</button>
      ))}
    </div>
  );

  return null;
}

export default function (children: any, pageProps: any) {
  const [page, setPage] = useState("");
  return (
    <SessionProvider session={pageProps.session} basePath={BP ? BP + '/api/auth' : undefined}>
      <Nav setPage={setPage} />
      <div className={s.main}>
        {
          page == "search" ? <Search /> :
          page == "library" ? <Lib /> :
          page == "shelf" ? <Shelf /> :
          page == "profile" ? <Prof /> :
          <Home />
        }
      </div>
    </SessionProvider>
  );
}
