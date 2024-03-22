import styles from "../page.module.scss";

const nbooks = 20;

export default function Nav() {
  return (
    <div className={`${styles.lib} ${styles.flexr}`}>
      {Array.from({ length: nbooks }).map((_, i) => (
        <p key={i} className={styles.book}>This is book {i + 1}</p>
      ))}
    </div>
  );
}