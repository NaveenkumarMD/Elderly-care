import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import firebase from 'firebase'
import { MaterialIcons, Entypo, Octicons } from '@expo/vector-icons'
import { Rating } from 'react-native-elements'
class Viewhelpers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            loading: true,
            userdata: {

            },
            comments: [
                {
                    rating: 3,
                    comments: 'faregrege'
                }
            ]
        }
    }
    componentDidMount = async () => {
        await this.setState({ id: this.props.route.params.id })
        await firebase.firestore().collection('Helpers').doc(this.state.id).get().then(async doc => {
            //console.log(doc.data().comments)
            await this.setState({ userdata: doc.data(), loading: false, comments: doc.data().comments })
        })
    }
    render() {
        var reviews = () => {
            return (
                <View>
                    <Text></Text>
                </View>
            )
        }
        if (this.state.comments != undefined) {
            const reviews = this.state.comments.map(data => {
                console.log(data)
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
        }


        return (
            <View style={styles.container}>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
                <ScrollView style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderColor: '#717378', paddingBottom: 30, marginBottom: 15 }}>
                        <Image source={require('../../assets/icon.png')} style={{ height: 80, width: 80, borderRadius: 80 }} />
                        <View>
                            <Text style={{ color: 'white', fontSize: 22, marginBottom: 10 }}>{this.state.userdata.name || 'name'}</Text>
                            <Text style={{ color: 'white', fontSize: 14 }}>+91 {this.state.userdata.mobile || 'mobile'}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10, borderBottomWidth: 2, borderColor: '#717378', paddingBottom: 10 }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Email</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20, }}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#ff7e07', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Entypo name="mail" size={22} color="white" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, paddingVertical: 10, paddingHorizontal: 10 }}>{this.state.userdata.email || '-'}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10, borderBottomWidth: 2, borderColor: '#717378', paddingBottom: 10 }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Work profile</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20, }}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#ff7e07', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialIcons name="work" size={22} color="white" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, paddingVertical: 10, paddingHorizontal: 10 }}>{this.state.userdata.work || '-'}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10, borderBottomWidth: 2, borderColor: '#717378', paddingBottom: 10 }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Location</Text>
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
                    <View style={{ marginBottom: 10, borderBottomWidth: 2, borderColor: '#717378', paddingBottom: 10 }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Interested in</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20, }}>
                            <View style={{ height: 40, width: 40, backgroundColor: '#ff7e07', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Octicons name="info" size={22} color="white" />
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                {this.state.userdata.interested ? this.state.userdata.interested.map(data => <Text style={{ color: 'white', fontSize: 20, paddingBottom: 10 }}>{data}</Text>) : null}
                            </View>
                        </View>
                    </View>
                    {this.state.comments != undefined &&
                        <View >
                            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Reviews</Text>
                            <View style={{ marginBottom: 30 }}>
                                {reviews}
                            </View>

                        </View>
                    }

                </ScrollView>
            </View>
        )
    }
}
export default Viewhelpers
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})