import "./home.css";

export default function Home() {
  return (
    <div className="dashboard d-flex justify-content-center align-items-center">
      <div className="text-center">
        <img
          className="p-1"
          src="/logo-dashboard.png"
          alt=""
          width="400"
          height="150"
        />
        <h4 className="mt-5">Olá, {localStorage.getItem("nome")} !</h4>

      </div>
    </div>
  );
}
