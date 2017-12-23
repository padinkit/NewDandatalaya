
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , https = require('http')
  , request= require('request')
  , path = require('path')
  , model = require('./model')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , expressSession = require('express-session')
  , nodemailer = require('nodemailer')
  , xoauth2 = require('xoauth2')
  , config = require('./config');
var fs = require('fs');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'dantalayaindia@gmail.com',
            clientId: '301923149956-kl31jahblpp1pu985k0tmacbfosp2o2p.apps.googleusercontent.com',
            clientSecret: 'aaKoyJ7zKlh6q4HzQ1x_3VEa',
            refreshToken: '1/PLlDbp8EG2zVhiw55d9j99UcTJ3R-u_rR3D0o6XWyu0',
            accessToken: 'ya29.GlshBL6du1gvt6A9bOwXK1HXxgp8cosLBgSlhLfJWYDqIGWQIoChmVn92k85i9-6VugBVqnKzX8YItvN6kT4TU1pSLvvfHcfTH_0wwdginPeuNxBVHJvhSYqAeUs'
        })
    }
});


var app = express();



// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({secret: 'mySecretKey',resave: true,
	saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.use( new LocalStrategy(
  function(username, password, done) {
    // check in mongo if a user with username exists or not
	  model.auth.findOne({ 'username' :  username },
      function(err, user) {
		  if (err) {
              return done(err);
          }
          if (!user) {
              return done(null, false, {alert: 'Incorrect username.'});
          }
          if (user.password != password) {
              return done(null, false, {alert: 'Incorrect password.'});
          }
          if (user.activated == false) {
              return done(null, false, {alert: 'Account Not Yet Activated'});
          }
          if ((user.profile==="doctor" || user.profile==="technician" || user.profile==="surgeon") && user.adminactivated == false) {
              return done(null, false, {alert: 'Account Not Yet Activated By Admin'});
          }
          return done(null, user);
      }
    );
}));

passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});

passport.deserializeUser(function(id, done) {
	model.auth.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get('/', routes.index);
app.get('/partials/:filename', routes.partials);



function sendmail(req ,user,  key, email, profile){
	var extra;
	if(profile !=='patient'){
		extra = 'Once email Verfication is done, await Dantalaya Admin activation to avail all the Sevices.';
	}
	var mailOptions = {
		    from: 'dantalayaindia@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Activation Link', // Subject line
		    html:   "<html>" +
		    	  	"<div> <h2>Dantalaya</h2><p>Click on the Link below to activate your User account</p></div>"+
		      		"<a href='http://" +req.get('host') + "/#/activation?user=" + user + "&key="+ key + "'><b>Activate Your Account</b></a>" +
		      		"<div><p>"+ extra +"</p></div>"+
		      		"<div><p>"+ config.mailText +"</p></div>"+
		      		"</html>" // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}
app.post('/auth/login', passport.authenticate('local'),function(req, res){
    res.json(req.user);
});

app.post('/auth/signup',function(req,res){
	req.body.contactInfo.username = req.body.authInfo.username;
	req.body.authInfo.activated = false;
	req.body.authInfo.adminactivated = false;
	if(req.body.authInfo.profile == 'patient'){
		req.body.authInfo.adminactivated = true;
	}
	req.body.authInfo.email = req.body.contactInfo.email;
	var randomNo = Math.random().toString(36).slice(2);
	req.body.authInfo.key = randomNo;

	var authData = new model.auth(req.body.authInfo);

    var userData =  new model.user({data : req.body.contactInfo});

      model.auth.find({username : req.body.authInfo.username},function(err, list){
    	if(list.length !== 0){
    		res.json({'alert':'userIDError'});
    	}
    	else{
    		authData.save(function(err){
    	        if (err) {
    	            res.json({'alert':'Registration error'});
    	        }else{
    	        	userData.save(function(err){
    	                if (err) {
    	                    res.json({'alert':'Registration error'});
    	                }else{
    	                    res.json({'alert':'Registration success'});
    	                    sendmail(req,req.body.authInfo.username , randomNo , req.body.contactInfo.email , req.body.authInfo.profile);
    	                }
    	            });
    	        }
    	    });
    	}
    });


});

app.post('/payOnline', function(req, res){
	model.user.findOne({ "data.username": req.body.doctorusername},function(err, detailss){
			if (err) {
		           res.send(err);
		        }else{
		        	var values = detailss._doc.data;
		        	    	
		        		var payloadAuthRefreshUser = {
							  'grant_type': 'password',
							  'client_id': config.instamojo.clientid,
							  'client_secret': config.instamojo.clientsecret,
						      'username': values.bank.instamojo.username,
						      'password': 'dantalaya1234'
						  };
		        		
		        		var paymentRequestData =  req.body.data;
		        		paymentRequestData.redirect_url = "http://" +req.get('host') + "/#/updatePayment";
		        		paymentRequestData.partner_fee_type = "percent";
		        		paymentRequestData.partner_fee = config.partner_fee;
		        		
						  
						  request.post('https://api.instamojo.com/oauth2/token/', {form: payloadAuthRefreshUser}, function(error, response, body3){
							  if(!error && response.statusCode !== 400){
								var body3 = JSON.parse(body3);
							    
							    var headersUpdateAccount = {'Authorization' : 'Bearer '+ body3.access_token};
							    
							    request.post('https://api.instamojo.com/v2/payment_requests/', {headers: headersUpdateAccount, form: paymentRequestData}, function(error, response, body4){
									  if(!error && response.statusCode !== 400){
									    res.send({data: body4, username: values.bank.instamojo.username});				
									  }
									  else{
										res.status(400).send(body4);
									  }
								    
								  });
							  }
							  else{
								res.status(400).send(body3);
							  }
						    
						  });
		        	
		        }
		
		});
});


app.post('/checkPayment', function(req, res){
	var headers = { 'X-Api-Key': '5513828b2ef00debcaec7c6e6770e11b', 'X-Auth-Token': '3b0c130bc9eb2ff8c5774dffde376e17'}
	request.get('https://www.instamojo.com/api/1.1/payment-requests/'+req.body.id + '/',{headers: headers}, function(error, response, body){
      if(!error && response.statusCode == 200) {
    	  res.send(body);
    	 }
      else{
    	  res.send(body);
      }
	});
});



app.post('/auth/activate',function(req, res){
	var userData = model.auth.findOne({ 'username' :  req.body.user },
		function(err, user) {
			if(!err){
				if(user.key){
				if(user.key == req.body.key){
					user.activated = true;
					model.auth.update({ 'username' :  req.body.user },{ $unset:{ "key": req.body.key }},function(err){
		    	        if (err) {
		    	           res.send('error');
		    	        }else{
		    	        	res.send('success');
		    	        }
		    	    });
					user.save(function (err) {
					    if (err){
					    	res.status(404).send("failure");
					    }
					    res.send("success");
					  });
				}
				}
				else{
					res.status(404).send("Link already activated");
				}
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});



app.post('/searchuser',function(req, res){
	var userData = model.user.findOne({ 'data.username' :  req.body.user },
		function(err, user) {
			if(!err){
				console.log(user);
				console.log(user.data.events[0]);
				res.send(user);
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});




app.post('/getuserDetails',function(req, res){
	var userData = model.user.findOne({ 'data.username' :  req.body.user },
		function(err, user) {
			if(!err){
				res.send(user);
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});









app.post('/admin/activate',function(req, res){
	var userData = model.auth.findOne({ 'username' :  req.body.user },
		function(err, user) {
			if(!err){
					user.adminactivated = true;
					user.save(function (err) {
					    if (err){
					    	res.status(404).send("failure");
					    }
					    var mailOptions = {
							    from: 'dantalayaindia@gmail.com', // sender address
							    to: user.email, // list of receivers
							    subject: 'Account Activated', // Subject line
							    html:   "<html>" +
							    	  	"<div> <h2>Dantalaya</h2></div>"+
							    	  	"<div><p>Your Account Has been Activated</p></div><br><br>"+
							      		"<div><p>"+ config.doctormailText +"</p></div>"+
							      		"<a href='http://" +req.get('host') + "/'><b>Go To Dantalaya</b></a>" +
							      		"</html>" // html body
						};

						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						        return console.log(error);
						    }
						    console.log('Message sent: ' + info.response);
						});

					    res.send("successfully activated");
					  });
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});

app.post('/admin/reject',function(req, res){
	var userData = model.auth.remove({ 'username' :  req.body.user },
		function(err, user) {
			if(!err){
				var mailOptions = {
					    from: 'dantalayaindia@gmail.com', // sender address
					    to: user.email, // list of receivers
					    subject: 'Account Rejected', // Subject line
					    html:   "<html>" +
					    	  	"<div> <h2>Dantalaya</h2></div>"+
					      		"<div><p>Sorry for the inconvenience. Your Account Has been Rejected</p></div>"+
					      		"<div><p>For any queries  email info@dantalaya.com</p></div>" +
					      		"</html>" // html body
				};

				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        return console.log(error);
				    }
				    console.log('Message sent: ' + info.response);
				});
			    res.send("successfully rejected");
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});

app.get('/getaccounts',function(req, res){
	var userData = model.auth.find({ 'adminactivated' :  false },{username :1 , profile: 1 },
		function(err, user) {
			if(!err){
				res.send(user);
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});

app.post('/getAllAccounts',function(req, res){
	model.user.find({ "data.profile" : { $in: req.body.data } } ,function(err, details){
  		 if (err) {
  	           res.send('error');
  	        }else{
  	        	res.send(details);
  	        }

  	});
})

function sendPasswordmail(req, user, pass, email){
	var mailOptions = {
		    from: 'dantalayaindia@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Account Password', // Subject line
		    html:   "<html>" +
		    	  	"<div> <h2>Dantalaya</h2>" +
		    	  	"<p>Below Are The Respective Username And Password For Your Account</p>" +
		    	  	"<p>Username : <b>"+ user +"</b></p>" +
		    	  	"<p>Password : <b>"+ pass +"</b></p>" +
		    	  	"</div>"+
		      		"<a href='http://" +req.get('host') + "/'><b>Go to Dantalaya Website</b></a>" +
		      		"</html>" // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}



function sendappointmentmail( title, name ,starttime, endtime, email,text,from){
	var mailOptions = {
		    from: 'dantalayaindia@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Appointment mail', // Subject line
		    html:   "<html>" +
		    	  	"<div> <h2>Dantalaya</h2>" +
		    	  	"<p>" +text+ "</p>" +
		    	  	"<p>title : <b>"+ title +"</b></p>" +
		    	  	"<p>" + from +" : <b>"+ name +"</b></p>" +
		    	  	"<p>start time : <b>"+ starttime +"</b></p>" +
		    	  	"<p>end time : <b>"+ endtime +"</b></p>" +
		    	  	"</div>"+
		      		"</html>" // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}

app.post('/auth/forgotPassword',function(req, res){
	var userData = model.auth.findOne({ 'username' :  req.body.username },
		function(err, user) {
			if(!err){
				sendPasswordmail(req , user.username , user.password , user.email);
				res.send('success');
			}
			else{
				res.status(404).send("failure");
			}
	    }
  );
});

app.post('/appointmentmail',function(req,res){
	 if(req.body.origin == 'patient'){
		 var text="Thanks for scheduling an appointment.Your appointment details are mentioned below";
		 var name = req.body.data.patientName;
		 var mail = req.body.data.doctorMail;
		 var from = "Doctor";
	 }

	 else{
		 var name = req.body.data.doctorName;
		 var mail = req.body.data.patientMail;
		 var from = "Patient";
		 if(req.body.status == 'accept'){
			 var text = "Thanks for scheduling an appointment.Your appointment has been accepted by doctor.";
			  }
		 else{
			 var text = "Sorry for the inconvenience.Your appointment has been rejected.Please reschedule it.";
		 }
	 }
	 sendappointmentmail( req.body.data.title , name , req.body.data.start, req.body.data.end , mail,text, from);
		res.send('success');
});



app.post('/searchdetails', function(req, res){

	var type = req.body.userstype;
	var speciality = req.body.speciality;
	var val =  req.body.location;

	if(type !== 'technician' && type !== 'surgeon'){
		model.user.find({$and : [{ $or: [ {"data.cliniccity" : new RegExp(val, 'i') } , {"data.clinicaddress" : new RegExp(val, 'i') },{"data.clinicstate" : new RegExp(val, 'i') },{"data.clinicpin" : new RegExp(val, 'i') } , {"data.specialization" : speciality} ] },{ "data.profile": "doctor" }]},
		  function(err, details) {
		           res.send(details);
		 }).catch(function (err) {
			 res.send(err);
		 });
	}
	else{
		model.user.find({$and : [{ $or: [ {"data.city" : new RegExp(val, 'i') } , {"data.address" : new RegExp(val, 'i') },{"data.state" : new RegExp(val, 'i') },{"data.pin" : new RegExp(val, 'i') } ] },{ "data.profile": type }]},
		  function(err, details) {
		           res.send(details);
		 }).catch(function (err) {
			 res.send(err);
		 });
	}

});

app.post('/searchpatientdetails', function(req, res){
	var email = req.body.email;

	var phone = parseInt(req.body.phone);
	model.user.find({$and : [{$or: [ { "data.email" : email }, { "data.mobile" : phone }]},{ "data.profile": 'patient' }]},

	function(err, user) {

		if(user.length !== 0){
        res.send(user);
		}
		else{
			 res.json({'alert':"Account doesn't exists"});
		 }
	});
});

app.post('/getAllDetailsFromEmail', function(req, res){
	model.user.find({ "data.email" : req.body.email},
	function(err, user) {
		if(user.length !== 0){
			res.send(user);
		}
		else{
			 res.status(400).send(err);
		 }
	});
});

 app.get('/auth/logout', function(req, res){
     console.log('logout');
    req.logout();
    res.send('sucess');
 });
app.get('/privacy', function (req, res) {
	var filePath = "/pdf/privacypolicy.pdf";

	fs.readFile(__dirname + filePath , function (err,data){
		res.contentType("application/pdf");
		res.send(data);
	});
});
app.get('/notice', function (req, res) {
	var filePath = "/pdf/Notice.pdf";

	fs.readFile(__dirname + filePath , function (err,data){
		res.contentType("application/pdf");
		res.send(data);
	});
});



 app.post('/getprofile', function(req, res){
	 console.log(req.body.userid);
	 model.user.findOne({'data.username': req.body.userid},
	 	      function(err, user) {
	                    res.send(user);
	 	      }
	    );
 });

 app.post('/profilesave', function(req, res){
	 console.log(req.body.userid);
	 model.user.findOne({'data.username': req.body.userid},
	 	      function(err, user) {
		 			user.data = req.body.data;

		 			user.save(function(err, thor) {
		 				  if (err) return console.error(err);
		 				  res.send('success');
		 				});
	 	      }
	    );
 });
 
 app.post('/updateBankDetails', function(req, res){

	// var headers = { 'X-Api-Key': config.instamojo.clientid, 'X-Auth-Token': config.instamojo.authtoken}
	 	var bankdata = req.body.bankdata;
	 	
	 	if(req.body.userdata.bank){		    
		    var payloadAuthRefreshUser = {
		    		  'grant_type': 'password',
					  'client_id': config.instamojo.clientid,
					  'client_secret': config.instamojo.clientsecret,
				      'username':req.body.userdata.bank.instamojo.username,
				      'password': 'dantalaya1234'
				  };
				  
				  request.post('https://api.instamojo.com/oauth2/token/', {form: payloadAuthRefreshUser}, function(error, response, body3){
					  if(!error && response.statusCode !== 400){
						var body3 = JSON.parse(body3);
					    var payloadUpdateAccount = {
				    		 'account_holder_name': bankdata.accholdername,
				    	      'account_number': bankdata.bankaccno,
				    	      'ifsc_code': bankdata.ifsccode
						  };
					    
					    var headersUpdateAccount = {'Authorization' : 'Bearer '+ body3.access_token};
					    
					    request.put('https://api.instamojo.com/v2/users/'+ bankdata.instamojo.id +'/inrbankaccount/', {headers: headersUpdateAccount, form: payloadUpdateAccount}, function(error, response, body4){
							  if(!error && response.statusCode !== 400){
							    
								  model.user.findOne({ "data.username": req.body.userid},function(err, detailss){
				    	     			if (err) {
				    	     		           res.send(err);
				    	     		        }else{
				    	     		        	var values = detailss._doc.data;
				    	     		        	values.bank = bankdata;
				    	     		        	model.user.update({ "data.username": req.body.userid},{"data" :values },function(err){
				    	     		    	        if (err) {
				    	     		    	           res.send('error');
				    	     		    	        }else{
				    	     		    	        	res.send('success');
				    	     		    	        }
				    	     		    	    });	
				    	     		        }
				    	     		
				    	     		});
			
							  }
							  else{
								res.status(400).send(body4);
							  }
						    
						  });
					  }
					  else{
						res.status(400).send(body3);
					  }
				    
				  });
	 	}
	 	else{
			var payload = {
				 'grant_type': 'client_credentials',
			     'client_id': config.instamojo.clientid,
			     'client_secret': config.instamojo.clientsecret
			  };
			
			var payloadCreateUser = {
				 'email': req.body.userdata.email,
			     'password': 'dantalaya1234',
			     'phone': req.body.userdata.mobile,
			     'referrer': 'Dantalayaindia',
			  };
			
			
			request.post('https://api.instamojo.com/oauth2/token/', {form: payload}, function(error, response, body){
			  if(!error && response.statusCode !== 400){
				var body = JSON.parse(body);
			    var access_token = body.access_token;
			    var headersCreateUser = { 'Authorization' : 'Bearer '+ access_token};
			    
			    request.post('https://api.instamojo.com/v2/users/', {headers: headersCreateUser ,form: payloadCreateUser}, function(error, response, body1){
			    	if(!error && response.statusCode !== 400){
					  var body1 = JSON.parse(body1);
					  var payloadAuthUser = {
						  'grant_type': 'password',
						  'client_id': config.instamojo.clientid,
						  'client_secret': config.instamojo.clientsecret,
					      'username': body1.username,
					      'password': 'dantalaya1234',
					  };
					  bankdata.instamojo = {};
					  bankdata.instamojo.username = body1.username;
					  bankdata.instamojo.id = body1.id;
					  
					  request.post('https://api.instamojo.com/oauth2/token/', {form: payloadAuthUser}, function(error, response, body2){
						  if(!error && response.statusCode !== 400){
							var body2 = JSON.parse(body2);
						    bankdata.instamojo.access_token = body2.access_token;
						    bankdata.instamojo.refresh_token = body2.refresh_token;
						    
						    var payloadUpdateAccount = {
					    		 'account_holder_name': bankdata.accholdername,
					    	      'account_number': bankdata.bankaccno,
					    	      'ifsc_code': bankdata.ifsccode
							  };
						    
						    var headersUpdateAccount = {'Authorization': 'Bearer '+ body2.access_token};
						    
						    request.put('https://api.instamojo.com/v2/users/'+ bankdata.instamojo.id +'/inrbankaccount/', {headers: headersUpdateAccount, form: payloadUpdateAccount}, function(error, response, body5){
								  if(!error && response.statusCode !== 400){
									  
									  model.user.findOne({ "data.username": req.body.userid},function(err, detailss){
					    	     			if (err) {
					    	     		           res.send(err);
					    	     		        }else{
					    	     		        	var values = detailss._doc.data;
					    	     		        	values.bank = bankdata;
					    	     		        	model.user.update({ "data.username": req.body.userid},{"data" :values },function(err){
					    	     		    	        if (err) {
					    	     		    	           res.send('error');
					    	     		    	        }else{
					    	     		    	        	res.send('success');
					    	     		    	        }
					    	     		    	    });	
					    	     		        }
					    	     		
					    	     		});
				
								  }
								  else{
									res.status(400).send(body5);
								  }
							    
							  });
						  }
						  else{
							res.status(400).send(body2);
						  }
					    
					  });
				  }
				  else{
					  res.status(400).send(body1);
				  }
				});
					
			  }
			  else{
				  res.status(400).send(body);
			  }
			});
		 
	 	}
 });
 

 app.post('/changepassword', function(req, res){
	 console.log(req.body.userid);
	 model.auth.findOne({'username': req.body.userid},
	 	      function(err, user) {
		 			if(req.body.data.oldpass !== user.password ){
		 				res.send('failure');
		 			}
		 			user.password = req.body.data.newpass;

		 			user.save(function(err, thor) {
		 				  if (err) return console.error(err);
		 				  res.send('success');
		 				});
	 	      }
	    );
 });

 app.post('/addpatients', function(req, res){
	 var patientdata = new model.user({data: req.body});
	 var email = req.body.email;
	 model.user.find({ "data.email" : email },
				function(err, user) {
					if(user.length !== 0){
			        res.send("Account already exists");
					}
					else{
	                 patientdata.save(function(err){
				        if (err) {
				           res.send('error');
				        }else{
				        	res.send('success');
				        }
				    });
					}
	 });

	 });



 app.post('/addPatientToDoctor', function(req, res){
	 model.user.findOne({ "data.username": req.body.doctorId},function(err, details){
			if (err) {
		           res.send('error');
		        }else{
		        	var values = details._doc.data;

		        	if(typeof values['patients'] == 'object' ){

		        		if(values.patients.includes(req.body.patientId)){
			        		res.send('Patient is Already Added');
			        		return;
			        	}

		        		values['patients'].push( req.body.patientId);
		        	}
		        	else{
		        		values['patients']= [];
		        		values['patients'].push( req.body.patientId);
		        	}

		        	model.user.update({ "data.username": req.body.doctorId},{"data" :values },function(err){
		    	        if (err) {
		    	           res.send('error');
		    	        }else{
		    	        	res.send('success');
		    	        }
		    	    });
		        }

		});
 });

 app.post('/addNewPatient', function(req, res){
	  var userData =  new model.user({data : req.body.data});


	  model.user.find({ "data.email": req.body.data.email},function(err, acc){
		  if(acc.length != 0){
			  res.send({emailAlreadyPresent : true});
			  return;
		  }
		  else{
			  userData.save(function(err, doc){
					var newId = (doc._id).toString();
					console.log(newId);
			        if (err) {
			            res.json({'alert':'Registration error'});
			        }else{

			        	model.user.findOne({ "data.username": req.body.doctorId},function(err, details){
			    			if (err) {
			    		           res.send('error');
			    		        }else{
			    		        	var values = details._doc.data;

			    		        	if(typeof values['patients'] == 'object' ){

			    		        		if(values.patients.includes(req.body.patientId)){
			    			        		res.send('Patient is Already Added');
			    			        		return;
			    			        	}

			    		        		values['patients'].push(newId);
			    		        	}
			    		        	else{
			    		        		values['patients']= [];
			    		        		values['patients'].push(newId);
			    		        	}

			    		        	model.user.update({ "data.username": req.body.doctorId},{"data" :values },function(err){
			    		    	        if (err) {
			    		    	           res.send('error');
			    		    	        }else{
			    		    	        	res.send({success: true,data: doc});
			    		    	        }
			    		    	    });
			    		        }

			    		});

			        }
			    });
		  }

	  });



 });

 app.post('/addNewPatientasDependant', function(req, res){
	  var userData =  new model.user({data : req.body.data});
	          req.body.data.dependant = true;
			  userData.save(function(err, doc){
					var newId = (doc._id).toString();
					console.log(newId);
			        if (err) {
			            res.json({'alert':'Registration error'});
			        }else{
			        	model.user.findOne({ "data.username": req.body.doctorId},function(err, details){
			    			if (err) {
			    		           res.send('error');
			    		        }else{
			    		        	var values = details._doc.data;

			    		        	if(typeof values['patients'] == 'object' ){

			    		        		if(values.patients.includes(req.body.patientId)){
			    			        		res.send('Patient is Already Added');
			    			        		return;
			    			        	}

			    		        		values['patients'].push(newId);
			    		        	}
			    		        	else{
			    		        		values['patients']= [];
			    		        		values['patients'].push(newId);
			    		        	}

			    		        	model.user.update({ "data.username": req.body.doctorId},{"data" :values },function(err){
			    		    	        if (err) {
			    		    	           res.send('error');
			    		    	        }else{
			    		    	        	res.send({success: true,data: doc});
			    		    	        }
			    		    	    });
			    		        }

			    		});

			        }
			    });
});


 app.post('/viewAllPatients', function(req, res){
	 model.user.findOne({ "data.username": req.body.doctorId},function(err, details){
		 if (err) {
	           res.send('error');
	        }else{
	        	var patientIds = details._doc.data.patients;
	        	model.user.find({ _id : { $in: patientIds } } ,function(err, details){
		       		 if (err) {
		       	           res.send('error');
		       	        }else{
		       	        	res.send(details);
		       	        }

		       	 });

	        }

	 });

 });


 app.post('/viewTreatment', function(req, res){
	 if(req.body.doctorusername){
		 model.user.find({ _id : { $in: req.body.data }, 'data.doctorusername' : req.body.doctorusername } ,function(err, details){
	   		 if (err) {
	   	           res.send('error');
	   	        }else{
	   	        	res.send(details);
	   	        }

	   	 });
	 }
	 else{
		 model.user.find({ _id : { $in: req.body.data } } ,function(err, details){
	   		 if (err) {
	   	           res.send('error');
	   	        }else{
	   	        	res.send(details);
	   	        }

	   	 });
	 }

 });

 app.post('/viewPayments', function(req, res){
		model.user.find({ _id : { $in: req.body.data } } ,function(err, details){
	   		 if (err) {
	   	           res.send('error');
	   	        }else{
	   	        	res.send(details);
	   	        }

	   	 });
});



 app.post('/updateEvents', function(req, res){
	 model.user.findOne({ "data.username": req.body.doctorId},function(err, details){
			if (err) {
		           res.send('error');
		        }else{
		        	var values = details._doc.data;
		        	values['events'] = req.body.data;

		        	model.user.update({ "data.username": req.body.doctorId},{"data" :values },function(err){
		    	        if (err) {
		    	           res.send('error');
		    	        }else{
		    	        	res.send('success');
		    	        	 model.user.findOne({ _id : req.body.patientId},function(err, detailss){
		    	     			if (err) {
		    	     		           res.send('error');
		    	     		        }else{
		    	     		        	var values = detailss._doc.data;
		    	     		        	var index;
		    	     		        	values['events'].forEach(function(obj,idx){
			    	     		        		if(obj.id == req.body.eventId){
			    	     		        			index = idx;
			    	     		        		}
			    	     		       	});
		    	     		        	if(req.body.status == "accept"){
		    	     		        		values['events'][index].className = 'confirmAppointment';
		    	     		        	}
		    	     		        	else{
		    	     		        		values['events'][index].className = 'rejectAppointment';
		    	     		        	}

		    	     		        	model.user.update({ _id : req.body.patientId},{"data" :values },function(err){
		    	     		    	        if (err) {
		    	     		    	           res.send('error');
		    	     		    	        }else{
		    	     		    	        	res.send('success');
		    	     		    	        }
		    	     		    	    });
		    	     		        }

		    	     		});
		    	        }
		    	    });
		        }

		});
 });


 app.post('/addEvent', function(req, res){
	 model.user.findOne({ "data.username": req.body.doctorId},function(err, details){
			if (err) {
		           res.send('error');
		        }else{
		        	var values = details._doc.data;

		        	if(typeof values['events'] == 'object' ){

		        		values['events'].push( req.body.data);
		        	}
		        	else{
		        		values['events']= [];
		        		values['events'].push( req.body.data);
		        	}

		        	model.user.update({ "data.username": req.body.doctorId},{"data" :values },function(err){
		    	        if (err) {
		    	           res.send('error');
		    	        }else{
		    	        	 model.user.findOne({ "data.username": req.body.patientId},function(err, detailss){
		    	     			if (err) {
		    	     		           res.send('error');
		    	     		        }else{
		    	     		        	var values = detailss._doc.data;

		    	     		        	if(typeof values['events'] == 'object' ){

		    	     		        		values['events'].push( req.body.data);
		    	     		        	}
		    	     		        	else{
		    	     		        		values['events']= [];
		    	     		        		values['events'].push( req.body.data);
		    	     		        	}

		    	     		        	model.user.update({ "data.username": req.body.patientId},{"data" :values },function(err){
		    	     		    	        if (err) {
		    	     		    	           res.send('error');
		    	     		    	        }else{
		    	     		    	        	res.send('success');
		    	     		    	        }
		    	     		    	    });
		    	     		        }

		    	     		});

		    	        }
		    	    });
		        }

		});
 });


 app.post('/viewEvents', function(req, res){
	 model.user.findOne({ "data.username": req.body.doctorId }, {'data.events' : 1},function(err, details){
			if (err) {
		           res.send('error');
		        }else{
		        	res.send(details);
		        }

		});
 });





 app.post('/addTreatment', function(req, res){
	  var userData =  new model.user({data : req.body.data});

		userData.save(function(err, doc){
			var newId = (doc._id).toString();
			console.log(newId);
	        if (err) {
	            res.json({'alert':'Registration error'});
	        }else{

	        	model.user.findOne({ "_id": req.body.id},function(err, details){
	    			if (err) {
	    		           res.send(err);
	    		        }else{
	    		        	var values = details._doc.data;

	    		        	if(typeof values['treatments'] == 'object' ){

	    		        		if(values.treatments.includes(req.body.patientId)){
	    			        		res.send('Treatment is Already Added');
	    			        		return;
	    			        	}

	    		        		values['treatments'].push(newId);
	    		        	}
	    		        	else{
	    		        		values['treatments']= [];
	    		        		values['treatments'].push(newId);
	    		        	}
	    		        	if(typeof values['currenttreatment'] == 'object' ){
	    		        		values['currenttreatment'][req.body.data.doctoruserid] = newId
	    		        	}
	    		        	else{
	    		        		values['currenttreatment'] = {};
	    		        		values['currenttreatment'][req.body.data.doctoruserid] = newId;
	    		        	}
	    		        	model.user.update({ "_id": req.body.id},{"data" :values },function(err){
	    		    	        if (err) {
	    		    	           res.send(err);
	    		    	        }else{
	    		    	        	res.send(doc);
	    		    	        }
	    		    	    });
	    		        }
	    		});
	        }
	    });

});

 app.post('/addBill', function(req, res){
	  var userData =  new model.user({data : req.body.data});

		userData.save(function(err, doc){
			var newId = (doc._id).toString();
			console.log(newId);
	        if (err) {
	            res.json({'alert':'Registration error'});
	        }else{
	        	res.send(doc);
	        }
	    });

});

 
 
 app.post('/addToPaymentQueue', function(req, res){
	 model.paymentQueue.findOne({},function(err, details){
		var values = details._doc.data;
		if(!values){
			values = {};
		}
		values[req.body.paymentRequestId] = {};
		values[req.body.paymentRequestId].treatmentId = req.body.id;
		values[req.body.paymentRequestId].instamojoUsername = req.body.username;
		model.paymentQueue.update({},{"data" :values },function(err){
	        if (err) {
	           res.send(err);
	        }else{
	        	res.send('success');
	        }
	    });	
	 });
});
 
 
app.post('/updatePayment', function(req,res){
	var value;
	 model.paymentQueue.findOne({},function(err, details){
	 value = details._doc.data;
		
		/*
		var payloadAuthRefreshUser = {
	    		  'grant_type': 'password',
				  'client_id': config.instamojo.clientid,
				  'client_secret': config.instamojo.clientsecret,
			      'username':value[req.body.id].username,
			      'password': 'dantalaya1234'
			  };
			  
			  request.post('https://api.instamojo.com/oauth2/token/', {form: payloadAuthRefreshUser}, function(error, response, body3){
				  if(!error && response.statusCode !== 400){
					var body3 = JSON.parse(body3);
				    
				    var headersUpdateAccount = {'Authorization' : 'Bearer '+ body3.access_token};
				    
				    request.get('https://api.instamojo.com/v2/payment_requests/'+ req.body.id , {headers: headersUpdateAccount}, function(error, response, body4){
						  if(!error && response.statusCode !== 400){
							  model.user.findOne({ "data.username": req.body.userid},function(err, detailss){
			    	     			if (err) {
			    	     		           res.send(err);
			    	     		        }else{
			    	     		        	var values = detailss._doc.data;
			    	     		        	values.bank = bankdata;
			    	     		        	model.user.update({ "data.username": req.body.userid},{"data" :values },function(err){
			    	     		    	        if (err) {
			    	     		    	           res.send('error');
			    	     		    	        }else{
			    	     		    	        	res.send('success');
			    	     		    	        }
			    	     		    	    });	
			    	     		        }
			    	     		
			    	     		});
		
						  }
						  else{
							res.status(400).send(body4);
						  }
					    
					  });
				  }
				  else{
					res.status(400).send(body3);
				  }
			    
			  });*/
		
			
		model.user.findOne({ "_id": value[req.body.id].treatmentId},function(err, detailss){
			var billId;
			if (err) {
		           res.send('error');
		        }else{
		        	var values = detailss._doc.data;
		        	values['treatmentanalysislist'].map(function(obj, index){
		        		if(obj.instamojoPaymentRequestId == req.body.id){
		        			values['treatmentanalysislist'][index].status = "Completed";
		        			billId = values['treatmentanalysislist'][index].billid;
		        		}
		        	});
		        	model.user.update({ "_id": value[req.body.id].treatmentId},{"data" :values },function(err){
		    	        if (err) {
		    	           res.send('error');
		    	        }else{
		    	        	model.user.findOne({ "_id": billId},function(err, billDetails){
				    	        if (err) {
				    	           res.send('error');
				    	        }else{
				    	        	var billValues =  billDetails._doc.data;
				    	        	billValues.status = "Completed";
				    	        	model.user.update({ "_id": billId},{"data" :billValues },function(err){
						    	        if (err) {
						    	           res.send('error');
						    	        }else{
						    	        	delete value[req.body.id];
						    	        	
						    	        	model.paymentQueue.update({},{"data" :value },function(err){
					    		    	        if (err) {
					    		    	           res.send('error');
					    		    	        }else{
					    		    	        	res.send('success');
					    		    	        }
					    		    	    });	
						    	        	
						    	        }
						    	    });	
				    	        }
				    	    });
		    	        }
		    	    });	
		        }
		});
		
		
		
	 });

});
 
 app.post('/closeTreatment', function(req, res){
	        	model.user.findOne({ "_id": req.body.id},function(err, details){
	    			if (err) {
	    		           res.send('error');
	    		        }else{
	    		        	var values = details._doc.data;
	    		        	values['currenttreatment'] = '';
	    		        	model.user.update({ "_id": req.body.id},{"data" :values },function(err){
	    		    	        if (err) {
	    		    	           res.send('error');
	    		    	        }else{
	    		    	        	res.send('success');
	    		    	        }
	    		    	    });
	    		        }
	    		});
});


 app.post('/editDetails', function(req, res){
	 console.log(req.body.userid);
	 model.user.findOne({'_id': req.body.id},
	 	      function(err, user) {
		 			user.data = req.body.data;
		 			user.save(function(err, thor) {
		 				  if (err) return console.error(err);
		 				  res.send('success');
		 				});
	 	      }
	    );
 });






https.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
