var mysql = require('mysql')

var db = {
	connect: () => {
		var conn = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'zk5687',
			database: 'pretzel',
			port: 3306
		});
		return conn;
	}
}
module.exports = db;