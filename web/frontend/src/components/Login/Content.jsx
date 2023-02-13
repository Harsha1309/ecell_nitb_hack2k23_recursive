import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Content.css";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import axios from "axios";
import { Buffer } from "buffer";

function Content() {
  const [password, setpassword] = useState();
  const [email, setEmail] = useState("");

  const loginfun = () => {
    html2canvas(document.getElementById("drawpad")).then(function (canvas) {
      const data = canvas.toDataURL("image/png");
      const buffer = Buffer.from(data, "base64");
      console.log(data);
      console.log(buffer);
      axios
        .post("http://localhost:5000/api/login", {
          email: email,
          password: buffer,
        })
        .then((res) => {
          alert('You pattern has been matched,');
        })
        .catch((err) => {
          alert('Please make valid signs')
        });
    });
  };
  return (
    <>
      <div className="row firstGrid">
        <div className="col-7 ib1">
          <div className="row secondGrid">
            <div className="col-5" id="grad">
              <h2 className="heading">
                Log in to <br />
                Internet Banking
              </h2>
              <p className="content mt-3">
                if you don't have an <br />
                account you can <br />
                <Link
                  to="/register"
                  style={{ color: "#4461F2", textDecoration: "none" }}
                >
                  Register here!
                </Link>
              </p>
            </div>
            <div className="col-7">
              <img
                src="Bank.jpg"
                className="image"
                height="100%"
                width="90%"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-5 ib2">
          <h4>Enter your credentials</h4>
          <input
            className="mt-3 text-center colour rounded-2"
            type="email"
            name="email"
            id=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            style={{
              width: "400px",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          />
          <br />
          <div>
            <div id="watermark">Draw Here </div>
            <div
              className="patt"
              id="drawpad"
              style={{ height: 300, marginTop: 10, marginLeft: 100 }}
            >
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 300,
                  className: "sigCanvas",
                  backgroundColor:'#add8e64a'
                }}
              />
            </div>
          </div>
          <p
            className="mt-2 text-end "
            style={{ right: "7rem", position: "relative" }}
          >
            Recover Password?
          </p>
          <Link to='/user'>
          <button
            type="button"
            className="btn btn-primary mt-3"
            style={{ width: "400px" }}
            onClick={loginfun}
          >
            Sign in
          </button>
          </Link>
        </div>
      </div>
      <div id="output"></div>
    </>
  );
}

export default Content;
