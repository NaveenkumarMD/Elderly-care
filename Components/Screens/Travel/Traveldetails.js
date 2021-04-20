import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TextInput, Picker, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
const screen = Dimensions.get('screen')
const width = screen.width
class Traveldetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: 'select', dobpickervisibility: false, timevisible: false,time:'',purpose:'',mode:'',location:''
        }
    }
    handlesubmit=()=>{
        if(!this.state.location){
            return alert("Fill all the fields")
        }
        var data={
            traveldate:this.state.date,
            traveltime:this.state.time,
            location:this.state.location,
            mode:this.state.mode,
            purpose:this.state.purpose
        }
        this.props.navigation.navigate("Findhelpertravel",{data:data})
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image source={require('../../../assets/trans1.jpg')} style={{ width: width, height: 200 }} />
                    <View style={{ alignItems: 'center' }}>

                        <View >
                            <Text style={styles.inputtext}>Travel date</Text>
                            <View style={styles.inputbox} >
                                <Button title={this.state.date} style={styles.input} titleStyle={{ color: 'white' }} onPress={() => {

                                    this.setState({ dobpickervisibility: true })
                                }} type="clear" />
                                <DateTimePickerModal isVisible={this.state.dobpickervisibility} onConfirm={(e) => {
                                    let fulldate = e.getDate() + "-" + e.getMonth() + "-" + e.getFullYear()
                                    this.setState({ date: fulldate })
                                    this.setState({ dateinobject: e })
                                    this.setState({ dobpickervisibility: false })

                                }} onCancel={() => {
                                    this.setState({ dobpickervisibility: false })
                                }} />


                            </View>
                        </View>
                        <View >
                            <Text style={styles.inputtext}>Time</Text>
                            <View style={styles.inputbox} >
                                <Button title={this.state.time} style={styles.input} titleStyle={{ color: 'white' }} onPress={() => {

                                    this.setState({ timevisible: true })
                                }} type="clear" />
                                <DateTimePickerModal isVisible={this.state.timevisible} mode="time" onConfirm={(e) => {

                                    var time=e.getHours()+":"+e.getMinutes()
                                    this.setState({ timevisible: false,time:time })

                                }} onCancel={() => {
                                    this.setState({ timevisible: false })
                                }} />


                            </View>
                            <View>
                                <Text style={styles.inputtext}>Purpose</Text>
                                <View style={styles.inputbox}>
                                    <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.purpose} onChangeText={(e) => this.setState({ purpose: e })} />

                                </View>
                            </View>
                            <View>
                                <Text style={styles.inputtext}>Location</Text>
                                <View style={styles.inputbox}>
                                    <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.location} onChangeText={(e) => this.setState({ location: e })} />

                                </View>
                            </View>
                            <View>
                                <Text style={styles.inputtext}>Preferred mode of transport</Text>
                                <View style={styles.inputbox}>
                                    <Picker selectedValue={this.state.mode} onValueChange={(e) => this.setState({ mode: e })}
                                        style={{ height: 33, color: 'white', width: 150, flex: 1, paddingLeft: 10 }} itemStyle={{ backgroundColor: 'black', color: 'red' }}>
                                        <Picker.Item label="Any" value="Any" />
                                        <Picker.Item label="Car" value="Car" />
                                        <Picker.Item label="Bike" value="Bike" />
                                    </Picker>

                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity style={{ alignItems: 'flex-end', padding: 20 }} onPress={this.handlesubmit}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Traveldetails
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }, inputtext: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    },
    inputbox: {
        flexDirection: 'row',
        borderBottomColor: 'dodgerblue',
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 25
    },
    input: {
        fontSize: 20,
        paddingLeft: 10,
        color: 'white',
        flex: 1
    },
    inputicon: {
        color: '#Ff7E07'
    }, inputtext: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    }, inputtext: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
})
