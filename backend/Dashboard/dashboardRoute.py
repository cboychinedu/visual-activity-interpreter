# Importing the necessary modules 
import os 
import logging 
from datetime import timedelta 
from flask import jsonify, request, Blueprint 

# Creating the dashboard blueprint 
dashboard = Blueprint("dashboard", __name__) 

# Creating the route for the dashboard to get the user name
@dashboard.route("/", methods=["POST"])
def getUserDetails(): 
    pass 

# Creating a route for the dashboard to perform the VLM analysis 
@dashboard.route("/perform-analysis", methods=["POST"])
def performAnalysis(): 
    pass 