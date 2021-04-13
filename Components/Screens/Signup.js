import React, { Component } from 'react'
import { View,Text, StyleSheet ,TouchableOpacity, TextInput,ScrollView,Picker,ToastAndroid,Animated} from 'react-native'
import {AntDesign, Ionicons,FontAwesome5,FontAwesome,Fontisto,Entypo} from '@expo/vector-icons'
import * as Location from 'expo-location'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button } from 'react-native-elements'
import firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay'

class Signup extends Component {
    constructor(props){
        super(props)
            this.scrollY=new Animated.Value(0)
            this.translateY=this.scrollY.interpolate({
                inputRange:[0,200],
                outputRange:[0,-200]
            })
            this.state={
                name:'',
                mobile:'',
                email:'',
                location:'',
                errormessage:'',
                dob:'select',
                dobinobject:'',
                dobpickervisibility:false,
                sex:'male/female',
                age:null,
                blood:'',
                street:'',
                place:'',
                district:'',
                pincode:'',
                city:'',
                page:1,
                guardaianname:'',
                guardiannumber:'',
                guardianlocation:'',
                guardiandistrict:'',
                relation:'',
                password:'',
                confirmpass:'',
                loading:false
            }
    }
    
    showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
          "Signup Successfull",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          
          50,
          50
        );
      };
    handlenext=()=>{
        if(this.state.page==1){
            return this.setState({page:2})
        }
        else{
            this.setState({loading:true})
            var auth=firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(),this.state.password)
            auth.then(async res=>{
                var database=firebase.firestore().collection('Elders').doc(this.state.mobile)
                await database.get().then(doc=>{
                    if(doc.exists){
                        this.setState({loading:false})
                        alert("Mobile number already present")
                    }
                    else{
                        database.set({
                            name:this.state.name,
                            mobile:this.state.mobile,
                            email:this.state.email,
                            sex:this.state.sex,
                            blood:this.state.blood,
                            dob:this.state.dob,
                            age:this.state.age,
                            street:this.state.street,
                            place:this.state.place,
                            city:this.state.city,
                            district:this.state.district,
                            pincode:this.state.pincode,
                            guardaianname:this.state.guardaianname,
                            guardiannumber:this.state.guardiannumber,
                            relation:this.state.relation,
                            guardianlocation:this.state.guardianlocation,
                            guardiandistrict:this.state.guardiandistrict,
                            
                        }).then(res=>{
                            this.setState({loading:false})
                            this.showToastWithGravityAndOffset()
                        }).catch(err=>{
                            this.setState({loading:false})
                            alert(err.message)
                        })
                    }
                })
                
            }).catch(err=>{
                alert(err.message)
                this.setState({loading:false})
            })
        }
    }
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
               city:object.city
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
                <View style={styles.oval1}></View>

                    <View style={styles.one}>

                        <Text style={styles.signuptext}>Signup</Text>
                        {this.state.page==1
                        ? <Text style={styles.primarytext}>Personal info</Text>
                        : <Text style={styles.primarytext}>Guardian info</Text>
                        }
                        
                    </View>

                <View style={styles.two}>
                        <ScrollView keyboardDismissMode='' onScroll={(e)=>this.scrollY.setValue(e.nativeEvent.contentOffset.y)}>
                        {this.state.page==1
                    ? <View>
                    <View>
                        <Text style={styles.inputtext}>Name</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.name} onChangeText={(e)=>this.setState({name:e})}/> 
                            <Ionicons name="person" size={22} style={styles.inputicon}/>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Mobile number</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} keyboardType="number-pad" value={this.state.mobile} onChangeText={(e)=>this.setState({mobile:e})} /> 
                            <FontAwesome5 name="mobile" size={24} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Email address</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.email} onChangeText={(e)=>this.setState({email:e})}/> 
                            <Ionicons name="mail" size={22} style={styles.inputicon}/>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Sex</Text>
                        <View style={styles.inputbox}>
                            <Picker selectedValue={this.state.sex} onValueChange={(e)=>this.setState({sex:e})}
                            style={{height:33,color:'white',width:150,flex:1,paddingLeft:10}} itemStyle={{backgroundColor:'black',color:'red'}}>
                                <Picker.Item label="Male" value="Male"  />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                            <Fontisto name="intersex" size={24} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Blood group</Text>
                        <View style={styles.inputbox}>
                            <Picker selectedValue={this.state.blood} onValueChange={(e)=>this.setState({blood:e})}
                            style={{height:33,color:'white',width:150,flex:1,paddingLeft:10}} itemStyle={{backgroundColor:'black',color:'red'}}>
                                <Picker.Item label="O+" value="O+"  />
                                <Picker.Item label="O-" value="O-"  />
                                <Picker.Item label="A+" value="A+"  />
                                <Picker.Item label="A-" value="A-"  />
                                <Picker.Item label="B+" value="B+"  />
                                <Picker.Item label="B-" value="B-"  />
                                <Picker.Item label="AB+" value="AB+"  />
                                <Picker.Item label="AB-" value="AB-"  />
                            </Picker>
                            <Fontisto name="blood" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View >
                        <Text style={styles.inputtext}>Date of Birth</Text>
                        <View style={styles.inputbox} >
                        <Button title={this.state.dob} style={styles.input} titleStyle={{color:'white'}} onPress={()=>{
                    
                            this.setState({dobpickervisibility:true})}} type="clear"/>
                            <DateTimePickerModal isVisible={this.state.dobpickervisibility} onConfirm={(e)=>{
                                let fulldate=e.getDate()+"-"+e.getMonth()+"-"+e.getFullYear()
                                this.setState({dob:fulldate})
                                this.setState({dobinobject:e})
                                this.setState({dobpickervisibility:false})
                                //calculating age
                                let time=e.getTime()
                                let monthdiff=Date.now()-time
                                let ageindate=new Date(monthdiff)
                                let year=ageindate.getFullYear()
                                let age=Math.abs(year-1970)
                                let strofage=`${age}`
                                this.setState({age:strofage})
                            }} onCancel={()=>{
                                this.setState({dobpickervisibility:false})
                            }}  />
                    
                            <FontAwesome name="birthday-cake" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Age</Text>
                        <View style={styles.inputbox} >
                            <TextInput  placeholderTextColor="white" style={styles.input} keyboardType="number-pad" value={this.state.age} onChangeText={(e)=>this.setState({age:e})}/> 
                            <Fontisto name="person" size={22} style={styles.inputicon} />
                       </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Street</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.street} onChangeText={(e)=>this.setState({street:e})}/> 
                            <FontAwesome5 name="street-view" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Place</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.place} onChangeText={(e)=>this.setState({place:e})}/> 
                            <Entypo name="address" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>City</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.city} onChangeText={(e)=>this.setState({city:e})}/> 
                            <FontAwesome5 name="street-view" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>District</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.district} onChangeText={(e)=>this.setState({district:e})}/> 
                            <Entypo name="location-pin" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Pincode</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.pincode} onChangeText={(e)=>this.setState({pincode:e})}/> 
                            <Entypo name="pin" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    </View>
                    : <View>
                    <View>
                        <Text style={styles.inputtext}>Guardian name</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.guardaianname} onChangeText={(e)=>this.setState({guardaianname:e})}/> 
                            <Ionicons name="person" size={22} style={styles.inputicon}/>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputtext}>Mobile number</Text>
                        <View style={styles.inputbox}>
                            <TextInput placeholder="" placeholderTextColor="white" style={styles.input} keyboardType="number-pad" value={this.state.guardiannumber} onChangeText={(e)=>this.setState({guardiannumber:e})}/> 
                            <FontAwesome5 name="mobile" size={22} style={styles.inputicon} />
                        </View>
                    </View>
                    <View>
                            <Text style={styles.inputtext}>Relationship</Text>
                            <View style={styles.inputbox}>
                                <Picker selectedValue={this.state.relation} onValueChange={(e)=>this.setState({relation:e})}
                                style={{height:33,color:'white',width:150,flex:1,paddingLeft:10}} itemStyle={{backgroundColor:'black',color:'red'}}>
                                    <Picker.Item label="Son" value="Son"  />
                                    <Picker.Item label="Daughter" value="Daughter" />
                                    <Picker.Item label="Daughter in law" value="Daughter in law" />
                                    <Picker.Item label="Son in law" value="Son in law" />
                                    <Picker.Item label="Grand children" value="Grand children" />
                                    <Picker.Item label="Friend" value="Friend" />
                                    <Picker.Item label="Neighbour" value="Neighbour" />
                                    <Picker.Item label="Other relation" value="Other relation" />
                                </Picker>
                                <FontAwesome5 name="people-arrows" size={22} style={styles.inputicon} />
                            </View>
                        </View>
                    <View>
                            <Text style={styles.inputtext}>Place</Text>
                            <View style={styles.inputbox}>
                                <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.guardianlocation} onChangeText={(e)=>this.setState({guardianlocation:e})}/> 
                                <Entypo name="address" size={22} style={styles.inputicon} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputtext}>District</Text>
                            <View style={styles.inputbox}>
                                <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.guardiandistrict} onChangeText={(e)=>this.setState({guardiandistrict:e})}/> 
                                <Entypo name="location-pin" size={22} style={styles.inputicon} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputtext}>Password</Text>
                            <View style={styles.inputbox}>
                                <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.password} onChangeText={(e)=>this.setState({password:e})}/> 
                                <FontAwesome5 name="lock" size={22} style={styles.inputicon} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputtext}>Confirm password</Text>
                            <View style={styles.inputbox}>
                                <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.confirmpass} onChangeText={(e)=>this.setState({confirmpass:e})}/> 
                                <FontAwesome5 name="lock" size={22} style={styles.inputicon} />
                            </View>
                        </View>
                     </View>
                    }
                        </ScrollView>
                    
                </View>
                <View style={styles.three}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity >
                            {this.state.page==1 
                            ? <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                                <Text style={{fontSize:20,color:'white',paddingVertical:10}}>LOGIN</Text>
                              </TouchableOpacity>
                            : <TouchableOpacity onPress={()=>this.setState({page:1})}>
                                <Text  style={{fontSize:20,color:'white',paddingVertical:10}} >Back</Text>
                               </TouchableOpacity> 
                            }
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#FF7E07',paddingVertical:10,borderRadius:20,paddingHorizontal:20}} onPress={()=>this.handlenext()}>
                            {
                                this.state.page==1
                                ? <Text style={{fontSize:20,color:'white',margin:3}} >Next</Text>
                                : <Text style={{fontSize:20,color:'white',margin:3}} >Sign up</Text>
                            }
                            <AntDesign name="arrowright" size={22} color="white" style={{margin:5}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    inputtext:{
        color:'white',
        fontSize:20,
        fontWeight:'600',
        marginBottom:10
    },
    inputbox:{
       flexDirection:'row',
       borderBottomColor:'#Ff7E07',
       borderBottomWidth:2,
       justifyContent:'space-between',
       width:300,
       marginBottom:25
    },
    input:{
        fontSize:20,
        paddingLeft:10,
        color:'white',
        flex:1
    },
    inputicon:{
        color:'#Ff7E07'
    },
    container:{
        flex:1,
        backgroundColor:'#FF7E07',
        padding:20
    },
    oval:{
        position:'absolute',
        backgroundColor:'#FF7E07',
        width:700,
        height:700,
        borderRadius:700,
        top:-620,
        left:-150
    },
    oval1:{
        position:'absolute',
        backgroundColor:'black',
        width:700,
        height:1200,
        borderRadius:700,
        top:35,
        left:-150 
    },
    signuptext:{
        fontSize:35,
        color:'white',
        fontWeight:'bold',
        
    },
    primarytext:{
        fontSize:23,
        color:'white',
        fontWeight:'600'  ,
        marginBottom:20  
    },
    one:{
        height:150,
        justifyContent:'flex-end'
    },
    two:{
        flex:8,
        padding:20,
        height:900,
        alignItems:'center',
        justifyContent:'center'
    },
    three:{
        flex:1,
        justifyContent:'center'
    }
})
export default Signup