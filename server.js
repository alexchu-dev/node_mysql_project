const mysql = require("mysql2")
require("dotenv").config()
const env = process.env

const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})

// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL server: " + err.stack)
    return
  }

  console.log("Connected to MySQL server")

  // Create database
  const databaseName = "dev"
  connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err) => {
    if (err) {
      console.error("Error creating database: " + err.stack)
      return
    }
    console.log("Database created successfully or already exists")

    // Switch to the created database
    connection.changeUser({ database: databaseName }, (err) => {
      if (err) {
        console.error("Error switching to the database: " + err.stack)
        return
      }

      // Create table
      const tableName = "student"
      const sqlCreateTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
                student_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                gpa DECIMAL(3,2) NOT NULL
            )`

      connection.query(sqlCreateTable, (err) => {
        if (err) {
          console.error("Error creating table: " + err.stack)
          return
        }
        console.log("Table created successfully or already exists")

        // Close connection
        connection.end((err) => {
          if (err) {
            console.error("Error closing connection: " + err.stack)
            return
          }
          console.log("Connection closed")
        })
      })
    })
  })
})
