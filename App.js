import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://6839579f6561b8d882afff50.mockapi.io/user');
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <View style={styles.container}>
    <Text style={styles.titolo}>Abbonati di quest'anno</Text>
    <View style={styles.buttonRow}>
      <Button title="Refresh" color="#1976d2" onPress={() => {}} />
      <Button title="Aggiungi" color="#388e3c" onPress={() => {}} />
      <Button title="Elimina" color="#d32f2f" onPress={() => {}} />
    </View>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        renderItem={({ item }) => (
          <View style={styles.cella}>
            {item.immagine && (
              <Image
                source={{ uri: item.immagine }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  marginRight: 18,
                  alignSelf: 'center',
                  backgroundColor: '#e3eaf2'
                }}
              />
            )}
            <View style={{ flex: 1 }}>
              {Object.entries(item).map(([key, value]) =>
                key !== 'immagine' && (
                  <Text key={key} style={styles.riga}>
                    <Text style={styles.label}>{key}: </Text>{value}
                  </Text>
                )
              )}
            </View>
          </View>
        )}
      />
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fa',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  cella: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 22,
    padding: 18,
    shadowColor: '#003366',
    shadowOpacity: 0.09,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  riga: {
    fontSize: 16,
    marginBottom: 6,
    flexWrap: 'wrap',
    color: '#222',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  titolo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 24,
    alignSelf: 'center',
    letterSpacing: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 8
  },
});