import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
class Viewjobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: {},
            jobs: [],
            loading: true
        }
    }
    handlesubmit = (id, type) => {
        const data = {
            id: id,
            type: type,
            accepted: false
        }
        console.log(data)
        if (type == "Food") {
            return this.props.navigation.navigate("Foodjobview", { data: data })
        }
        if (type == "Travel") {
            return this.props.navigation.navigate("Traveljobview", { data: data })
        }
        if (type == "Counselling") {
            
            return this.props.navigation.navigate("Counsellingjobview", { data: data })
        }
        this.props.navigation.navigate("Essentialjobview", { data: data })
    }
    componentDidMount = async () => {
        await AsyncStorage.getItem('userdata').then(userdata => {
            //console.log(userdata)
            this.setState({ userdata: JSON.parse(userdata) })
        })
        var arr = []
        await firebase.firestore().collection('Medicine').where("Requestedpeople." + this.state.userdata.mobile, "==", false).where("status." + "Accepted", "==", false).where("Declined." + this.state.userdata.mobile, "==", false).onSnapshot(async query => {

            await query.forEach(doc => {
                var x = doc.data()
                x.type = "Medicine"
                console.log(doc.data())
                x.id = doc.id
                arr.push(x)
            })
            await firebase.firestore().collection('Essentials').where("Requestedpeople." + this.state.userdata.mobile, "==", false).where("status." + "Accepted", "==", false).where("Declined." + this.state.userdata.mobile, "==", false).onSnapshot(async query => {

                query.forEach(doc => {
                    var x = doc.data()
                    x.type = "Essentials"
                    console.log(doc.data())
                    x.id = doc.id
                    arr.push(x)
                })
                await firebase.firestore().collection('Travel').where("Requestedpeople." + this.state.userdata.mobile, "==", false).where("status." + "Accepted", "==", false).where("Declined." + this.state.userdata.mobile, "==", false).onSnapshot(async query => {

                    query.forEach(doc => {
                        var x = doc.data()
                        x.type = "Travel"
                        console.log(doc.data())
                        x.id = doc.id
                        arr.push(x)
                    })
                    await firebase.firestore().collection('Counselling').where("Requestedpeople." + this.state.userdata.mobile, "==", false).where("status." + "Accepted", "==", false).where("Declined." + this.state.userdata.mobile, "==", false).onSnapshot(async query => {

                        query.forEach(doc => {
                            var x = doc.data()
                            x.type = "Counselling"
                            console.log(doc.data())
                            x.id = doc.id
                            arr.push(x)
                        })
                        await firebase.firestore().collection('Food').where("Requestedpeople." + this.state.userdata.mobile, "==", false).where("status." + "Accepted", "==", false).where("Declined." + this.state.userdata.mobile, "==", false).onSnapshot(query => {

                            query.forEach(doc => {
                                var x = doc.data()
                                x.type = "Food"
                                console.log(doc.data())
                                x.id = doc.id
                                arr.push(x)
                            })
                            this.setState({ loading: false, jobs: arr })
            
                        }).catch(err => {
                            console.log(err.message)
                        })
        
                    }).catch(err => {
                        console.log(err.message)
                    })
    
                }).catch(err => {
                    console.log(err.message)
                })

            }).catch(err => {
                console.log(err.message)
            })
            

        }).catch(err => {
            console.log(err.message)
        })






    }
    render() {
        var a = 0
        const jobs = this.state.jobs.map(data => {
            a += 1
            return (
                <TouchableOpacity style={{ padding: 10, borderBottomColor: '#474747', borderBottomWidth: 1 }} onPress={() => this.handlesubmit(data.id, data.type)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: 'white', fontSize: 22 }}>{a}. {data.type}</Text>
                            <Text style={{ color: 'white', fontSize: 15, padding: 5 }}>{data.Eldername}</Text>

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'dodgerblue', padding: 5 }}>View</Text>
                            <Text style={{ color: 'white' }}>{data.Daterequested} {data.Timerequested}</Text>
                        </View>

                    </View>

                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                <View style={styles.oval3}></View>
                <View style={styles.oval1}></View>
                <View style={styles.oval2}></View>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />

                <ScrollView>
                    {jobs}
                </ScrollView>
                <TouchableOpacity style={{ padding: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => this.props.navigation.navigate('Acceptedjobs')}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Accepted jobs</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Viewjobs
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },    oval1: {
        position: 'absolute',
        backgroundColor: 'black',
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
        backgroundColor: 'black',
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
        backgroundColor: 'black',
        height: 500,
        width: 500,
        bottom: -50,
        left: -200,
        borderRadius: 600,
        borderWidth: 250,
        borderColor: 'white',
        opacity: 0.1
    },

})