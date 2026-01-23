# Importing the necessary modules 
import psycopg2 

# Creating the connection 
conn = psycopg2.connect(
    host="localhost", dbname="postgres",
    password="", port=5432
)

# Creating the cursor 
cursor = conn.cursor() 

# Executing the sql statement 
cursor.execute(""" 
        CREATE TABLE IF NOT EXISTS history (
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            imageData VARCHAR(8000) NOT NULL,
            email VARCHAR(255) NOT NULL, 
            timestamp VARCHAR(255) NOT NULL, 
            interpretation VARCHAR(2000) NOT NULL, 
            duration VARCHAR(255) NOT NULL
        ); 
""")

# Commiting the connections 
conn.commit() 
cursor.close() 
conn.close() 

