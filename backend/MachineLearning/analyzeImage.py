# Importing the necessary modules 
import ollama 
import base64 

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
                model="gemma3", 
                prompt="Describe the main activity or objects in this frame in a very long sentence. Do not ask further question after the analysis.", 
                images=[imageBytes]
            )

            # Getting the description 
            description = response.get("response", "No interpretation available.")

            # Save the response into the postgres database 
            #########
            #########ß
            # Inference save to the database 

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