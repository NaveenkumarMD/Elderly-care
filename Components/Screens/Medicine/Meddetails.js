import React, { Component } from 'react'
import { Button, Image, View, Platform, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import { InputAutoSuggest } from 'react-native-autocomplete-search'
import data from '../../../assets/data/Medicinedata'
import { MaterialIcons, Feather, Ionicons, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
const screen = Dimensions.get('screen')
import Spinner from 'react-native-loading-spinner-overlay'
var width = screen.width
class Meddetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            result: {},
            select: false,
            selected: false, item: '', products: [], userdata: {}, loading: false, url: ''
        }
    }
    handlenext = () => {
        if(this.state.products.length==0 && this.state.url==''){
            return alert("Give some details")
        }
        var data={
            products:this.state.products,
            url:this.state.url
        }
        this.props.navigation.navigate('Findhelpermedicine',{data:data})
    }
    add = (name) => {
        var temp = []
        temp = this.state.products
        temp.forEach(data => {
            if (data.name == name) {
                data.quantity += 10
            }
        })
        this.setState({ products: temp })
    }
    reduce = (name) => {
        var temp = []
        temp = this.state.products
        temp.forEach(data => {
            if (data.name == name) {
                data.quantity -= 1
                if (data.quantity == 0) {
                    temp.splice(temp.findIndex(a => a.name == name), 1)
                    console.log("removed")
                    console.log(temp)
                }
            }

        })
        this.setState({ products: temp })
    }
    additem = async () => {
        if(this.state.item.name==null){
            return alert("Search and select some items")
        }
        var temp = []
        temp = this.state.products
        var x = {
            name: this.state.item.name,
            quantity: 1
        }
        var y = false
        await temp.forEach(data => {
            if (data.name == x.name) {
                y = true
            }
        })
        if (!y) {
            temp.push(x)
            this.setState({ products: temp })
        }

    }
    componentDidMount = async () => {
        AsyncStorage.getItem('userdata').then(data => {
            this.setState({ userdata: JSON.parse(data) })
        })
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,

            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {


            this.setState({ image: result.uri, selected: true });
        }
    };
    uploadimage = async (uri) => {
        this.setState({ loading: true })
        const response = await fetch(uri)
        const blob = await response.blob()
        var number = Math.floor(Math.random() * 1000)
        var ref = firebase.storage().ref().child(`images/${this.state.userdata.name}${number}`)
        console.log('uploading....')
        await ref.put(blob)
        var starsRef = firebase.storage().refFromURL(`gs://elderly-care-452ac.appspot.com/images/${this.state.userdata.name}${number}`);
        starsRef.getDownloadURL()
            .then((url) => {
                this.setState({ loading: false, url: url })

                alert("Success")

            })
    }
    render() {
        const items = this.state.products.map(data => {
            return (
                <View style={{ padding: 20, flexDirection: 'row', borderBottomColor: 'indigo', borderBottomWidth: 2, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 20 }}>{data.name}</Text>
                        <Text style={{ color: 'indigo' }}>In Mgs</Text>
                    </View>

                    <View style={{ flexDirection: 'row', borderRadius: 10, height: 30 }}>
                        <TouchableOpacity onPress={() => this.reduce(data.name)}>
                            <Feather name="minus" size={24} color="white" style={{ borderRightWidth: 1, borderColor: 'indigo', backgroundColor: 'indigo', color: 'white', borderRadius: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, paddingHorizontal: 10 }}>{data.quantity}</Text>
                        <TouchableOpacity onPress={() => this.add(data.name)}>
                            <Ionicons name="ios-add" size={24} color="white" style={{ borderLeftWidth: 1, borderColor: 'indigo', backgroundColor: 'indigo', color: 'white', borderRadius: 20 }} />
                        </TouchableOpacity>

                    </View>
                </View>
            )
        })
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />

                {this.state.select ?
                    <ScrollView>
                        <View>
                            <TouchableOpacity title="Pick an image from camera roll" onPress={() => this.pickImage()} style={{ backgroundColor: 'indigo', padding: 20, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ color: 'white' }}>Pick image</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>

                            {this.state.selected ? <Image source={{ uri: this.state.image }} style={{ width: 300, height: 500 }} /> : <Image source={require('../../../assets/med3.jpg')} />}
                        </View>


                        <View>
                            <TouchableOpacity title="Pick an image from camera roll" onPress={() => this.uploadimage(this.state.image)} style={{ backgroundColor: 'indigo', padding: 20, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView> :

                    <ScrollView>
                        <Text style={{ color: 'white', paddingLeft: 20, fontSize: 18, padding: 5 }}>Search for the product</Text>
                        <View style={{ alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row', paddingTop: 0 }}>
                                <InputAutoSuggest onDataSelectedChange={data => this.setState({ item: data })} inputStyle={styles.input} staticData={data} flatListStyle={styles.list} itemTextStyle={styles.item} />
                                <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'indigo', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={this.additem}>
                                    <MaterialIcons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView>
                            {items}
                        </ScrollView>
                    </ScrollView>
                }


                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ select: true })}>
                        <Text style={{ color: 'white',fontSize:15 }}>Pick an image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ select: false })}>
                        <Text style={{ color: 'white',fontSize:15 }}>Select Medicines</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'indigo', padding: 15, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                        <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>this.handlenext()}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
export default Meddetails
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    button: {
        backgroundColor: 'indigo',
        padding: 20,
        borderRadius: 40
    }, input: {
        color: 'white',
        paddingLeft: 20,
        borderWidth: 3,
        borderColor: 'indigo', height: 50,
        width: width - 80,
        borderRadius: 30
    },
    list: {
        backgroundColor: 'indigo',
        borderRadius: 10,
    },
    item: {
        color: 'white',
        padding: 10,
        flex: 1,
        borderBottomColor:'#3b3b3b',
        borderBottomWidth:1
    }
})