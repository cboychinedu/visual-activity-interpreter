import ollama
import base64

# Setting the path to image 
imagePath = "image.jpg"

# Open the image and read it as bytes 
try: 
    # Open with image 
    with open(imagePath, "rb") as f: 
        # Read the image bytes 
        imageBytes = f.read()

        # Using Gemma 3 (4b is the recommended starting point for vision tasks)
        response = ollama.generate(
            model="gemma3", 
            prompt="Describe the main activity or objects in this frame in a very long sentence. Do not ask further question after the analysis.", 
            images=[imageBytes] # Works with bytes, base64 strings, or file paths
        )

        print(response['response'])

# On file not found 
except FileNotFoundError: 
    # Display the error message 
    print(f"Error: the file: {imagePath} was not found.")

# Exception error 
except Exception as e: 
    # Display the error 
    print(f"An error occured: {e}")

