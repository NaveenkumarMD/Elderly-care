import React from 'react';
import Navigator from './Navigation/Navigator';
import firebaseConfig from './Database/firebase-config'
import firebase from 'firebase'
import { Provider } from 'react-redux';
import store from './store';
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
 
}else {
  firebase.app()

}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class App extends React.Component{
  constructor(props){
    super(props)
    this.notificationListener=React.createRef()
    this.responseListener=React.createRef()
    this.state={
      notification:false
    }
    
  }
  async componentDidMount(){
    registerForPushNotificationsAsync().then(token => AsyncStorage.setItem('token',token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      this.setState({notification})
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  }
  componentWillUnmount(){
    Notifications.removeNotificationSubscription(this.notificationListener.current);
    Notifications.removeNotificationSubscription(this.responseListener.current);
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

export  async function sendPushNotification(expoPushToken,{title,body}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'some data' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  console.log("running")
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("token for the device is ",token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: 'black',
    });
  }

  return token;
}