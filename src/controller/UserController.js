import firebase from '../firebase.js';
import { createBrowserHistory } from 'history';
var passwordHash = require('password-hash');

const history = createBrowserHistory();

class UserController {
    login(loginUser) {
        console.log("inside login");
        const usersRef = firebase.database().ref('users');
        usersRef.orderByChild('username').equalTo(loginUser.username).once('value',function(snapshot) {
            snapshot.forEach(function(snapshot){
               var value = snapshot.val();

            //    var hashedPassword = passwordHash.generate(loginUser.password);
            //    console.log(passwordHash.verify(loginUser.password, value.password));
               
               if(passwordHash.verify(loginUser.password, value.password)) {
                    console.log("Logged In successfully");
                    localStorage.setItem('userKey',snapshot.key);
                    var key = localStorage.getItem('userKey');
                    usersRef.child(key).once('value',function(snapshot) {
                        var userData = snapshot.val();
                        
                        localStorage.setItem('username',userData.username);
                        localStorage.setItem('password',userData.password);
                        localStorage.setItem('firstname',userData.firstname);
                        localStorage.setItem('lastname',userData.lastname);

                        // history.push('/home/notes');
                        window.location.href = '/home/notes';
                    });
                }
                else {
                    alert("Password is incorrect");
                    // history.push('/login');
                    window.location.href = '/login';
                }
            });
        });
    }

    getItemBy() {
        var firstname = localStorage.getItem('firstname');
        var lastname = localStorage.getItem('lastname');
        var user = firstname+" "+lastname;
        var email = localStorage.getItem('username');
        console.log("User in span : "+user);
        var userdata = {
            user: user,
            email: email
        }

        return userdata;
    }

    logout() {
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('username');

        // history.push('/login');
        window.location.href = '/login';
    }

    register(registerUser,confirmPassword) {
        console.log("inside register");
        const registerRef = firebase.database().ref('users');
        var flag = true;

        // console.log(passwordHash.verify(confirmPassword, registerUser.password));

        var emailValid = registerUser.username.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        console.log("Email : "+emailValid);
        if(emailValid !== null) {
            if((passwordHash.verify(confirmPassword, registerUser.password)) && registerUser.password.length > 6) {
                console.log("Valid");
                flag = true;
            }
            else {
                console.log("Invalid");
                alert("Password is not match");
                history.push('/register');
                // window.location.href = '/register';
                flag = false;
            }
        }

        if(flag === true) {
            console.log("Inside if");
            registerRef.push(registerUser);
            history.push('/login');
            // window.location.href = '/login';
        }
        
    }

    resetPassword(resetUser) {
        console.log("Reset");
        const usersRef = firebase.database().ref('users');
        usersRef.orderByChild('username').equalTo(resetUser.username).once('value',function(snapshot) {
            snapshot.forEach(function(snapshot){
                var value = snapshot.val();
                if(value.username === resetUser.username) {
                    localStorage.setItem('userKey',snapshot.key);
                    var key = localStorage.getItem('userKey');

                    var password = {
                        password: resetUser.password
                    }
                }
                if(resetUser.password === resetUser.confirmPassword) {
                    usersRef.child(key).update(password);
                    // history.push('/login');
                    window.location.href = '/login';
                }
                else {
                    alert("Password is not match");
                    // history.push('/forgotpassword');
                    window.location.href = '/forgotpassword';
                }
            });
        });
    }
}

export default UserController;