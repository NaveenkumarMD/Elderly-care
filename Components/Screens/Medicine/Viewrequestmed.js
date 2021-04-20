import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Linking, Modal, ScrollView, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import firebase from 'firebase'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'

import call from 'react-native-phone-call'
import { Rating, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
class Viewrequestmed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            loading: true,
            data: {},
            products: [{ name: 'tomato' }],
            status: {}, modalVisible: false, rating: 3, comment: '', Elderdata: {}, url: ''
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
    ratingCompleted = (rating) => {
        this.setState({ rating })
    }
    submit = () => {
        var arr = []
        var data = {
            rating: this.state.rating,
            comment: this.state.comment,
            id: this.state.Elderdata.mobile,
            name: this.state.Elderdata.name
        }
        arr.push(data)
        console.log(data)
        firebase.firestore().collection('Helpers').doc(this.state.data.Helperid).get().then(doc => {
            var array = []
            console.log(doc.data().comments)
            var x = doc.data().comments
            array = [...doc.data().comments, data]
            firebase.firestore().collection('Helpers').doc(this.state.data.Helperid).set({
                comments: array
            }, { merge: true }).then(res => {
                var ref = new Date()
                var date = ref.getDate() + "/" + ref.getMonth() + "/" + ref.getFullYear()
                //console.log(date)
                var time = ref.getHours() + ":" + ref.getMinutes()
                var d = this.state.data
                d.Datecompleted = date
                d.Timecomplelted = time
                firebase.firestore().collection('Medicinecompleted').add(
                    d
                ).then(res => {
                    firebase.firestore().collection('Medicine').doc(this.state.id).delete().then(res => {
                        this.setState({ modalVisible: false })
                        this.props.navigation.navigate('Main')
                    })
                })
            })
        })

    }
    componentDidMount = async () => {
        AsyncStorage.getItem('userdata').then(data => {
            this.setState({ Elderdata: JSON.parse(data) })
            console.log(data)
        })
        this.setState({ id: this.props.route.params.data })
        console.log(this.props.route.params)
        firebase.firestore().collection('Medicine').doc(this.props.route.params.data).onSnapshot(doc => {
            console.log(doc.data())
            this.setState({ data: doc.data(), loading: false, products: doc.data().products, status: doc.data().status, url: doc.data().imageurl })
        }).catch(err => {
            alert(err.message)
        })
    }
    render() {
        //  alert(this.state.url)
        var a = 0
        const items = this.state.products.map(data => {
            a += 1
            return (
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#3d3d3d', borderBottomWidth: 1 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{a}.{data.name}</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>{data.quantity} Mgs</Text>
                </View>
            )
        })
        return (
            <View style={styles.container}>
                <Modal animationType="scroll" transparent={true} visible={this.state.modalVisible} >
                    <View style={styles.modal}>
                        <Text style={{ color: 'white', padding: 10, fontSize: 20 }}>Rate him</Text>
                        <Rating type='star' ratingCount={5} imageSize={40} showRating={false} tintColor="black" onFinishRating={this.ratingCompleted} />
                        <View style={{ width: 220, marginTop: 30 }}>
                            <Input placeholder='Comments' style={{ color: 'white' }} onChangeText={(e) => this.setState({ comment: e })} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: 'dodgerblue', paddingHorizontal: 20, padding: 10, borderRadius: 30, marginRight: 10 }} onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'green', paddingHorizontal: 20, padding: 10, borderRadius: 30 }} onPress={() => this.submit()}>
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
                    <Text></Text>
                    <Text style={{ color: 'white', padding: 20, fontSize: 16 }}>Request id:{this.state.id}</Text>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around', borderBottomColor: '#424242', borderBottomWidth: 2, paddingBottom: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            {this.state.status.Requested ? <AntDesign name="check" size={28} color="green" /> : <AntDesign name="close" size={28} color="red" />}
                            <Text style={{ color: 'white', fontSize: 20 }}>Requested</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {this.state.status.Accepted ? <AntDesign name="check" size={28} color="green" /> : <AntDesign name="close" size={28} color="red" />}
                            <Text style={{ color: 'white', fontSize: 20 }}>Accepted</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {this.state.status.Completed ? <AntDesign name="check" size={28} color="green" /> : <AntDesign name="close" size={28} color="red" />}
                            <Text style={{ color: 'white', fontSize: 20 }}>Completed</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: '#949494', fontSize: 24, padding: 10 }}>Ordered items</Text>
                        {items}
                    </View>
                    <View style={{ borderBottomColor: '#424242', borderBottomWidth: 2 }}>
                        <Text style={{ color: '#949494', fontSize: 24, padding: 10 }}>Requested date and time</Text>
                        <Text style={{ fontSize: 16, color: 'white', padding: 10 }}>Date:{this.state.data.Daterequested}</Text>
                        <Text style={{ fontSize: 16, color: 'white', padding: 10 }}>Time:{this.state.data.Timerequested}</Text>
                    </View>

                    {this.state.status.Accepted &&
                        <View>
                            <Text style={{ color: '#949494', fontSize: 24, padding: 10 }}>Helper details</Text>
                            <View style={{ padding: 10 }}>
                                <Text style={{ color: 'white', fontSize: 22 }}>{this.state.data.Helpername}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomColor: '#424242', borderBottomWidth: 2 }} onPress={() => this.whatsapp(this.state.data.Helperid)}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>whatsapp</Text>
                                    <Ionicons name="ios-logo-whatsapp" size={24} color="green" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomColor: '#424242', borderBottomWidth: 2 }} onPress={() => this.call(this.state.data.Helperid)}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>Call</Text>
                                    <Feather name="phone-call" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    <Text style={{ color: '#949494', fontSize: 24, padding: 10 }}>Prescription</Text>
                    <View style={{ alignItems: 'center' }}>

                        <Image source={{ uri: this.state.url }} style={{ height: 400, width: 300 }} />
                    </View>
                </ScrollView>
                {this.state.status.Accepted &&
                    <TouchableOpacity style={{ backgroundColor: 'green', padding: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Completed</Text>
                    </TouchableOpacity>
                }

            </View>
        )
    }
}
export default Viewrequestmed
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }, modal: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 300,
        width: 300,
        borderRadius: 50,
        top: '30%',
        left: '10%'

    },

})
