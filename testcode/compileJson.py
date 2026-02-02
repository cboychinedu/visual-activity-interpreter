# Importing the necessary modules 
import os 
import io 
import csv
import json 
import base64
import zipfile
from datetime import datetime 


def compileHistoryAsJson(self, email): 
        """
        Extracts user history, creates a JSON file, saves images, and zips them 
        """ 
        historyResponse = self.getUserHistory(email=email) 

        if (historyResponse["status"] == "error"): 
            return historyResponse
        
        data = historyResponse["data"]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zipFilename = f"history_{email}_{timestamp}_json.zip"
        zipPath = os.path.join(self.historyDir, zipFilename)

        try: 
            zipBuffer = io.BytesIO()
            jsonList = []

            with zipfile.ZipFile(zipBuffer, "a", zipfile.ZIP_DEFLATED, False) as zipFile:
                for entry in data: 
                    entry = dict(entry) 
                    hid, imageData, timeVal, interpretation, duration = entry.values()
                    imageName = f"image{hid}.jpg"

                    # Build JSON object for this entry
                    jsonList.append({
                        "id": hid,
                        "timestamp": timeVal,
                        "interpretation": interpretation,
                        "duration": duration,
                        "imageFile": imageName
                    })

                    # Add Image to zip 
                    try:
                        header, encoded = imageData.split(",", 1) if "," in imageData else (None, imageData)
                        binaryImg = base64.b64decode(encoded)
                        zipFile.writestr(f"images/{imageName}", binaryImg)
                    except Exception as e:
                        print(f"Image error {hid}: {e}")

                # Add the JSON file to zip 
                zipFile.writestr("historyData.json", json.dumps(jsonList, indent=4))

            with open(zipPath, "wb") as f: 
                f.write(zipBuffer.getvalue())

            return {
                "status": "success", 
                "path": zipPath, 
                "message": "JSON History zipped successfully"
            }

        except Exception as error:
            return {"status": "error", "message": str(error)}