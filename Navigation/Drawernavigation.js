import React, { Component } from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import Main from '../Components/Screens/Main'
import Elderabout from '../Components/Screens/Elderabout'
import {StatusBar} from 'expo-status-bar'
const drawer=createDrawerNavigator()

class Drawernavigation extends Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                <StatusBar style="auto"/>
                <drawer.Navigator drawerType="slide" 
                lazy={true}
                drawerStyle={{
                backgroundColor:'#ff7e07',width:200,opacity:0.8
                }} drawerContentOptions={{
                    inactiveTintColor:'white',fontSize:30
                }}>
                <drawer.Screen name="Main" component={Main}  />
                <drawer.Screen name="Profile" component={Elderabout}/>                  
                    
                </drawer.Navigator>
            </NavigationContainer>
        )
    }
}
export default Drawernavigation
