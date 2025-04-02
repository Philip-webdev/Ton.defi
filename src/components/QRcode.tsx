import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

interface QRScannerProps {
  onRender: (decodedText: any) => void;
}
function onScanSuccess(decodedText: any) {
 
  return {decodedText}
}

  
export default function QRScanner({ onRender }: QRScannerProps) {
      useEffect(() => {
            const scanner = new Html5QrcodeScanner("reader", {
              fps: 10,
                 qrbox: { width: 900, height: 300 },  aspectRatio:1.777778,   
            }, false); //  'verbose' argument as false

            scanner.render(
                  (decodedText) => {
                  onRender(decodedText); // Pass the decoded text to the onRender prop
                  },
                      (error) => console.warn(error)
            );

                return () => {
                      scanner.clear().catch(console.error);
                };
              });

                                  return( <div   style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "75vh", // Full viewport height
                                    width: "75vh", // Full viewport width
                                    backgroundColor: "white",
                                    borderRadius: "17px",
                                  }} id="reader"></div>
                                );
                            };

 