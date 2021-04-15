import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity ,TextInput,ScrollView,ToastAndroid,ActivityIndicator} from 'react-native'
import { Ionicons,FontAwesome,FontAwesome5,MaterialIcons,Entypo } from '@expo/vector-icons'
import * as Location from 'expo-location'
import firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay'
class Helpersignup extends Component {
    constructor(props){
        super(props)
        this.state={
            street:'',
            place:'',
            district:'',
            pincode:'',
            city:'',
            password:'',
            confirmpass:'',
            name:'',
            mobile:'',
            email:'',
            aadhar:'',
            loading:false,
            latitude:'',longitude:''
        }
    }
    handlelogin=()=>{
        this.setState({loading:true})
        let auth=firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(),this.state.password)
        auth.then(async res=>{

            let database=firebase.firestore().collection('Helpers').doc(this.state.mobile)
            await database.get().then(doc=>{
                if(doc.exists){
                    this.setState({loading:false})
                    return alert("Mobile number already present")
                   
                }
                else{
                    database.set({
                        street:this.state.street,
                        place:this.state.place,
                        district:this.state.district,
                        pincode:this.state.pincode,
                        city:this.state.city,
                        name:this.state.name,
                        mobile:this.state.mobile,
                        email:this.state.email,
                        aadhar:this.state.aadhar,
                        latitude:this.state.latitude,
                        longitude:this.state.longitude
                    }).then(data=>{
                        this.showToastWithGravityAndOffset()
                        this.props.navigation.navigate('Helpermain')
                    }).catch(err=>{
                        alert(err.message)
                        this.setState({loading:false})
                    })
                }
            })
            
        }).catch(err=>{
            alert(err.message)
            this.setState({loading:false})
        })
    }
    showToastWithGravityAndOffset = () => {
        this.setState({loading:false})
        ToastAndroid.showWithGravityAndOffset(
          "Sign up Successfull",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          
          50,
          50
        );
      };
    findlocation=async ()=>{
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          this.setState({errormessage:"Permission not granted"})
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({location:location.coords})
        console.log(location.coords)
        let coordinates={
            latitude:location.coords.latitude, 
            longitude:location.coords.longitude,
        }
        Location.reverseGeocodeAsync(coordinates).then(data=>{
            let object=data[0]
            console.log(data[0])
            this.setState({
               street:object.street,
               place:object.name,
               district:object.subregion,
               pincode:object.postalCode ,
               city:object.city,
               latitude:coordinates.latitude,
               longitude:coordinates.longitude
            })
            
        })
    }
    componentDidMount(){
        this.findlocation()
    }
    render() {
        return (
            <View style={styles.container}>
            <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/>
                <View style={styles.oval}></View>
                <View style={styles.one}>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Sign up</Text>
                </View>
                <View style={styles.two}>
                    <ScrollView>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Name" placeholderTextColor="white" value={this.state.name} onChangeText={(e)=>this.setState({name:e})}/>
                                <Ionicons name="person" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Mobile number" placeholderTextColor="white" value={this.state.mobile} onChangeText={(e)=>this.setState({mobile:e})} keyboardType="numeric"/>
                                <FontAwesome5 name="mobile" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="white" value={this.state.email} onChangeText={(e)=>this.setState({email:e})}/>
                                <Ionicons name="mail" size={22} style={styles.icon}/>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Aadhar number" placeholderTextColor="white" value={this.state.aadhar} onChangeText={(e)=>this.setState({aadhar:e})} keyboardType="numeric"/>
                                <MaterialIcons name="perm-identity" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="white" value={this.state.password} onChangeText={(e)=>this.setState({password:e})}/>
                                <FontAwesome5 name="lock" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Confirm password" placeholderTextColor="white" value={this.state.confirmpass} onChangeText={(e)=>this.setState({confirmpass:e})}/>
                                <FontAwesome5 name="lock" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Street" placeholderTextColor="white" value={this.state.street} onChangeText={(e)=>this.setState({street:e})}/>
                                <FontAwesome5 name="street-view" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Place" placeholderTextColor="white" value={this.state.place} onChangeText={(e)=>this.setState({place:e})}/>
                                <Entypo name="address" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="City" placeholderTextColor="white" value={this.state.city} onChangeText={(e)=>this.setState({pincode:city})}/>
                                <FontAwesome5 name="street-view" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="District" placeholderTextColor="white" value={this.state.district} onChangeText={(e)=>this.setState({district:e})}/>
                                <Entypo name="location-pin" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.input} placeholder="Pincode" placeholderTextColor="white" value={this.state.pincode} onChangeText={(e)=>this.setState({pincode:e})} keyboardType="numeric"/>
                                <Entypo name="pin" size={24} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                </View>
                <View style={styles.three}>
                    <View style={styles.bottombar}>
                        <TouchableOpacity style={styles.loginbutton} onPress={()=>this.props.navigation.navigate('Login')}>
                            <Text style={{ color: 'white', fontSize: 20 }}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupbutton} onPress={()=>this.handlelogin()}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Sign up</Text>
                            <FontAwesome name="sign-in" size={22} color="white" style={{margin:2,marginLeft:6}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default Helpersignup
const styles = StyleSheet.create({
    input:{
        fontSize:20,
        color:'white',
        paddingVertical:12,
        paddingHorizontal:20,
        flex:1
    },
    inputbox:{
        width:300,
        height:60,
        borderWidth:1,
        borderColor:'#ff7e07',
        borderRadius:40,
        flexDirection:'row',
        marginBottom:20
    },
    icon:{
        color:'#ff7e07',
        paddingVertical:14,
        paddingHorizontal:20

    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20
    },
    oval: {
        position: 'absolute',
        width: 652,
        height: 650,
        left: -230,
        top: -523,
        backgroundColor: '#FF7E07',
        borderRadius: 300
    },
    one: {
        flex: 2,
        justifyContent: 'flex-end',
        
    },
    two: {
        flex: 7,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:30
    },
    three: {
        flex: 1,
        justifyContent:'center',

    },
    bottombar: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    signupbutton: {
        borderColor: '#ff7e07',
        borderWidth: 1,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#ff7e07',
        flexDirection:'row'
    },
    loginbutton: {
        paddingVertical: 10
    }

})