# Importing the necessary modules 
import os 
import jwt 
import bcrypt
import datetime 
from flask import jsonify, request, Blueprint 
from Database import DatabaseConnection, LoginDatabase

# Getting the secret key 
secretKey = os.getenv("SECRET_KEY")

# Creating the login route blueprint 
login = Blueprint("login", __name__)

# Creating an instance of the database class 
db = DatabaseConnection() 

# Connecting to the database 
db.connect()

# Creating the route for the login route 
@login.route("/", methods=["POST"])
def loginPage(): 
    # Getting the user login data 
    userData = request.get_json() 

    # Getting the individual data 
    email = userData["email"]
    password = userData["password"] 

    # Creating an instance of the login database class 
    loginUserDb = LoginDatabase(db)

    # Checking to see if the user is already on the database 
    userData = loginUserDb.getUserDataForLogin(email)

    # if the user data exists
    if (userData["exists"]): 
        # Getting the password hash 
        hexString = userData["data"]["password"]
        # Removing the trailing character 
        if hexString.startswith("\\x"): 
            cleanHex = hexString[2:]
        # else, execute the block of code below 
        else: 
            # clean the hex string 
            cleanHex = hexString

        # Converting the hex value into bytes 
        passwordHash = bytes.fromhex(cleanHex)
        password = password.encode("utf-8")

        # Verifying the password hash 
        condition = bcrypt.checkpw(password, passwordHash)

        # Checking the condition if the password verification 
        # is correct 
        if (condition): 
            # Generate a token for the user and send it back 
            # to the client 
            payload = {
                "email": email,
                "fullname": userData["data"]["fullname"],  
                "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=31), 
                "isLoggedIn": True
            }

            # Encoding the payload
            encodedJwt = jwt.encode(
                payload, 
                secretKey, 
                algorithm="HS256"
            )

            # Building the response data 
            responseData = {
                "status": "success", 
                "message": "User logged in successfully!",
                "token": encodedJwt
            }

            # Sending the response 
            return jsonify(responseData); 

        # Else if the user password is not correct 
        else: 
            # Execute this block of code if the user password is not correct 
            # Build the response data 
            responseData = {
                "status": "error", 
                "message": "Invalid email or password!"
            }

            # Sending the response message 
            return jsonify(responseData); 

    # Else if the user data does not exit on the database
    else: 
        # Else if the user's data is not on the database 
        # Build the response data 
        responseData = {
            "status": "error", 
            "message": "Invalid email or password!"
        }

        # Sending the response message 
        return jsonify(responseData); 