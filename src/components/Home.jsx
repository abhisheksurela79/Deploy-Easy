import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleDjangoSubmit = () => {
    navigate("/django");
  };

  const handleReactSubmit = () => {
    navigate("/react");
  };


  return (
    <div className="text-center m-5 mb-5">
      <h2>Master the Art of Deployment</h2>
      <div
        style={{
          marginTop: "10%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
          gap: "30px",
        }}
      >
        <button
          type="button"
          class="btn btn-dark"
          style={{ padding: "2% 3%" }}
          onClick={handleReactSubmit}
        >
          ReactJs Deploy
        </button>
        <button
          type="button"
          class="btn btn-dark"
          style={{ padding: "2% 3%" }}
          onClick={handleDjangoSubmit}
        >
          Django Deploy
        </button>
      </div>
    </div>
  );
}

export default Home;
