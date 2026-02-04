# Importing the necessary modules 
import os 
import io 
import csv
import json 
import base64
import zipfile
from datetime import datetime 

# Creating a history database class 
class HistoryDatabase: 
    # init method to load the db object 
    def __init__(self, db): 
        # load the db object 
        self.db = db 

        # Ensure a base directory for exports exists 
        self.historyDir = "historyExports"

        # Create a history directory if it dosen't exist 
        if not os.path.exists(self.historyDir): 
            os.makedirs(self.historyDir)

    # Creating a method for getting all the user's history, extract them, 
    # Convert them into a csv, with the image name, and save it as a zip folder inside 
    # the history folder 
    def compileHistoryAsCsv(self, email):
        """
        Extracts user history, creates a CSV, saves images, and zips them 
        """ 
        # Get the data 
        historyResponse = self.getUserHistory(email=email) 

        # if the history response status is errro, return the response 
        if (historyResponse["status"] == "error"): 
            return historyResponse
        
        # Else execute this block of code to extract the history 
        data = historyResponse["data"]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zipFilename = f"history{email}{timestamp}csv.zip"
        zipPath = os.path.join(self.historyDir, zipFilename)

        # Using try catch block to create the zip file 
        try: 
            # Create an in-memory buffer for the zip file 
            zipBuffer = io.BytesIO()

            # Creating the zip file 
            with zipfile.ZipFile(zipBuffer, "a", zipfile.ZIP_DEFLATED, False) as zipFile:
                # Create the CSV content 
                csvBuffer = io.StringIO() 
                csvWriter = csv.writer(csvBuffer)
                csvWriter.writerow(["ID", "Timestamp", "Interpretation", "Duration", "ImageFile"])

                # For entry in the data 
                for entry in data: 
                    # Converting the entry into a dictionary object 
                    entry = dict(entry) 
                
                    # Get the entry values 
                    # (['id', 'imagedata', 'timestamp', 'interpretation', 'duration'])
                    hid, imageData, timeVal, interpretation, duration = entry.values()
                    imageName = f"image{hid}.jpg"

                    # Add row to the CSV 
                    csvWriter.writerow([hid, timeVal, interpretation, duration,imageName])

                    # Process and add Image to zip 
                    try:
                        # Assuming imageData is base64 string 
                        header, encoded = imageData.split(",", 1) if "," in imageData else (None, imageData)
                        binaryImg = base64.b64decode(encoded)
                        zipFile.writestr(f"images/{imageName}", binaryImg)

                    # On exception, execute the block of code below 
                    except Exception as error:
                        # Display an error message 
                        print(f"Failed to process the image {hid}: {error}")

                # Adding the csv file to zip 
                zipFile.writestr("historyData.csv", csvBuffer.getvalue())

            # Save the buffer to a files 
            with open(zipPath, "wb") as f: 
                # Write the buffer to a file 
                f.write(zipBuffer.getvalue())

            # Building the response message 
            responseMessage = {
                "status": "success", 
                "path": zipPath, 
                "message": "CSV History zipped successfully"
            }

            # Returning the success message 
            return responseMessage 

        # On error generated, execute the block of code below 
        except Exception as error:
            # Display the error message  
            print(f"[Export Error]: {error}")

            # Building the response message 
            responseMessage = {
                "status": "error", 
                "message": str(error)
            }

            # Sendingt the response message 
            return responseMessage 
    

    # Creating a method for getting all the user's history data, extract them, 
    # And conver them into a json object, with the image name and file, and save everything in a 
    # zip folder inside the history folder 
    def compileHistoryAsJson(self, email):
        """
        Docstring for compileHistoryAsJson
        
        :Extracts the user history, create a JSON file, saves images, and zips them
        """
        historyResponse = self.getUserHistory(email=email)

        # if the history response was an error, execute the block of code below 
        if (historyResponse["status"] == "error"): 
            return historyResponse
        
        # Else execute the block of code below 
        data = historyResponse["data"]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zipFilename = f"history{email}{timestamp}json.zip"
        zipPath = os.path.join(self.historyDir, zipFilename)

        # Using try except block to zip the json object 
        try: 
            # Creating the zip buffer object 
            zipBuffer = io.BytesIO()
            jsonList = []

            # Load the zip file 
            with zipfile.ZipFile(zipBuffer, "a", zipfile.ZIP_DEFLATED, False) as zipFile: 
                # Load the entry 
                for entry in data: 
                    # Convert the entry into a dictionary 
                    entry = dict(entry)

                    # Extract all the value for each entry 
                    hid, imageData, timeVal, interpretation, duration = entry.values() 
                    imageName = f"image{hid}.jpg"

                    # Build the JSON object for this entry 
                    jsonList.append({
                        "id": hid, 
                        "timestamp": timeVal, 
                        "interpretation": interpretation, 
                        "duration": duration, 
                        "imageFile": imageName
                    })

                    # Adding the image into the zip file 
                    try: 
                        # Get the header, and the encoded data for the image 
                        header, encoded = imageData.split(",", 1) if "," in imageData else (None, imageData)
                        binaryImg = base64.b64decode(encoded)
                        zipFile.writestr(f"images/{imageName}", binaryImg)

                    # Except error execute the block of code below 
                    except Exception as error:
                        # Display the error message 
                        print(f"Image error {hid}: {error}")

                # Add the JSON file to zip 
                zipFile.writestr("historyData.json", json.dumps(jsonList, indent=4))

            # Saving the zip file to disk 
            with open(zipPath, "wb") as f: 
                f.write(zipBuffer.getvalue()) 

            # Build the success message 
            responseMessage = {
                "status": "success", 
                "path": zipPath, 
                "message": "JSON History zipped successfully"
            }

            # Sending the response message 
            return responseMessage

        # On error encountered, execute the block of code below 
        except Exception as error: 
            # Building the response message 
            responseMessage = {
                "status": "error", 
                "message": str(error)
            }

            # Sending the response message 
            return responseMessage


    # Creating a method for deleting the history data 
    def deleteUserHistory(self, id): 
        # Creating the sql statement 
        sqlStatement = "DELETE FROM history WHERE id = %s;"

        # Using try catch block to make the connection 
        try: 
            # Checking if the database is connection 
            if self.db.cursor: 
                # Execute the sql statement 
                self.db.cursor.execute(sqlStatement, (id,))

                # Commiting the changes to the database 
                if self.db.conn: 
                    # Commiting the changes 
                    self.db.conn.commit() 

                # Checking if any row was actually deleted 
                if self.db.cursor.rowcount > 0: 
                    # if the history data was deleted, execute the block of 
                    # code below 
                    responseData = {
                        "status": "success", 
                        "deleted": True, 
                        "message": "History entry deleted successfully!"
                    }

                    # Returning the success response 
                    return responseData
                
                # Else if no row was found with that ID value 
                else: 
                    # Create the response data 
                    responseData = {
                        "status": "error", 
                        "deleted": False, 
                        "message": "History entry not found!"
                    }

                    # Returning the error response  
                    return responseData

            # Else if there was an error connecting to the database, 
            # Execute this block of code 
            else: 
                # Creating the response data 
                responseData = {
                    "status": "error", 
                    "message": "Database not connected!", 
                    "connection": False 
                }

                # Sending the response data 
                return responseData 
            

        # On error generated, display the error to the console
        except Exception as error: 
            # Display the error to the console 
            print(f"[Error]: {error}")

            # Rollaback the database operation in case of error, to keep 
            # the database in consistent state 
            if self.db.conn: 
                # Rollback 
                self.db.conn.rollback() 

            # Returning the error message
            responseData = {
                "connection": False, 
                "status": "error", 
                "message": str(error) 
            }

            # Returning the error message
            return responseData


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
    