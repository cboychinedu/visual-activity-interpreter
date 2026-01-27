# Creating the register database class 
class RegisterDatabase: 
    # Init method to load the db object
    def __init__(self, db): 
        # load the db object
        self.db = db 

    # Creating a method to get data from the database to 
    # Check if the user is registered 
    def getUserDataForRegistration(self, email):
        # Creating the sql statement 
        sqlStatement = """SELECT id, fullname, email, password FROM users WHERE email = %s;"""

        # Using try catch block to make the connection 
        try: 
            # Checking if the database is connected 
            if self.db.cursor: 
                # Execute the search 
                self.db.cursor.execute(sqlStatement, (email,))

                # Fetch just one data 
                userData = self.db.cursor.fetchone()

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
            if self.db.conn: 
                self.db.conn.rollback()

            # Returning an error message 
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
            if self.db.cursor: 
                # if the database is connected, execute the block of code 
                # below 
                self.db.cursor.execute(sqlStatement, (fullname, email, password))

                # Commit the changes to save the data 
                self.db.conn.commit() 

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
            if self.db.conn: 
                self.db.conn.rollback() 

            # Returning an error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error)
            }

            # Returning the error message 
            return databaseResponse    