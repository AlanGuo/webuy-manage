var connection = require('./connection'),
	util = require('./util'),
	mysql = require('mysql'),
	qs = require('querystring');

var product ={
	'get':function(pathname, request, response, config){
		if(/get/i.test(request.method)){
			var query = qs.parse(request.parsedUrl.query);
			connection.pool.getConnection(function(err, connection){
				if(err){
					console.log(err);
					util.jsonRespond(response,{
						code:501,
						data:{},
						msg:'get connection failed'
					},{
						status:500
					});
				}
				else{
					var comlumns = [
						'product_serial',
						'product_name',
						'product_type',
						'product_image',
						'product_price',
						'product_count',
						'product_timeleft',
						'product_onthecourt',
						'product_oncourtdate'
					];
					var sql = mysql.format('select ?? from webuy.product where product_onthecourt=?',[comlumns,query.onthecourt]);
					connection.query(sql,function(err, rows){
						connection.release();
						if(!err){
							util.jsonRespond(response,{
								code:0,
								data:{product:rows},
								msg:''
							});
						}
						else{
							console.log(err);
							util.jsonRespond(response,{
								code:502,
								data:{},
								msg:'query product failed'
							},{
								status:500
							});
						}
					});
				}
			});
		}
		else{
			util.jsonRespond(response,{
				code:405,
				data:{},
				msg:'method not allowed'
			},{
				status:405
			});
		}
	},
	'add':function(pathname, request, response, config){

	},
	'delete':function(pathname, request, response, config){

	},
	'modify':function(pathname, request, response, config){

	}
};

module.exports = product;