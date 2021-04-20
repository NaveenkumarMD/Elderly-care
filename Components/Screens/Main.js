import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TouchableHighlight , Image, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons ,Fontisto} from '@expo/vector-icons'
import { Badge, Icon } from 'react-native-elements'
import * as Location from 'expo-location'
import firebase from 'firebase'
var screen = Dimensions.get('screen')
var width = screen.width
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: {
                'name': 'naveenkumar',
                'mobile': 8870499146
            },
            role: '',
            street:'',
            place:'',
            pincode:'',
            district:'',
            city:''
        }
    }
    findlocation=async ()=>{
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          alert("Location access denied")
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
            firebase.firestore().collection('Elders').doc(this.state.userdata.mobile).set({
                street:object.street,
                place:object.name,
                district:object.subregion,
                pincode:object.postalCode ,
                city:object.city,
                latitude:coordinates.latitude,
                longitude:coordinates.longitude
            },{merge:true}).then((res)=>{
                console.log("success")
            }).catch((err)=>{
                alert(err.message)
            })
            
        })
    }

    async componentDidMount() {
        
        const userdata = await AsyncStorage.getItem('userdata').then(data => {
            console.log(JSON.parse(data))
            this.setState({userdata:JSON.parse(data)})
        })
        const role = await AsyncStorage.getItem('role').then(data => {
            console.log(data)
            this.setState({ role: data })
        })
        this.findlocation()
        const token=await AsyncStorage.getItem('token').then(token=>{
            firebase.firestore().collection('Elders').doc(this.state.userdata.mobile).set({token:token},{merge:true}).then(res=>{
                console.log("saved token",token)
            })
        })
        

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.oval3}></View>
                <View style={styles.one}>
                    <View style={styles.oval1}></View>
                    <View style={styles.oval2}></View>
                    <TouchableOpacity style={{  marginTop: 35, padding: 20, }}>
                       
                        <View style={{alignItems:'flex-end'}}>
                            <Ionicons name="notifications" size={24} color="white" />
                            <Badge status="warning" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', padding: 20,marginVertical:20 }}>
                        <View>
                            <Ionicons name="ios-location-sharp" size={40} color="white" />
                            
                        </View>
                        <View style={{ paddingHorizontal: 0, marginTop: 0 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Location</Text>
                            <Text style={{ color: 'white' }}>{this.state.userdata.place}</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.optionscontainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Ionicons name="ios-newspaper" size={24} color="white" />
                                    <Text style={{ color: 'white' }}>History</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Fontisto name="favorite" size={24} color="white" />
                                    <Text style={{ color: 'white' }}>Favourites</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=>this.props.navigation.navigate('Profile')}>
                                    <Entypo name="info-with-circle" size={24} color="white" />
                                    <Text style={{ color: 'white' }}>About</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.2 }}></View>
                <View style={styles.two}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around' }}>
                        <ScrollView>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 20 }} onPress={()=>this.props.navigation.navigate('Essentialslanding')}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'red', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialIcons name="local-grocery-store" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Essentials</Text>
                            </TouchableOpacity >
                            <TouchableOpacity  style={{ flexDirection: 'row', paddingTop: 20 }}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'orange', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialIcons name="home-repair-service" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Works</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 20 }}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'brown', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialIcons name="phone-in-talk" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Counselling</Text>
                            </TouchableOpacity >

                            <TouchableOpacity  style={{ flexDirection: 'row', paddingTop: 20 }} onPress={()=>this.props.navigation.navigate('Medicinelanding')}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'indigo', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                    <FontAwesome5 name="notes-medical" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Medicine</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 20 }}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'green', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-fast-food-sharp" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Food</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 20 }} onPress={()=>this.props.navigation.navigate('Travellanding')}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'dodgerblue', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                    <FontAwesome name="car" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Travel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 20 }}>
                                <View style={{ height: 50, width: 50, backgroundColor: 'pink', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialIcons name="add" size={24} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 22, paddingVertical: 10, paddingHorizontal: 10 }}>Any other</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        <View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}></Text>
                    </View>
                </View>
                <View style={styles.three}>

                </View>
            </View>

        )
    }
}
export default Main
const styles = StyleSheet.create({
    optionscontainer: {
        backgroundColor: 'black',
        height: 150,
        width: width - 40,
        borderRadius: 20,
        opacity: 1,
        position: 'absolute',
        justifyContent: 'center'

    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 0
    },
    one: {
        flex: 4,
        backgroundColor: '#ff7e07',
        opacity: 0.9,
        borderBottomStartRadius: 60,
        borderBottomEndRadius: 60,

    },
    two: {
        flex: 6.5,
        justifyContent: 'center',
        marginTop: 20,
        paddingLeft: 0

    },
    three: {
        flex: 0
    },
    oval1: {
        position: 'absolute',
        backgroundColor: '#ff7e07',
        height: 300,
        width: 300,
        top: -100,
        right: -120,
        borderRadius: 600,
        borderWidth: 50,
        borderColor: 'white',
        opacity: 0.1
    },
    oval2: {
        position: 'absolute',
        backgroundColor: '#ff7e07',
        height: 200,
        width: 200,
        top: 60,
        left: -80,
        borderRadius: 600,
        borderWidth: 50,
        borderColor: 'white',
        opacity: 0.1
    },
    oval3: {
        position: 'absolute',
        backgroundColor: 'white'
    }

})
