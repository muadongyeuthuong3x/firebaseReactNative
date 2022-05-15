
import {
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Image,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import React  , { useEffect , useState }from 'react';

const ListChat = ({ route,  navigation }) => {
    const {userData } = route.params;
    const [search, setSearch] = React.useState();
    const [listUser , setlistUser] = React.useState();
    const [user ,setUser ] = React.useState(null);
    const getAllUser = async() => {
        database()
          .ref('users/')
          .once('value')
          .then(snapshot => {
            setlistUser(
               Object.values(snapshot.val()).filter(it => it.id != userData?.id),
            );
          });
      };
    //   const getTTuser = async()=>{
    //     const data =   await AsyncStorage.getItem('information');
    //     console.log(data)
    //     setUser(data)
    //   }
    useEffect(() => {
        // getTTuser()
         getAllUser()
         setUser(userData)
    }, []);

    const createDataListChat = (data)=>{
        console.log("a")
        database()
        .ref('/chatlist/' + userData.id + '/' + data.id)
        .once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
  
          if (snapshot.val() == null) {
            let roomId = uuid.v4();
            let myData = {
              roomId,
              id: userData.id,
              img: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              emailId: userData.email,
              lastMsg: '',
            };
            database()
              .ref('/chatlist/' + data.id + '/' + userData.id)
              .update(myData)
              .then(() => console.log('Data updated.'));
  
            delete data['password'];
            data.lastMsg = '';
            data.roomId = roomId;
            database()
              .ref('/chatlist/' + userData.id + '/' + data.id)
              .update(data)
              .then(() => console.log('Data updated.'));
  
              navigation.navigate('itemChat', {receiverData: data});
          } else {
            navigation.navigate('itemChat', {receiverData: snapshot.val()});
          }
        });
    }

    const renderItem = ({ item }) => { 
        return (
        <View   >
        <TouchableOpacity onPress={createDataListChat(item)} style={styles.itemchat}>
        <Image
            style={styles.tinyLogo}
            source={{
                uri: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
        />
        <View  style={styles.itemchatRight}>
            <View><Text style={styles.name}> {((item?.email).slice(0, 15)).concat("...")}</Text></View>
          
            <View style={styles.contentnd}>
                <Text style={styles.contentchat}>Text chat</Text>
                <Text style={styles.contentchat}> . 19:20</Text>
            </View>
        </View>
        </TouchableOpacity>
    </View>
      )}
    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.inputSearch}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm thành viên"
                    value={search}
                />
                 <FontAwesome
                        name="search"
                        style={styles.iconSearch}
                        size={20}
                    />
            </View>
            <FlatList
               showsVerticalScrollIndicator={false}
        data={listUser}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
        </SafeAreaView>
    );
};
export default ListChat;
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
        position: "relative"
    },
    tinyLogo: {
        width: 80,
        height: 80,
        borderRadius:40
      },
      container:{
          paddingHorizontal:20,
          backgroundColor:"#fff",
          height: Dimensions.get('window').height
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