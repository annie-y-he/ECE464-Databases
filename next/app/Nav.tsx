'use client';

import styles from "./page.module.scss";
import Link from 'next/link'
const buttons = ["library", "shelf", "profile", "search"]
import { useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  if (session?.user) return (
    <div className={styles.nav}>
      {buttons.map((btn, i) => (
        <Link key={i} className={styles.navbtn} href={"/" + btn}>{btn}</Link>
      ))}
    </div>
  );

  return null;
}