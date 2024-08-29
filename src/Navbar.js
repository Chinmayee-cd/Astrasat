export default function Navbar() {
  return (
    <>
      <div
        style={{
          height: "100px",
          width: "1280px",
          background: "teal",
          top: "0px",
          left: "0px",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "1000px",
            background: "white",
            opacity: "0.7",
            marginLeft: "130px",
          }}
        >
          <img
            src="../Chaitanya_Bharathi_Institute_of_Technology_logo.png"
            alt="CBIT logo"
            style={{
              width: "80px",
              height: "80px",
              marginLeft: "10px",
            }}
          ></img>
          <img
            src="../astra-logo.jpg"
            alt="Astrasat logo"
            style={{
              width: "80px",
              height: "80px",
              marginLeft: "300px",
            }}
          ></img>
          <img
            src="../indian_flag.jpg"
            alt="Indian flag"
            style={{
              width: "100px",
              height: "80px",
              marginLeft: "300px",
            }}
          ></img>
        </div>
      </div>
    </>
  );
}
