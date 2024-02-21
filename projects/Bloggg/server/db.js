import mysql from 'mysql2'

export const db=mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:""
})
// Check if the connection is successful
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process if there is an error connecting to the database
    } else {
        console.log('Connected to MySQL database');
    }
});
