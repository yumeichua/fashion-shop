import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../src/utils/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const useGooglePopup = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    return (
        <div>
            <div>
                <h1>Sign In Page</h1>
            </div>
            <button onClick={ useGooglePopup }>Sign In With Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;