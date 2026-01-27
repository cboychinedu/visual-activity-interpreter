# Creating the login database class 
class LoginDatabase:
    # init method to load the db object
    def __init__(self, db):
        # load the db object
        self.db = db

    # Creating a method to get the user data for login password 
    # Check 
    def getUserDataForLogin(self, email): 
        # Creating the sql statement 
        sqlStatement = """SELECT id, fullname, email, password FROM users WHERE email = %s;"""

        # Using try catch block to make connection 
        try: 
            # Checking if the database is connected 
            if self.db.cursor: 
                # Execute the sql statement 
                self.db.cursor.execute(sqlStatement, (email,))

                # Fetch just one data 
                userData = self.db.cursor.fetchone() 

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