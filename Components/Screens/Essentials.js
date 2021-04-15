import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import {sendPushNotification} from '../../App'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Findhelper from './Essentials/Findhelper';
const stack=createStackNavigator()
export default class Essentials extends React.Component {
  constructor(props){
    super(props)
    this.state={
      token:''
    }
  }
  
  async componentDidMount(){
    await AsyncStorage.getItem('token').then(token=>{
      console.log(token)
      this.setState({token})
    })
  }
  render() {
    return (
      <NavigationContainer independent={true}>
        <stack.Navigator >
          <stack.Screen name="Findhelper" component={Findhelper}/>
        </stack.Navigator>
      </NavigationContainer>
    )
  }
}

