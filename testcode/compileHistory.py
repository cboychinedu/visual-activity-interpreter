import os
import csv
import json
import zipfile
import io
import base64
from datetime import datetime

class HistoryDatabase: 
    def __init__(self, db): 
        self.db = db 
        # Ensure a base directory for exports exists
        self.history_dir = "history_exports"
        if not os.path.exists(self.history_dir):
            os.makedirs(self.history_dir)

    def compileHistoryAsCsv(self, email): 
        """
        Extracts user history, creates a CSV, saves images, and zips them.
        """
        # 1. Get the data
        history_response = self.getUserHistory(email)
        if history_response["status"] == "error":
            return history_response

        data = history_response["data"]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zip_filename = f"history_{email}_{timestamp}.zip"
        zip_path = os.path.join(self.history_dir, zip_filename)

        try:
            # Create an in-memory buffer for the zip file
            zip_buffer = io.BytesIO()
            
            with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
                # Create CSV content
                csv_buffer = io.StringIO()
                csv_writer = csv.writer(csv_buffer)
                csv_writer.writerow(['ID', 'Timestamp', 'Interpretation', 'Duration', 'Image_File'])

                for entry in data:
                    hid, img_data, time_val, interpretation, duration = entry
                    image_name = f"image_{hid}.jpg"
                    
                    # Add row to CSV
                    csv_writer.writerow([hid, time_val, interpretation, duration, image_name])
                    
                    # Process and add Image to Zip
                    try:
                        # Assuming imageData is base64 string
                        header, encoded = img_data.split(",", 1) if "," in img_data else (None, img_data)
                        binary_img = base64.b64decode(encoded)
                        zip_file.writestr(f"images/{image_name}", binary_img)
                    except Exception as e:
                        print(f"Failed to process image {hid}: {e}")

                # Add CSV file to Zip
                zip_file.writestr("history_data.csv", csv_buffer.getvalue())

            # Save the buffer to a file
            with open(zip_path, "wb") as f:
                f.write(zip_buffer.getvalue())

            return {"status": "success", "path": zip_path, "message": "CSV History zipped successfully"}

        except Exception as error:
            print(f"[Export Error]: {error}")
            return {"status": "error", "message": str(error)}

    def compileHistoryAsJson(self, email): 
        """
        Extracts user history, creates a JSON, saves images, and zips them.
        """
        history_response = self.getUserHistory(email)
        if history_response["status"] == "error":
            return history_response

        data = history_response["data"]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zip_path = os.path.join(self.history_dir, f"history_json_{email}_{timestamp}.zip")

        try:
            zip_buffer = io.BytesIO()
            json_data = []

            with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
                for entry in data:
                    hid, img_data, time_val, interpretation, duration = entry
                    image_name = f"image_{hid}.jpg"
                    
                    # Metadata for JSON
                    json_data.append({
                        "id": hid,
                        "timestamp": time_val,
                        "interpretation": interpretation,
                        "duration": duration,
                        "image_file": f"images/{image_name}"
                    })

                    # Add Image to Zip
                    try:
                        _, encoded = img_data.split(",", 1) if "," in img_data else (None, img_data)
                        zip_file.writestr(f"images/{image_name}", base64.b64decode(encoded))
                    except: pass

                # Add JSON metadata to Zip
                zip_file.writestr("history_data.json", json.dumps(json_data, indent=4))

            with open(zip_path, "wb") as f:
                f.write(zip_buffer.getvalue())

            return {"status": "success", "path": zip_path, "message": "JSON History zipped successfully"}

        except Exception as error:
            return {"status": "error", "message": str(error)}

    def deleteUserHistory(self, id): 
        sqlStatement = "DELETE FROM history WHERE id = %s;"
        try: 
            if self.db.cursor: 
                self.db.cursor.execute(sqlStatement, (id,))
                if self.db.conn: 
                    self.db.conn.commit() 

                if self.db.cursor.rowcount > 0: 
                    return {"status": "success", "deleted": True, "message": "History entry deleted successfully!"}
                else: 
                    return {"status": "error", "deleted": False, "message": "History entry not found!"}
            else: 
                return {"status": "error", "message": "Database not connected!", "connection": False }
        except Exception as error: 
            print(f"[Error]: {error}")
            if self.db.conn: self.db.conn.rollback() 
            return {"connection": False, "status": "error", "message": str(error)}

    def getUserHistory(self, email): 
        sqlStatement = """SELECT id, imageData, timestamp, interpretation, duration FROM history WHERE email = %s;"""
        try:
            if self.db.cursor: 
                self.db.cursor.execute(sqlStatement, (email,))
                historyData = self.db.cursor.fetchall()
                # Converting list of tuples to list of lists for mutability/reversal
                historyData = [list(row) for row in historyData]
                historyData.reverse()  

                if (historyData): 
                    return {"status": "success", "exists": True, "message": "History data found!", "data": historyData}
                else: 
                    return {"status": "error", "exists": False, "message": "History data not found!"}
            else: 
                return {"status": "error", "message": "Database not connected!", "connection": False }
        except Exception as error: 
            print(f"[Error]: {error}")
            if self.db.conn: self.db.conn.rollback()
            return {"connection": False, "status": "error", "message": str(error)}