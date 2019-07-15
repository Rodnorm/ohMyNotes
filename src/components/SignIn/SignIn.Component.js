import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp/SignUp.Component';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import './SignIn.Component.scss';
import ReturnPage from '../ReturnPage/ReturnPageComponent';



class SignInPage extends Component {
    render() {
        return (
            <div className="container">
                <section className="sign">
                    <ReturnPage />
                    <h1>Hi, there :)</h1>
                    <SignInForm />
                    <SignUpLink />
                </section>
            </div>
        )
    }
    
}


const INITIAL_STATE = {
    email: '',
    password: '',
    error: ''
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

    }
    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.LANDING);
        })
        .catch(error => {
            this.setState({ error });
        })
    }
    onChange = e => {
        this.setState({ [e.target.name ]: e.target.value });
    }

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return(
            <form onSubmit={this.onSubmit}>
                <input 
                    name="email"
                    value={email}
                    type="email"
                    placeholder="enter your email"
                    onChange={this.onChange}
                />
                <input 
                    name="password"
                    value={password}
                    type="password"
                    placeholder="enter your password"
                    onChange={this.onChange}
                />
                <button disabled={isInvalid}>Sign in</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default withRouter(SignInPage);

export { SignInForm }