import  { useState } from 'react';
import { QrReader } from 'react-qr-reader';  
import '../index.css';
 

const Scanner = (onResult:any) => {
 
  const [showDialog, setDiaglog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [precScan, setPrecScan] = useState("");
  const [selected, setSelected] = useState("environment");

  const handleScan = (scanData: string) => {

    if (scanData && scanData) {
      window.location.href = ''
      onResult(scanData);
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };
  return (
    <div>
     
      
      {/* <select onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>Cámara trasera</option>
        <option value={"user"}>Cámara delantera</option>
      </select> */}
      {!showDialog && !processing && (
        <QrReader
           
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result.getText());
            }

            if (!!error) {
              handleError(error);
            }
          } }
          className="qr-reader" constraints={{ facingMode: selected }}        />
      )}
    </div>
  );
};

export default Scanner;
