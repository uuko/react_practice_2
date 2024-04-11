import {useContext, useState} from "react";
import {AuthContext} from "../store/auth-context";
import LoadingOverlay from "../components/LoadingOverlay";
import AuthContent from "../components/AuthContent";
import {Alert} from "react-native";
import {createUser} from "../https/auth";


function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        console.log(email+" p "+password)
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                'Authentication failed',
                'Could not create user, please check your input and try again later.'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;