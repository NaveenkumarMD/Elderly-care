import React, { Component } from 'react'
import { View,Text,StyleSheet, TouchableOpacity,ToastAndroid } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import firebase from 'firebase'
class Resetpass extends Component {
    constructor(props){
        super(props)
        this.state={
            mail:''
        }
    }    
    showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
          "Email sent",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          
          50,
          50
        );
      };
    handlepress=()=>{
        firebase.auth().sendPasswordResetEmail(this.state.mail).then(res=>{
            this.showToastWithGravityAndOffset()
        }).catch(err=>{
            alert(err.message)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.oval}></View>
                <View style={styles.one}>
                <Text style={{fontSize:30,color:'white',fontWeight:'bold',position:'absolute',top:100}}>Reset password</Text>
                </View>
                <View style={styles.two}>
                    
                    <View style={styles.inputbox}>
                        <TextInput placeholder="Email" placeholderTextColor="#ff7e07" style={styles.input} value={this.state.mail}onChangeText={(e)=>this.setState({mail:e})}/>
                        <Ionicons name="mail" size={22} style={styles.inputicon}/>
                    </View>
                    <Text style={{color:'white',paddingHorizontal:20,paddingTop:20,marginBottom:30}}>A mail will be sent to your mail id,click on the link to reset the password</Text>
                    <TouchableOpacity style={{borderRadius:60,borderWidth:1,borderColor:'#ff7e07',marginTop:50,height:50,width:160,alignItems:'center',justifyContent:'center'}} onPress={()=>this.handlepress()}>
                        <Text style={{color:'#ff7e07',fontSize:20}}>SEND</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.three}>

                </View>
            </View>
        )
    }
}
export default Resetpass
const styles=StyleSheet.create({
    input:{
        flex:1,
        fontSize:20,
        paddingHorizontal:20,
        color:'#ff7e07'
    },
    inputbox:{
        flexDirection:'row',
        height:60,
        width:300,
        borderColor:'#ff7e07',
        borderWidth:1,
        borderRadius:40,
        marginTop:80,

    },
    inputicon:{
        color:'#ff7e07',
        padding:10,
        margin:3
    },
    one:{
        flex:2,
        justifyContent:'center'
    },
    two:{
        flex:4,
        alignItems:'center',
        padding:20
    },
    three:{
        flex:2,
        alignItems:'center'
    },
    container:{
        flex:1,
        backgroundColor:'black',
        padding:20
    },
    oval:{
        position:'absolute',
        width: 652,
        height: 650,
        left: -230,
        top: -443,
        backgroundColor:'#FF7E07',
        borderRadius:300
    }
})