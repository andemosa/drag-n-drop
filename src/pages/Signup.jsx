import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
        // ..
      });

    setLoading(false);
  };

  return (
    <div className="flex h-full min-w-full items-center justify-center">
      <div className="w-3/4 mx-auto">
        <h1 className="my-4 font-bold text-2xl">Sign up</h1>
        <form
          className="flex max-w-md flex-col gap-4 shadow-xl p-4 rounded-lg mx-auto"
          onSubmit={onSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              placeholder="name@flowbite.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={!email || !password || loading}>
            {loading ? <Spinner aria-label="Loading..." /> : "Submit"}
          </Button>
          <p className="font-semibold text-sm text-center">
            Have an account? <Link to={"/login"} className="text-blue-400">Login</Link>
          </p>
          {error && (
            <p className="font-semibold text-red-600">
              {JSON.stringify(error)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
