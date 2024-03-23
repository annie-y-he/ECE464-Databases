'use client';

import styles from "./page.module.scss";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

async function handleSignOut() {
  const result = await signOut({ redirect: false });
}

export default function Home() {
  const { data: session } = useSession();
  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const prisma = new PrismaClient()

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const result = await signIn('credentials', { 
      redirect: false,
      email, 
      password 
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      console.log(result);
    }
  };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    console.log( JSON.stringify({
      email, uname, password, fname, lname, dob
    }));
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, uname, password, fname, lname, dob
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Signup failed:', errorData.error);
    } else {
      console.log("success");
    }
  };

  if (session?.user) {
    return (
      <div className={`${styles.flexc} ${styles.full}`}>
        <div>You are {`${session.user.name}`}</div>
        <button onClick={handleSignOut}>Log out</button>
      </div>
    )
  } else {
    return (
      <div className={`${styles.flexr} ${styles.full}`}>
        <form onSubmit={handleSignIn} className={`${styles.flexc} ${styles.full}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

