import s from "./page.module.scss";

export default function Shelf() {
  return (
    <div className={s.shelf}>
      <div>
        <button>uploads</button>
        <button>publications</button>
        <button>books</button>
        <button>authors</button>
        <button>series</button>
        <button>tags</button>
        <button>users</button>
        <button>authors</button>
        <button>publisher</button>
        <button>language</button>
      </div>
      <div>viewer</div>
    </div>
  );
}