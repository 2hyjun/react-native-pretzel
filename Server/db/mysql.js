var mysql = require('mysql')
var pool = null;
exports.connect = () => {
	pool = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: 'zk5687',
		database: 'pretzel',
		port: 3306
	});
	console.log('pool connected')
	//console.log(pool)
}

exports.get = () => {
	return pool;
}