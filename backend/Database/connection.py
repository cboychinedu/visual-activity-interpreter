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

    def connect(self):
        try:
            self.conn = psycopg2.connect(
                host=self.host,
                dbname=self.dbname,
                password=self.password,
                port=self.port
            )

            self.cursor = self.conn.cursor(cursor_factory=RealDictCursor)

            print("[Success] Database connected")

        except Exception as error:
            print(f"[Error] {error}")
            self.close()

    def close(self):
        if self.cursor:
            self.cursor.close()

        if self.conn:
            self.conn.close()
