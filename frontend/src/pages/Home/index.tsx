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
        <h4 className="mt-5 p-5">Olá, {localStorage.getItem("nome")} !</h4>

        {/* criar 2 cards com links para ocorrencias e declaraçcos */}
        <div
          className="
        "
        >
          <div className="row align-items-center justify-content-center
          ">
            <div onClick={() => {
              window.location.href = "/ocorrencias";
            }} className="col-6"
            >
              <div className="card" style={{ backgroundColor: "#222F4D", color: "#fff" }}>
                <div className="card-body">
                  <h6 className="card-title">Ocorrências</h6>

                </div>
              </div>
            </div>
          </div>

          <div className=" row align-items-center justify-content-center
          ">
            <div onClick={() => {
              window.location.href = "/declaracoes";
            }} className="col-6">
              <div className="card" style={{ color: "#222F4D" }}>
                <div className="card-body">
                  <h6 className="card-title">Declarações</h6>

                </div>
              </div>
            </div>
          </div>
        </div>





      </div>
    </div>
  );
}
