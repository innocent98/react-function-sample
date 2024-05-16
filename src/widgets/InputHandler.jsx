import React, { useEffect } from "react";
import { useState } from "react";
import requestMethod from "../../requestMethod";

const InputHandler = () => {
  const { userRequest } = requestMethod();

  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    setInputs((prev) => {
      // e.target.name is your form/input key while
      // e.target.value is your form/input value
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitForm = async () => {
    try {
      //   form submission using userRequest that was imported from the requestMethod file
      const res = await userRequest.post("/yourEndPoint", { ...inputs });

      console.log(res.data);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  //   retrieving of data using userRequest
  const fetchData = async () => {
    try {
      const res = await userRequest.get("/yourEndpoint");

      console.log(res.data);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    let unsubscribe = true;

    if (unsubscribe) {
      fetchData();
    }

    // clean up function
    return () => {
      unsubscribe = false;
    };
  }, []);

  return (
    <div>
      <h1>Input Form Handler</h1>

      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputHandler;
