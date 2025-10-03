import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [step, setStep] = useState("signup"); // signup | login | quest | welcome
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // ✅ for navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", form);
      alert(res.data.message);
      setForm({ username: "", password: "" });
      setStep("login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      alert(res.data.message);
      setCurrentUser(res.data.user);
      setStep("quest"); // go to quest page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      {/* Signup Page */}
      {step === "signup" && (
        <>
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Signup</button>
          </form>
          <p>
            Already have an account?{" "}
            <button onClick={() => setStep("login")}>Login</button>
          </p>
        </>
      )}

      {/* Login Page */}
      {step === "login" && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Login</button>
          </form>
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setStep("signup")}>Signup</button>
          </p>
        </>
      )}

      {/* Quest Page */}
      {step === "quest" && (
        <>
          <h1>⚔️ Accept the Quest</h1>
          <h3>Greetings, {currentUser?.username}! Your adventure begins here.</h3>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "18px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => setStep("welcome")}
          >
            Accept Quest ✅
          </button>
        </>
      )}

      {/* Welcome Page */}
      {step === "welcome" && (
        <>
          <h1>🎉 Welcome to the System</h1>
          <h2>Welcome, {currentUser.username}!</h2>
          <button
            onClick={() => {
              navigate("/quest"); // ✅ navigate properly
            }}
          >
            Enter
          </button>
          <button
            onClick={() => {
              setCurrentUser(null);
              setStep("login");
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Authentication;


// upper code is a working code 

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Authentication() {
//     const navigate = useNavigate();
//   const [step, setStep] = useState("signup"); // signup | login | quest | welcome
//   const [currentUser, setCurrentUser] = useState(null);
//   const [form, setForm] = useState({ username: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Simulate API call
//       console.log("Signup:", form);
//       alert("Hunter registered successfully!");
//       setForm({ username: "", password: "" });
//       setStep("login");
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Simulate API call
//       console.log("Login:", form);
//       if (form.username && form.password) {
//         alert("Access granted!");
//         setCurrentUser({ username: form.username });
//         setStep("quest");
//       } else {
//         alert("Please enter valid credentials");
//       }
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
//       fontFamily: "'Courier New', monospace",
//       color: '#00d4ff',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     flames: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 1
//     },
//     flame: {
//       position: 'absolute',
//       width: '2px',
//       height: '20px',
//       background: 'linear-gradient(to top, #0066ff, #00aaff, transparent)',
//       borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
//       opacity: 0.8,
//       animation: 'flicker 2s ease-in-out infinite alternate'
//     },
//     systemPanel: {
//       background: 'rgba(0, 20, 40, 0.95)',
//       border: '2px solid #00d4ff',
//       borderRadius: '10px',
//       padding: '40px',
//       boxShadow: `
//         0 0 30px rgba(0, 212, 255, 0.3),
//         inset 0 0 30px rgba(0, 212, 255, 0.1)
//       `,
//       backdropFilter: 'blur(10px)',
//       position: 'relative',
//       zIndex: 2,
//       minWidth: '400px',
//       textAlign: 'center'
//     },
//     title: {
//       fontSize: '2.5rem',
//       marginBottom: '10px',
//       textShadow: '0 0 20px #00d4ff',
//       letterSpacing: '2px',
//       fontWeight: 'bold'
//     },
//     subtitle: {
//       fontSize: '1.2rem',
//       color: '#66ccff',
//       marginBottom: '30px',
//       opacity: 0.8
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px'
//     },
//     input: {
//       background: 'rgba(0, 20, 40, 0.8)',
//       border: '1px solid #00d4ff',
//       borderRadius: '5px',
//       padding: '15px',
//       fontSize: '16px',
//       color: '#00d4ff',
//       outline: 'none',
//       transition: 'all 0.3s ease',
//       fontFamily: "'Courier New', monospace"
//     },
//     inputFocus: {
//       boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
//       borderColor: '#00aaff'
//     },
//     button: {
//       background: 'linear-gradient(45deg, #0066ff, #00aaff)',
//       border: 'none',
//       borderRadius: '5px',
//       padding: '15px 30px',
//       fontSize: '16px',
//       color: 'white',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//       letterSpacing: '1px',
//       fontFamily: "'Courier New', monospace",
//       boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)'
//     },
//     buttonHover: {
//       transform: 'translateY(-2px)',
//       boxShadow: '0 6px 20px rgba(0, 102, 255, 0.5)'
//     },
//     linkButton: {
//       background: 'transparent',
//       border: 'none',
//       color: '#00d4ff',
//       cursor: 'pointer',
//       textDecoration: 'underline',
//       fontSize: '14px',
//       padding: '5px',
//       fontFamily: "'Courier New', monospace"
//     },
//     questPanel: {
//       textAlign: 'center'
//     },
//     questTitle: {
//       fontSize: '3rem',
//       marginBottom: '20px',
//       textShadow: '0 0 30px #00d4ff',
//       animation: 'pulse 2s ease-in-out infinite'
//     },
//     questDescription: {
//       fontSize: '1.5rem',
//       marginBottom: '30px',
//       color: '#66ccff'
//     },
//     acceptButton: {
//       background: 'linear-gradient(45deg, #00ff00, #00cc00)',
//       border: 'none',
//       borderRadius: '8px',
//       padding: '20px 40px',
//       fontSize: '20px',
//       color: 'white',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//       letterSpacing: '2px',
//       fontFamily: "'Courier New', monospace",
//       boxShadow: '0 6px 20px rgba(0, 255, 0, 0.3)',
//       transition: 'all 0.3s ease'
//     },
//     welcomePanel: {
//       textAlign: 'center'
//     },
//     welcomeTitle: {
//       fontSize: '3rem',
//       marginBottom: '20px',
//       textShadow: '0 0 30px #00d4ff',
//       background: 'linear-gradient(45deg, #00d4ff, #00ff88)',
//       backgroundClip: 'text',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: '20px',
//       justifyContent: 'center',
//       marginTop: '30px'
//     },
//     enterButton: {
//       background: 'linear-gradient(45deg, #ff6600, #ffaa00)',
//       border: 'none',
//       borderRadius: '8px',
//       padding: '15px 30px',
//       fontSize: '18px',
//       color: 'white',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//       letterSpacing: '1px',
//       fontFamily: "'Courier New', monospace",
//       boxShadow: '0 4px 15px rgba(255, 102, 0, 0.3)',
//       transition: 'all 0.3s ease'
//     },
//     logoutButton: {
//       background: 'linear-gradient(45deg, #ff0066, #ff3399)',
//       border: 'none',
//       borderRadius: '8px',
//       padding: '15px 30px',
//       fontSize: '18px',
//       color: 'white',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//       letterSpacing: '1px',
//       fontFamily: "'Courier New', monospace",
//       boxShadow: '0 4px 15px rgba(255, 0, 102, 0.3)',
//       transition: 'all 0.3s ease'
//     }
//   };

//   const createFlames = () => {
//     const flames = [];
//     for (let i = 0; i < 50; i++) {
//       flames.push(
//         <div
//           key={i}
//           style={{
//             ...styles.flame,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 2}s`,
//             animationDuration: `${2 + Math.random() * 3}s`
//           }}
//         />
//       );
//     }
//     return flames;
//   };

//   return (
//     <>
//       <style>
//         {`
//           @keyframes flicker {
//             0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
//             50% { transform: scale(1.1) rotate(2deg); opacity: 1; }
//             100% { transform: scale(0.9) rotate(-1deg); opacity: 0.6; }
//           }
          
//           @keyframes pulse {
//             0% { text-shadow: 0 0 30px #00d4ff; }
//             50% { text-shadow: 0 0 40px #00d4ff, 0 0 60px #00aaff; }
//             100% { text-shadow: 0 0 30px #00d4ff; }
//           }
          
//           input::placeholder {
//             color: #66ccff;
//             opacity: 0.7;
//           }
          
//           button:hover {
//             transform: translateY(-2px);
//           }
//         `}
//       </style>
      
//       <div style={styles.container}>
//         <div style={styles.flames}>
//           {createFlames()}
//         </div>

//         <div style={styles.systemPanel}>
//           {/* Signup Page */}
//           {step === "signup" && (
//             <>
//               <h2 style={styles.title}>SYSTEM REGISTRATION</h2>
//               <p style={styles.subtitle}>[ Initialize New Player Profile ]</p>
//               <div style={styles.form}>
//                 <input
//                   style={styles.input}
//                   type="text"
//                   name="username"
//                   placeholder="Enter Hunter Name"
//                   value={form.username}
//                   onChange={handleChange}
//                   onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)'}
//                   onBlur={(e) => e.target.style.boxShadow = 'none'}
//                 />
//                 <input
//                   style={styles.input}
//                   type="password"
//                   name="password"
//                   placeholder="Enter Access Code"
//                   value={form.password}
//                   onChange={handleChange}
//                   onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)'}
//                   onBlur={(e) => e.target.style.boxShadow = 'none'}
//                 />
//                 <button style={styles.button} onClick={handleSignup}>
//                   REGISTER HUNTER
//                 </button>
//               </div>
//               <p style={{ marginTop: '20px', color: '#66ccff' }}>
//                 Already registered?{" "}
//                 <button
//                   style={styles.linkButton}
//                   onClick={() => setStep("login")}
//                 >
//                   Access System
//                 </button>
//               </p>
//             </>
//           )}

//           {/* Login Page */}
//           {step === "login" && (
//             <>
//               <h2 style={styles.title}>SYSTEM ACCESS</h2>
//               <p style={styles.subtitle}>[ Hunter Authentication Required ]</p>
//               <div style={styles.form}>
//                 <input
//                   style={styles.input}
//                   type="text"
//                   name="username"
//                   placeholder="Enter Hunter Name"
//                   value={form.username}
//                   onChange={handleChange}
//                   onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)'}
//                   onBlur={(e) => e.target.style.boxShadow = 'none'}
//                 />
//                 <input
//                   style={styles.input}
//                   type="password"
//                   name="password"
//                   placeholder="Enter Access Code"
//                   value={form.password}
//                   onChange={handleChange}
//                   onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)'}
//                   onBlur={(e) => e.target.style.boxShadow = 'none'}
//                 />
//                 <button style={styles.button} onClick={handleLogin}>
//                   ACCESS SYSTEM
//                 </button>
//               </div>
//               <p style={{ marginTop: '20px', color: '#66ccff' }}>
//                 New hunter?{" "}
//                 <button
//                   style={styles.linkButton}
//                   onClick={() => setStep("signup")}
//                 >
//                   Register Now
//                 </button>
//               </p>
//             </>
//           )}

//           {/* Quest Page */}
//           {step === "quest" && (
//             <div style={styles.questPanel}>
//               <h1 style={styles.questTitle}>⚔️ QUEST ACCEPTED</h1>
//               <h3 style={styles.questDescription}>
//                 Welcome, Hunter {currentUser?.username}! <br/>
//                 Your journey to become the Shadow Monarch begins now.
//               </h3>
//               <button
//                 style={styles.acceptButton}
//                 onClick={() => setStep("welcome")}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-3px)';
//                   e.target.style.boxShadow = '0 8px 25px rgba(0, 255, 0, 0.5)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 6px 20px rgba(0, 255, 0, 0.3)';
//                 }}
//               >
//                 BEGIN LEVELING ✅
//               </button>
//             </div>
//           )}

//           {/* Welcome Page */}
//           {step === "welcome" && (
//             <div style={styles.welcomePanel}>
//               <h1 style={styles.welcomeTitle}>SYSTEM ACTIVATED</h1>
//               <h2 style={{ fontSize: '1.8rem', color: '#66ccff', marginBottom: '30px' }}>
//                 Welcome back, Shadow {currentUser.username}!
//               </h2>
//               <div style={styles.buttonGroup}>
//                 <button
//                   style={styles.enterButton}
//                   onClick={() => {
//               navigate("/quest"); // ✅ navigate properly
//             }}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'translateY(-2px)';
//                     e.target.style.boxShadow = '0 6px 20px rgba(255, 102, 0, 0.5)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = '0 4px 15px rgba(255, 102, 0, 0.3)';
//                   }}
//                 >
//                   ENTER DUNGEON
//                 </button>
//                 <button
//                   style={styles.logoutButton}
//                   onClick={() => {
//                     setCurrentUser(null);
//                     setStep("login");
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'translateY(-2px)';
//                     e.target.style.boxShadow = '0 6px 20px rgba(255, 0, 102, 0.5)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = '0 4px 15px rgba(255, 0, 102, 0.3)';
//                   }}
//                 >
//                   LOGOUT
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Authentication;