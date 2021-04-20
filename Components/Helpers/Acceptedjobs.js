import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
class Acceptedjobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: {},
            jobs: [],
            loading: true
        }
    }
    handlesubmit=(id,type)=>{
        const data={
            id:id,
            type:type,
            accepted:true
        }
        console.log(data)
        if (type == "Travel") {
            return this.props.navigation.navigate("Traveljobview", { data: data })
        }
        this.props.navigation.navigate("Essentialjobview",{data:data})
    }
    componentDidMount = async () => {
        await AsyncStorage.getItem('userdata').then(userdata => {
            //console.log(userdata)
            this.setState({ userdata: JSON.parse(userdata) })
        })
        var arr = []
        await firebase.firestore().collection('Essentials').where("Helperid","==",this.state.userdata.mobile).where("status."+"Completed","==",false).onSnapshot(async query => {
            
            await query.forEach(doc => {
                var x = doc.data()
                x.type = "Essentials"
                console.log(doc.data())
                x.id = doc.id
                arr.push(x)
            })
            await firebase.firestore().collection('Medicine').where("Helperid","==",this.state.userdata.mobile).where("status."+"Completed","==",false).onSnapshot(async query => {
               
                query.forEach(doc => {
                    var x = doc.data()
                    x.type = "Medicine"
                    console.log(doc.data())
                    x.id = doc.id
                    arr.push(x)
                })
                await firebase.firestore().collection('Travel').where("Helperid","==",this.state.userdata.mobile).where("status."+"Completed","==",false).onSnapshot(query => {
               
                    query.forEach(doc => {
                        var x = doc.data()
                        x.type = "Travel"
                        console.log(doc.data())
                        x.id = doc.id
                        arr.push(x)
                    })
                    this.setState({ jobs: arr })
                    console.log(arr)
                    this.setState({ loading: false })
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
                <TouchableOpacity style={{ padding: 10, borderBottomColor: '#474747', borderBottomWidth: 1 }} onPress={()=>this.handlesubmit(data.id,data.type)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: 'white', fontSize: 22 }}>{a}. {data.type}</Text>
                            <Text style={{ color: 'white', fontSize: 15, padding: 5 }}>{data.Eldername}</Text>

                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{ color: 'dodgerblue',padding:5 }}>View</Text>
                            <Text style={{ color: 'white' }}>{data.Daterequested} {data.Timerequested}</Text>
                        </View>

                    </View>

                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                <View style={styles.oval1}></View>
                <View style={styles.oval2}></View>
                <View style={styles.oval3}></View>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
                
                <ScrollView>
                {jobs}
                </ScrollView>

            </View>
        )
    }
}
export default Acceptedjobs
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    } , oval1: {
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
        height: 300,
        width: 300,
        bottom: -150,
        right: -150,
        borderRadius: 600,
        borderWidth: 50,
        borderColor: 'white',
        opacity: 0.1
    },
})