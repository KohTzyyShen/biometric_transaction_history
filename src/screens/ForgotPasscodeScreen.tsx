import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import strings from '../constants/strings';

export default function ForgotPasscodeScreen({ navigation }: any) {
  const { setPasscode } = useUser();
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  const handleConfirm = () => {
    if (newPasscode.length !== 6 || confirmPasscode.length !== 6) {
      Alert.alert(strings.incorrect_passcode_title, strings.passcode_must_be_6_digits);
    } else if (newPasscode !== confirmPasscode) {
      Alert.alert(strings.incorrect_passcode_title, strings.passcodes_do_not_match);
      setNewPasscode('');
      setConfirmPasscode('');
    } else {
      setPasscode(newPasscode);
      Alert.alert(strings.reset_passcode, strings.passcode_reset_success, [
        {
          text: strings.ok,
          onPress: () => navigation.navigate('Passcode'),
        },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.body}>
            {/* Title */}
            <View style={{ alignItems: 'center', gap: 5 }}>
              <Text style={styles.title}>{strings.forgot_passcode_title}</Text>
              <Text style={styles.result}>{strings.forgot_passcode_subtitle}</Text>
            </View>

            {/* Inputs */}
            <View style={{ gap: 10 }}>
              <View>
                <Text style={styles.label}>{strings.new_passcode_label}</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={6}
                  value={newPasscode}
                  onChangeText={(text) => setNewPasscode(text.replace(/[^0-9]/g, ''))}
                  secureTextEntry={true}
                />
              </View>

              <View>
                <Text style={styles.label}>{strings.confirm_passcode_label}</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={6}
                  value={confirmPasscode}
                  onChangeText={(text) => setConfirmPasscode(text.replace(/[^0-9]/g, ''))}
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>{strings.reset_passcode}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backIcon: {
    marginTop: 35,
    width: 40,
    height: 30,
    marginHorizontal: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  result: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#999',
    width: 200,
    textAlign: 'center',
    letterSpacing: 8,
    paddingVertical: 6,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#0000e6',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
});
