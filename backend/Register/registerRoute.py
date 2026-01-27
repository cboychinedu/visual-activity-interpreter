# Importing the necessary modules 
import bcrypt
from Database import DatabaseConnection, RegisterDatabase
from flask import jsonify, request, Blueprint

# Creating the register route blueprint 
register = Blueprint("register", __name__) 

# Creating an instance of the database class 
db = DatabaseConnection()

# Connecting to the database 
db.connect()

# Creating a route for the register page 
@register.route("/", methods=["POST"])
def registerPage():
    # Getting the user data 
    userData = request.get_json() 

    # Getting the individual data 
    fullname = userData["fullname"]
    email = userData["email"]
    password = userData["password"]

    # Creating an instance of the register database class 
    registerUsersDb = RegisterDatabase(db)

    # Checking to see if the user is already on the database 
    userData = registerUsersDb.getUserDataForRegistration(email)

    # Checking the contents of the user data 
    if (userData["exists"]): 
        # Execute the block of code if the user data exists 
        responseMessage = {
            "message": "User already exists!", 
            "status": "info", 
            "statusCode": 400
        }

        # Sending back the response message 
        return responseMessage

    # Else if the user is not present on the database, execute the 
    # Block of code below 
    else: 
        # Hashing the user password 
        password = bytes(password.encode('utf-8'))
        passwordHash = bcrypt.hashpw(password, bcrypt.gensalt())

        # Saving the user details into the database 
        responseMessage = registerUsersDb.insertNewUser(
            fullname=fullname, 
            email=email, 
            password=passwordHash
        )

        # Returing the response message 
        return jsonify(responseMessage) 
