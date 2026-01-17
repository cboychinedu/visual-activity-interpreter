# Importing the necessary modules 
import os 
import logging 
from datetime import timedelta 
from flask import jsonify, request, Blueprint

# Creating the register route blueprint 
register = Blueprint("register", __name__) 

# Creating a route for the register page 
@register.route("/", methods=["POST"])
def registerPage(): 
    pass 