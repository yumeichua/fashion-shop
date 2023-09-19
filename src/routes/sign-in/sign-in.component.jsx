import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../src/utils/firebase.utils";

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
            <button onClick={ useGooglePopup }>Sign In With Google</button>
        </div>
    )
}

export default SignIn;