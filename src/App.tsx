import { useState } from "react";

function App() {
  const [userName, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
      // currentTarget은 EVEBTTarget & 형식에 HTMLInputElement 형식에서 value값을 찾아야한다!
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={userName}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Login</button>
      </form>
    </>
  );
}

export default App;
