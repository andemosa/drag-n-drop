import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import "./App.css";
import { auth } from "./firebase";
import Protected from "./components/Protected";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);
  return (
    <Router>
      <section className="h-full">
        <Routes>
          <Route
            path="/"
            element={
              <Protected user={user}>
                <Home />
              </Protected>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
