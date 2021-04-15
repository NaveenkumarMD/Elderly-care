import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import {View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native'
import { AntDesign,Feather,Ionicons,MaterialIcons,Entypo,MaterialCommunityIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar'
class Elderabout extends Component {
    constructor(props){
        super(props)
        this.state={
            userdata:{},
        }
    }
    async componentDidMount(){
        AsyncStorage.getItem('userdata').then(data=>{
            console.log(JSON.parse(data))
            this.setState({userdata:JSON.parse(data)})
        })
    }
    render() {


        return (
            <View style={styles.container}>
                <StatusBar style="auto"/>

                <View style={styles.one}>
                    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10,padding:5}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'white',fontSize:24,marginTop:10}}>{this.state.userdata.name ||'name'}</Text>
                            <Text style={{color:'white',marginTop:3}}>+91 {this.state.userdata.mobile ||'mail'}</Text>
                            <View style={{flexDirection:'row',marginTop:10,}}>
                                <Text style={{color:'#ff7e07'}}>view activity</Text>
                                <AntDesign name="caretright" size={10} style={{color:'#ff7e07',margin:3}} />
                            </View>
                            
                        </View>
                        <View>
                            <Image source={require('../../assets/icon.png')} style={{width:90,height:90}}/>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.two}>
                    <View style={{flexDirection:'row',paddingHorizontal:30,justifyContent:'space-around',paddingVertical:6}}>
                        <View style={{alignItems:'center'}}>
                            <Ionicons name="notifications-outline" size={22} style={{color:'white'}}  />
                            <Text style={{color:'white'}}>Notifications</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <MaterialIcons name="favorite-border" size={22} style={{color:'white'}} />
                            <Text style={{color:'white'}}>Favourites</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Feather name="settings" size={22} style={{color:'white'}} /> 
                            <Text style={{color:'white'}}>Settings</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.three}>
                    <View style={{flexDirection:'row'}}>
                        <View></View>
                        <Feather name="star" size={17} style={{color:'white',backgroundColor:'#3a3b3d',borderRadius:20,padding:3}} />
                        <Text style={{color:'white',fontSize:18,paddingLeft:10}}>Your ratings</Text>
                    </View>
                </View>
                <View style={styles.four}>
                    <Text style={{color:'#898a8c',fontSize:16,marginTop:2}}>PERSONAL INFO</Text>
                    <ScrollView style={{marginTop:20}}>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <AntDesign name="medicinebox" size={17} style={{color:'white',padding:3}} />
                            <Text style={{color:'white',fontSize:18,paddingLeft:8,padding:3}}>Medical history</Text>
                        </View>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <Entypo name="location" size={17} style={{color:'white',padding:3}}/>
                            <Text style={{color:'white',fontSize:18,paddingLeft:8,padding:3}}>Address</Text>
                        </View>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <MaterialIcons name="security" size={17} style={{color:'white',padding:3}} />
                            <Text style={{color:'white',fontSize:18,paddingLeft:8,padding:3}}>Guardian info</Text>
                        </View>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <MaterialCommunityIcons name="information-variant"  size={17} style={{color:'white',padding:3}} />
                            <Text style={{color:'white',fontSize:18,paddingLeft:8,padding:3}}>About</Text>
                        </View>
                        <View style={{flexDirection:'row',marginVertical:10}}>

                            <Text style={{color:'white',fontSize:18,paddingLeft:8,padding:3}}>Logout</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default Elderabout
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        paddingHorizontal:10,
     
    },
    one:{
        height:140,
        borderBottomColor:'#28292b',
        borderBottomWidth:2
    },
    two:{
        height:90,
        borderBottomColor:'#28292b',
        borderBottomWidth:2 ,
        justifyContent:'center'       
    },
    three:{
        height:70,
        justifyContent:'center',
        borderBottomColor:'#28292b',
        borderBottomWidth:2,
        padding:10   
    },
    four:{
        flex:2,
        borderBottomColor:'#28292b',
        borderBottomWidth:2,
        padding:10  
    }
})
class Myleftcomponent extends React.Component{
    render(){
        return(
            <Entypo name="menu" size={24} color="white" style={{ flex: 1 }}  />
        )
    }

}