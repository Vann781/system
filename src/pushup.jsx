// import React, { useEffect } from "react";
// import axios from "axios";

// function Pushup() {
//   useEffect(() => {
//     // Call backend API to start pushup tracking
//     const startPushup = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/start-pushup");
//         alert(res.data.message);
//       } catch (err) {
//         alert("Failed to start pushup counter ❌");
//       }
//     };

//     startPushup();
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>🏋️ Push-up Challenge</h1>
//       <p>Webcam window will open from Python backend.</p>
//     </div>
//   );
// }

// export default Pushup;


import React, { useEffect, useState } from "react";
import axios from "axios";

function Pushup() {
  const [status, setStatus] = useState("initializing");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Connect to backend
  useEffect(() => {
    const startPushup = async () => {
      try {
        setStatus("connecting");
        const res = await axios.get("http://localhost:5000/start-pushup");
        console.log(res.data.message);
        setStatus("active");
        setIsActive(true);
      } catch (err) {
        setStatus("error");
        console.error("Failed to connect backend ❌");
      }
    };
    startPushup();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed((time) => time + 1);
      }, 1000);
    } else if (!isActive && timeElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeElapsed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getStatusMessage = () => {
    switch (status) {
      case "initializing":
        return "INITIALIZING SYSTEM...";
      case "connecting":
        return "CONNECTING TO VISION MODULE...";
      case "active":
        return "TRACKING ACTIVE - BEGIN EXERCISE";
      case "error":
        return "CONNECTION FAILED - RETRY REQUIRED";
      default:
        return "UNKNOWN STATUS";
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Courier New', monospace",
      color: "#00d4ff",
      position: "relative",
      overflow: "hidden",
    },
    mainPanel: {
      position: "relative",
      zIndex: 2,
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "4rem",
      marginBottom: "15px",
      textShadow: "0 0 30px #00d4ff",
      letterSpacing: "3px",
      fontWeight: "bold",
      animation: "pulse 2s ease-in-out infinite",
    },
    subtitle: {
      fontSize: "1.5rem",
      color: "#66ccff",
      marginBottom: "20px",
    },
    statusPanel: {
      background: "rgba(0, 20, 40, 0.95)",
      border: "2px solid #00d4ff",
      borderRadius: "15px",
      padding: "30px",
      margin: "0 auto 40px",
      maxWidth: "600px",
      boxShadow: `
        0 10px 30px rgba(0, 212, 255, 0.3),
        inset 0 0 30px rgba(0, 212, 255, 0.1)
      `,
      backdropFilter: "blur(10px)",
    },
    statusTitle: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
      color:
        status === "active"
          ? "#00ff88"
          : status === "error"
          ? "#ff6666"
          : "#ffaa00",
    },
    statusMessage: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginBottom: "30px",
      color: "#66ccff",
      letterSpacing: "1px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    },
    statCard: {
      background: "rgba(0, 20, 40, 0.95)",
      border: "2px solid #00d4ff",
      borderRadius: "10px",
      padding: "25px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0, 212, 255, 0.2)",
    },
    statValue: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#00ff88",
      textShadow: "0 0 20px #00ff88",
      display: "block",
      marginBottom: "10px",
    },
    statLabel: {
      fontSize: "1.2rem",
      color: "#66ccff",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    visionPanel: {
      background: "rgba(0, 20, 40, 0.95)",
      border: "2px solid #00d4ff",
      borderRadius: "15px",
      padding: "30px",
      margin: "40px auto",
      maxWidth: "700px",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
    },
    visionTitle: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "#00d4ff",
    },
    visionStatus: {
      fontSize: "1.3rem",
      color: "#66ccff",
      marginBottom: "20px",
    },
    cameraIcon: {
      fontSize: "4rem",
      color: "#00d4ff",
      textShadow: "0 0 30px #00d4ff",
      animation: status === "active" ? "pulse 1.5s ease-in-out infinite" : "none",
    },
    instructions: {
      background: "rgba(0, 20, 40, 0.95)",
      border: "2px solid #ffaa00",
      borderRadius: "15px",
      padding: "25px",
      margin: "40px auto",
      maxWidth: "600px",
      boxShadow: "0 10px 30px rgba(255, 170, 0, 0.2)",
    },
    instructionTitle: {
      fontSize: "1.5rem",
      color: "#ffaa00",
      textAlign: "center",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    instructionList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    instructionItem: {
      padding: "10px 0",
      borderBottom: "1px solid rgba(255, 170, 0, 0.3)",
      color: "#ffcc66",
      fontSize: "1.1rem",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { text-shadow: 0 0 30px #00d4ff; }
            50% { text-shadow: 0 0 50px #00d4ff, 0 0 80px #0099cc; }
            100% { text-shadow: 0 0 30px #00d4ff; }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.mainPanel}>
          <div style={styles.header}>
            <h1 style={styles.title}>🏋️ PHYSICAL ENHANCEMENT</h1>
            <p style={styles.subtitle}>
              [ Push-up Training Protocol Initiated ]
            </p>
          </div>

          <div style={styles.statusPanel}>
            <div style={styles.statusTitle}>{getStatusMessage()}</div>
            <div style={styles.statusMessage}>
              {status === "active"
                ? "Computer vision tracking your movements..."
                : status === "connecting"
                ? "Establishing connection to OpenCV module..."
                : status === "error"
                ? "Please check your camera and backend connection"
                : "Preparing training environment..."}
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{formatTime(timeElapsed)}</span>
              <span style={styles.statLabel}>Time Elapsed</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>E</span>
              <span style={styles.statLabel}>Quest Rank</span>
            </div>
          </div>

          <div style={styles.visionPanel}>
            <div style={styles.visionTitle}>COMPUTER VISION MODULE</div>
            <div style={styles.visionStatus}>
              {status === "active"
                ? "✅ OpenCV Window Active"
                : status === "connecting"
                ? "🔄 Initializing Camera..."
                : status === "error"
                ? "❌ Connection Failed"
                : "⚡ Preparing Vision System"}
            </div>
            <div style={styles.cameraIcon}>📹</div>
            <p
              style={{
                color: "#66ccff",
                marginTop: "15px",
                fontSize: "1.1rem",
              }}
            >
              {status === "active"
                ? "Python backend is running OpenCV tracking"
                : "Webcam window will open from Python backend"}
            </p>
          </div>

          <div style={styles.instructions}>
            <div style={styles.instructionTitle}>TRAINING INSTRUCTIONS</div>
            <ul style={styles.instructionList}>
              <li style={styles.instructionItem}>
                🎯 Position yourself in front of the camera
              </li>
              <li style={styles.instructionItem}>
                💪 Maintain proper push-up form
              </li>
              <li style={styles.instructionItem}>
                📐 Ensure full range of motion
              </li>
              <li style={styles.instructionItem}>
                ⚡ Complete 50 repetitions to pass
              </li>
              <li style={styles.instructionItem}>
                🏆 Earn +5 STR and +3 END upon completion
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pushup;
