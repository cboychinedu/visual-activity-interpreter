# Importing the necessary modules 
import psycopg2

# Creating the connection 
conn = psycopg2.connect(
        host="localhost", dbname="postgres", 
        password="", port=5432
)

# Creating the cursor 
cursor = conn.cursor()

# Executing a statement 
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
            fullname VARCHAR(255) NOT NULL, 
            email VARCHAR(255) UNIQUE NOT NULL, 
            password VARCHAR(255) NOT NULL
        ); 
""")

# Commiting the connections 
conn.commit() 
cursor.close() 
conn.close() 