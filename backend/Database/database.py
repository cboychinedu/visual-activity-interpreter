# Importing the necessary modules 
import os 
import psycopg2 
from psycopg2.extras import RealDictCursor

# Creating a class for the database connection 
class DatabaseManager: 
    # Creating the init method 
    def __init__(self):
        self.host = "localhost"
        self.port = 5432
        self.dbname = os.getenv("DATABASENAME", "postgres")
        self.password = os.getenv("DATABASE_PASSWORD")

        # Setting the cursor, and conn values to None 
        self.cursor = None 
        self.conn = None 

    # Creating a method for making connection to the postgresql database 
    def connectToDb(self): 
        # Using try catch block to try to connect to the 
        # Database 
        try:
            # Connecting to the database 
            self.conn = psycopg2.connect(
                host=self.host, 
                dbname=self.dbname, 
                password=self.password, 
                port=self.port 
            ) 

            # Creating the cursor object 
            self.cursor = self.conn.cursor(cursor_factory=RealDictCursor)

            # Displaying the success message 
            print(f"[Success]: Database connected!")

        # Except exception as error, execute the block of 
        # code below  
        except Exception as error:
            # Display the error and close the connection 
            print(f"[Error]: {error}") 

            # Close the connection 
            self.close()  

    # Creating a method to get the user data for login password 
    # Check 
    def getUserDataForLogin(self, email): 
        # Creating the sql statement 
        sqlStatement = """SELECT id, fullname, email, password FROM users WHERE email = %s;"""

        # Using try catch block to make connection 
        try: 
            # Checking if the database is connected 
            if self.cursor: 
                # Execute the sql statement 
                self.cursor.execute(sqlStatement, (email,))

                # Fetch just one data 
                userData = self.cursor.fetchone() 

                # Checking if the user data is not empty 
                if (userData): 
                    # if the user data is not empty, execute the block of code below 
                    responseData = {
                        "status": "success", 
                        "exists": True, 
                        "message": "User found!", 
                        "data": userData
                    }

                    # Returning the user data 
                    return responseData
                
                # if the user data is empty, execute the block of code below 
                else: 
                    # Create the response data 
                    responseData = {
                        "status": "error", 
                        "exists": False, 
                        "message": "User not found!"
                    }

                    # Returing the user data 
                    return responseData 

            # Else if there is no connection 
            else: 
                # Creating the response data 
                responseData = {
                    "status": "error", 
                    "message": "Database not connected!", 
                    "connection": False 
                }

                # Sending the response data 
                return responseData
            
        # On error generated, display the error 
        except Exception as error: 
            # Display the error to the console 
            print(f"[Error]: {error}")

            # Rollback in case of error to keep the database in a consistent state 
            if self.conn: 
                self.conn.rollback() 

            # Returning an error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error)
            }

            # Returning the error message 
            return databaseResponse 


    # Creating a method to get data from the database to 
    # Check if the user is registered 
    def getUserDataForRegistration(self, email):
        # Creating the sql statement 
        sqlStatement = """SELECT id, fullname, email, password FROM users WHERE email = %s;"""

        # Using try catch block to make the connection 
        try: 
            # Checking if the database is connected 
            if self.cursor: 
                # Execute the search 
                self.cursor.execute(sqlStatement, (email,))

                # Fetch just one data 
                userData = self.cursor.fetchone()

                # Checking if the user data is not empty 
                if (userData): 
                    # if the user data is not empty, execute 
                    # the block of code below 
                    responseData = {
                        "status": "success", 
                        "exists": True,
                        "message": "User found!",  
                        "data": userData
                    }

                    # Returning the user data 
                    return responseData 
                
                # if the user data is empty, execute the block of 
                # code below 
                else: 
                    # Create a response data 
                    responseData = {
                        "status": "error", 
                        "exists": False, 
                        "message": "User not found!"
                    }

                    # Returning the response data 
                    return responseData 

            # Else if there is no connection 
            else: 
                # Creating the response data 
                responseData = {
                    "status": "error", 
                    "message": "Database not connected!", 
                    "connection": False 
                }

                # Sending the response data 
                return responseData 

        # On error generated, display the error 
        except Exception as error: 
            # Display the error to the console 
            print(f"[Error]: {error}")

            # Rollback in case of error to keep the database in a consistent state 
            if self.conn: 
                self.conn.rollback()

            # Returning an error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error)
            }

            # Returning the error message 
            return databaseResponse  
        
    # Creating a method for inserting the analyzed data 
    def insertAnalyzedData(self, imageData, email, timestamp, interpretation, duration): 
        # Creating the sql statement 
        sqlStatement = """INSERT INTO history (imageData, email, timestamp, interpretation, duration) VALUES (%s, %s, %s, %s, %s);"""

        # Using try except block to save the user's into the database 
        try: 
            # Check if the cursor is active(connected) 
            if self.cursor: 
                # if the database is connected, execute the block of code below 
                self.cursor.execute(sqlStatement, (imageData, email, timestamp, interpretation, duration))

                # Commit the changes to save the data 
                self.conn.commit() 

                # Create an object response 
                databaseResponse = {
                    "connection": True, 
                    "status": "success", 
                    "message": "Analyzed data saved!"
                }

                # Returing the database response 
                return databaseResponse
            
            # Else if the cursor is not connected, execute this block 
            # of code below 
            else: 
                # Create an object response 
                databaseResponse = {
                    "connection": False, 
                    "status": "error", 
                    "message": "Database not connected!"
                }

                # Returning the database error response 
                return databaseResponse


        # On error generated, execute this block of code below 
        except Exception as error: 
            # Display the error 
            print(f"[Error]: {error}")

            # Rollback in case of error to keep the database in consistent state 
            if self.conn: 
                self.conn.rollback() 

            # Returing an error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error) 
            }

            # Returning the error message 
            return databaseResponse

    # Creating a method to insert a user into the database 
    def insertNewUser(self, fullname, email, password): 
        # Creating the sql statement 
        sqlStatement = """INSERT INTO users (fullname, email, password) VALUES (%s, %s, %s);"""

        # Using try except block to save the user's into the database 
        try: 
            # Check if the cursor is active(connected) 
            if self.cursor: 
                # if the database is connected, execute the block of code 
                # below 
                self.cursor.execute(sqlStatement, (fullname, email, password))

                # Commit the changes to save the data 
                self.conn.commit() 

                # Create an object response 
                databaseResponse = {
                    "connection": True, 
                    "status": "success", 
                    "message": "User registered!"
                }

                # Returning the database response 
                return databaseResponse
            
            
            # Else if the cursor is not connected, execute this block 
            # of code below 
            else: 
                # Create an object response 
                databaseResponse = {
                    "connection": False, 
                    "status": "error", 
                    "message": "Database not connected!" 
                }

                # Returning the database error response 
                return databaseResponse 

        # On error generated, execute this block of the code 
        except Exception as error: 
            # Display the error 
            print(f"[Error]: {error}")

            # Rollback in case of error to keep the database in a consistent state 
            if self.conn: 
                self.conn.rollback() 

            # Returning an error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error)
            }

            # Returning the error message 
            return databaseResponse

    # Creating a method for closing the connection to the 
    # database 
    def close(self): 
        # Check if the cursor is active 
        if self.cursor and self.conn: 
            # Closing the connection 
            self.cursor.close()  
            self.conn.close() 
