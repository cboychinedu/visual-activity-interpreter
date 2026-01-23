# Importing the necessary modules 
import ollama 
import base64 
import time 

# Creating a class for performing the image analysis 
class MachineLearning: 
    # Creating a class for encoding the image data 
    def encodeImageData(self, imageData): 
        header, encoded = imageData.split(",", 1) 
        imageBytes = base64.b64decode(encoded)

        # Using try except block to process the image 
        try: 
            # 1. Start the timer immediately before the call
            startTime = time.perf_counter()

            # Perform inference using Ollama 
            # Model 'llava' is common for vision tasks 
            response = ollama.generate(
                model="gemma3", 
                prompt="Describe the main activity or objects in this frame in a very long sentence. Do not ask further question after the analysis.", 
                images=[imageBytes]
            )

            # 2. Stop the timer immediately after the response is received
            stopTime = time.perf_counter()

            # 3. Calculate the duration
            duration = stopTime - startTime

            # Getting the description 
            description = response.get("response", "No interpretation available.")

            # Creating a response object 
            responseData = {
                "status": "success", 
                "response": description, 
                "inferenceTime": round(duration, 4)
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