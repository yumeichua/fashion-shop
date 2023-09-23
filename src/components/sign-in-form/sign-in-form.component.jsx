import { useState } from "react";

import { 
    signInWithNativeEmailAndPassword, 
    signInWithGooglePopup 
} from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithNativeEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email")
                    break;
                case 'auth/invalid-login-credentials':
                    alert("Invalid login credentials");
                    break;
                default:
                    console.log("Unknown error found", error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    return (
        
        <div className="sign-in-container">
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ () => {} }>
                <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />
                <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />
                <div className="buttons-container">
                    <Button label="Sign In" type="submit" onClick={ handleSubmit } />
                    <Button label="Sign In With Google" type="button" buttonType="google" onClick={ signInWithGoogle } />
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
