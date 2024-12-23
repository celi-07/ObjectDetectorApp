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
  const [spokenObjects, setSpokenObjects] = useState({}); // Tracks last spoken times for each object
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

  // Text-to-Speech Function
  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const objects = await net.detect(video);

      // Get current time
      const now = Date.now();

      // Create a set of currently detected object classes
      const currentObjects = new Set(objects.map((obj) => obj.class));

      // Iterate through detected objects
      objects.forEach((obj) => {
        const { class: objectClass } = obj;

        // Check if this object was spoken about in the last 10 seconds
        if (!spokenObjects[objectClass] || now - spokenObjects[objectClass] > 10000) {
          // Speak the object
          const message = `I detected a ${objectClass} with ${(obj.score * 100).toFixed(2)} percent confidence.`;
          speak(message);

          // Update the spoken objects state
          setSpokenObjects((prev) => ({
            ...prev,
            [objectClass]: now,
          }));
        }
      });

      // Remove objects from spokenObjects that are no longer detected
      setSpokenObjects((prev) => {
        const updatedSpokenObjects = {};
        for (const key in prev) {
          if (currentObjects.has(key)) {
            updatedSpokenObjects[key] = prev[key];
          }
        }
        return updatedSpokenObjects;
      });

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
            textAlign: "center",
            zindex: 9,
            maxwidth: "100%",
            maxheight: "100%",
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
            textAlign: "center",
            zindex: 8,
            maxwidth: "100%",
            maxheight: "100%",
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
