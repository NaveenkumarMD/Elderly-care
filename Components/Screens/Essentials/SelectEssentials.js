import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native'
import { InputAutoSuggest } from 'react-native-autocomplete-search'
import data from '../../../assets/data/essentialsdata'
const screen = Dimensions.get('screen')
var width = screen.width
class SelectEssentials extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible:false,
            item: '',
            products: [

            ]
        }
    }
    add = (name) => {
        var temp = []
        temp = this.state.products
        temp.forEach(data => {
            if (data.name == name) {
                data.quantity += 1
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
    submit = () => {
        if (this.state.products.length == 0) {
            return alert("Nothing selected")
        }
        this.props.navigation.navigate('EssentialsFindhelper', { data: this.state.products })
    }
    render() {

        const items = this.state.products.map(data => {
            return (
                <View style={{ padding: 20, flexDirection: 'row', borderBottomColor: 'red', borderBottomWidth: 2, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 20 }}>{data.name}</Text>
                        <Text style={{ color: 'red' }}>In kgs</Text>
                    </View>

                    <View style={{ flexDirection: 'row', borderRadius: 10, height: 30 }}>
                        <TouchableOpacity onPress={() => this.reduce(data.name)}>
                            <Feather name="minus" size={24} color="white" style={{ borderRightWidth: 1, borderColor: 'red', backgroundColor: 'red', color: 'white', borderRadius: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, paddingHorizontal: 10 }}>{data.quantity}</Text>
                        <TouchableOpacity onPress={() => this.add(data.name)}>
                            <Ionicons name="ios-add" size={24} color="white" style={{ borderLeftWidth: 1, borderColor: 'red', backgroundColor: 'red', color: 'white', borderRadius: 20 }} />
                        </TouchableOpacity>

                    </View>
                </View>
            )
        })
        return (
            <View style={styles.container}>

                <Text style={{ color: 'white', paddingLeft: 20, fontSize: 18, padding: 5 }}>Search for the product</Text>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', paddingTop: 0 }}>
                        <InputAutoSuggest onDataSelectedChange={data => this.setState({ item: data })} inputStyle={styles.input} staticData={data} flatListStyle={styles.list} itemTextStyle={styles.item} />
                        <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'red', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={this.additem}>
                            <MaterialIcons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    {items}
                </ScrollView>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'red', height: 40, justifyContent: 'center' }} onPress={this.submit}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default SelectEssentials
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: 'black'
    },
    input: {
        color: 'white',
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: 'red', height: 50,
        width: width - 80,
        borderRadius: 30
    },
    list: {
        backgroundColor: 'red',
        borderRadius: 10,
    },
    item: {
        color: 'white',
        padding: 10,
        flex:1
    }
})