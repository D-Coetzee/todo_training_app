const express = require("express");     // Import the Express library
const cors = require("cors");           // Import the CORS middleware
const db = require("./database");       // Import the database connection from the database.js file

const app = express();                  // Create an instance of the Express application

app.use(cors());                        // cors used for all routes
app.use(express.json());                // Middleware to parse JSON bodies

// get all todos (read)
app.get("/todos",(req, res) => {                                      // Define a route for GET requests to "/todos"
    db.all("SELECT * FROM todos", [], (err, rows) => {                // Execute a SQL query to select all records from the "todos" table, with a callback function to handle the result
        if (err) return res.status(500).json({ error: err.message }); // If there is an error during the query execution, return a 500 status code with the error message in JSON format
        res.json(rows);                                               // If the query is successful, return the retrieved rows as a JSON response
    });
})

// Create a new todo (create)
app.post("/todos", (req, res) => {
    const { title, description, location, weatherCondition } = req.body; // Destructure the title, description, location, and weatherCondition from the request body
    db.run(
        `INSERT INTO todos (title, description,
        location, weatherCondition) VALUES (?, ?, ?, ?)`,                // SQL query to insert a new record into the "todos" table with placeholders for the values
        [title, description, location, weatherCondition],                // Array of values to replace the placeholders in the SQL query
        function (err) {
            if (err) return res.status(500).json({error: err.message});  // return in this line ends the function, if there is an error
            res.json({  id: this.lastID,
                        title: title,
                        description: description,
                        location: location,
                        weatherCondition: weatherCondition,
                        completed: 0}); // If the insertion is successful, return a JSON response with the ID of the newly created todo, along with its contents and completion status
        }
    )
});

// update a todo (update)

app.put("/todos/:id", (req, res) => {
    const { id } = req.params;                                                                                              // Extract the ID of the todo to be updated from the request parameters
    const { title, description, location, weatherCondition, completed } = req.body;                                         // Destructure the updated values from the request body
    db.run(`UPDATE todos SET title = ?, description = ?, location = ?, weatherCondition = ?, completed = ? WHERE id = ?`,   // SQL query to update the specified fields of the todo with the given ID
        [title, description, location, weatherCondition, completed, id],                                                    // Array of values to replace the placeholders in the SQL query, including the ID for the WHERE clause
        function (err) {
            if (err) return res.status(500).json({ error: err.message });                                                   // If there is an error during the update, return a 500 status code with the error message in JSON format
            res.json({  id: this.lastID,
                        title: title,
                        description: description,
                        location: location,
                        weatherCondition: weatherCondition,
                        completed: 0});                                    // If the update is successful, return a JSON response with the ID of the updated todo, along with its title and completed status
        }
    )
});

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {   // SQL query to delete the todo with the specified ID, with a callback function to handle the result
        if (err) return res.status(500).json({ error: err.message }); // If there is an error during the deletion, return a 500 status code with the error message in JSON format
        res.json({ message: "Todo deleted successfully", id: id });           // If the deletion is successful, return a JSON response with a success message and the ID of the deleted todo
    });
});

app.get("/", (req, res) =>{res.send("Todo API is running")}); // Define a route for the root URL

app.listen(5000, () => (console.log("server running on port 5000"))); // Start the server and listen on port 5000
