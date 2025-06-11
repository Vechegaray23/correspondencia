import React, { useEffect, useRef, useState } from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';

export default function EntregarPaquete() {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const qrRegionId = 'qr-reader';

  useEffect(() => {
    const scriptId = 'html5-qrcode-lib';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/html5-qrcode@2.3.9/html5-qrcode.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const onScanSuccess = (decodedText) => {
    setResult(decodedText);
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
        setScanning(false);
      });
    }
  };

  const startScanning = async () => {
    try {
      const { Html5Qrcode } = window;
      if (!Html5Qrcode) throw new Error('Biblioteca no cargada');
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
      await html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        onScanSuccess,
      );
      setScanning(true);
    } catch (err) {
      alert('No se pudo acceder a la cámara: ' + err);
    }
  };

  const stopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
        setScanning(false);
        setResult('');
      });
    }
  };

  return (
    <>
      <ConserjeNavbar />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-white">
              <div className="card-body">
                <h3 className="section-header mb-2">Escáner de código QR</h3>
                <p className="mb-4">Apunta la cámara al código QR para escanearlo automáticamente.</p>

                <div id="qr-reader" className="mb-3" style={{ width: '100%', minHeight: '300px', borderRadius: '0.5rem' }} />

                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="bi bi-qr-code-scan" /></span>
                  <input
                    id="qr-result"
                    type="text"
                    className="form-control"
                    placeholder="Resultado del escaneo"
                    value={result}
                    readOnly
                  />
                </div>

                <div className="d-flex gap-3">
                  <button
                    id="btn-start"
                    className="btn btn-primary flex-fill"
                    onClick={startScanning}
                    disabled={scanning}
                  >
                    <i className="bi bi-camera-video" /> Iniciar
                  </button>
                  <button
                    id="btn-stop"
                    className="btn btn-secondary flex-fill"
                    onClick={stopScanning}
                    disabled={!scanning}
                  >
                    <i className="bi bi-stop-circle" /> Detener
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
