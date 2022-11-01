// import './canvas.css'
import './index.css';
import { useAuthValue } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import React, { useCallback, useEffect, useRef, useState } from "react";

const colors = ["red", "green", "yellow", "black", "blue"];

function Canvas() {
  // canvas code

  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        ctx.current.beginPath();
        ctx.current.strokeStyle = selectedColor;
        ctx.current.lineWidth = 10;
        ctx.current.lineJoin = "round";
        ctx.current.moveTo(lastPosition.x, lastPosition.y);
        ctx.current.lineTo(x, y);
        ctx.current.closePath();
        ctx.current.stroke();

        setPosition({
          x,
          y,
        });
      }
    },
    [lastPosition, mouseDown, selectedColor, setPosition]
  );

  const download = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  const clear = () => {
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    });
    setMouseDown(true);
  };

  const onMouseUp = (e) => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY);
  };

  // user details
  const { currentUser } = useAuthValue();

  return (
    <div className="m-0 p-0">
      <div class="m-0 flex relative bg-indigo-700 w-full ...">

        {/* <img src='' alt = "img" className=' p-1'/> */}
        
          <p className="flex-col text-white p-1 mt-2 ml-5">
            <strong>User : </strong>
            {currentUser?.email}
          </p>

          <span className="flex-col m-1 mr-0 ml-80 bg-red-800 hover:bg-red-600 shadow-md rounded-sm text-white p-2" onClick={() => signOut(auth)}>
            Sign Out
          </span>
      </div>

      <div className=" relative h-screen w-full bg-pink-500 ...">
      <div className="absolute m-0 p-0  ">
        <canvas className=' bg-sky-100' 
          style={{
            border: "1px solid #000",
          }}
          width={1920}
          height={500}
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        />
        <br />
        <select className='w-1/12 mt-4 mx-12 bg-indigo-700 text-white'
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <button className=' w-1/12 mt-4 mx-12 bg-indigo-700 shadow-md rounded-sm text-white p-2 hover:bg-green-700' onClick={clear}>Clear</button>
        <button className='w-1/12 mt-4 mx-12 bg-indigo-700 hover:bg-green-700  shadow-md rounded-sm text-white p-2' onClick={download}>Download</button>

        </div>
      </div>

      
    </div>
  );
}

export default Canvas;
