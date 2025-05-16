import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import strings from '../constants/strings';

export default function passcodescreen({ navigation }: any) {
  const { authenticate } = useAuth();
  const { passcode: userpasscode } = useUser();
  const [input, setinput] = useState('');
  const [keyboardheight] = useState(new Animated.Value(20));

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(keyboardheight, {
        toValue: e.endCoordinates.height + 20,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardheight, {
        toValue: 20,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (input.length === 6) {
      Keyboard.dismiss();
      if (input === userpasscode) {
        authenticate().then(() => {
          navigation.navigate('Transaction History', { skipPasscode: false });
        });
      } else {
        Alert.alert(
          strings.incorrect_passcode_title,
          strings.incorrect_passcode_message,
          [{ text: strings.try_again, onPress: () => setinput('') }],
          { cancelable: false }
        );
      }
    }
  }, [input]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <SafeAreaView style={styles.container}>
       <View style={styles.topRow}>
  <TouchableOpacity style={styles.backicon} onPress={() => navigation.navigate('Home')}>
    <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.skipButton}
    onPress={() => navigation.navigate('Transaction History', { skipPasscode: true })}
  >
    <Text style={styles.skipText}>Skip</Text>
  </TouchableOpacity>
</View>

        <View style={styles.body}>
          <Text style={styles.title}>{strings.enter_passcode}</Text>
          <Text style={styles.result}>{input}</Text>

          <View style={styles.inputrow}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              value={input}
              onChangeText={(text) => setinput(text.replace(/[^0-9]/g, ''))}
              autoFocus
            />
          </View>
        </View>

        <Animated.View style={[styles.forgotcontainer, { marginBottom: keyboardheight }]}>
          <TouchableOpacity onPress={() => Alert.alert(strings.reset_passcode)}>
            <Text style={styles.forgottext}>{strings.forgot_passcode}</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
 topRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 0, // same as container paddingHorizontal
  marginTop: 35, // same as before for backicon
  height: 32, // same height as backicon for vertical alignment
},
backicon: {
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
},
skipButton: {
  paddingHorizontal:15,
  paddingVertical: 5,
},
skipText: {
  color: '#007bff', // to make text transparent as you requested (or use 'Skip' if you want visible)
  fontSize: 16,
},

  body: {
    flex: 1,
    marginTop: 55,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    letterSpacing: 8,
    marginBottom: 20,
  },
  inputrow: {
    flexDirection: 'row',
  },
  input: {
    width: 200,
    height: 50,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  forgotcontainer: {
    alignItems: 'center',
  },
  forgottext: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 20,
  },
});
