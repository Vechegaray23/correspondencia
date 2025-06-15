import React, { useEffect, useRef, useState } from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';
import { Html5Qrcode } from 'html5-qrcode';

export default function EntregarPaquete() {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const html5QrCodeRef = useRef(null);
  const qrRegionId = 'qr-reader';
  const API = import.meta.env.VITE_API_URL + '/api/v1/paquetes';

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
        html5QrCodeRef.current.clear();
      }
    };
  }, []);

  const onScanSuccess = async (decodedText) => {
    setResult(decodedText);
    if (html5QrCodeRef.current) {
      await html5QrCodeRef.current.stop();
      html5QrCodeRef.current.clear();
      setScanning(false);
    }

    try {
      const res = await fetch(`${API}/${decodedText}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'entregado' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al actualizar');
      setMessage(`Paquete #${data.id ?? decodedText} entregado`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const startScanning = async () => {
    if (scanning) return;
    try {
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
      await html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        onScanSuccess,
      );
      setScanning(true);
      setMessage('');
    } catch (err) {
      setMessage('No se pudo acceder a la cámara: ' + err.message);
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
                <p className="mb-4">
                  Presiona <strong>Iniciar</strong> y apunta la cámara al código
                  QR para escanearlo.
                </p>


                {message && (
                  <div className="alert alert-info" role="alert">
                    {message}
                  </div>
                )}

                <div
                  id="qr-reader"
                  className="mb-3"
                  style={{ width: '100%', minHeight: '300px', borderRadius: '0.5rem' }}
                />

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-qr-code-scan" />
                  </span>
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
