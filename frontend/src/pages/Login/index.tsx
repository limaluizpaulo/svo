import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import api from "../../api/server";
import { toast } from "react-toastify";

interface StoreLogin {
  nome: string;
  token: string;
  id: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (email && password) {
        const result: StoreLogin = await api("/login", {
          method: "POST",
          body: {
            email,
            password,
          },
        });
        if (result) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("id", result.id);
          localStorage.setItem("nome", result.nome);

          window.location.reload();
        }
      }
    } catch (e: any) {
      //  Why error here use any? https://stackoverflow.com/questions/69021040/why-catch-clause-variable-type-annotation-must-be-any
      toast.info(e.response._data.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="container h-100 d-flex align-item-center justify-content-center">
      <main className="col form-signin text-center m-auto">
        <form onSubmit={(e) => handleLogin(e)}>
          <img
            className="mb-4"
            src="/logo-dashboard.png"
            alt=""
            width="195"
            height="72"
          />

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Senha</label>
          </div>
          <button className="w-100 mt-4 btn btn-primary" type="submit">
            Entrar
          </button>
          <Link to={"/register"}>
            <p className="mt-2">Registrar</p>
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2024, Desenvolvido por <a href="https://luizpaulo.eng.br/" target="_blank" >Luiz Paulo Lima</a> </p>
        </form>
      </main>
    </div>
  );
}
