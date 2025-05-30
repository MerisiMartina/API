import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        renderItem={({ item }) => (
          <View style={styles.cella}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              {item.immagine && (
                <Image
                  source={{ uri: item.immagine }}
                  style={{ width: 70, height: 70, borderRadius: 35, marginRight: 18, marginTop: 4 }}
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
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  cella: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  riga: {
    fontSize: 17,
    marginBottom: 4,
    flexWrap: 'wrap',
    color: '#222',
  },
  label: {
    fontWeight: 'bold',
    color: '#005',
  },
  titolo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 18,
    alignSelf: 'center',
  }
});