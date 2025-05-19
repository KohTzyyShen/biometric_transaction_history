// app/transaction.tsx
import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function TransactionHistory() {
  const router = useRouter();

  return (
    <View>
      <Button title="Go Back Home" onPress={() => router.back()} />
    </View>
  );
}
