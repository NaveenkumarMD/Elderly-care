import React, { Component } from 'react'
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import distance from '../../../Functions/Finddistance'
import sortbydist from '../../../Functions/Sortbydistance'
import { Rating } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { sendPushNotification } from '../../../App'
import { AntDesign } from '@expo/vector-icons'
class Findhelperfood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            routedata: {},
            data: [],
            userdata: '', loading: true,
            token: [], helpersid: []
        }
    }
    notify = async () => {

        this.state.token.forEach(async data => {
            await sendPushNotification(data, { title: 'Food', body: `${this.state.userdata.name} is asking a help to buy him some food. Could you please help him?` })
        })
        var elder = this.state.userdata
        var ref = new Date()
        var date = ref.getDate() + "/" + ref.getMonth() + "/" + ref.getFullYear()
        //console.log(date)
        var time = ref.getHours() + ":" + ref.getMinutes()
        //console.log(time)
        var reqpeople = {}
        this.state.helpersid.forEach(data => {
            reqpeople[data] = false
        })
        firebase.firestore().collection('Food').add({
            Eldername: elder.name,
            Elderid: elder.mobile,
            Daterequested: date,
            Timerequested: time,
            Requestedpeople: reqpeople,
            Declined: reqpeople,
            status: {
                Requested: true,
                Accepted: false,
                Completed: false
            },
            food: this.state.routedata.food,
            notes: this.state.routedata.notes,
            time: this.state.routedata.time
        }).then(docRef => {
            firebase.firestore().collection('Elders').doc(this.state.userdata.mobile).set({
                currentessentialsid: docRef.id
            }, { merge: true }).then(res => {
                this.setState({ modalVisible: true })
            })
        })
    }
    handleviewhelper = (mobile) => {
        this.props.navigation.navigate('Viewhelpers', { id: mobile })
    }
    async componentDidMount() {
        console.log(this.props.route.params.data)
        this.setState({ routedata: this.props.route.params.data })
        await AsyncStorage.getItem('userdata').then(data => {
            this.setState({ userdata: JSON.parse(data) })
            //console.log(JSON.parse(data))
        })
        await firebase.firestore().collection('Helpers').where('interested', 'array-contains', 'Food').get().then(query => {
            var arr = []
            var tokenarray = []
            var helpersid = []
            query.forEach(async doc => {

                let x = {}
                x = doc.data()
                // console.log(doc.data())
                x.distance = distance(x.latitude, x.longitude, this.state.userdata.latitude, this.state.userdata.longitude).toFixed(4)
                if (x.distance < 5) {
                    arr.unshift(x)
                    helpersid.push(x.mobile)
                    tokenarray.push(x.token)
                }

            })
            this.setState({ data: arr.sort(sortbydist), loading: false, token: tokenarray, helpersid: helpersid })
            //console.log(this.state.token)

        }
        )

    }
    render() {

        const Item = ({ title, distance, mobile, rating }) => {
            if (distance < 5) {
                return (
                    <TouchableOpacity style={styles.item} onPress={() => this.handleviewhelper(mobile)}>
                        <View >
                            <Text style={styles.title}>{title}</Text>
                            <Text style={{ color: 'green' }}>{distance} km</Text>
                        </View>
                        <Rating type='star' ratingCount={5} startingValue={rating} imageSize={20} showRating readonly tintColor="black" ratingColor="red" showRating={false} />

                    </TouchableOpacity>
                );

            }
        }
        const renderItem = ({ item }) => (
            <Item title={item.name} distance={item.distance} mobile={item.mobile} rating={item.rating} />
        );

        return (
            <View style={styles.container}>
                <Modal animationType="fade" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
                >
                    <TouchableOpacity style={styles.modal} onPress={() => {
                        this.setState({
                            modalVisible: false
                        })
                        this.props.navigation.navigate('Foodlanding')

                    }}>
                        <View style={styles.modalicon}>
                            <AntDesign name="checkcircle" color="green" size={80} />
                        </View>
                        <Text style={{ fontSize: 25 }}>Success</Text>

                    </TouchableOpacity>
                </Modal>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />

                <FlatList data={this.state.data} renderItem={renderItem} keyExtractor={item => item.mobile} />

                <View style={{ alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}></Text>
                </View>
                {this.state.data.length>0 ?
                                <View>
                                <TouchableOpacity style={{ backgroundColor: 'dodgerblue', alignItems: 'center', padding: 10 }} onPress={() => this.notify()}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>Request</Text>
                                </TouchableOpacity>
                            </View>
                            :<View style={{alignItems:'center'}}>
                                <Text style={{color:'white',fontSize:24}}>No Helper found</Text>
                                </View>
                }
            </View>
        )
    }
}
export default Findhelperfood
const styles = StyleSheet.create({
    modal: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 200,
        width: 200,
        borderRadius: 50,
        top: '30%',
        left: '25%'

    },
    modalicon: {

    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    item: {
        backgroundColor: 'black',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    title: {
        fontSize: 20,
        color: 'white'
    },
});