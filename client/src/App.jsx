import { useState } from "react";
import coffeeBg from "./assets/coffee-bg.jpg";


function App() {

  const [menu, setMenu] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

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
    minHeight: "100vh",
    padding: "30px",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${coffeeBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "black"
  }}
>

      <h1
  style={{
    color: "white",
    fontSize: "48px",
    marginBottom: "25px",
    textShadow: "2px 2px 10px rgba(0,0,0,0.7)"
  }}
>
  ☕ HEAVENS COFFEE
</h1>

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

<button
  onClick={() => {
    setSelectedCoffee(coffee);
    setShowPopup(true);
    setOrderConfirmed(false);
    setCustomerName("");
  }}
  style={{
    marginTop: "15px",
    padding: "10px 20px",
    background: "#5d4037",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%"
  }}
>
  Order Now
</button>

          </div>

        ))}

        {showPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "350px",
        textAlign: "center",
        color: "black"
      }}
    >
      {!orderConfirmed ? (
        <>
          <h2>☕ HEAVENS COFFEE</h2>

          <h3>{selectedCoffee?.name}</h3>

          <p>Price : ₹ {selectedCoffee?.price}</p>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: "90%",
              padding: "10px",
              margin: "15px 0"
            }}
          />

          <button
            onClick={async () => {

  if (customerName.trim() === "") {
    alert("Please enter your name");
    return;
  }

  const response = await fetch("http://localhost:5000/order", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      customerName: customerName,

      coffee: selectedCoffee.name,

      price: selectedCoffee.price

    })

  });

  const data = await response.json();

  if (data.success) {

    setOrderConfirmed(true);

  } else {

    alert("Failed to save order");

  }

}}
            style={{
              padding: "10px 20px",
              background: "#5d4037",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Confirm Order
          </button>

          <br /><br />

          <button
            onClick={() => setShowPopup(false)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2>☕ HEAVENS COFFEE</h2>

          <h1>✅</h1>

          <h3>ORDER CONFIRMED</h3>

          <p><b>Customer :</b> {customerName}</p>

          <p><b>Coffee :</b> {selectedCoffee?.name}</p>

          <p><b>Amount :</b> ₹ {selectedCoffee?.price}</p>

          <p><b>Estimated Time :</b> 5 Minutes</p>

          <button
            onClick={() => setShowPopup(false)}
            style={{
              padding: "10px 20px",
              background: "#5d4037",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </>
      )}
    </div>
  </div>
)}

      </div>

    </div>

  );

}

export default App;