import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native'
import firebase from 'firebase'
import { Entypo, AntDesign, MaterialIcons, Ionicons, FontAwesome5, FontAwesome, Fontisto, Octicons } from '@expo/vector-icons'
import { Rating, Badge } from 'react-native-elements'
const screen = Dimensions.get('screen')
const width = screen.width
class Helpermain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: {

            },
            modalVisible: false,
            token: '',
            interested: ['as'],
            comments: [
                {
                    rating: 3,
                    comments: 'faregrege'
                }
            ]
        }
    }

    componentDidMount = async () => {
        var token;
        await AsyncStorage.getItem('token').then(token1 => {
            //console.log(token1)
            // alert(token1)
            token = token1
            this.setState({ token: token1 })
            AsyncStorage.getItem('userdata').then(data => {

                var data1 = JSON.parse(data)

                if (data1 == null || !data1.aadhar) {

                    AsyncStorage.clear()
                    this.props.navigation.navigate('Elderorhelper')
                }

                this.setState({ userdata: data1, comments: data1.comments, interested: data1.interested })
                //alert(token1)
                if (token1 != null) {
                    firebase.firestore().collection('Helpers').doc(data1.mobile).set({ token: token1, }, { merge: true }).then(res => {
                        //alert("done")
                    })
                }

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

                    <View style={{ flexDirection: 'row', marginTop: 35, padding: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Helperabout")}>
                            <Octicons name="person" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons name="notifications" size={24} color="white" />
                            <Badge status="warning" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 20, marginVertical: 20 }}>
                        <View>
                            <Ionicons name="ios-location-sharp" size={40} color="white" />

                        </View>
                        <View style={{ paddingHorizontal: 0, marginTop: 0 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Location</Text>
                            <Text style={{ color: 'white' }}>{this.state.userdata.place}</Text>
                        </View>
                    </View>


                </View>

                <Image source={require('../../assets/thank.jpg')} style={{ height: 500, width: width + 10 }} />
                <TouchableOpacity style={{ padding: 20, alignItems: 'flex-end' }} onPress={() => this.props.navigation.navigate("Viewjobs")}>
                    <Text style={{ color: 'white', fontSize: 20 }}>View jobs</Text>
                </TouchableOpacity>
            </View>

        )
    }

}
export default Helpermain
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    avatar: {
        height: 100,
        width: 100,
        padding: 20
    },
    modal: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 200,
        width: 200,
        borderRadius: 50,
        top: '30%',
        left: '25%'

    }, optionscontainer: {
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
        backgroundColor: 'black',
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
        backgroundColor: 'black',
        height: 300,
        width: 300,
        top: -100,
        right: -120,
        borderRadius: 600,
        borderWidth: 50,
        borderColor: 'white',
        opacity: 0.2
    },
    oval2: {
        position: 'absolute',
        backgroundColor: 'black',
        height: 200,
        width: 200,
        top: 60,
        left: -80,
        borderRadius: 600,
        borderWidth: 50,
        borderColor: 'white',
        opacity: 0.2
    },
    oval3: {
        position: 'absolute',
        backgroundColor: 'black',
        height: 200,
        width: 200,
        bottom: -50,
        left: -80,
        borderRadius: 600,
        borderWidth: 50,
        borderColor: 'white',
        opacity: 0.2
    },

})