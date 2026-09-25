import { Scanner } from "@yudiel/react-qr-scanner";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#000000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Camera feed */}
      <div style={{
        width: "100%",
        maxWidth: 400,
        aspectRatio: "1 / 1",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
      }}>
        <Scanner
          onScan={(result) => {
            if (result && result.length > 0) {
              const text = result[0].rawValue;
              if (text) {
                // Haptic feedback on mobile
                if (navigator.vibrate) navigator.vibrate(100);
                onScan(text);
              }
            }
          }}
          onError={() => {}}
          styles={{
            container: {
              width: "100%",
              height: "100%",
              background: "transparent",
            },
            video: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 24,
            },
          }}
          components={{
            onOff: false,
            torch: false,
            zoom: false,
            finder: false,
          }}
        />

        {/* Scanning overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
          {/* Corner brackets */}
          <div style={{
            width: 220,
            height: 220,
            position: "relative",
          }}>
            {/* Top-left */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 40, height: 40,
              borderTop: "4px solid #00E676",
              borderLeft: "4px solid #00E676",
              borderTopLeftRadius: 12,
            }} />
            {/* Top-right */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 40, height: 40,
              borderTop: "4px solid #00E676",
              borderRight: "4px solid #00E676",
              borderTopRightRadius: 12,
            }} />
            {/* Bottom-left */}
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              width: 40, height: 40,
              borderBottom: "4px solid #00E676",
              borderLeft: "4px solid #00E676",
              borderBottomLeftRadius: 12,
            }} />
            {/* Bottom-right */}
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 40, height: 40,
              borderBottom: "4px solid #00E676",
              borderRight: "4px solid #00E676",
              borderBottomRightRadius: 12,
            }} />

            {/* Animated scan line */}
            <div style={{
              position: "absolute",
              left: 8,
              right: 8,
              height: 2,
              background: "linear-gradient(90deg, transparent, #00E676, transparent)",
              animation: "scanLineMove 2s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      {/* Instruction text */}
      <div style={{
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: 600,
        marginTop: 24,
        textAlign: "center",
        letterSpacing: "0.3px",
      }}>
        Point camera at QR code
      </div>

      {/* Cancel button */}
      <button
        onClick={onClose}
        style={{
          marginTop: 24,
          padding: "14px 48px",
          borderRadius: 100,
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.1)",
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Sora', sans-serif",
          backdropFilter: "blur(10px)",
        }}
      >
        Cancel
      </button>

      {/* Scan line animation keyframes */}
      <style>{`
        @keyframes scanLineMove {
          0% { top: 8px; }
          50% { top: calc(100% - 10px); }
          100% { top: 8px; }
        }
      `}</style>
    </div>
  );
}
