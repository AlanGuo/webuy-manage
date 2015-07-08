var connection = require('./connection'),
	util = require('./util'),
	mysql = require('mysql'),
	qs = require('querystring');

var product ={
	'get':function(pathname, request, response, config){
		if(/get/i.test(request.method)){
			var query = qs.parse(request.parsedUrl.query),
				expiredQuery = '';
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
						'pt_name',
						'product_image',
						'product_price',
						'product_count',
						'product_timeleft',
						'product_onthecourt',
						'product_oncourtdate'
					];
					if(query.expired*1){
						query.onthecourt = 1;
						expiredQuery = 'and DATEDIFF(now(),product_oncourtdate)>product_timeleft';
					}
					var sql = mysql.format('select ?? from webuy.product join webuy.producttype where product_onthecourt=? '+expiredQuery+' order by product_updatetime limit ?,?',
					[
						comlumns,
						query.onthecourt*1,
						query.begin*1 || 0,
						query.size*1 || 10
					]);
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