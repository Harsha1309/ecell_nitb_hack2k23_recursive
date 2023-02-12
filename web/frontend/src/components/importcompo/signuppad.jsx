import React, { useEffect, useState } from "react";
import "./pad.css";
import ReactDOM from "react-dom";
import SignatureCanvas from "react-signature-canvas";

function Pad() {
  const [start, setStart] = useState(false);
  const [mousePos, setMousePos] = useState({});
  const signstart = () => {
    setStart(!start);
  };
  useEffect(() => {
    if (!start) return;
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [start]);
  useEffect(() => {}, [mousePos]);

  return (
    <div>
      <div id="watermark">Draw Here </div>
      <div
        className="patt"
        id="drawpad"
        style={{ height: 300, marginTop: 10, marginLeft: 110 }}
      >
        <SignatureCanvas
          penColor="green"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
      </div>
    </div>
  );
}

export default Pad;
