import { clear } from "console";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface QRScannerProps {
  onRender: (decodedText: any) => void;
}
function onScanSuccess(decodedText: any) {
 
  return {decodedText}
}

  
export default function QRScanner({ onRender }: QRScannerProps) {
  const [signal, setSignal] = useState(false);
const clear = ()=>{
  setSignal(true);
}

      useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
          fps: 10,
          qrbox: { width: 500, height: 300 }, 
          aspectRatio: 1.777778,   
        }, false); // 'verbose' argument as false

        scanner.render(
          (decodedText) => {
          onRender(decodedText); // Pass the decoded text to the onRender prop
          },
              (error) => console.warn(error)
        );

          return () => {
                scanner.clear().catch(console.error);
            };
      }, [{signal}]);
 
      // Ensure the scanner's camera view covers the div and is centered
      useEffect(() => {
        const readerElement = document.getElementById("reader");
        if (readerElement) {
          readerElement.style.position = "relative";
          readerElement.style.overflow = "hidden";
          readerElement.style.display = "flex";
          readerElement.style.justifyContent = "center";
          readerElement.style.alignItems = "center";
        }
      }, []);
     

                                  return( <div onMouseOut={clear} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "60vh", // Full viewport height
                                    width: "50vh", // Full viewport width
                                    backgroundColor: "white",
                                    borderRadius: "17px",
                                  }} id="reader"></div>
                                );
                            };

 