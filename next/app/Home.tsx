'use client';

import styles from "./page.module.scss";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
const BP = process.env.NEXT_PUBLIC_BASE_PATH;

async function handleSignOut() {
  await signOut({ redirect: false });
}

export default function Home() {
  const { data: session } = useSession();
  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [dob, setDOB] = useState('');
  /** signin using nextauth */
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const result = await signIn('credentials', { 
      redirect: false,
      email: siEmail, 
      password: siPassword 
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      console.log(result);
    }
  };
  /** sends form to server, create user */
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    console.log( JSON.stringify({
      suEmail, uname, suPassword, fname, lname, dob
    }));
    const response = await fetch( BP + '/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        suEmail, uname, suPassword, fname, lname, dob
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Signup failed:', errorData.error);
    } else {
      console.log("success");
    }
  };
  
  useEffect(() => {
    console.log(session);
  }, [session])

  if (session?.user) {
    return (
      <div className={`${styles.flexc} ${styles.full}`}>
        <h1>Hi, {session.user.name}!</h1>
        <h2>Welcome to Solid Quality Library.</h2>
        {/* <button onClick={handleSignOut}>Log out</button> */}
      </div>
    )
  } else {
    return (
      <div className={`${styles.flexr} ${styles.full}`}>
        <form onSubmit={handleSignIn} className={`${styles.flexc} ${styles.full}`}>
          <label htmlFor="siEmail">Email:</label>
          <input
            type="email"
            id="siEmail"
            value={siEmail}
            onChange={(e) => setSiEmail(e.target.value)}
            required
          />
          <label htmlFor="siPassword">Password:</label>
          <input
            type="password"
            id="siPassword"
            value={siPassword}
            onChange={(e) => setSiPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <form onSubmit={handleSignUp} className={`${styles.flexc} ${styles.full}`}>
          <label htmlFor="uname">Username:</label>
          <input
            type="uname"
            id="uname"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            required
          />
          <label htmlFor="fname">Firstname:</label>
          <input
            type="fname"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <label htmlFor="lname">Lastname:</label>
          <input
            type="lname"
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <label htmlFor="suEmail">Email:</label>
          <input
            type="email"
            id="suEmail"
            value={suEmail}
            onChange={(e) => setSuEmail(e.target.value)}
            required
          />
          <label htmlFor="suPassword">Password:</label>
          <input
            type="password"
            id="suPassword"
            value={suPassword}
            onChange={(e) => setSuPassword(e.target.value)}
            required
          />
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

