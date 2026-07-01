import { useState } from "react";

function App() {

  const [menu, setMenu] = useState([]);

  const getMenu = async () => {

    const response = await fetch("http://localhost:5000/menu");

    const data = await response.json();

    setMenu(data);

  };

  return (

    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial",
        background: "#f5ebe0",
        minHeight: "100vh",
        padding: "30px"
      }}
    >

      <h1>☕ HEAVENS COFFEE</h1>

      <button
        onClick={getMenu}
        style={{
          padding: "10px 20px",
          background: "#5d4037",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        View Coffee Menu
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >

        {menu.map((coffee) => (

          <div
            key={coffee._id}
            style={{
              width: "220px",
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 0 10px lightgray"
            }}
          >

            <h2>{coffee.name}</h2>

            <h3>₹ {coffee.price}</h3>

          </div>

        ))}

      </div>

    </div>

  );

}

export default App;