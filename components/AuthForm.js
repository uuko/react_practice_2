import {useState} from 'react';
import {View, StyleSheet} from "react-native";
import Input from "./Input";
import Button from "./Button";


function AuthForm({isLogin, onSubmit, credentialsInvalid}) {

    const [inputs, setInputs] = useState({
        enteredEmail: {
            value: '',
        },
        enteredConfirmEmail: {
            value: '',

        },
        enteredPassword: {
            value: '',
        },
        enteredConfirmPassword: {
            value: '',
        },
    });

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function submitHandler() {
        var emailsDatas = {}
        if (isLogin) {
            emailsDatas = {
                email: inputs.enteredEmail.value ? inputs.enteredEmail.value : "",
                password: inputs.enteredPassword.value ? inputs.enteredPassword.value : "",
            };
        } else {
            console.log(inputs.enteredEmail.value)

            console.log(inputs.enteredConfirmEmail.value)
            console.log(inputs.enteredPassword)
            console.log(inputs.enteredConfirmPassword)
            emailsDatas = {
                email: inputs.enteredEmail.value ? inputs.enteredEmail.value : "",
                confirmEmail: inputs.enteredConfirmEmail.value ? inputs.enteredConfirmEmail.value : "",
                password: inputs.enteredPassword.value ? inputs.enteredPassword.value : "",
                confirmPassword: inputs.enteredConfirmPassword.value ? inputs.enteredConfirmPassword.value : "",
            };
        }
        console.log(JSON.stringify(emailsDatas))

        onSubmit(emailsDatas);
    }

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setInputs({
                    ...inputs, enteredEmail: {
                        value: enteredValue
                    }
                });
                break;
            case 'confirmEmail':
                setInputs({
                    ...inputs, enteredConfirmEmail: {
                        value: enteredValue
                    }
                });
                break;
            case 'password':

                setInputs({
                    ...inputs, enteredPassword: {
                        value: enteredValue
                    }
                });
                break;
            case 'confirmPassword':
                setInputs({
                    ...inputs, enteredConfirmPassword: {
                        value: enteredValue
                    }
                });
                break;
        }
    }


    return (
        <View style={styles.form}>
            <View style={styles.form}>
                <Input
                    style={styles.rowInput}
                    label="Email Address"
                    keyboardType="email-address"
                    invalid={emailIsInvalid}
                    textInputConfig={{
                        onChangeText: updateInputValueHandler.bind(this, 'email'),
                        value: inputs.enteredEmail.value,
                    }}
                />
                {!isLogin && (
                    <Input
                        style={styles.rowInput}

                        label="Confirm Email Address"
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                        textInputConfig={{
                            onChangeText: updateInputValueHandler.bind(this, 'confirmEmail'),
                            value: inputs.enteredConfirmEmail.value,
                        }}
                    />
                )}
                <Input
                    label="Password"
                    style={styles.rowInput}
                    isInvalid={passwordIsInvalid}
                    keyboardType="decimal-pad"
                    textInputConfig={{
                        onChangeText: updateInputValueHandler.bind(this, 'password'),
                        value: inputs.enteredPassword.value,
                    }}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        style={styles.rowInput}
                        keyboardType="decimal-pad"

                        isInvalid={passwordsDontMatch}
                        textInputConfig={{
                            onChangeText: updateInputValueHandler.bind(this, 'confirmPassword'),
                            value: inputs.enteredConfirmPassword.value,
                        }}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    form: {
        flexDirection: "column",
    },

});