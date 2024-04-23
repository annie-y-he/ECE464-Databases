import s from "./page.module.scss";
import { useState } from 'react';

const nbooks = 20;

export default function Nav() {
  const [upload, setUpload] = useState(false);
  return (
    <div>
      { upload ? <div className={s.upload}>
        <div>
          <div>
            <h1>Book</h1>
            <div>book name</div>
            <input type="text" />
            <div>author name</div>
            <input type="text" />
            <div>description</div>
            <textarea></textarea>
            <div>tag</div>
            <input type="text" />
            <div>series</div>
            <input type="text" />
            <div>psid</div>
            <input type="text" />
          </div>
          <div>
            <h1>Publication</h1>
            <div>edition</div>
            <input type="text" />
            <div>author name</div>
            <input type="text" />
            <div>upload</div>
            <input type="file" accept="application/pdf"/>
            <div>cover</div>
            <input type="file" accept="image/*"/>
            <div>isbn</div>
            <input type="text" />
            <div>publisher</div>
            <input type="text" />
            <div>year published</div>
            <input type="text" />
            <div>language</div>
            <input type="text" />
          </div>
          <div>
            <h1>Author</h1>
            <div>author name</div>
            <input type="radio" />
            <div>author description</div>
            <textarea></textarea>
            <div>author dob</div>
            <input type="date" />
          </div>
        </div>
        <div>
          <button>save</button>
          <button>clear</button>
        </div>
        </div> : <div className={s.lib}>
          {Array.from({ length: nbooks }).map((_, i) => (
            <p key={i} className={s.book}>This is book {i + 1}</p>
          ))}
        </div>
      }
      <h1 className={s.plus} onClick={() => setUpload(!upload)} style={{transform: upload ? 'rotate(45deg)' : '', transition: 'transform 150ms ease',}}>＋</h1>
    </div>
  );
}