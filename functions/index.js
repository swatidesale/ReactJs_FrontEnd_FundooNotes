const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

var setupMailTransporter = function () {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'sadesale94@gmail.com',
			pass: 'Desale94@'
		}
	});
	return transporter;
};

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendRegEmailConfirmation = functions.database.ref('/users/').onWrite(async (event) => {
	var users = event.after._data;
	console.log("Users : "+users);
	
	var newUser = users[Object.keys(users)[Object.keys(users).length-1]].username;
	console.log("new: ", newUser);
	

	const mailOptions = {
		from: '"Swati Desale" <sadesale94@gmail.com>',
		to : newUser
	
	};
	const subscribed = true;

	// Building Email message.
	mailOptions.subject = subscribed ? 'Thanks and Welcome!' : 'Sad to see you go :`(';
	mailOptions.html = subscribed ?
		'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.' :
		'I hereby confirm that I will stop sending you the newsletter.';

	try {
		await setupMailTransporter().sendMail(mailOptions, function (err, info) {
			if (err)
				console.log(err)
			else
				console.log(info);
		});
		// await mailTransport.sendMail(mailOptions);
		// await setupMailTransporter().sendMail(mailData, callback);
		console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, mailOptions.to); //val.email);
	} catch (error) {
		console.error('There was an error while sending the email:', error);
	}
	return null;
});