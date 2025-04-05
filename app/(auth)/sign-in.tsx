import { signIn } from '@/api/users';
import AppButton from '@/components/ui/AppButton';
import { Text } from '@/components/ui/Form';
import { secureSave } from '@/utils/storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    if (!email || !password) {
      alert('Please fill in all fields!!');
      return;
    }

    signIn(email, password)
    .then(async ({token}) => {
      await secureSave('token', token);
      setEmail("");
      setPassword("");
      router.push("/dashboard/(dashboard)");
    }).catch((error) => {
      alert(error.message);
    })
  }

  return (
    <View style={styles.container}>
      {/* <Button title="Sign in" /> */}
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            value={email}
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            value={password}
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <AppButton onPress={handleSignIn}>Sign in</AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15152F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  field: {
    width: '90%',
    gap: 12,
  },

  form: {
    gap: 24,
    width: '80%',
  },

  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    // width: "80%",
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
});
