'use client';

import Nav from "./Nav";
import Home from "./Home";
import { getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react"
const BP = process.env.NEXT_PUBLIC_BASE_PATH;

export default function (children: any, pageProps: any) {
  return (
    <SessionProvider session={pageProps.session} basePath={BP + '/api/auth'}>
      <Nav />
      <Home />
    </SessionProvider>
  );
}
