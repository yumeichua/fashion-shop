import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( password !== confirmPassword ) {
            alert("Password fo not match");
            return;
        }
        try {
            const userAuth = await createAuthUserWithEmailAndPassword(email, password);
            console.log("what is auth user", userAuth);
            const response = await createUserDocumentFromAuth(userAuth, { displayName });
            resetFormFields();
            console.log("Response from user creation", response);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cannot create user, email already in use");
            } else {
                console.log("User creation encountered error", error.message);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ () => {} }>
                <FormInput label="Display Name" type="text" required onChange={ handleChange } name="displayName" value={ displayName } />
                <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />
                <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />
                <FormInput label="Confirm Password" type="password" required onChange={ handleChange } name="confirmPassword" value={ confirmPassword } />
                <Button label="Sign Up" type="submit" onClick={ handleSubmit } />
            </form>
        </div>
    )
}

export default SignUpForm;
