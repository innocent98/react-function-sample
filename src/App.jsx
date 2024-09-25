/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import InputFieldPopup from "./InputFieldPopup";
import MyEditor from "./Editor";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123",
};

function App() {
  // React hooks
  // Types of React hooks
  // state hooks, effect hooks, callback hooks, etc...

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // console.log(name, email, password);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-validation">
      <h1>Form validation</h1>

      <form onSubmit={handleSubmit}>
        <InputFieldPopup />

        <button>Submit</button>
      </form>

      <MyEditor />
    </div>
  );
}

export default App;
