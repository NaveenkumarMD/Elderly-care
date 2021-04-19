import React, { Component } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Elderorhelper extends Component {
    constructor(props){
        super(props)
        
    }
    componentDidMount=async()=>{
        try {
            await AsyncStorage.getItem('role').then(role=>{
                if(role!=undefined && role!=null){
                    this.props.navigation.navigate('Login')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <View style={styles.container}>

               <View style={styles.oval1}>
                   <Text style={{top:220,left:40,fontSize:27,color:'white',fontWeight:'normal'}}>Let's help!!</Text> 
                   <Text style={{top:230,left:120,fontSize:27,color:'white',fontWeight:'100'}}>each other!!!</Text> 

                </View>
                <View style={styles.oval2}>
                    
                </View>
                <View style={styles.oval3}></View>
                <View style={{flex:4}}></View>
                <View style={styles.two}> 
                    <FontAwesome5 name="people-carry" size={70} color="#ff7e07"style={styles.icon} />
                    <TouchableOpacity style={styles.button1} onPress={async()=>{
                        await AsyncStorage.setItem('role',"Elder")
                        this.props.navigation.navigate("Login")
                    }
                        }>
                        <Text style={styles.buttontxt1}>I need help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={async()=>{
                        await AsyncStorage.setItem('role',"Helper")
                        this.props.navigation.push("Login")
                    }}>
                        <Text style={styles.buttontxt2}>I like to help</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Elderorhelper
const styles=StyleSheet.create({
    icon:{
        
    },
    button1:{
        width:300,
        height:60,
        borderColor:'#ff7e07',
        borderWidth:2,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:40
        
    },
    button2:{
        width:300,
        height:60,
        borderColor:'white',
        borderWidth:2,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:40
        
    
    },
    buttontxt1:{
        color:'#ff7e07',
        fontSize:20,
    },
    buttontxt2:{
        color:'white',
        fontSize:20,
    },
    text:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    two:{
        flex:4,
        justifyContent:'center',
        alignItems:'center'
    },

    oval2:{
        position:'absolute',
        width:100,
        height:100,
        backgroundColor:'#ff7e07',
        
    },

    oval1:{
        position:'absolute',
        width:350,
        height:350,
        backgroundColor:'#ff7e07',
        borderRadius:300,
        top:-30,
        left:-10
    },
    container:{
        flex:1,
        backgroundColor:'black',
        padding:20
    }
})