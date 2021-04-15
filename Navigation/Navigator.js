import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//Screens
import Login from '../Components/Screens/Login'
import Signup from '../Components/Screens/Signup'
import Elderorhelper from '../Components/Screens/Elderorhelper'
import Helpersignup from '../Components/Screens/Helpersignup'
import Resetpass from '../Components/Screens/Resetpass'
import { StatusBar } from 'expo-status-bar'
import Main from '../Components/Screens/Main'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Elderabout from '../Components/Screens/Elderabout'
import Viewhelpers from '../Components/Screens/Viewhelpers'
import Findhelperessential from '../Components/Screens/Essentials/Findhelperessential'
import Helpermain from '../Components/Screens/Helpermain'
const Mainscreenoptions = {
    title: 'Home',
    headerStyle: {
        backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerShown: false
}
const Elderaboutoptions = {
    title: 'About',
    headerStyle: {
        backgroundColor: 'black'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}
const Viewhelperoptions = {
    title: 'View helpers',
    headerStyle: {
        backgroundColor: 'black'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
  }
  const Viewprofileoptions = {
    title: 'About',
    headerStyle: {
        backgroundColor: 'black'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
  }
  const Viewhelperprofileoptions = {
    title: 'Profile',
    headerStyle: {
        backgroundColor: 'black'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
  }
const stack = createStackNavigator()
export default class Navigator extends Component {
    constructor(props) {
        super(props)


    }
    render() {
        return (
            <NavigationContainer>
                <StatusBar style="auto" />
                <stack.Navigator initialRouteName={Helpersignup}>
                    <stack.Screen name="EssentialsFindhelper" component={Findhelperessential} options={Viewhelperoptions} />
                    <stack.Screen name="Main" component={Main}  options={{headerShown:false}}/>
                    <stack.Screen name="Elderorhelper" component={Elderorhelper} options={{ headerShown: false }} />
                    <stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <stack.Screen name="Viewhelpers" component={Viewhelpers} options={Viewhelperprofileoptions}/>
                    <stack.Screen name="Helpersignup" component={Helpersignup} options={{ headerShown: false }} />
                    <stack.Screen name="Elderabout" component={Elderabout} options={Elderaboutoptions} />
                    <stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    <stack.Screen name="Resetpass" component={Resetpass} options={{ headerShown: false }} />
                    <stack.Screen name="Profile" component={Elderabout} options={Viewprofileoptions}/>
                    <stack.Screen name="Helpermain" component={Helpermain} />
                </stack.Navigator>
            </NavigationContainer>

        )
    }
}
