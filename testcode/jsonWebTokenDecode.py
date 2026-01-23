import jwt
import os

# The JWT token you want to decode
token = "YOUR_JWT_TOKEN_HERE" 

# The secret key used to sign the token (store in environment variables, not hardcoded)
# Example for a symmetric key (HS256)
secret_key = os.environ.get("JWT_SECRET_KEY", "super_secret_key") 

# The algorithm used for signing
algorithm = "HS256"

try:
    decoded_payload = jwt.decode(
        token, 
        key=secret_key, 
        algorithms=[algorithm],
        # PyJWT automatically validates standard claims like 'exp' (expiration)
        # You can also add 'audience' and 'issuer' validation:
        # audience="my_app_audience", 
        # issuer="api.example.com"
    )
    print("Decoded Payload:", decoded_payload)

except jwt.ExpiredSignatureError:
    print("Error: The token has expired.")
except jwt.InvalidIssuerError:
    print("Error: Invalid issuer.")
except jwt.InvalidAudienceError:
    print("Error: Invalid audience.")
except jwt.exceptions.DecodeError as e:
    print(f"Error: Invalid token - {e}")
