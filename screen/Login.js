import {useContext, useState} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import AuthContent from "../components/AuthContent";
import {login} from "../https/auth";
import {Alert} from "react-native";
import {AuthContext} from "../store/auth-context";

function LoginScreen() {
    const [isAuth, setAuth] = useState(false)
    const authContext = useContext(AuthContext)

    async function loginHandler({email, password}) {
        setAuth(true)
        try {
            const token = await login(email, password)
            authContext.authenticate(token)
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
        } finally {
            setAuth(false)
        }

    }

    if (isAuth) {
        return <LoadingOverlay message={"Logging"}></LoadingOverlay>
    }
    return <AuthContent isLogin={true} onAuthenticate={loginHandler}/>;


}

export default LoginScreen