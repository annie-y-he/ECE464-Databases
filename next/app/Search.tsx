import s from "./page.module.scss";

export default function Search() {
  // if is admin, can edit user from search
  return (
    <div className={s.search}>
      <input></input>
      <button>search</button>
    </div>
  );
}