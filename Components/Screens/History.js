import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, } from 'react'
import firebase from 'firebase'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const tab = createBottomTabNavigator()
const Essentials = ({navigation}) => {
    const [data, setdata] = useState([])
    const [userdata, setuserdata] = useState({ mobile: '887' })
    useEffect(() => {
        get()
    }, [])
    const get = async () => {

        await AsyncStorage.getItem('userdata').then(data => {
            setuserdata(JSON.parse(data))
            //console.log(JSON.parse(data))
            firebase.firestore().collection('Essentialscompleted').where("Elderid", "==", JSON.parse(data).mobile).onSnapshot(query => {
                var arr = []
                query.forEach(doc => {
                    console.log(doc.data())
                    arr.push(doc.data())
                })
                setdata(arr)
                //console.log(arr)
            })
        })
        //console.log(userdata.mobile)

    }
    return (
        <View>
            <ScrollView style={{ opacity: 1 }}>
                {
                    data.map(datum => {
                        var x = 0
                        x = data.indexOf(datum) + 1
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                            onPress={()=>navigation.navigate('History')}
                            >
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{x}. </Text>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{datum.Helpername}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, paddingHorizontal: 25 }}>{datum.Helperid}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Daterequested}</Text>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Timerequested}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>

    )
}
const Food = () => {
    const [data, setdata] = useState([])
    const [userdata, setuserdata] = useState({ mobile: '887' })
    useEffect(() => {
        get()
    }, [])
    const get = async () => {

        await AsyncStorage.getItem('userdata').then(data => {
            setuserdata(JSON.parse(data))
            //console.log(JSON.parse(data))
            firebase.firestore().collection('Foodcompleted').where("Elderid", "==", JSON.parse(data).mobile).onSnapshot(query => {
                var arr = []
                query.forEach(doc => {
                    console.log(doc.data())
                    arr.push(doc.data())
                })
                setdata(arr)
                //console.log(arr)
            })
        })
        //console.log(userdata.mobile)

    }
    return (
        <View>
            <ScrollView style={{ opacity: 1 }}>
                {
                    data.map(datum => {
                        var x = 0
                        x = data.indexOf(datum) + 1
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{x}. </Text>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{datum.Helpername}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, paddingHorizontal: 25 }}>{datum.Helperid}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Daterequested}</Text>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Timerequested}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>

    )
}
const Counselling = () => {
    const [data, setdata] = useState([])
    const [userdata, setuserdata] = useState({ mobile: '887' })
    useEffect(() => {
        get()
    }, [])
    const get = async () => {

        await AsyncStorage.getItem('userdata').then(data => {
            setuserdata(JSON.parse(data))
            //console.log(JSON.parse(data))
            firebase.firestore().collection('Counsellingcompleted').where("Elderid", "==", JSON.parse(data).mobile).onSnapshot(query => {
                var arr = []
                query.forEach(doc => {
                    console.log(doc.data())
                    arr.push(doc.data())
                })
                setdata(arr)
                //console.log(arr)
            })
        })
        //console.log(userdata.mobile)

    }
    return (
        <View>
            <ScrollView style={{ opacity: 1 }}>
                {
                    data.map(datum => {
                        var x = 0
                        x = data.indexOf(datum) + 1
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{x}. </Text>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{datum.Helpername}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, paddingHorizontal: 25 }}>{datum.Helperid}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Daterequested}</Text>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Timerequested}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>

    )
}
const Travel = () => {
    const [data, setdata] = useState([])
    const [userdata, setuserdata] = useState({ mobile: '887' })
    useEffect(() => {
        get()
    }, [])
    const get = async () => {

        await AsyncStorage.getItem('userdata').then(data => {
            setuserdata(JSON.parse(data))
            //console.log(JSON.parse(data))
            firebase.firestore().collection('Travelcompleted').where("Elderid", "==", JSON.parse(data).mobile).onSnapshot(query => {
                var arr = []
                query.forEach(doc => {
                    console.log(doc.data())
                    arr.push(doc.data())
                })
                setdata(arr)
                //console.log(arr)
            })
        })
        //console.log(userdata.mobile)

    }
    return (
        <View>
            <ScrollView style={{ opacity: 1 }}>
                {
                    data.map(datum => {
                        var x = 0
                        x = data.indexOf(datum) + 1
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{x}. </Text>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{datum.Helpername}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, paddingHorizontal: 25 }}>{datum.Helperid}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Daterequested}</Text>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Timerequested}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>

    )
}
const Medicine = () => {
    const [data, setdata] = useState([])
    const [userdata, setuserdata] = useState({ mobile: '887' })
    useEffect(() => {
        get()
    }, [])
    const get = async () => {

        await AsyncStorage.getItem('userdata').then(data => {
            setuserdata(JSON.parse(data))
            //console.log(JSON.parse(data))
            firebase.firestore().collection('Medicinecompleted').where("Elderid", "==", JSON.parse(data).mobile).onSnapshot(query => {
                var arr = []
                query.forEach(doc => {
                    console.log(doc.data())
                    arr.push(doc.data())
                })
                setdata(arr)
                //console.log(arr)
            })
        })
        //console.log(userdata.mobile)

    }
    return (
        <View>
            <ScrollView style={{ opacity: 1 }}>
                {
                    data.map(datum => {
                        var x = 0
                        x = data.indexOf(datum) + 1
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{x}. </Text>
                                        <Text style={{ fontSize: 18, color: 'black' }}>{datum.Helpername}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, paddingHorizontal: 25 }}>{datum.Helperid}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Daterequested}</Text>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{datum.Timerequested}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>

    )
}
const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Essentials') {
            iconName = focused
                ? 'basket'
                : "basket-outline"
        } else if (route.name === 'Food') {
            iconName = focused ? 'ios-fast-food' : 'ios-fast-food-outline';
        }
        else if (route.name === 'Medicine') {
            iconName = focused ? 'medkit' : 'medkit-outline';
        }
        else if (route.name === 'Travel') {
            iconName = focused ? 'ios-car' : 'ios-car-outline';
        }
        else if (route.name === 'Counselling') {
            iconName = focused ? 'man' : 'man-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
})
const History = ({ navigation }) => {
    useEffect(() => {

    }, [])
    return (
        <NavigationContainer independent={true}>
            <tab.Navigator screenOptions={screenOptions}
                tabBarOptions={{
                    activeTintColor: 'green',
                    inactiveTintColor: 'gray',
                }}>
                <tab.Screen name="Essentials" component={Essentials} />
                <tab.Screen name="Food" component={Food} />
                <tab.Screen name="Travel" component={Travel} />
                <tab.Screen name="Counselling" component={Counselling} />
                <tab.Screen name="Medicine" component={Medicine} />
            </tab.Navigator>
        </NavigationContainer>
    )
}
export default History
