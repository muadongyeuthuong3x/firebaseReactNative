
import {
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Image,
    FlatList,
    Text
} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions , TouchableOpacity  } from 'react-native';
import React  , { useEffect , useState }from 'react';
const windowHeight = Dimensions.get('window').height;
const chatItem = ({ route,  navigation }) => {
   

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.inputSearch}>
               <Text>Text chat</Text>
            </View>
         
        </SafeAreaView>
    );
};
export default chatItem;
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        color: "black",
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#DCDCDC',
        borderColor: '#DCDCDC',
        textAlign:'center',
        position: "relative",
        
    },
    tinyLogo: {
        width: 80,
        height: 80,
        borderRadius:40
      },
      container:{
          paddingHorizontal:20,
          backgroundColor:"#fff",
          height:windowHeight
      },
      itemchat:{
          flexDirection:'row',
          marginBottom: 20,
          
      },
      itemchatRight:{
          marginLeft:10,
          marginTop:10
      },
      iconSearch:{
       position : "absolute",
       padding:10,
       margin:12,
       marginRight:20
      },
      name:{
        fontSize:20,
        fontWeight:"700",
        color: '#05375a'
      },
      contentchat:{
          color: "black",
          fontSize:15,
          marginTop:2
      },
      contentnd:{
          flexDirection:"row",
          justifyContent:"space-around"
      }
});