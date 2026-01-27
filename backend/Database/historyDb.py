class HistoryDatabase:

    def __init__(self, db):
        self.db = db

    def getUserHistory(self, email):

        sql = """
        SELECT id, imageData, timestamp, interpretation, duration
        FROM history
        WHERE email = %s
        ORDER BY id DESC;
        """

        try:
            if self.db.cursor:

                self.db.cursor.execute(sql, (email,))
                historyData = self.db.cursor.fetchall()

                if historyData:
                    return {
                        "status": "success",
                        "exists": True,
                        "data": historyData
                    }

                return {
                    "status": "error",
                    "exists": False,
                    "message": "History data not found"
                }

            return {
                "status": "error",
                "connection": False,
                "message": "Database not connected"
            }

        except Exception as error:
            print(error)

            if self.db.conn:
                self.db.conn.rollback()

            return {
                "status": "error",
                "message": str(error)
            }


    def insertAnalyzedData(self, imageData, email, timestamp, interpretation, duration):

        sql = """
        INSERT INTO history (imageData, email, timestamp, interpretation, duration)
        VALUES (%s, %s, %s, %s, %s);
        """

        try:
            if self.db.cursor:

                self.db.cursor.execute(sql, (imageData, email, timestamp, interpretation, duration))
                self.db.conn.commit()

                return {
                    "status": "success",
                    "message": "Analyzed data saved"
                }

            return {
                "status": "error",
                "message": "Database not connected"
            }

        except Exception as error:
            print(error)

            if self.db.conn:
                self.db.conn.rollback()

            return {
                "status": "error",
                "message": str(error)
            }
