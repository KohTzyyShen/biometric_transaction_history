import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

export default function ForgotPasscodeScreen({ navigation }: any) {
  const { setPasscode } = useUser();
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  const handleConfirm = () => {
    if (newPasscode.length !== 6 || confirmPasscode.length !== 6) {
      Alert.alert('Error', 'Passcode must be 6 digits.');
    } else if (newPasscode !== confirmPasscode) {
      Alert.alert('Error', 'Passcodes do not match.');
    } else {
      setPasscode(newPasscode);
      Alert.alert('Success', 'Passcode has been reset.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Passcode'),
        },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.body}>
          <Text style={styles.title}>Forgot Passcode?</Text>
          <Text style={styles.result}>Enter new 6-digit passcode</Text>

          <View style={{ gap: 10 }}>
            <View>
              <Text style={styles.label}>New Passcode</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={6}
                value={newPasscode}
                onChangeText={(text) => setNewPasscode(text.replace(/[^0-9]/g, ''))}
              />
            </View>

            <View>
              <Text style={styles.label}>Re-enter New Passcode</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={6}
                value={confirmPasscode}
                onChangeText={(text) => setConfirmPasscode(text.replace(/[^0-9]/g, ''))}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    marginTop: 90,
    alignItems: 'center',
    gap: 60,
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
    backgroundColor: '#333',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
});
