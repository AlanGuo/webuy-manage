var mysql = require('mysql');

var mysqlConnection = {
  host     : '58.96.185.53',
  user     : 'root',
  password : 'Siemenlon123'
};

var connection = {
	pool:null,
	init:function(){
		this.pool = mysql.createPool(mysqlConnection);
	}
};

module.exports = connection;