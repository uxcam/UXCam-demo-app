/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { enableScreens } from 'react-native-screens';

enableScreens();

import 'react-native-gesture-handler';

import React from 'react';
import { LoggedOutStack } from './src/navRoutes/loggedOutStack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/screens/splash/Splash';
import { AuthContext } from './src/helpers/context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Theme } from './src/config/theme';
import { Provider as PaperProvider } from 'react-native-paper';
import { MainModal } from './src/navRoutes/modalStack';
import { showToast } from './src/helpers';

import { NativeModules, NativeEventEmitter } from 'react-native';

import RNUxcam from 'react-native-ux-cam';
import { tagScreenName, startSessionWithKey } from './src/helpers/uxcamHelper';

RNUxcam.optIntoSchematicRecordings();

// required when using react-native-screens or native navigation
RNUxcam.setAutomaticScreenNameTagging(false);

/*
  disable advanced gestures if you're having issues with
  swipe gestures and touches during app interaction
*/
// RNUxcam.enableAdvancedGestureRecognizers(false);

//RNUxcam.startWithKey() methods goes here
//For this demo app, session starts from Login.js

export default () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const theme = Theme; //adds theme to react-native-paper UIs

  const authContext = React.useMemo(() => {
    return {
      signIn: (token) => {
        setIsLoading(false);
        setUserToken(token);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
      //starts uxcam session
      startSession: (key) => {
        startSessionWithKey(key);
      }
    }
  }, [])

  React.useEffect(() => {
    //Warning: Tag first screen name manually on initialRoute screen of each root stack
    tagScreenName('Login');
    _uxcamSessionStartListener();
    setTimeout(() => {
      setIsLoading(false);
    }, 0)
    return () => {
      this.uxcamEvent.remove(); //remove uxcamEvent listener, redundant in app.js
    }
  }, [])

  //listen for uxcam sesson start
  function _uxcamSessionStartListener() {
    const emitter = new NativeEventEmitter(NativeModules.RNUxcam);
    this.uxcamEvent = emitter.addListener('UXCam_Verification_Event', async () => {
      showToast('Session started');
    })
  }

  if (isLoading) {
    return <Splash />
  }

  // Gets the current screen from navigation state
  const getActiveRouteName = state => {
    const route = state.routes[state.index];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer
            onStateChange={state => {
              //tags screen name using active route name
              tagScreenName(getActiveRouteName(state))
            }}
          >
            {userToken ?
              <MainModal /> : <LoggedOutStack />
            }
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </AuthContext.Provider>
  )
}
