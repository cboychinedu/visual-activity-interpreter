# Importing the necessary modules 
import os 
import jwt
from flask import Blueprint
from datetime import datetime 
from Socket.socket import socketio 
from Database.database import DatabaseManager
from MachineLearning.analyzeImage import MachineLearning

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating the dashboard blueprint 
dashboard = Blueprint("dashboard", __name__) 

# Creating an instance of the database class 
db = DatabaseManager() 

# Creating an instance of the machine learning class 
mlClass = MachineLearning() 

# Conneting to the database 
db.connectToDb()

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
def performAnalysis(imageData, userToken):
    # Decode the token and check if the user is logged in
    # Using try except block to decode the token 
    try: 
        # Decode the token 
        decodedToken = jwt.decode(
            userToken,
            key=secretKey, 
            algorithms="HS256" 
        )

        # Ensuring that it's only logged in users that have the ability to 
        # Access the ML model 
        if (decodedToken["isLoggedIn"]): 
            # Using the ml class to perform analysis on the image 
            imageAnalysisResult = mlClass.encodeImageData(imageData)

            # Checking the results 
            if (imageAnalysisResult["status"] == "success"): 
                # Saving the inference result to the database 
                # Getting the timestamp 
                now = datetime.now() 
                timestamp = now.strftime("%H:%M:%S, %B %Y")

                # Getting the email value 
                email = decodedToken["email"]

                # Getting the interpretation 
                interpretation = imageAnalysisResult["response"]

                # Getting the duration 
                duration = imageAnalysisResult["inferenceTime"]

                # Saving the data into the database but first connect 
                # to the database 
                response = db.insertAnalyzedData(
                    imageData=imageData, 
                    email=email, 
                    timestamp=timestamp, 
                    interpretation=interpretation, 
                    duration=duration
                )

                # Checking the response 
                if (response["status"] == "success"):  
                    # Emit the inference result 
                    socketio.emit("inferenceResult", {"text": imageAnalysisResult["response"]})

                # else if the response was not success 
                else: 
                    # Emit the error 
                    print(f"[Error]: {response['message']}")

                    # Emit the error messsage 
                    socketio.emit("inferenceResult", {"text": response["message"]})
                 

            # Else if the results resulted in an error 
            else: 
                # Emit the error result 
                socketio.emit("inferenceResult", {"text": imageAnalysisResult["message"]})

        # Else if the user is not logged in execute this block of code 
        else: 
            # Emit the error result 
            socketio.emit("inferenceResult", {"text": "Invalid user!", "status": "error"})
    
    # On error occured, execute the block of code below 
    except Exception as error: 
        # Display the error message
        print(f"[Error]: {error}") 

        # Emit the error message 
        socketio.emit("inferenceResult", {"text": str(error), "status": "error"})