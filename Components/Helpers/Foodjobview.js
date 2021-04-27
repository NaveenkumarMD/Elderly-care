import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native'
import firebase from 'firebase'
import { AntDesign, SimpleLineIcons, Entypo, Ionicons, Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sendPushNotification } from '../../App'
import call from 'react-native-phone-call'
const screen = Dimensions.get("screen")
var width = screen.width
class Foodjobview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:{},
            userdata: {},
            type: '', id: '', modalvisible: false,
            helperdata: {}, accepted: false, orderdetails: {}
        }
    }
    whatsapp = (id) => {
        console.log(parseInt(id))
        Linking.openURL(`whatsapp://send?text=&phone=+91${parseInt(id)}`)
    }
    call = (id) => {
        const args = {
            number: id,
            prompt: false
        }
        call(args).catch(err => {
            alert(err.message)
        })
    }
    handleaccept = () => {
        firebase.firestore().collection(this.state.type).doc(this.state.id).set({
            status: { Accepted: true }, Helperid: this.state.helperdata.mobile, Helpername: this.state.helperdata.name
        }, { merge: true }).then(res => {
            this.props.navigation.navigate('Acceptedjobs')
            sendPushNotification(this.state.userdata.token, { title: 'Request Accepted', body: `${this.state.helperdata.name} accepted your request` })
        })
    }
    handledecline = () => {
        firebase.firestore().collection(this.state.type).doc(this.state.id).set({
            Declined: { [this.state.helperdata.mobile]: true }
        }, { merge: true })
        this.props.navigation.navigate('Viewjobs')
    }
    componentDidMount = async () => {
        AsyncStorage.getItem('userdata').then(data => {
            this.setState({ helperdata: JSON.parse(data) })
            //console.log(data)
        })
        var routedata = this.props.route.params.data
        console.log(routedata)
        this.setState({ accepted: routedata.accepted })
        this.setState({ type: routedata.type, id: routedata.id })
        firebase.firestore().collection(this.props.route.params.data.type).doc(this.props.route.params.data.id).onSnapshot(doc => {
            //console.log(doc.data())
            firebase.firestore().collection('Elders').doc(doc.data().Elderid).onSnapshot(doc1 => {
                // console.log(doc1.data())
                this.setState({ userdata: doc1.data() })
            })
            this.setState({ orderdetails: doc.data(),data:doc.data().routedata })

        })
    }
    render() {
        console.log(this.state.orderdetails)

        return (

            <View style={styles.container}>
                <ScrollView>
                    <View style={{ backgroundColor: 'black', height: 200 }}>
              
                            <Image source={require('../../assets/food.png')} style={styles.image} />
                       

                    </View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={{ color: 'white' }}>{this.state.orderdetails.Daterequested}</Text>
                        <Text style={{ color: 'white' }}>{this.state.orderdetails.Timerequested}</Text>
                    </View>
                    <View style={{ padding: 10, borderBottomColor: '#424242', borderBottomWidth: 2}}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Type of work</Text>
                        <View >
                            <Text style={{ color: 'white', fontSize: 20, marginVertical: 20, paddingHorizontal: 40 }}>{this.props.route.params.data.type}</Text>
                        </View>

                    </View>

                    <View style={{ borderBottomColor: '#3d3d3d', borderBottomWidth: 1 }}>
                        <Text style={{ color: 'white', fontSize: 24, padding: 10, fontWeight: 'bold' }}>Elder info</Text>
                        <View style={{ padding: 5, paddingLeft: 20 }}>
                            <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>Name:{this.state.userdata.name}</Text>
                            <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>Age:{this.state.userdata.age}</Text>
                            <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>Mobile:{this.state.userdata.mobile}</Text>

                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#3d3d3d', borderBottomWidth: 1 }}>
                        <Text style={{ color: 'white', fontSize: 24, padding: 10, fontWeight: 'bold' }}>Food details</Text>
                        <View style={{ padding: 5, paddingLeft: 20 }}>
                            <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>{this.state.orderdetails.food}</Text>


                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#3d3d3d', borderBottomWidth: 1 }}>
                        <Text style={{ color: 'white', fontSize: 24, padding: 10, fontWeight: 'bold' }}>Notes</Text>
                        <View style={{ padding: 5, paddingLeft: 20 }}>
                            <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>{this.state.orderdetails.notes}</Text>
                            <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>Expected time: {this.state.orderdetails.time}</Text>


                        </View>
                    </View>

                    <View style={{ marginBottom: 10, borderBottomColor: '#3d3d3d', borderBottomWidth: 1, paddingBottom: 10, padding: 10 }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Location</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                            <View style={{ height: 40, width: 40, backgroundColor: 'indigo', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <SimpleLineIcons name="location-pin" size={24} color="white" />
                            </View>
                            <View>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.street || '-'}</Text>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.place || '-'}</Text>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.city || '-'}</Text>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.district || '-'} - {this.state.userdata.pincode || '-'}</Text>

                            </View>

                        </View>

                    </View>


                    {!this.state.accepted &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <TouchableOpacity style={styles.decline} onPress={() => this.handledecline()}>
                                <Text style={{ color: 'white', fontSize: 20, paddingHorizontal: 10 }}>Decline</Text>
                                <AntDesign name="close" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.accept} onPress={() => this.handleaccept()}>
                                <Text style={{ color: 'white', fontSize: 20, paddingHorizontal: 10 }}>Accept</Text>
                                <AntDesign name="check" size={20} color="white" />
                            </TouchableOpacity>
                        </View>}
                    {this.state.accepted &&
                        <View>
                            <Text style={{ color: 'white', fontSize: 24, padding: 10 }}>Contact</Text>
                            <View style={{ padding: 10 }}>
                                <Text style={{ color: 'white', fontSize: 22 }}>{this.state.userdata.name}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: '#424242', borderBottomWidth: 2 }} onPress={() => this.whatsapp(this.state.userdata.mobile)}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>whatsapp</Text>
                                    <Ionicons name="ios-logo-whatsapp" size={24} color="green" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: '#424242', borderBottomWidth: 2 }} onPress={() => this.call(this.state.userdata.mobile)}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>Call</Text>
                                    <Feather name="phone-call" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>

            </View>
        )
    }
}
export default Foodjobview
const styles = StyleSheet.create({
    accept: {
        backgroundColor: 'green',
        height: 50,
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 2,
        flexDirection: 'row',
        borderRadius: 40
    },
    decline: {
        backgroundColor: 'red',
        height: 50,
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        flexDirection: 'row',
        borderRadius: 40
    },
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    image: {
        width: width,
        height: 200,
    }
})
