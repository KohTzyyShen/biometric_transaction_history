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

export default function PasscodeScreen({ navigation }: any) {
  const { authenticate } = useAuth();
  const { passcode: userPasscode } = useUser();
  const [input, setInput] = useState('');
  const [keyboardHeight] = useState(new Animated.Value(20));

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height + 20,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight, {
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
      if (input === userPasscode) {
        authenticate().then(() => {
          navigation.navigate('Transaction History', { skipPasscode: false });
        });
      } else {
        Alert.alert(
          'Incorrect passcode',
          'Please try again',
          [{ text: 'Try Again', onPress: () => setInput('') }],
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
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.body}>
          <Text style={styles.title}>Enter Pass code</Text>
          <Text style={styles.result}>{input}</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              value={input}
              onChangeText={(text) => setInput(text.replace(/[^0-9]/g, ''))}
              autoFocus
            />
          </View>
        </View>

        <Animated.View style={[styles.forgotContainer, { marginBottom: keyboardHeight }]}>
          <TouchableOpacity onPress={() => Alert.alert('Reset passcode')}>
            <Text style={styles.forgotText}>Forgot Passcode?</Text>
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
  backIcon: {
    marginTop: 35,
    marginLeft: 0,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputRow: {
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
  forgotContainer: {
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 20,
  },
});
