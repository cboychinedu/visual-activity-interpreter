# This route is for displaying the history of the analyzed 
# Video frames and it's interpretation to the user. 

# Importing the necessary modules 
import os 
import jwt 
from Database.database import DatabaseManager
from flask import jsonify, request, Blueprint 

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating the history route blueprint 
history = Blueprint("history", __name__)

# Creating an instance of the database class 
db = DatabaseManager() 

# Creating the first route for retrival 
# of the analyzed video frame 
@history.route("/", methods=["GET"])
def getHistory():
    # Getting the headers 
    userToken = request.headers['userToken']

    # Decoding the user token and check if the user is logged in 
    # Using try except block to decode the token 
    try: 
        # Decode the token 
        decodedToken = jwt.decode(
            userToken, 
            key=secretKey, 
            algorithms="HS256"
        )

        # Ensuring that it's only logged in users that have the ability to 
        # Access the database 
        if (decodedToken["isLoggedIn"]): 
            # Connect to the data base 
            db.connectToDb()

            # extract the history data based on the decoded email values
            historyResponse = db.getUserHistory(
                email=decodedToken["email"]
            ) 

            # if the history Response is success, execute the block 
            # of code below 
            if (historyResponse["exists"]):
                # Send the data to the client 
                return jsonify(historyResponse)
            
            # if the response data resulted in an error, execute the 
            # block of code below 
            elif (historyResponse["status"] == "error"):
                return jsonify(historyResponse)
            
            # Else if there was an error generated, execute the 
            # block of code below 
            else: 
                # Convert the response into a json object before sending it 
                # to the client
                return jsonify(historyResponse) 


        # Else if the the user is not logged in, execute this block 
        # of code below
        else: 
            # Build the response message 
            responseMessage = {
                "status": "info", 
                "message": "User not logged in", 
                "statusCode": 404
            }

            # Sending the response message 
            return jsonify(responseMessage) 
    
    # On error occured, execute the block of code below 
    except Exception as error: 
        # Display the error message 
        print(f"[Error]: {error}")

        # Build the response message 
        responseMessage = {
            "status": "error", 
            "message": str(error), 
            "statusCode": 500
        }

        # Sending back the error message 
        return jsonify(responseMessage) 


# Creating a route for deleting the history 
@history.route("/delete-history", methods=["DELETE"])
def deleteHistory(): 
    pass 