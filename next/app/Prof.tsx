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
      <div>value</div>
      <input type="text" onChange={(e) => {setField1(e.target.value);
        console.log(e.target.value)
      }} value={field1}/>
      <div>type</div>
      <input type="text" onChange={(e) => {setField2(e.target.value);
        console.log(e.target.value)
      }} value={field2}/>  
      <button onClick={
        (e) => handler({value: field1, type: field2})
      }>submit</button>    
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