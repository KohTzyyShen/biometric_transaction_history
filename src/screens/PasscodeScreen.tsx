import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import strings from '../constants/strings';
import PasscodeDots from '../component/PasscodeDots';
import NumberPad from '../component/NumberPad';  // 数字键盘组件

export default function PasscodeScreen({ navigation }: any) {
  const { authenticate } = useAuth();
  const { passcode: userpasscode } = useUser();
  const [input, setInput] = useState('');

  useEffect(() => {
    if (input.length === 6) {
      if (input === userpasscode) {
        authenticate().then(() => {
          navigation.navigate('Transaction History', { skipPasscode: false });
        });
      } else {
        Alert.alert(
          strings.incorrect_passcode_title,
          strings.incorrect_passcode_message,
          [{ text: strings.try_again, onPress: () => setInput('') }],
          { cancelable: false }
        );
      }
    }
  }, [input]);

  return (
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
        <PasscodeDots length={input.length} maxLength={6} />
        <NumberPad value={input} maxLength={6} onChange={setInput} />
      </View>

      <View style={styles.forgotcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasscode')}>
          <Text style={styles.forgottext}>{strings.forgot_passcode}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginHorizontal: 0,
    marginTop: 35,
    height: 32,
  },
  backicon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  skipText: {
    color: '#007bff',
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
  forgotcontainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgottext: {
    fontSize: 16,
    color: '#007bff',
  },
});
