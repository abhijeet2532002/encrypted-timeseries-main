// Import necessary React hooks and libraries
import React, { useState, useEffect } from "react";
import Card from "./component/Card";
import Table from "./component/Table";

// Import the Socket.io client library
import io from "socket.io-client";

// Create a WebSocket connection to the server
const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
});

// Define the main React component
const App = () => {
  // Define state variables using the useState hook
  const [dataStream, setDataStream] = useState([]); // Store received data
  const [successRate, setSuccessRate] = useState(0); // Calculate success rate
  const [countdown, setCountdown] = useState(10); // Display countdown timer

  // useEffect hook to set up event listeners when the component mounts
  useEffect(() => {
    // Event listeners for WebSocket connections
    const handleMsg = (data) => {
      // console.log(data);
      console.log("Connected to WebSocket");
    };

    const handleError = (error) => {
      console.error("WebSocket connection error:", error);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from WebSocket");
    };

    const handleEncrypted = (data) => {
      // Emit a "listen_request" event to the server with received data
      socket.emit("listen_request", data);
      console.log("useeffect_jitendra", data);
    };

    const handleDecoded = (data) => {
      const activeData = { ...data, className: "bg-green-400" };
      // console.log(activeData, "ok");
      // Update the dataStream state with the received data
      setDataStream((prev) => [activeData, ...prev]);
    };

    // Attach event listeners to WebSocket events
    socket.on("msg", handleMsg);
    socket.on("connect_error", handleError);
    socket.on("disconnect", handleDisconnect);
    socket.on("encrypted", handleEncrypted);
    socket.on("decoded", handleDecoded);

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("msg", handleMsg);
      socket.off("connect_error", handleError);
      socket.off("disconnect", handleDisconnect);
      socket.off("encrypted", handleEncrypted);
      socket.off("decoded", handleDecoded);
    };
  }, []); // The empty dependency array means this effect runs only once, on mount

  // useEffect hook to calculate success rate based on dataStream length
  useEffect(() => {
    const newSuccessRate = dataStream.length > 0 ? 100 : 0;
    setSuccessRate(newSuccessRate);
  }, [dataStream]);

  // useEffect hook to set up a countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          return 10;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [countdown]);

  // Render the component JSX
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-rose-700 text-white min-h-screen p-6  overflowy-auto  ">
        <Card countdown={countdown} />
        <Table data={dataStream} countdown={countdown} />
      </div>
    </>
  );
};

export default App;
