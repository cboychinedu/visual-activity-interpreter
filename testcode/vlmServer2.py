import base64
import cv2
import numpy as np
import ollama
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
# Set cors_allowed_origins to match your Vite dev server port
socketio = SocketIO(app, cors_allowed_origins="*")

def process_and_analyze(image_bytes):
    """
    Handles the heavy lifting of VLM inference in a background task
    to keep the WebSocket connection responsive.
    """
    try:
        # Perform inference using Ollama
        # Model 'llava' is common for vision tasks
        response = ollama.generate(
            model='llava',
            prompt='Describe the main activity or objects in this frame in one short sentence.',
            images=[image_bytes]
        )
        
        description = response.get('response', 'No interpretation available.')
        
        # Emit the result back to the frontend
        # The frontend is listening for 'inferenceResult'
        socketio.emit('inferenceResult', {'text': description})
        print(f"Inference complete: {description}")

    except Exception as e:
        print(f"Error during inference: {e}")
        socketio.emit('inferenceResult', {'text': "Error processing frame."})

@socketio.on('connect')
def handle_connect():
    print("✅ Client connected to Socket!")

@socketio.on('disconnect')
def handle_disconnect():
    print("❌ Client disconnected")

@socketio.on('videoFrame')
def handle_video_frame(data):
    """
    Receives the base64 encoded image from the React frontend.
    """
    try:
        # 1. Remove the metadata header (data:image/jpeg;base64,)
        header, encoded = data.split(",", 1)
        image_bytes = base64.b64decode(encoded)

        # 2. Process inference in a background task (non-blocking)
        socketio.start_background_task(process_and_analyze, image_bytes)

    except Exception as e:
        print(f"Data processing error: {e}")

if __name__ == '__main__':
    # Using eventlet for better performance with WebSockets
    # Ensure you have 'pip install eventlet'
    socketio.run(app, port=5000, debug=True)