# Importing the necessary modules 
import os 
import logging 
from datetime import timedelta 
from flask import jsonify, request, Blueprint 

# Creating the login route blueprint 
login = Blueprint("login", __name__)

# Creating the route for the login route 
@login.route("/", methods=["POST"])
def loginPage(): 
    pass 