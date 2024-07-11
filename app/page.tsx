"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Login from "@/components/Login";

type newUser = {
  username: string;
  password: string;
  email: string;
  id: string;
};

export default function Home() {
  const [user, setUser] = useState<newUser>({
    username: "admin",
    password: "admin",
    email: "",
    id: "",
  });
  const [email, setEmail] = useState<string>("");
  const [waiting, setWating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      handleLogin(storedUsername, storedPassword);
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newUser = await response.json();
      setLogged(true);
      setUser(newUser);
      localStorage.setItem("username", user.username);
      localStorage.setItem("password", user.password);
      alert("User created");
    } catch (error) {
      setLogged(false);
      console.error("Error:", error);
      setError("Failed to register user");
    }
  };

  const handleLogin = async (username: string, password: string) => {
    setWating(true);
    try {
      const response = await fetch(
        `/api/users?username=${username}&password=${password}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        setLogged(true);
        setError("");
        setWating(false);
      } else {
        resetUserState();
      }
    } catch (err) {
      resetUserState();
      setError("Username or password is wrong");
      console.log(err);
    }
  };

  const resetUserState = () => {
    setUser({ username: "", password: "", email: "", id: "" });
    setLogged(false);
  };

  return (
    <div className="w-full">
      {logged ? (
        <div>
          <Navbar logged={logged} setLogged={setLogged} user={user} />
          <Products user={user} />
          <Footer />
        </div>
      ) : (
        <div className="w-full">
          <Login
            waiting={waiting}
            user={user}
            setUser={setUser}
            handleRegister={handleRegister}
            error={error}
            handleLogin={handleLogin}
          />
        </div>
      )}
    </div>
  );
}
