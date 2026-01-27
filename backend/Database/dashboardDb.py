# Creating the dashboard database class 
class DashboardDatabase: 
    # Init method to load the db object 
    def __init__(self, db):
        # load the db object
        self.db = db 

    # Creating a method for inserting the analyzed data 
    def insertAnalyzedData(self, imageData, email, timestamp, interpretation, duration): 
        # Creating the sql statement 
        sqlStatement = """INSERT INTO history (imageData, email, timestamp, interpretation, duration) VALUES (%s, %s, %s, %s, %s);"""

        # Using try except block to save the user's into the database 
        try: 
            # Check if the cursor is active(connected) 
            if self.db.cursor: 
                # if the database is connected, execute the block of code below 
                self.db.cursor.execute(sqlStatement, (imageData, email, timestamp, interpretation, duration))

                # Commit the changes to save the data 
                self.db.conn.commit() 

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
            if self.db.conn: 
                self.db.conn.rollback() 

            # Returing an error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error) 
            }

            # Returning the error message 
            return databaseResponse