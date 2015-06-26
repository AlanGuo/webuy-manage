var ccap = require('ccap');
var crypto = require('crypto');
var mysql = require('mysql');
var qs = require('querystring');
var shortid = require('shortid');

var mysqlConnection = {
  host     : '58.96.185.53',
  user     : 'root',
  password : 'Siemenlon123'
};
var connection = null;

connection = mysql.createConnection(mysqlConnection);

var jsonRespond = function(response, json, options){
	options = options || {};

	var defaultResponseHeader = {
		'Content-Type':'application/json;charset=UTF-8'
	};
	for(var p in options){
		defaultResponseHeader[p] = options[p]
	}
	
	response.writeHead(options.status || '200',defaultResponseHeader);
	response.end(json?JSON.stringify(json):'','utf-8');
}


var vercode = '';

var admin = {
	///cgi-bin/admin/signin
	signin:function(pathname, request, response, config){
		
		if(/post/i.test(request.method)){
			var postData = qs.parse(request.body);

			
			connection.connect(function(err) {
			  if (err) {
			    console.error('error connecting: ' + err.stack);
			    return;
			  }
			  console.log('connected as id ' + connection.threadId);
			});


			var searchUser = 'select user_email,user_mobile,user_password from webuy.user where user_type=2 and user_email="'+postData.login+'" or user_mobile="'+postData.login+'"';
			connection.query(searchUser,function(err, rows){
				if(!err){
					if(rows.length){
						if(rows[0].user_password === crypto.createHash('md5').update(postData.userpassword).digest('hex')){
							jsonRespond(response,{
								code:0,
								data:{},
								msg:''
							});
						}
						else{
							jsonRespond(response,{
								code:111,
								data:{},
								msg:'登陆名或密码错误'
							});
						}
					}
					else{
						jsonRespond(response,{
							code:112,
							data:{},
							msg:'登陆名或密码错误'
						});
					}
				}
				else{
					console.log(err);
					jsonRespond(response,{
						code:500,
						data:{},
						msg:'query user failed'
					},{
						status:500
					});
				}
			});

			connection.end();
		}
		else{
			jsonRespond(response,{
				code:405,
				data:{},
				msg:'method not allowed'
			},{
				status:405
			});
		}
	},

	///cgi-bin/account/signup
	signup:function(pathname, request, response, config){
			if(/post/i.test(request.method)){
				var postData = qs.parse(request.body);
				if(vercode === postData.vercode){
					connection = mysql.createConnection(mysqlConnection);
					connection.connect();
					var searchUser = 'select user_mobile,user_email from webuy.user where user_mobile="'+postData.user_mobile+'" or user_email="'+postData.useremail+'"';
					connection.query(searchUser,function(err, rows){
						if(!err){
							if(rows.length){
								if(rows.filter(function(item){
									if(item.user_email === postData.useremail){
										return item;
									}
								}).length){
									jsonRespond(response,{
										code:101,
										data:{},
										msg:'邮箱已存在'
									});
								}
								else if(rows.filter(function(item){
									if(item.user_mobile === postData.user_mobile){
										return item;
									}
								}).length){
									jsonRespond(response,{
										code:102,
										data:{},
										msg:'手机号码已存在'
									});
								}
							}
							else{
								var sql = 'insert into webuy.user (user_name, user_avatar, user_password, user_type, user_mobile, user_createtime, user_logintime, user_email, user_authority)'
										+ ' values ("'
										+'admin_'+shortid.generate()+'",'
										+null+',"'
										+crypto.createHash('md5').update(postData.userpassword).digest('hex')+'",'
										+2+','
										+postData.usermobile+',"'
										+new Date()+'",'
										+null+',"'
										+postData.useremail+'",'+
										0+')';

								connection.query(sql, 
									function(err, rows) {
										if(!err){
											jsonRespond(response,{
												code:0,
												data:{},
												msg:''
											});
										}
										else{
											console.log(err);
											jsonRespond(response,{
												code:500,
												data:{},
												msg:'insert into user failed'
											},{
												status:500
											});
										}
								});
							}
						}else{
							console.log(err);
							jsonRespond(response,{
								code:500,
								data:{},
								msg:'query user_mobile,user_email failed'
							},{
								status:500
							});
						}
				});
				connection.end();
			}else{
				jsonRespond(response,{
					code:401,
					data:{},
					msg:'验证码错误'
				},{
					status:401
				});
			}
		}else{
			jsonRespond(response,{
				code:405,
				data:{},
				msg:'method not allowed'
			},{
				status:405
			});
		}
	}
};


var secure = {
	///cgi-bin/secure/verifycode
	verifycode:function(pathname, request, response, config){
		var captcha = ccap({
			width:100,
			height:35,
			offset:22,
			fontsize:32,
			generate:function(){//Custom the function to generate captcha text
		        //generate captcha text here
		        //return the captcha text
		        var text = (Math.random()*10000).toPrecision(4).replace(/\./,'');
		        return text;
		    }
		});
		var ary = captcha.get();
		
		//ary[0] is captcha's text,ary[1] is captcha picture buffer.
		vercode = ary[0];
		var buffer = ary[1];
		response.writeHead('200',{
			'Content-Type':'image/jpeg'
		});
		response.end(buffer);
	}
};

exports.admin = admin;
exports.secure = secure;