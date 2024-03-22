'use client';

import Nav from "./Nav";
import Home from "./Home";
import { getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react"


export default function (children: React.ReactNode, pageProps: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <Nav>
        <Home />
      </Nav>
    </SessionProvider>
  );
}
