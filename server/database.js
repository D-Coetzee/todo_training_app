const sqlite3 = require("sqlite3").verbose();               // Import the sqlite3 library in verbose mode

// connect to tha database , or create it if it foesnt exist) 

const db = new sqlite3.Database("./todos.db", (err) => {    // Callback function to handle the result of the database connection
    if (err) {                                              // If there is an error during the connection
        console.error("Database opening Error:", err);      // Log the error message to the console
    } else {
        console.log("database Connected!")                  // If the connection is successful, log a success message to the console
    }
});

// create a todos table if it doesnt exist
                                                            // SQL statement to create the "todos" table if it does not already exist, with the specified columns and data types
db.run(`
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL, 
    completed INTERGER DEFAULT 0,
    createdOnDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    location TEXT,
    weatherCondition TEXT)
    `);

    module.exports = db;    // Export the database connection object for use in other parts of the application