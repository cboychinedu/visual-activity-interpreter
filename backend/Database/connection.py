# Importing the necessary modules 
import os
import psycopg2
from psycopg2.extras import RealDictCursor

# Creating a class for handling the database connections 
class DatabaseConnection:
    # Init method to load the env variables 
    def __init__(self):
        self.host = "localhost"
        self.port = 5432
        self.dbname = os.getenv("DATABASENAME", "postgres")
        self.password = os.getenv("DATABASE_PASSWORD")

        self.conn = None
        self.cursor = None

    # Creating a method to connect to the database 
    def connect(self):
        # Using try except block to connect to the database
        try:
            # Making the connection to the postgresql database
            self.conn = psycopg2.connect(
                host=self.host,
                dbname=self.dbname,
                password=self.password,
                port=self.port
            )

            # Creating the cursor object 
            self.cursor = self.conn.cursor(cursor_factory=RealDictCursor)


        # Except exception as error, execute the block of code below 
        except Exception as error:
            # Display the error and close the connection 
            print(f"[Error] {error}")

            # Closing up the connection 
            self.close()

    # Creating a method for closing the connection to the database 
    def close(self):
        # Check if the cursor is active 
        if self.cursor and self.conn: 
            # Closing the connection 
            self.cursor.close()  
            self.conn.close()
