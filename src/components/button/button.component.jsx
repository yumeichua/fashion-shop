import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: "google",
    inverted: "inverted"
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]
);

const Button = ({ label, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton { ...otherProps }>{ label }</CustomButton>;
};

export default Button;