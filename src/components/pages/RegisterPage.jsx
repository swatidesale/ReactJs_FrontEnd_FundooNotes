import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserController from '../../controller/UserController.js';
var passwordHash = require('password-hash');
const userCtrl = new UserController();

class RegisterPage extends Component {
    constructor() {
       super();

       this.state = {
            user: {
                firstname:'',
                lastname:'',
                username:'',
                password:'',
                confirmPassword:''
            },
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // componentWillMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         console.log("inside componentWillMount");
            
    //         console.log(user.firstname);
    //         console.log(user);
            
    //         if (user) {
    //             window.location = "/login"
    //         } 
    //     })
    // }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted: true
        });
        var hashedPassword = passwordHash.generate(this.state.password);
        // var hashedConfirmPassword = passwordHash.generate(this.state.confirmPassword);

        // console.log("Encrypted");
        // console.log(hashedPassword +"   "+hashedConfirmPassword);
        
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: hashedPassword,
        }

        userCtrl.register(user,this.state.confirmPassword);
        console.log("after register");

        this.setState({
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: '',
                confirmPassword: ''
            },
            submitted: false
        });

        // e.preventDefault();
        // firebase.auth()
        // .createUserWithEmailAndPassword(this.state.username, this.state.password) 
        // .then(() => {
        //     this.setState({
        //         showErrorMessage: false
        //     })
        //     var user = firebase.auth().currentUser;
        //     userCtrl.register(user, this.state.password)
        //     user.sendEmailVerification().then(() => {
        //         console.log("verification email sent")
        //     }).catch((error)=>console.error(error))
        // })
        // .catch((error) => {
        //     this.setState({
        //         error: error,
        //         showErrorMessage: true,
        //     })
        //     console.error(error)
        // });
    }


    // register(user,registerRef) {
    //     var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    //     if(this.state.password === this.state.confirmPassword) {
    //         console.log("Valid");
    //         registerRef.on('value',(snapshot) => {
    //             let users = snapshot.val();
    //             let newUser =  user.username;
    //             for(let user in users) {
    //                 console.log("inside for");
    //                 if (users[user].username === newUser) {
    //                     console.log("User : "+users[user].username);
    //                     console.log("New : "+newUser);
    //                     alert('Username "' + newUser + '" is already taken');
    //                     return;
    //                 }
    //             }
    //             console.log("outside for");
    //             registerRef.push(user); 
    //         });
    //     }
    //     else {
    //         console.log("Invalid");
    //         history.push('/register');
    //     }
    // }

    render() {
        return(
            <div>
                <Card className="cardRegister">
                    <header>
                        <div className="title">
                            <h1>Register</h1>
                        </div>
                    </header>

                    <div className="containerRegister">
                        <form onSubmit={this.handleSubmit}>
                            <CardContent>
                                <TextField
                                    id="firstname"
                                    label="First Name"
                                    type="text"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange}  value={this.state.firstname}
                                />
                                <br/>

                                <TextField
                                    id="lastname"
                                    label="Last Name"
                                    type="text"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.lastname}
                                />
                                <br/>

                                <TextField
                                    id="username"
                                    label="Username"
                                    type="email"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.username}
                                />
                                <br/>

                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.password}
                                />
                                <br/>

                                <TextField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.confirmPassword}
                                />
                                <br/>
                                </CardContent>

                                <CardActions className="cardAction">
                                    <Button className="actions" type="submit" variant="contained" color="primary">
                                        Register
                                    </Button>
              
                                    <Button className="actions" variant="contained" href='/login'>
                                        Cancel
                                    </Button>
                                </CardActions>
                        </form>
                    </div>
                </Card>
            </div>
        );
    }
}

export default RegisterPage;