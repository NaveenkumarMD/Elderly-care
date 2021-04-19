import React, { Component } from 'react'
import {  StyleSheet, Text, TextInput, View,TouchableOpacity,ToastAndroid } from 'react-native'
import { FontAwesome5,Entypo,AntDesign,Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay'
class Login extends Component {
    constructor(props){
        super(props)
        this.state={
          mobile:'',
          password:'',
          role:'',
          loading:false
        }
    }

    handleloginpress=()=>{
        if(!this.state.mobile ||!this.state.password){
            return alert("Check password and mail")
        }
        this.setState({loading:true})
        firebase.firestore().collection(this.state.role).doc(this.state.mobile).get().then(async doc=>{
            if(!doc.exists){
                alert("No account found")
                
                this.setState({loading:false})
            }
            else{
                //console.log(doc.data().email)
                console.log(doc.data())
                await AsyncStorage.setItem('userdata',JSON.stringify(doc.data()))
                firebase.auth().signInWithEmailAndPassword(doc.data().email.trim(),this.state.password).then(res=>{
                    this.setState({loading:false})
                    this.showToastWithGravityAndOffset()
                }).catch(err=>{
                    alert(err.message)
                    this.setState({loading:false})
                })
            }
        })
        
    }
    handlesignuppress=async()=>{
        if(this.state.role=='Elders'){
            this.props.navigation.navigate('Signup')
        }
        else{
            this.props.navigation.navigate('Helpersignup')
        }
    }
    showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
          "Login Successfull",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          
          50,
          50
        );
        if(this.state.role=='Elders'){
            //alert("send")
            this.props.navigation.navigate('Main')
        }
        else{
            this.props.navigation.navigate('Helpermain')
        }
      };
    async componentDidMount(){
        let role=await AsyncStorage.getItem('role')
        if(role=='Elder'){
            await this.setState({role:'Elders'})
        }
        if(role=='Helper'){
            await this.setState({role:'Helpers'})
        }
        if(role==null){
            this.props.navigation.navigate('Elderorhelper')
        }
        try {
            await AsyncStorage.getItem('userdata').then(data=>{
                var jsondata=JSON.parse(data)
                if(jsondata!=undefined && jsondata!=null){
                    if(role=='Elder' && jsondata.blood){
                        this.props.navigation.navigate('Main')
                    }
                    if(role=='Helper' && jsondata.aadhar){
                        this.props.navigation.navigate('Helpermain')
                    }

                }
            })
        } catch (error) {
            
        }
    }
    render() {

        return (
            <View style={loginstyles.container}>
                <Spinner visible={this.state.loading}/>
              <View style={loginstyles.oval}>
              
              </View>
              <View style={loginstyles.one}>
              
                <Text style={loginstyles.welcome}>Welcome</Text>
                <Text style={loginstyles.back}>Back!</Text>
                
              </View>
              <View style={loginstyles.two}>
                        <View style={loginstyles.box}>
                        <FontAwesome5 name="mobile" size={22} color="#FF7E07" style={loginstyles.inputicon} />
                       
                            <TextInput placeholder="Mobile" style={loginstyles.input1} placeholderTextColor="#FF7E07"  keyboardType="numeric" onChangeText={(e)=>this.setState({mobile:e})}/>
                            
                        </View>
                        <View style={loginstyles.box1}>
                        <Entypo name="lock" size={22} color="white"  style={loginstyles.inputicon}/>
                       
                            <TextInput placeholder="Password" style={loginstyles.input2} placeholderTextColor="white"  secureTextEntry={!this.state.passwordvisisble} onChangeText={e=>this.setState({password:e})}/>
                            {this.state.passwordvisisble ? < Feather name="eye-off" size={22} color="white" style={loginstyles.inputicon} onPress={()=>this.setState({passwordvisisble:false})}/> : <AntDesign name="eye" size={22} color="white" style={loginstyles.inputicon}  onPress={()=>this.setState({passwordvisisble:true})}/>
                            
                            }
                            
                            
                        </View>

                        <View style={loginstyles.forgotpassview}>
                            <Text style={loginstyles.forgotpasstext}>Forgot password?</Text>
                        </View> 
            </View>

              <View style={loginstyles.three}>
                            <View>
                                <TouchableOpacity style={{marginTop:16}} onPress={()=>this.handlesignuppress()}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}} >SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>this.handleloginpress()} style={{borderColor:'#FF7E07',borderWidth:2,backgroundColor:'#FF7E07',paddingHorizontal:15,paddingVertical:5,borderRadius:20,marginBottom:20,flexDirection:'row'}}>
                                    <Text style={{color:'white',fontSize:22,margin:10}}>Login</Text>
                                    <AntDesign name="arrowright" size={24} color="white" style={{margin:10}}/>
                                </TouchableOpacity>     
                            </View>
              </View>

            </View>
        )}

    
}
const loginstyles=StyleSheet.create({
    forgotpassview:{
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    forgotpasstext:{
        color:'#FF7E07',
        left:80
        
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
    },
    welcome:{
        color:'white',
        fontWeight:'bold',
        fontSize:40,
   
    },
    back:{
        color:'white',
        fontWeight:'bold',
        fontSize:40,
      
           
    },    box:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:'#FF7E07',
        height:60,
        width:300,
        borderRadius:40,
        marginBottom:30
        
    },
    box1:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
        height:60,
        width:300,
        borderRadius:40,
        marginBottom:30
        
    },
    input1:{
        fontSize:20,
        paddingLeft:5,
        paddingVertical:10,
        margin:2,
        flex:1,
        color:'#FF7E07'
    },
    input2:{
        fontSize:20,
        paddingLeft:5,
        paddingVertical:10,
        margin:2,
        flex:1,
        color:'white'
    },
    inputicon:{
        margin:17,
        marginLeft:20
    },
    eye:{
        margin:10
    },


    checkboxcontainer:{
        flexDirection:'row',
        color:'white'
    },
    CheckBox:{
        alignSelf:"center"
    },
    heading:{
        fontSize:40,
        fontWeight:'100',
        color:'white',
        opacity:1
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
        backgroundColor:'black',
        
    },
    one:{
        flex:10,    
        justifyContent:'flex-end'
       
    },
    two:{
        flex:10,
        alignItems:'center',
        justifyContent:'center'
        
    },
    three:{
        flex:3,  
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-around'
        
       
    },

    
})
export default Login
