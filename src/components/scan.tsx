import "../App.css";
import '../index.css';
import styled from "styled-components";
import "@twa-dev/sdk";
import { BsCopy } from "react-icons/bs";
import FootNavig from "./footnavig";
import { useState } from 'react';
import QRScanner from "./QRcode";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: inherit;
  font-family: 'Sora', sans-serif;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(33,33,33);
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
  margin: 0;
`;

const AppContainer = styled.div`
  margin: 0;
`;

function Scan() {
  const [showScanner, setShowScanner] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function copy() {
    if (result) {
      navigator.clipboard.writeText(result);
      const alertBox = document.createElement('div');
      alertBox.innerText = "Copied!";
      alertBox.style.position = 'fixed';
      alertBox.style.bottom = '20px';
      alertBox.style.left = '50%';
      alertBox.style.transform = 'translateX(-50%)';
      alertBox.style.backgroundColor = '#4CAF50';
      alertBox.style.color = 'white';
      alertBox.style.padding = '10px 20px';
      alertBox.style.borderRadius = '5px';
      alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
      alertBox.style.fontFamily = "'Sora', sans-serif";
      alertBox.style.zIndex = '1000';
      document.body.appendChild(alertBox);
      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 2000);
    }
  }

  return (
    <StyledApp>
      <AppContainer>
        <h1 style={{ textAlign: "center" }}>Scan</h1>

        {!result ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <button
              onClick={() => setShowScanner(true)}
              style={{
                padding: "16px 32px", borderRadius: 14, border: "none",
                background: "#00E676", color: "#0A0A0A", fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
              }}
            >
              Open Camera
            </button>
          </div>
        ) : (
          <div style={{
            background: "white", borderRadius: 16, padding: 20, margin: "20px 0",
            textAlign: "center", wordBreak: "break-all",
          }}>
            <div id="res" style={{ color: "#333", fontSize: 14 }}>{result}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "center" }}>
              <button onClick={copy} style={{
                padding: "10px 20px", borderRadius: 10, border: "none",
                background: "#00E676", color: "#0A0A0A", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <BsCopy size={14} /> Copy
              </button>
              <button onClick={() => { setResult(null); setShowScanner(true); }} style={{
                padding: "10px 20px", borderRadius: 10, border: "1px solid #ccc",
                background: "transparent", color: "#666", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
              }}>
                Scan Again
              </button>
            </div>
          </div>
        )}

        <br />
        <a href="#/send" style={{ textDecoration: 'none' }}>
          <button style={{
            display: "flex", justifyContent: "center", width: "100%",
            padding: "14px", borderRadius: 14, border: "1px solid #ccc",
            background: "transparent", color: "#666", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "'Sora', sans-serif",
          }}>
            Back to Send
          </button>
        </a>

        <div><FootNavig /></div>
      </AppContainer>

      {showScanner && (
        <QRScanner
          onScan={(text) => {
            setResult(text);
            setShowScanner(false);
          }}
          onClose={() => setShowScanner(false)}
        />
      )}
    </StyledApp>
  );
}

export default Scan;
