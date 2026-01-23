# Importing the necessary modules 
import os 
import cv2 
import ollama 
import base64 
import numpy as np 

# Creating a class for performing the image analysis 
class MachineLearning: 
    # Creating a class for encoding the image data 
    def encodeImageData(self, imageData): 
        header, encoded = imageData.split(",", 1) 
        imageBytes = base64.b64decode(encoded)

        # Using try except block to process the image 
        try: 
            # Perform inference using Ollama 
            # Model 'llava' is common for vision tasks 
            response = ollama.generate(
                model="llava", 
                prompt="Describe the main activity or objects in this frame in a long sentence", 
                images=[imageBytes]
            )

            # Getting the description 
            description = response.get("response", "No interpretation available.")

            # Creating a response object 
            responseData = {
                "status": "success", 
                "response": description
            }

            # Returning the response data 
            return responseData

        # On exeception generated, execute this block of code 
        # Below 
        except Exception as e:
            # Display the error message 
            print("Error: ", str(e)); 

            # Creating the response message 
            responseData = {
                "status": "error", 
                "message": str(e)
            } 

            # Sending the error message 
            return responseData