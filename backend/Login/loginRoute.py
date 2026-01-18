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
    pass 