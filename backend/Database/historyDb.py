# Creating a history database class 
class HistoryDatabase: 
    # init method to load the db object 
    def __init__(self, db): 
        # load the db object 
        self.db = db 

    # Creating a method for getting the history data 
    def getUserHistory(self, email): 
        # Creating the sql statement 
        sqlStatement = """SELECT id, imageData, timestamp, interpretation, duration FROM history WHERE email = %s;"""

        # Using try catch block to make the connection 
        try:
            # checking if the database is connected 
            if self.db.cursor: 
                # Execute the sql statement 
                self.db.cursor.execute(sqlStatement, (email,))

                # Fetch all the data 
                historyData = self.db.cursor.fetchall()

                # Reversing the data to make the most recent on top of the 
                # Display 
                historyData.reverse()  

                # Checking if the history data in not empty 
                if (historyData): 
                    # if the history data is not empyt, execute the block 
                    # of code below 
                    responseData = {
                        "status": "success", 
                        "exists": True, 
                        "message": "History data found!", 
                        "data": historyData
                    }

                    # Returning the history data 
                    return responseData
                
                # else if the history data is empty, execute the block of code below 
                else: 
                    # Create the response data 
                    responseData = {
                        "status": "error", 
                        "exists": False, 
                        "message": "History data not found!"
                    }

                    # Returning the history data response 
                    return responseData

            # Else if there was an error connecting to the database, 
            # Execute this block of code 
            else: 
                # Creating the response data 
                responseData = {
                    "status": "error", 
                    "message": "Database not connected!", 
                    "connection": False 
                }

                # Sending the response data 
                return responseData 

        # On error generated, display the error to the console 
        except Exception as error: 
            # Display the error to the console 
            print(f"[Error]: {error}")

            # Rollback the database operation in case of error, to keep 
            # the database in consistent state 
            if self.db.conn: 
                self.db.conn.rollback()

            # Returning the error message 
            responseData = {
                "connection": False, 
                "status": "error", 
                "message": str(error)
            }

            # Returning the error message 
            return responseData 
    