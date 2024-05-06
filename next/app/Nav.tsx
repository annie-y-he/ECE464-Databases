'use client';

import styles from "./page.module.scss";
import Link from 'next/link'
const buttons = ["library", "shelf", "profile", "search"]
import { useState } from 'react';
import { useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  const [page, setPage] = useState("");
  if (session?.user) return (
    <div className={styles.nav}>
      {buttons.map((btn, i) => (
        <button key={i} className={styles.navbtn} onClick={() => setPage(btn)}>{btn}</button>
      ))}
    </div>
  );

  return null;
}