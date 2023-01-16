import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import api from "../../api/server";

export default function Register() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password && name && contact) {
      if (password === confirmPassword) {
        const result = await api("/stores", {
          method: "POST",
          body: {
            name,
            contact,
            email,
            password,
            desc: "Menjual topeng bali",
            profilePictureUrl:
              "https://storage.googleapis.com/maskology-images/image-placeholder/profile.jpg",
            backgroundUrl:
              "https://storage.googleapis.com/maskology-images/image-placeholder/background.jpg",
          },
        });
        if (result) {
          alert("Register success. Please login with your new account.");
          navigate("/login");
        }
      } else {
        alert("Password not match");
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="container h-100 d-flex align-item-center justify-content-center">
      <main className="col form-register text-center m-auto">
        <form onSubmit={(e) => handleRegister(e)}>
          <img
            className="mb-4"
            src="/logo-dashboard.png"
            alt=""
            width="195"
            height="72"
          />
          <h1 className="h4 mt-5 mb-4 fw-normal">Register Form</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Store"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">Store name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="+620000000"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <label htmlFor="floatingInput">Phone number</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <button className="w-100 mt-4 btn btn-primary" type="submit">
            Register
          </button>
          <Link to={"/login"}>
            <p className="mt-2">Login Here</p>
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2022, Denpasar, Bali</p>
        </form>
      </main>
    </div>
  );
}
