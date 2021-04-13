import React from 'react';
import Navigator from './Navigation/Navigator';
import firebaseConfig from './Database/firebase-config'
import firebase from 'firebase'
import {StatusBar} from 'expo-status-bar'
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
 
}else {
  firebase.app()

}

class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Provider store={store}>
        <Navigator />
        </Provider>
    )
  }
}

export default App