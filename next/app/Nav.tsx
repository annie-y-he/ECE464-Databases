'use client';

import styles from "./page.module.scss";
import Link from 'next/link'
const BP = process.env.NEXT_PUBLIC_BASE_PATH;
const buttons = ["library", "shelf", "profile", "search"]

export default function Nav({
  children,
}: {
  children: React.ReactNode;
}) {
  buttons.forEach((btn) => {
    console.log(BP + "/" + btn);
  })
  return (
    <div className={styles.main}>
      <div className={styles.viewer}>{children}</div>
      <div className={styles.nav}>
        {buttons.map((btn, i) => (
          <Link key={i} className={styles.navbtn} href={BP + "/" + btn}>{btn}</Link>
        ))}
      </div>
    </div>
  );
}