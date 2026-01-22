import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState("Waiting for inference...");

  useEffect(() => {
    // Listen for results from the backend
    socket.on('inference_result', (data) => {
      setResult(data.text);
    });

    // Setup Camera
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    // Frame capture loop
    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 2000); // Send a frame every 2 seconds to avoid overloading the VLM

    return () => {
      clearInterval(interval);
      socket.off('inference_result');
    };
  }, []);

  const captureAndSendFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert frame to Base64
      const imageData = canvas.toDataURL('image/jpeg', 0.5); // 0.5 quality to save bandwidth
      socket.emit('video_frame', imageData);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>VLM Live Interface</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: '400px', borderRadius: '10px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
        <strong>AI Analysis:</strong> <p>{result}</p>
      </div>
    </div>
  );
}

export default App;