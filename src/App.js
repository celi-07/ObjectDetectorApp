// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");

  const videoConstraints = {
    facingMode: facingMode,
  };

  const switchCamera = () => {
    setFacingMode((prev) =>
      prev === "user" ? { exact: "environment" } : "user"
    );
  };

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  var videoWidth;
  var videoHeight;
  var spokenObjects = {};

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      videoWidth = webcamRef.current.video.videoWidth;
      videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const objects = await net.detect(video);

      const now = Date.now();

      const currentObjects = new Set(objects.map((obj) => obj.class));

      // console.log("Objects"+JSON.stringify(objects))
      // console.log("SpokenObjects"+JSON.stringify(spokenObjects))

      const newSpokenObjects = { ...spokenObjects };

      objects.forEach((obj) => {
        const { class: objectClass } = obj;

        // Check if this object was spoken about in the last 10 seconds
        if (!newSpokenObjects[objectClass] || now - newSpokenObjects[objectClass] > 10000) {
          // Speak the object
          const message = `I detected a ${objectClass} with ${(obj.score * 100).toFixed(2)} percent confidence.`;
          speak(message);

          // Update the spoken objects state
          newSpokenObjects[objectClass] = now;
        }
      });

      // Remove objects from spokenObjects that are no longer detected
      const updatedSpokenObjects = {};
      for (const key in newSpokenObjects) {
        if (currentObjects.has(key)) {
          updatedSpokenObjects[key] = newSpokenObjects[key];
        }
      }
      spokenObjects = updatedSpokenObjects;

      // Draw bounding boxes
      const ctx = canvasRef.current.getContext("2d");
      drawRect(objects, ctx);
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          videoConstraints={videoConstraints}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 0,
            textAlign: "center",
            zindex: 9,
            width: videoWidth,
            height: videoHeight,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 0,
            textAlign: "center",
            zindex: 8,
            width: videoWidth,
            height: videoHeight,
          }}
        />
<button
            onClick={switchCamera}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
          >
            Switch Camera
          </button>
      </header>
    </div>
  );
}

export default App;
