// // Quest.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Quest() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>⚔️ Available Quests</h1>
//       <ul style={{ listStyle: "none", fontSize: "20px" }}>
//         <li>🏋️ 50 Push-ups</li>
//         <li>🏃 5 KM Run</li>
//       </ul>
//       <button
//         onClick={() => navigate("/pushup")}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "18px",
//           background: "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         Accept Quest ✅
//       </button>
//     </div>
//   );
// }

// export default Quest;


// upper code is normal one 

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Quest() {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const navigate = useNavigate();
const [level, setLevel] = useState(1);
  
  const questData = [
    {
      id: 1,
      title: "PHYSICAL ENHANCEMENT PROTOCOL",
      description: "Complete 20 Push-ups",
      difficulty: "E-RANK",
      reward: "+5 STR, +3 END",
      icon: "🏋️",
      route: "/pushup"
    },
    {
      id: 2,
      title: "AGILITY TRAINING SEQUENCE",
      description: "Complete 5 KM Run",
      difficulty: "D-RANK", 
      reward: "+8 AGI, +5 VIT",
      icon: "🏃",
      route: "/run"
    }
  ];

  const handleQuestAccept = (quest) => {
    console.log("Navigating to:", quest.route);
    alert(`Quest "${quest.title}" accepted! Redirecting...`);
    navigate(quest.route); // ✅ just call it directly
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: "'Courier New', monospace",
      color: '#00d4ff',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    flames: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    },
    flame: {
      position: 'absolute',
      width: '2px',
      height: '15px',
      background: 'linear-gradient(to top, #0066ff, #00aaff, transparent)',
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      opacity: 0.6,
      animation: 'flicker 3s ease-in-out infinite alternate'
    },
    mainPanel: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
      paddingTop: '40px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    title: {
      fontSize: '4rem',
      marginBottom: '15px',
      textShadow: '0 0 30px #00d4ff',
      letterSpacing: '3px',
      fontWeight: 'bold',
      animation: 'pulse 2s ease-in-out infinite',
      background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      fontSize: '1.5rem',
      color: '#66ccff',
      opacity: 0.8,
      marginBottom: '20px'
    },
    systemStatus: {
      display: 'inline-block',
      padding: '10px 20px',
      border: '2px solid #00ff88',
      borderRadius: '25px',
      background: 'rgba(0, 255, 136, 0.1)',
      color: '#00ff88',
      fontSize: '16px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      animation: 'statusGlow 3s ease-in-out infinite'
    },
    questGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '30px',
      marginBottom: '40px'
    },
    questCard: {
      background: 'rgba(0, 20, 40, 0.95)',
      border: '2px solid #00d4ff',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: `
        0 10px 30px rgba(0, 212, 255, 0.2),
        inset 0 0 30px rgba(0, 212, 255, 0.05)
      `,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    questCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: `
        0 20px 50px rgba(0, 212, 255, 0.4),
        inset 0 0 40px rgba(0, 212, 255, 0.1)
      `,
      borderColor: '#00ff88'
    },
    questHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px'
    },
    questIcon: {
      fontSize: '3rem',
      marginRight: '15px',
      textShadow: '0 0 20px #00d4ff'
    },
    questTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      letterSpacing: '1px',
      textShadow: '0 0 15px #00d4ff'
    },
    questDescription: {
      fontSize: '1.3rem',
      color: '#66ccff',
      marginBottom: '15px'
    },
    questDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px'
    },
    difficulty: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '1px'
    },
    eRank: {
      background: 'linear-gradient(45deg, #00ff00, #66ff66)',
      color: '#003300'
    },
    dRank: {
      background: 'linear-gradient(45deg, #ffff00, #ffff99)',
      color: '#333300'
    },
    reward: {
      color: '#ffaa00',
      fontSize: '16px',
      fontWeight: 'bold',
      textShadow: '0 0 10px #ffaa00'
    },
    acceptButton: {
      width: '100%',
      padding: '15px',
      background: 'linear-gradient(45deg, #00ff00, #00cc00)',
      border: 'none',
      borderRadius: '10px',
      fontSize: '18px',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontFamily: "'Courier New', monospace",
      boxShadow: '0 6px 20px rgba(0, 255, 0, 0.3)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    acceptButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 255, 0, 0.5)'
    },
    questOverlay: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent)',
      transition: 'left 0.5s ease'
    },
    questCardSelected: {
      borderColor: '#00ff88',
      boxShadow: `
        0 15px 40px rgba(0, 255, 136, 0.4),
        inset 0 0 40px rgba(0, 255, 136, 0.1)
      `
    },
    statusBar: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 20, 40, 0.95)',
      border: '2px solid #00d4ff',
      borderRadius: '10px',
      padding: '20px',
      minWidth: '250px',
      boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
      zIndex: 3
    },
    statusTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
      color: '#00ff88'
    },
    statusItem: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '8px 0',
      fontSize: '14px'
    }
  };

  const createFlames = () => {
    const flames = [];
    for (let i = 0; i < 60; i++) {
      flames.push(
        <div
          key={i}
          style={{
            ...styles.flame,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`
          }}
        />
      );
    }
    return flames;
  };
  


  
  return (
    <>
      <style>
        {`
          @keyframes flicker {
            0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
            50% { transform: scale(1.2) rotate(3deg); opacity: 1; }
            100% { transform: scale(0.8) rotate(-2deg); opacity: 0.4; }
          }
          
          @keyframes pulse {
            0% { text-shadow: 0 0 30px #00d4ff; }
            50% { text-shadow: 0 0 50px #00d4ff, 0 0 80px #0099cc; }
            100% { text-shadow: 0 0 30px #00d4ff; }
          }
          
          @keyframes statusGlow {
            0% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
            50% { box-shadow: 0 0 30px rgba(0, 255, 136, 0.6); }
            100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
          }
          
          @keyframes sweep {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}
      </style>
      
      <div style={styles.container}>
        <div style={styles.flames}>
          {createFlames()}
        </div>

        <div style={styles.statusBar}>
          <div style={styles.statusTitle}>HUNTER STATUS</div>
          <div style={styles.statusItem}>
            <span>Level:</span>
            <span style={{color: '#00ff88'}}>1</span>
          </div>
          <div style={styles.statusItem}>
            <span>Rank:</span>
            <span style={{color: '#ffaa00'}}>E-RANK</span>
          </div>
          <div style={styles.statusItem}>
            <span>Quests:</span>
            <span style={{color: '#00d4ff'}}>2 Available</span>
          </div>
        </div>

        <div style={styles.mainPanel}>
          <div style={styles.header}>
            <h1 style={styles.title}>⚔️ QUEST BOARD</h1>
            <p style={styles.subtitle}>[ Daily Training Protocols Available ]</p>
            <div style={styles.systemStatus}>
              SYSTEM STATUS: ACTIVE
            </div>
          </div>

          <div style={styles.questGrid}>
            {questData.map((quest) => (
              <div
                key={quest.id}
                style={{
                  ...styles.questCard,
                  ...(selectedQuest === quest.id ? styles.questCardSelected : {})
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `
                    0 20px 50px rgba(0, 212, 255, 0.4),
                    inset 0 0 40px rgba(0, 212, 255, 0.1)
                  `;
                  e.currentTarget.style.borderColor = '#00ff88';
                  const overlay = e.currentTarget.querySelector('.quest-overlay');
                  if (overlay) overlay.style.left = '100%';
                }}
                onMouseLeave={(e) => {
                  if (selectedQuest !== quest.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `
                      0 10px 30px rgba(0, 212, 255, 0.2),
                      inset 0 0 30px rgba(0, 212, 255, 0.05)
                    `;
                    e.currentTarget.style.borderColor = '#00d4ff';
                  }
                  const overlay = e.currentTarget.querySelector('.quest-overlay');
                  if (overlay) overlay.style.left = '-100%';
                }}
                onClick={() => setSelectedQuest(quest.id)}
              >
                <div 
                  className="quest-overlay"
                  style={{
                    ...styles.questOverlay,
                    animation: selectedQuest === quest.id ? 'sweep 1s ease-in-out' : 'none'
                  }}
                />
                
                <div style={styles.questHeader}>
                  <div style={styles.questIcon}>{quest.icon}</div>
                  <div style={styles.questTitle}>{quest.title}</div>
                </div>
                
                <div style={styles.questDescription}>
                  {quest.description}
                </div>
                
                <div style={styles.questDetails}>
                  <div 
                    style={{
                      ...styles.difficulty,
                      ...(quest.difficulty === 'E-RANK' ? styles.eRank : styles.dRank)
                    }}
                  >
                    {quest.difficulty}
                  </div>
                  <div style={styles.reward}>
                    {quest.reward}
                  </div>
                </div>
                
                <button
                  style={styles.acceptButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuestAccept(quest);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0, 255, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 255, 0, 0.3)';
                  }}
                >
                  ACCEPT QUEST ✅
                </button>
              </div>
            ))}
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '40px',
            color: '#66ccff',
            fontSize: '18px',
            opacity: 0.8
          }}>
            <p>💡 Complete daily quests to increase your hunter rank and unlock new abilities!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quest;
