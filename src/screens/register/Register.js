import React, { useState } from 'react';
import {
    View, Keyboard, Linking
} from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyColors } from '../../config/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button, Caption } from 'react-native-paper';
import { commonStyles } from '../commonStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InAppBrowser from 'react-native-inappbrowser-reborn'

function Register({ navigation }) {

    const [inputValues, setInputValues] = useState({
        username: '', phone: '', email: '', password: '', confirmPassword: ''
    });

    const handleOnChange = (key, value) => {
        setInputValues({ ...inputValues, [key]: value });
    };

    function register() {
        Keyboard.dismiss();
        console.log(inputValues)
    }

    async function openTerms() {
        try {
            if (await InAppBrowser.isAvailable()) {
                await InAppBrowser.open("https://help.uxcam.com/hc/en-us/articles/360004117372")
            }
            else Linking.openURL(url)
        } catch (error) {
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: MyColors.defaultBackground }}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
            >
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={[styles.title, { marginBottom: 20 }]}>Register</Text>
                    <TextInput
                        autoCapitalize="none"
                        theme={{
                            roundness: 20,
                            colors: {
                                placeholder: MyColors.lightGray
                            }
                        }}
                        mode="outlined"
                        style={commonStyles.textInput}
                        label='Username'
                        value={inputValues.username}
                        onChangeText={text => handleOnChange('username', text)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        theme={{
                            roundness: 20,
                            colors: {
                                placeholder: MyColors.lightGray
                            }
                        }}
                        mode="outlined"
                        keyboardType="email-address"
                        style={commonStyles.textInput}
                        label='Email'
                        value={inputValues.email}
                        onChangeText={text => handleOnChange('email', text)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        theme={{
                            roundness: 20,
                            colors: {
                                placeholder: MyColors.lightGray
                            }
                        }}
                        mode="outlined"
                        keyboardType="number-pad"
                        style={commonStyles.textInput}
                        label='Phone'
                        value={inputValues.phone}
                        onChangeText={text => handleOnChange('phone', text)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        theme={{
                            roundness: 20,
                            colors: {
                                placeholder: MyColors.lightGray
                            }
                        }}
                        mode="outlined"
                        style={commonStyles.textInput}
                        label='Password'
                        value={inputValues.password}
                        secureTextEntry={true}
                        onChangeText={text => handleOnChange('password', text)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        theme={{
                            roundness: 20,
                            colors: {
                                placeholder: MyColors.lightGray
                            }
                        }}
                        mode="outlined"
                        style={commonStyles.textInput}
                        label='Confirm password'
                        value={inputValues.confirmPassword}
                        secureTextEntry={true}
                        onChangeText={text => handleOnChange('confirmPassword', text)}
                    />
                    <View style={styles.bottomContainer}>
                        <Caption>By signing up, you agree with our</Caption>
                        <TouchableOpacity onPress={openTerms}>
                            <Text style={styles.signup}> terms & conditions</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        theme={{ roundness: 20 }}
                        style={{ marginTop: 20 }}
                        mode="contained"
                        onPress={register}>
                        Sign up
                    </Button>
                    <View style={[styles.bottomContainer, {marginTop: 30}]}>
                        <Caption>Already have an account:</Caption>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <Text style={styles.signup}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default Register;