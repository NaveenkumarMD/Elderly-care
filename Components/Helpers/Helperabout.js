import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import firebase from 'firebase'
import { Entypo, AntDesign ,MaterialIcons} from '@expo/vector-icons'
import { Rating } from 'react-native-elements'
class Helperabout extends Component {
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
    logout = () => {
        this.setState({ modalVisible: false })
        AsyncStorage.clear()
        this.props.navigation.navigate("Login")
    }
    componentDidMount = async () => {
        var token;
        await AsyncStorage.getItem('token').then(token1 => {
            console.log(token1)
            token = token1
            this.setState({ token: token1 })

        })
        AsyncStorage.getItem('userdata').then(data => {

            var data1 = JSON.parse(data)

            if (data1 == null || !data1.aadhar) {

                AsyncStorage.clear()
                this.props.navigation.navigate('Elderorhelper')
            }

            this.setState({ userdata: data1, comments: data1.comments, interested: data1.interested })
            firebase.firestore().collection('Helpers').doc(data1.mobile).set({ token: token }, { merge: true }).then(res => {
                //alert("done")
            })
        })
    }
    render() {
        const reviews = this.state.comments.map(data => {
            //console.log(data)
            return (
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontSize: 22 }}>{data.name}</Text>
                        <Rating type='star' ratingCount={5} startingValue={data.rating} imageSize={20} showRating readonly tintColor="black" ratingColor="red" showRating={false} />
                    </View>

                    <Text style={{ color: 'white', padding: 20 }}>{data.comment}</Text>

                </View>

            )
        })
        return (
            <View style={styles.container}>
                <Modal animationType="scroll" transparent={true} visible={this.state.modalVisible} >
                    <View style={styles.modal}>
                        <AntDesign name="logout" size={50} color="red" />
                        <View>
                            <Text style={{ color: 'white', padding: 20 }}>Are you sure?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: 'dodgerblue', paddingHorizontal: 20, padding: 10, borderRadius: 30, marginRight: 10 }} onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 20, padding: 10, borderRadius: 30 }} onPress={() => this.logout()}>
                                <Text style={{ color: 'white' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    <View style={{ alignItems: 'center', borderBottomColor: '#464747', borderBottomWidth: 1, paddingBottom: 20 }}>
                        <Image source={require('../../assets/icon.png')} style={styles.avatar} />
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', padding: 10 }}>{this.state.userdata.name}</Text>
                        <Text style={{ color: 'white', color: '#ff7e07' }}>+91-{this.state.userdata.mobile}</Text>
                    </View>
                    <Text style={{ color: '#a8a8a8', fontSize: 24, padding: 5 }}>Intersted works</Text>
                    <View style={{ flexDirection: 'row', padding: 10, flexWrap: 'wrap', paddingVertical: 20 }}>
                        {this.state.interested.includes('Essentials') ? <Essentials /> : null}
                        {this.state.interested.includes('Food') ? <Food /> : null}
                        {this.state.interested.includes('Travel') ? <Travel /> : null}
                        {this.state.interested.includes('Medicine') ? <Medicine /> : null}
                        {this.state.interested.includes('Counselling') ? <Counselling /> : null}
                        {this.state.interested.includes('Works') ? <Domestic /> : null}




                    </View>

                    <View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: '#464747', paddingBottom: 10, borderTopColor: '#464747', borderTopWidth: 1, paddingTop: 10 }}>
                        <Text style={{ color: '#a8a8a8', fontSize: 22, fontWeight: 'bold' }}>Location</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#ff7e07', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Entypo name="location" size={22} color="white" />
                            </View>
                            <View>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.street || '-'}</Text>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.place || '-'}</Text>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.city || '-'}</Text>
                                <Text style={{ color: 'white', fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{this.state.userdata.district || '-'} - {this.state.userdata.pincode || '-'}</Text>

                            </View>

                        </View>
                    </View>
                    <View >
                        <Text style={{ color: '#a8a8a8', fontSize: 22, fontWeight: 'bold' }}>Reviews</Text>
                        <View style={{ marginBottom: 0 }}>
                            {reviews}

                        </View>

                    </View>
                    <View >
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 30,flexDirection:'row',paddingHorizontal:15,paddingVertical:10 }} onPress={() => this.setState({ modalVisible: true })}>
                        <MaterialIcons name="logout" size={24} color="white" />
                            <Text style={{ color: 'white',fontSize: 20 }}>logout</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        )
    }
}
export default Helperabout
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

    },
})
const Essentials = () => {
    return (
        <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, margin: 5, borderRadius: 20, backgroundColor: 'red' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Essentials</Text>
        </View>
    )
}
const Domestic = () => {
    return (
        <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, margin: 5, borderRadius: 20, backgroundColor: 'orange' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Domestic works</Text>
        </View>
    )
}
const Food = () => {
    return (
        <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, margin: 5, borderRadius: 20, backgroundColor: 'green' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Food</Text>
        </View>
    )
}
const Travel = () => {
    return (
        <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, margin: 5, borderRadius: 20, backgroundColor: 'violet' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Travel</Text>
        </View>
    )
}
const Medicine = () => {
    return (
        <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, margin: 5, borderRadius: 20, backgroundColor: 'indigo' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Medicine</Text>
        </View>
    )
}
const Counselling = () => {
    return (
        <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, margin: 5, borderRadius: 20, backgroundColor: 'dodgerblue' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Counselling</Text>
        </View>
    )
}