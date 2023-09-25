import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(emailSignInStart(email, password));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    return (
        
        <SignInContainer>
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ () => {} }>
                <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />
                <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />
                <ButtonsContainer>
                    <Button label="Sign In" type="submit" onClick={ handleSubmit } />
                    <Button label="Sign In With Google" type="button" buttonType="google" onClick={ signInWithGoogle } />
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
