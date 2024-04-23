import s from "./page.module.scss";

export default function Prof() {
  return (
    <div className={s.prof}>
      <div>old password</div>
      <input type="text" />
      <div>new password</div>
      <input type="text" />
      <div>dob</div>
      <input type="text" />
      <div>email</div>
      <input type="text" />
      <div>uname</div>
      <input type="text" />
      <div>image</div>
      <input type="file" />
      <div>first_name</div>
      <input type="text" />
      <div>last_name</div>
      <input type="text" />
      <br />
      <button>save</button><button>delete</button><button>cancel</button>
    </div>
  );
}