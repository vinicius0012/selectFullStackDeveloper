import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import CreateAccount from './screens/CreateAccount';
import CreatePublish from './screens/CreatePublish';


const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name='Account' component={CreateAccount} />
                <AppStack.Screen name='CreatePublish' component={CreatePublish} />
                <AppStack.Screen name='Dashboard' component={Dashboard} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}