import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screen/RecentExpenses";
import AllExpenses from "./screen/AllExpenses";
import React, {useContext, useEffect, useState} from "react";
import {Ionicons} from '@expo/vector-icons';
import IconButton from "./components/IconButton";
import ManageExpense from "./screen/ManageExpense";
import {Provider, useStore} from "react-redux";

const Stack = createStackNavigator()
const BottomTabs = createBottomTabNavigator()
import {store} from './store/store';
import {AuthContext} from "./store/auth-context";
import {GlobalStyles} from "./style/GlobalStyles";
import SignupScreen from "./screen/Register";
import LoginScreen from "./screen/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/LoadingOverlay";
import AuthContextProvider from "./store/auth-context";

function BottomNavigation() {
    const navigation = useNavigation()
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name={"RecentExpenses"} component={RecentExpenses}
                               options={{
                                   title: 'Recent Expenses',
                                   tabBarLabel: 'Recent',
                                   tabBarIcon: ({color, size}) => (
                                       <Ionicons name="hourglass" size={size} color={color}/>
                                   ),
                                   headerRight: ({tintColor}) => (
                                       <IconButton
                                           icon="add"
                                           size={24}
                                           color={tintColor}
                                           onPress={() => {
                                               navigation.navigate('ManageExpense');
                                           }}
                                       />
                                   ),
                               }}/>
            <BottomTabs.Screen name={"AllExpenses"} component={AllExpenses}
                               options={{
                                   title: 'All Expenses',
                                   tabBarLabel: 'All Expenses',
                                   tabBarIcon: ({color, size}) => (
                                       <Ionicons name="calendar" size={size} color={color}/>
                                   ),
                               }}/>
        </BottomTabs.Navigator>
    )
}

function AuthenticationScreen() {
    return (
        <Provider store={store}>
                <Stack.Navigator>
                    <Stack.Screen name={"BottomNavigation"} component={BottomNavigation}
                                  options={{headerShown: false}}/>
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                        options={{
                            presentation: 'modal',
                        }}
                    />
                </Stack.Navigator>
        </Provider>

    )
}

function LoginsRegScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor:  GlobalStyles.colors.primary100},
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    );
}
function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <LoginsRegScreen />}
            {authCtx.isAuthenticated && <AuthenticationScreen />}
        </NavigationContainer>
    );
}
function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);

    const authCtx = useContext(AuthContext);

    // useEffect(() => {
    //     async function fetchToken() {
    //         const storedToken = await AsyncStorage.getItem('token');
    //
    //         if (storedToken) {
    //             authCtx.authenticate(storedToken);
    //         }
    //
    //         setIsTryingLogin(false);
    //     }
    //
    //     fetchToken();
    // }, []);
    //
    // if (isTryingLogin) {
    //     return <LoadingOverlay />;
    // }

    return <Navigation />;
}
export default function App() {
    const authCtx = useContext(AuthContext)

    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
