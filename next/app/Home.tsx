'use client';

import styles from "./page.module.scss";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
// import { getServerSession } from "next-auth/next"

async function handleSignIn() {
  const result = await signIn("credentials", {
    redirect: false, // Prevents redirection after sign-in
    email: "annie.he@cooper.edu",
    password: "anniepassword",
  })
}

export default function Home() {
  const { data: session } = useSession();

  // const result = await signIn("credentials", {
  //   redirect: false, // Prevents redirection after sign-in
  //   email: "annie.he@cooper.edu",
  //   password: "anniepassword",
  // })

  // if (result?.error) {
  //   // Handle error here, e.g., show an error message
  //   console.error(result.error)
  // } else {
  //   console.log(result);
  // }

  // const session = await getServerSession(authOptions);

  // console.log("session:", session);

  // if (session) {
  //   // Use the session data
  //   return <div>Welcome</div>;
  // } else {
  //   return <div>You are not logged in why?</div>;
  // }

  function handleCheck() {
    console.log(session);
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleCheck}>Check</button>
    </div>
  );

}

