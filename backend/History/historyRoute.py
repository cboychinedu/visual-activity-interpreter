# This route is for displaying the history of the analyzed 
# Video frames and it's interpretation to the user. 

# Importing the necessary modules 
import os 
import jwt 
from Database import DatabaseConnection, HistoryDatabase
from flask import jsonify, request, Blueprint, send_from_directory

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating the history route blueprint 
history = Blueprint("history", __name__)

# Creating an instance of the database class 
db = DatabaseConnection() 

# Connect to the data base 
db.connect()

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
            # Creating an instance of the history database class 
            historyDb = HistoryDatabase(db)

            # extract the history data based on the decoded email values
            historyResponse = historyDb.getUserHistory(
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
    # Getting the headers 
    userToken = request.headers["userToken"]

    # Getting the user login data 
    userData = request.get_json()

    # Decoding the user token and check if the user is logged in 
    # Using try except block to decode the token 
    try: 
        # Decode the token 
        decodedToken = jwt.decode(
            userToken, 
            key=secretKey, 
            algorithms="HS256"
        )

        # Ensuring that it's only logged in users that have the ability to 
        # Access the database
        if (decodedToken["isLoggedIn"]): 
            # Creating an instance of the history databadse class 
            historyDb = HistoryDatabase(db) 

            # Deleting the user history by specifying an id value 
            historyResponse = historyDb.deleteUserHistory(
                id=userData["id"]
            )

            # Returning the response 
            return jsonify(historyResponse)

    except Exception as error:
        # Building the error message 
        responseMessage = {
            "status": "error", 
            "message": str(error), 
            "statusCode": 500
        } 

        # Returning the error message 
        return responseMessage 
    
# Creating a route for downloading the history data 
@history.route("/download-history/<dataType>", methods=['GET'])
def downloadHistory(dataType): 
    # Getting the request headers 
    userToken = request.headers["userToken"]

    # Decoding the user token and check if the user is logged in 
    # Using try except block to decode the token 
    try: 
        # Decode the token 
        decodedToken = jwt.decode(
            userToken, 
            key=secretKey, 
            algorithms="HS256"
        )

        # Ensuring that it's only logged in users that have the ability to 
        # Access the database 
        if (decodedToken["isLoggedIn"]): 
            # Create an instance of the history database class 
            historyDb = HistoryDatabase(db)

            # Checking the type of data type if its a csv or a json file 
            if (dataType == "csv"): 
                # Execute this block of code if the data to download is a csv file 
                historyResponse = historyDb.compileHistoryAsCsv(
                    email=decodedToken["email"]
                )

                # Extract only the filename from the full path 
                filename = os.path.basename(historyResponse["path"])

                # Checking the status of the history response if it was a success or an error 
                if (historyResponse["status"] == "success"): 
                    # if it was a success, execute this block of code 
                    try: 
                        # Sending the file 
                        return send_from_directory(
                            directory="historyExports", 
                            path=filename, 
                            as_attachment=True
                        )

                    # On error generated 
                    except Exception as error:
                        # Displaying the error message 
                        print(f"[Error]: File not found!, {error}") 

                        # Returning an error message 
                        return jsonify({
                            "status": "error", 
                            "message": "File not found!", 
                            "statusCode": 404
                        })
                    
            # Else if the data type is a json file needed 
            elif (dataType == "json"):
                # Execute this block of code if the data to download is a json file 
                historyResponse = historyDb.compileHistoryAsJson(
                    email=decodedToken["email"]
                )

                # Extract only the filename from the full path 
                filename = os.path.basename(historyResponse["path"])

                # Checking the status of the history response if it was a success 
                # or an error 
                if (historyResponse["status"] == "success"): 
                    # if it was a success, execute this block of code 
                    try: 
                        # Sending the file 
                        return send_from_directory(
                            directory="historyExports", 
                            path=filename, 
                            as_attachment=True
                        )
                    
                    # On error generated 
                    except Exception as error: 
                        # Displaying the error message 
                        print(f"[Error]: File not found!, {error}")

                        # Returing an error message 
                        return jsonify({
                            "status": "error", 
                            "message": "File not found", 
                            "statusCode": 404 
                        })

            # Else if the route parameter was not a json, or csv, execute the 
            # block of code below 
            else: 
                # Generate the response message 
                requestResponse = {
                    "status": "error", 
                    "message": "Invalid route parameter", 
                    "statusCode": 404
                }

                # Sending back the request 
                return jsonify(requestResponse)

        # Else if the value is not true, execute this block of code 
        # below 
        else: 
            # Generate an error response 
            errorResponse = {
                "status": "error", 
                "message": "Invalid token value", 
                "statusCode": 401
            }

            # Sending back the request
            return jsonify(errorResponse)


    # Except exception as error 
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