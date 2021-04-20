import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TextInput, Picker, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
const screen = Dimensions.get('screen')
const width = screen.width
class Selectfood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timevisible: false, time: 'select', food: '', notes: ''
        }
    }
    handlesubmit = () => {
        if (!this.state.food) {
            return alert("Fill all the fields")
        }
        var data = {
            food:this.state.food,
            time:this.state.time,
            notes:this.state.notes
        }
        this.props.navigation.navigate("Findhelperfood", { data: data })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image source={require('../../../assets/food.png')} style={{ width: width, height: 200 }} />
                    <View style={{ alignItems: 'center',marginTop:50 }}>



                        <View>
                            <Text style={styles.inputtext}>Food</Text>
                            <View style={styles.inputbox}>
                                <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.food} onChangeText={(e) => this.setState({ food: e })} multiline={true} numberOfLines={3} placeholder="Enter the food details with the amount you want" placeholderTextColor="#95cfa3" />

                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputtext}>Notes</Text>
                            <View style={styles.inputbox}>
                                <TextInput placeholder="" placeholderTextColor="white" style={styles.input} value={this.state.notes} onChangeText={(e) => this.setState({ notes: e })} multiline={true} />

                            </View>
                        </View>
                        <View >
                            <Text style={styles.inputtext}>Expected time</Text>
                            <View style={styles.inputbox} >
                                <Button title={this.state.time} style={styles.input} titleStyle={{ color: 'white' }} onPress={() => {

                                    this.setState({ timevisible: true })
                                }} type="clear" />
                                <DateTimePickerModal isVisible={this.state.timevisible} onConfirm={(e) => {
                                    var time = e.getHours() + ":" + e.getMinutes()
                                    this.setState({ time: time })
                                    this.setState({ timevisible: false })
                                }} onCancel={() => {
                                    this.setState({ timevisible: false })
                                }} mode="time" />


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
export default Selectfood
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
        borderBottomColor: 'green',
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
