import mysql from 'mysql2';

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ajay@143',
  database: 'employeems',
});

con.connect(function (err) {
  if (err) {
    console.log('connection error');
  } else {
    console.log('Connected');
  }
});

export default con;



