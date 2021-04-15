import React, { Component } from 'react'
import { Text, View,Button,FlatList,StyleSheet,TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import distance from '../../../Functions/Finddistance'
import sortbydist from '../../../Functions/Sortbydistance'
import {Rating} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import {sendPushNotification } from '../../../App'
class Findhelperessential extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            userdata:'',loading:true
        }
    }
    handleviewhelper=(mobile)=>{
        this.props.navigation.navigate('Viewhelpers',{id:mobile})
    }
    async componentDidMount(){
        
        await AsyncStorage.getItem('userdata').then(data=>{
            this.setState({userdata:JSON.parse(data)})
            //console.log(JSON.parse(data))
        })
        await firebase.firestore().collection('Helpers').where('interested','array-contains','Essentials').get().then(query=>{
            var arr=[]
            query.forEach(async doc=>{
                
                let x={}
                x=doc.data()
                x.distance=distance(x.latitude,x.longitude,this.state.userdata.latitude,this.state.userdata.longitude).toFixed(4)
                arr.unshift(x)
        })
            this.setState({data:arr.sort(sortbydist),loading:false})
        
        }
        )

    }
    render() {

          const Item = ({ title,distance ,mobile,rating}) => (
            <TouchableOpacity style={styles.item} onPress={()=>this.handleviewhelper(mobile)}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{color:'#ff7e07'}}>{distance}</Text>
                </View>
                <Rating type='star' ratingCount={5} startingValue={rating} imageSize={20} showRating readonly  tintColor="black" ratingColor="red" showRating={false}/>

            </TouchableOpacity>
          );
          
        const renderItem = ({ item }) => (
            <Item title={item.name} distance={item.distance} mobile={item.mobile} rating={item.rating}/>
          );

        return (
            <View style={styles.container}>
                <Spinner visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/>
                
                <FlatList  data={this.state.data}  renderItem={renderItem}  keyExtractor={item => item.distance} />
                
                <View style={{alignItems:'center',padding:10}}>
                <Text style={{color:'white',alignSelf:'center'}}></Text>
                </View>
                <View>
                    <TouchableOpacity style={{backgroundColor:'#ff7e07',alignItems:'center',padding:10}} onPress={async () => {await sendPushNotification('ExponentPushToken[PXZswgO-JY1eLPQexE78mL]');}}>
                        <Text style={{color:'white',fontSize:20}}>Request</Text>
                    </TouchableOpacity>
                </View>
              </View>
        )
    }
}
export default Findhelperessential
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black',
    },
    item: {
      backgroundColor: 'black',
      padding: 10,
      flexDirection:'row',
      justifyContent:'space-between'

    },
    title: {
      fontSize: 20,
      color:'white'
    },
  });