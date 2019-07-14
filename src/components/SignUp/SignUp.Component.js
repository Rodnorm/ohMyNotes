import React, { Component } from 'react';
// import './SignUp.Component.scss';
import '../SignIn/SignIn.Component.scss';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTER from '../../constants/routes';

const SignUpPage = () => (
    <div className="container">
        <section className="sign">
            <h1>SignUp</h1>
            <SignUpForm />
        </section>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class SignUpBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = e => {
        e.preventDefault()
        const { username, email, passwordOne } = this.state;
        this.props.firebase
        .doCreateUserWithEmailAndPassword(email,passwordOne)
        .then(authUser => {
            return this.props.firebase
            .user(authUser.user.uid)
            .set({
                username,
                email
            });
        })
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTER.LANDING);
        })
        .catch(e => {
            throw Error(e);
        });
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' | username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    name="username"
                    value={ username }
                    onChange={this.onChange}
                    type="text"
                    placeholder="enter your username"
                />
                <input 
                    name="email"
                    value={ email }
                    onChange={this.onChange}
                    type="email"
                    placeholder="enter your email"
                />
                <input 
                    name="passwordOne"
                    value={ passwordOne }
                    onChange={this.onChange}
                    type="password"
                    placeholder="enter your password"
                />
                <input 
                    name="passwordTwo"
                    value={ passwordTwo }
                    onChange={this.onChange}
                    type="password"
                    placeholder="repeat your password"
                />
                <button disabled={isInvalid}>Sign up</button>
                { error && <p> { error.message } </p> }
            </form>
        );
    }
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpBase);

const SignUpLink = () => (
    <p>
        Don't have an account?<Link to={ROUTER.SIGNUP}> Create one! xD </Link>
    </p>
);


export default SignUpPage;

export { SignUpForm, SignUpLink };