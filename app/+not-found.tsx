import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    marginBottom: 16,
  },
  link: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600' as const,
  },
});