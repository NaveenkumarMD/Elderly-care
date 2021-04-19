import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Text, TouchableOpacity } from 'react-native'
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
import SelectEssentials from '../Components/Screens/Essentials/SelectEssentials'
import Esentialslanding from '../Components/Screens/Essentials/Esentialslanding'
import Viewrequest from '../Components/Screens/Essentials/Viewrequest'
import Helpermain from '../Components/Helpers/Helpermain'
import Viewjobs from '../Components/Helpers/Viewjobs'
import Essenntialjobview from '../Components/Helpers/Essenntialjobview'
import Acceptedjobs from '../Components/Helpers/Acceptedjobs'
import Medicinelanding from '../Components/Screens/Medicine/Medicinelanding'
import Viewrequestmed from '../Components/Screens/Medicine/Viewrequestmed'
import Meddetails from '../Components/Screens/Medicine/Meddetails'
import Findhelpermedicine from '../Components/Screens/Medicine/Findhelpermedicine'
import Medjobview from '../Components/Helpers/Medjobview'
import Helperabout from '../Components/Helpers/Helperabout'

const screenOptions = {
    headerStyle: {
        backgroundColor: 'black'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    headerShown: true
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
                <stack.Navigator initialRouteName={Helpersignup} screenOptions={screenOptions}>
                    <stack.Screen name="Elderorhelper" component={Elderorhelper} options={{ headerShown: false }} />
                    <stack.Screen name="Helperabout" component={Helperabout} options={{ title: 'About' }} />
                    <stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <stack.Screen name="Medjobview" component={Medjobview} options={{ title: 'job View' }} />
                    <stack.Screen name="Medicinelanding" component={Medicinelanding} options={{ title: 'Pending requests' }} />
                    <stack.Screen name="Findhelpermedicine" component={Findhelpermedicine} options={{ title: 'Find helper' }} />

                    <stack.Screen name="Meddetails" component={Meddetails} options={{ title: 'Medicines' }} />
                    <stack.Screen name="Helpermain" component={Helpermain} options={{headerShown:false }} />
                    <stack.Screen name="Viewrequestmed" component={Viewrequestmed} options={{ title: 'Request info' }} />
                    <stack.Screen name="Acceptedjobs" component={Acceptedjobs} options={{ title: 'Accepted jobs' }} />

                    <stack.Screen name="Viewjobs" component={Viewjobs} options={{ title: 'Assigned jobs' }} />
                    <stack.Screen name="Essentialjobview" component={Essenntialjobview} options={{ title: 'Job info' }} />
                    <stack.Screen name="Essentialslanding" component={Esentialslanding} options={{ title: 'Pending requests' }} />
                    <stack.Screen name="Viewrequest" component={Viewrequest} options={{ title: 'View request' }} />
                    <stack.Screen name="SelectEssentials" component={SelectEssentials} options={{ title: 'Select items' }} />
                    <stack.Screen name="EssentialsFindhelper" component={Findhelperessential} options={{ title: 'View helpers' }} />
                    <stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                    <stack.Screen name="Viewhelpers" component={Viewhelpers} options={{ title: 'Profile' }} />
                    <stack.Screen name="Helpersignup" component={Helpersignup} options={{ headerShown: false }} />
                    <stack.Screen name="Elderabout" component={Elderabout} options={{ title: 'About' }} />
                    <stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    <stack.Screen name="Resetpass" component={Resetpass} options={{ headerShown: false }} />
                    <stack.Screen name="Profile" component={Elderabout} options={{ title: 'About' }} />

                </stack.Navigator>
            </NavigationContainer>

        )
    }
}
