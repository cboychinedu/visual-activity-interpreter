# Importing the necessary modules 
import os 
import logging 
from datetime import timedelta 
from flask import jsonify, request, Blueprint 

# Creating the dashboard blueprint 
dashboard = Blueprint("dashboard", __name__) 

# Creating the route for the dashboard route 
@dashboard.route("/", methods=["POST"])
def homePage(): 
    pass 