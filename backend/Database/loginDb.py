class LoginDatabase:

    def __init__(self, db):
        self.db = db


    def getUserForLogin(self, email):

        sql = """
        SELECT id, fullname, email, password
        FROM users
        WHERE email = %s;
        """

        try:
            if self.db.cursor:

                self.db.cursor.execute(sql, (email,))
                userData = self.db.cursor.fetchone()

                if userData:
                    return {
                        "status": "success",
                        "exists": True,
                        "data": userData
                    }

                return {
                    "status": "error",
                    "exists": False,
                    "message": "User not found"
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


    def insertNewUser(self, fullname, email, password):

        sql = """
        INSERT INTO users (fullname, email, password)
        VALUES (%s, %s, %s);
        """

        try:
            if self.db.cursor:

                self.db.cursor.execute(sql, (fullname, email, password))
                self.db.conn.commit()

                return {
                    "status": "success",
                    "message": "User registered"
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
