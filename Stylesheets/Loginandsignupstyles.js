import { StyleSheet,Dimensions } from "react-native";
var dimensions=Dimensions.get('screen')
var screenwidth=dimensions.height
var screenheight=dimensions.width
var screenscale=dimensions.scale
const styles=StyleSheet.create({
    inputslogin:{
        margin:12,
        borderWidth:2,
        borderColor:'white',
        height:50,
        width:300,
        margin:2,
        fontSize:20,
        borderRadius:20,
        paddingLeft:20,
        marginBottom:40,
        color:'white'
    },
    heading:{
        fontSize:30,
        
    },
    loginbutton:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'white',
        color:'white',
        paddingHorizontal:20,
        paddingVertical:5,
        
    }
})
export default styles