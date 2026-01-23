# Importing the necessary modules 
import os 
import logging 
from datetime import timedelta 
from Socket.socket import socketio
from flask import jsonify, request, Blueprint 
from MachineLearning.analyzeImage import MachineLearning

# Creating the dashboard blueprint 
dashboard = Blueprint("dashboard", __name__) 

# Creating an instance of the machine learning class 
mlClass = MachineLearning() 

# Displaying a message if the user is connected
@socketio.on("connect")
def handleConnect(): 
    # Display the connection message 
    print("[INFO]: Client connected to socket!")

# Displaying a message if the user is disconnected 
@socketio.on("disconnect")
def handleDisconnect(): 
    # Display the disconnect message 
    print("[INFO]: Client disconnected!")


# Getting the video frame 
@socketio.on('videoFrame')
def performAnalysis(data):
    # Using the ml class to perform analysis on the image 
    imageAnalysisResult = mlClass.encodeImageData(data)

    # Checking the results 
    if (imageAnalysisResult["status"] == "success"): 
        # Emit the inference result 
        socketio.emit("inferenceResult", {"text": imageAnalysisResult["response"]})

    # Else if the results resulted in an error 
    else: 
        # Emit the error result 
        socketio.emit("inferenceResult", {"text": imageAnalysisResult["message"]})