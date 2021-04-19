import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View ,StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import {Ionicons,FontAwesome} from '@expo/vector-icons'
import Spinner from 'react-native-loading-spinner-overlay'
class Esentialslanding extends Component {
    constructor(props){
        super(props)
        this.state={
            userdata:{},
            requests:[],
            loading:true
        }
    }
    componentDidMount=async()=>{
        await AsyncStorage.getItem('userdata').then(userdata=>{
            this.setState({userdata:JSON.parse(userdata)})
        })
        await firebase.firestore().collection('Essentials').where('Elderid','==',this.state.userdata.mobile).onSnapshot(querysnapshot=>{
            var array=[]
            querysnapshot.forEach(doc=>{
                console.log(doc.id)
                var x=doc.data()
                x.id=doc.id
                //console.log(x)
                array.push(x)
            })
            this.setState({requests:array,loading:false})
        })
    }
    render() {
        var a=0
        const requests=this.state.requests.map(data=>{
            if(!data.status.Completed){
                a+=1
                return(
                    <TouchableOpacity activeOpacity={0.5} style={{padding:15,flexDirection:'row',justifyContent:'space-between',borderBottomColor:'#ff7e07',borderBottomWidth:1}}
                    onPress={()=>this.props.navigation.navigate('Viewrequest',{data:data.id})}
                    >
                        <View>
                            <Text style={{color:'white',fontSize:20}}>Request{a}</Text>
                            <Text style={{color:'white'}}>Date :{data.Daterequested}</Text>
                        </View>
                        <View>
                                <View style={{ height: 50, width: 50, backgroundColor: '#ff7e07', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="arrow-circle-right" size={30} color="white" />
                                </View>
                        </View>
                    </TouchableOpacity>
                )
            }

        })
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/>
                <ScrollView style={{paddingHorizontal:5}}>
                    {requests}
                </ScrollView>
                <TouchableOpacity style={{backgroundColor:'#ff7e07',height:50,justifyContent:'center',alignItems:'center'}} onPress={()=>this.props.navigation.navigate('SelectEssentials')}>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="add-circle-sharp" size={25} color="white" />
                        <Text style={{fontSize:25,paddingLeft:4,color:'white'}}>Add</Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
        )
    }
}
export default Esentialslanding
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    }
})