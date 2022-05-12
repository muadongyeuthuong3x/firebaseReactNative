import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    const onClickPressLogin = async () => {
        if (email == '' || password == '') {
            Toast.show('Can nhap du email va password');
            return false;
        }
        let data = {
            id: uuid.v4(),
            email,
            password
        }

        // database()
        // .ref('/users/'+data.id)
        // .set( data)
        // .then(() =>Toast.show('Can nhap du email va password'));
        database()
            .ref('users/')
            .orderByChild("email")
            .equalTo(email)
            .once('value')
            .then(async snapshot => {
                if (snapshot.val() == null) {
                    Toast.show("Invalid Email Id!");
                    return false;
                }
                let userData = Object.values(snapshot.val())[0];
                if (userData?.password != password) {
                    Toast.show("Invalid Password!");
                    return false;
                }
            })

    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>App Chat KMA </Text>
            </View>

            <Animatable.View
                animation="fadeInUp"
                style={[
                    styles.footer,
                ]}>
                <Text style={[styles.text_footer,]}>Email :</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        style={styles.iconUser}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="green"
                        style={[
                            styles.textInput,
                        ]}
                        autoCapitalize="none"
                        onChangeText={val => setEmail(val)}
                    />
                </View>

                <Text style={[styles.text_footer]}>
                    Password :
                </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        style={styles.iconUser}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="green"
                        style={[
                            styles.textInput,
                        ]}
                        autoCapitalize="none"
                        secureTextEntry={secure}
                        onChangeText={val => setPassword(val)}
                    />
                    <TouchableOpacity >
                        {secure ? (
                            <FontAwesome name="eye" style={styles.securystyle} size={20} />
                        ) : (
                            <FontAwesome
                                name="eye-slash"
                                style={styles.securystyle}
                                size={20}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                {/* button login  */}
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={onClickPressLogin}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}>
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: '#fff',
                                    },
                                ]}>
                                Sign In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


            </Animatable.View>
        </View>
    );
};
export default SignInScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009385',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 10,
        padding: 1,
    },
    action: {
        flexDirection: 'row',
        marginTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    textInput: {
        flex: 1,
        paddingLeft: 13,
    },
    iconUser: {
        marginTop: 12,
    },
    securystyle: {
        marginTop: 12,
    },
    button: {
        marginTop: 50,
    },
    buttonRegister: {
        marginTop: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
    textSign: {
        color: 'red',
    },
    registerstyle: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
});