# Importing the necessary modules 
import bcrypt
from Database.database import DatabaseManager
from flask import jsonify, request, Blueprint 

# Creating the login route blueprint 
login = Blueprint("login", __name__)

# Creating an instance of the database class 
db = DatabaseManager() 

# Creating the route for the login route 
@login.route("/", methods=["POST"])
def loginPage(): 
    # Getting the user login data 
    userData = request.get_json() 

    # Getting the individual data 
    email = userData["email"]
    password = userData["password"]

    # Connecting to the database 
    db.connectToDb() 

    # Checking to see if the user is already on the database 
    userData = db.getUserDataForLogin(email) 

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

        print(condition) 


        return jsonify({
            "test": "User"
        })

    # # Checking the contents of the user data 
    # if (userData["exists"]): 
    #     # Execute the block of code if the user data exists 
    #     print(userData) 