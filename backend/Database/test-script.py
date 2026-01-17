import psycopg2

conn = psycopg2.connect(
        host="localhost", dbname="postgres", 
        password="12345", port=5432
    )

# Creating the cursor 
cursor = conn.cursor()

# Executing a statement 
cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY, 
                fullname VARCHAR(255), 
                email VARCHAR(255), 
                password VARCHAR(255), 
            ); 
""")

# Commiting the connections 
conn.commit() 
cursor.close() 
conn.close() 