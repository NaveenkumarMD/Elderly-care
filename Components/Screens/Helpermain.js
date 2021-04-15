import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'firebase'
class Helpermain extends Component {
    constructor(props){
        super(props)
        this.state={
            userdata:{

            },
            token:''
        }
    }
    componentDidMount=async()=>{
        var token;
        await AsyncStorage.getItem('token').then(token1=>{
            console.log(token1)
            token=token1
            this.setState({token:token1})
            
        })
        AsyncStorage.getItem('userdata').then(data=>{
            console.log(JSON.parse(data))
            var data1=JSON.parse(data)
            this.setState({userdata:data1})
            firebase.firestore().collection('Helpers').doc(data1.mobile).set({token:token},{merge:true})
        })
    }
    render() {
        return (
            <View>
                <Text>Navewger</Text>
            </View>
        )
    }
}
export default Helpermain