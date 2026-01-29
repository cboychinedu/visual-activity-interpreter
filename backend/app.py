# importing the necessary modules 
import os 
import logging 
from flask_cors import CORS 
from datetime import timedelta
from Socket.socket import socketio
from dotenv import load_dotenv, find_dotenv
from logFormatter.logFormatter import YellowConsoleFormatter
from flask import Flask, url_for, session, request, redirect 

# Importing the necessary routes 
from Login.loginRoute import login 
from History.historyRoute import history
from Dashboard.dashboardRoute import dashboard
from Register.registerRoute import register 

# Loading the environment variables 
load_dotenv(find_dotenv(), verbose=True) 

# Creating the flask application 
app = Flask(__name__, static_folder=None, template_folder=None) 
app.url_map.strict_slashes = False 
app.config["TEMPLATES_AUTO_RELOAD"] = True 
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = os.getenv("SECRET_KEY")
app.permanent_session_lifetime = timedelta(days=10)

# Enable CORS configuration 
CORS(app)

# Allowing cross origin for socket 
socketio.init_app(app, cors_allowed_origins="*")

# Set up the path to the logs directory and file
logsDir = os.path.join("Logs")
logFilePath = os.path.join(logsDir, "requests.log")
os.makedirs(logsDir, exist_ok=True) 

# Set up logging to both file and console
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Clear existing handlers to prevent duplicate messages
if logger.hasHandlers():
    logger.handlers.clear()

# File handler for loggin 
fileHandler = logging.FileHandler(logFilePath)
fileHandler.setLevel(logging.DEBUG)
fileFormatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)

# Set the file handler format
fileHandler.setFormatter(fileFormatter)

# Console handler
consoleHandler = logging.StreamHandler()
consoleHandler.setLevel(logging.DEBUG)

# Apply the green formatter to the console handler 
consoleHandler.setFormatter(YellowConsoleFormatter())

# Add handlers to the logger
logger.addHandler(fileHandler)
logger.addHandler(consoleHandler)

# Middleware to log every request
@app.before_request
def logRequestInfo():
    logger.info(f"Request: {request.method} {request.path} - IP: {request.remote_addr}")

@app.before_request
def clear_trailing():
    rp = request.path 
    if rp != '/' and rp.endswith('/'):
        return redirect(rp[:-1])

# Adding the session configurations
@app.before_request
def make_session_permanent():
    # Setting the server message
    session.permanent = True
    app.permanent_session_lifetime = timedelta(hours=45)


# Creating a function called dated url for tracking the changes made
def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

# Adding functions for updating the web application on reload
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for) 

# Registering the blueprint 
app.register_blueprint(login, url_prefix="/login")
app.register_blueprint(history, url_prefix="/history")
app.register_blueprint(register, url_prefix="/register")
app.register_blueprint(dashboard, url_prefix="/dashboard")

# Running the backend server 
if __name__ == "__main__": 
    # app.run(host="0.0.0.0", port="3001", debug=True)
    socketio.run(app, host="0.0.0.0", port="3001", debug=True)
