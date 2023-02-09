const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'todolist'
})
 
const conex = connection.connect();

module.exports = {connection, conex};