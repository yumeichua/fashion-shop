import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { signUpStart } from "../../store/user/user.action";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( password !== confirmPassword ) {
            alert("Password fo not match");
            return;
        }
        dispatch(signUpStart(email, password, displayName));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ () => {} }>
                <FormInput label="Display Name" type="text" required onChange={ handleChange } name="displayName" value={ displayName } />
                <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />
                <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />
                <FormInput label="Confirm Password" type="password" required onChange={ handleChange } name="confirmPassword" value={ confirmPassword } />
                <Button label="Sign Up" type="submit" onClick={ handleSubmit } />
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;
