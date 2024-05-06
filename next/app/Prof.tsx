import s from "./page.module.scss";
import { useState } from 'react';
const BP = process.env.NEXT_PUBLIC_BASE_PATH;

const handler = async (obj: any) => {
  const response = await fetch( BP + '/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Insert failed:', errorData);
  } else {
    console.log("success");
  }
}

export default function Prof() {
  const [field1, setField1] = useState<string>("");

  const [field2, setField2] = useState<string>("");

  return (
    <div className={s.prof}>
      <div>Old Password</div>
      <input type="text" />
      <div>New Password</div>
      <input type="text" />
      <div>DOB</div>
      <input type="text" />
      <div>Email</div>
      <input type="text" />
      <div>Username</div>
      <input type="text" />
      <div>Image</div>
      <input type="file" />
      <div>First Name</div>
      <input type="text" />
      <div>Last Name</div>
      <input type="text" />
      <br />
      <button>save</button><button>delete</button><button>cancel</button>
    </div>
  );
}