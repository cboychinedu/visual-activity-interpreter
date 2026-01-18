# Connect to the database 
$ psql postgres 

# list all database 
$ \l 

# Exit the database(terminal) 
$ \q 

# View data inside the user table 
$ select * from users; 

# View specific columns 
$ select name, email from users; 

# Describe the users table
$ \d users; 

# Delete table 
$ drop table users; 