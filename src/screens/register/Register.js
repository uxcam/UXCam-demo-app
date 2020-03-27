import React, { useState, useEffect } from 'react';
import {
    View, Keyboard, Linking, AppState
} from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyColors } from '../../config/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button, Caption } from 'react-native-paper';
import { commonStyles } from '../commonStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showToast } from '../../helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import { hideSensitiveView } from '../../helpers/uxcamHelper';
import RNUxcam from 'react-native-ux-cam';

function Register({ navigation }) {

    const [showSpinner, setShowSpinner] = useState(false);
    const [inputValues, setInputValues] = useState({
        username: '', phone: '', email: '', password: '', confirmPassword: ''
    });

    const _handleOnChange = (key, value) => {
        setInputValues({ ...inputValues, [key]: value });
    };

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    //allow short break incase user view terms and condition on external browser
    const _handleAppStateChange = nextAppState => {
        if (nextAppState === "active") {
            RNUxcam.allowShortBreakForAnotherApp(false);
        }
        else if (nextAppState === "inactive") {
            RNUxcam.allowShortBreakForAnotherApp(true);
        }
    };

    function _register() {
        Keyboard.dismiss();
        setShowSpinner(true);
        setTimeout(() => {
            showToast('User successfully registered');
            setShowSpinner(false);
            navigation.goBack();
        }, 2000);
    }

    //opens url in external default browser
    function _openTerms() {
        const url = "https://www.google.com/";
        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    Linking.openURL(url);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: MyColors.defaultBackground }}>
            <Spinner
                visible={showSpinner}
            />
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
                        onChangeText={text => _handleOnChange('username', text)}
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
                        onChangeText={text => _handleOnChange('email', text)}
                    />
                    <TextInput
                        ref={hideSensitiveView}
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
                        onChangeText={text => _handleOnChange('phone', text)}
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
                        onChangeText={text => _handleOnChange('password', text)}
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
                        onChangeText={text => _handleOnChange('confirmPassword', text)}
                    />
                    <View style={styles.bottomContainer}>
                        <Caption>By signing up, you agree with our</Caption>
                        <TouchableOpacity onPress={_openTerms}>
                            <Text style={styles.signup}> terms & conditions</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        theme={{ roundness: 20 }}
                        style={{ marginTop: 20 }}
                        mode="contained"
                        onPress={_register}>
                        Sign up
                    </Button>
                    <View style={[styles.bottomContainer, { marginTop: 30 }]}>
                        <Caption>Already have an account:</Caption>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.signup}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default Register;