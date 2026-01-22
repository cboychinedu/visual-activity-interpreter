import base64
import cv2
import numpy as np
from flask import Flask
from flask_socketio import SocketIO, emit
import ollama

app = Flask(__name__)
# Allow CORS for your Vite dev server (usually port 5173)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('video_frame')
def handle_video_frame(data):
    # 1. Decode the base64 string from the frontend
    header, encoded = data.split(",", 1)
    nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 2. Process with Ollama (e.g., LLaVA or Bakllava)
    # Note: In production, run this in a background thread to avoid blocking the socket
    try:
        # Save frame temporarily or convert to bytes for Ollama
        _, buffer = cv2.imencode('.jpg', frame)
        response = ollama.generate(
            model='llava',
            prompt='What is in this image? Keep it brief.',
            images=[buffer.tobytes()]
        )
        
        # 3. Send the text back to the frontend
        emit('inference_result', {'text': response['response']})
    except Exception as e:
        emit('inference_result', {'text': f"Error: {str(e)}"})

if __name__ == '__main__':
    socketio.run(app, port=5000, debug=True)