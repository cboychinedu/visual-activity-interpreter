# This route is for displaying the history of the analyzed 
# Video frames and it's interpretation to the user. 

# Importing the necessary modules 
import os 
import jwt 
import datetime 
import logging 
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
@history.route("/get-history", methods=["POST"])
def getHistory(): 
    pass 


# Creating a route for deleting the history 
@history.route("/delete-history", methods=["DELETE"])
def deleteHistory(): 
    pass 