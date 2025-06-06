import { StatusBar } from 'expo-status-bar'; // Importa la barra di stato di Expo
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, RefreshControl } from 'react-native'; // Importa componenti React Native
import React, { useEffect, useState } from 'react'; // Importa React e gli hook

export default function App() {
  // Stato per i dati degli utenti
  const [data, setData] = useState([]);
  // Stato per mostrare il caricamento iniziale
  const [loading, setLoading] = useState(true);
  // Stato per il refresh della lista
  const [refreshing, setRefreshing] = useState(false);

  // Effetto che richiama fetchData al primo render
  useEffect(() => {
    fetchData();
  }, []);

  // Funzione per recuperare i dati dalla API
  const fetchData = async () => {
    try {
      const response = await fetch('https://6839579f6561b8d882afff50.mockapi.io/user'); // Chiamata API
      const json = await response.json(); // Parsing JSON
      setData(json); // Aggiorna lo stato con i dati ricevuti
    } catch (error) {
      console.error(error); // Gestione errori
    } finally {
      setLoading(false); // Disattiva caricamento
      setRefreshing(false); // Disattiva refreshing
    }
  }

  // Funzione per gestire il refresh della lista (pull to refresh)
  const onRefresh = () => {
    setRefreshing(true); // Attiva refreshing
    fetchData(); // Ricarica i dati
  };

  // Funzione per eliminare un utente tramite API
  const deleteUser = async (id) => {
    try {
      await fetch(`https://6839579f6561b8d882afff50.mockapi.io/user/${id}`, {
        method: 'DELETE'
      });
      fetchData(); // Aggiorna la lista dopo l'eliminazione
    } catch (error) {
      console.error(error); // Gestione errori
    }
  };

  // Funzione per aggiungere un utente tramite API (POST vuoto)
  const addUser = async () => {
    try {
      const response = await fetch('https://6839579f6561b8d882afff50.mockapi.io/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      
      });
      if (response.ok) {
        fetchData(); // Aggiorna la lista dopo l'aggiunta
      }
    } catch (error) {
      console.error(error); // Gestione errori
    }
  };

  // Render del componente
  return (
    <View style={styles.container}>
      <StatusBar style="auto" /> {/* Barra di stato */}

      {loading ? (
        // Mostra spinner di caricamento se loading è true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Lista degli utenti */}
          <FlatList
            data={data} // Dati da visualizzare
            keyExtractor={(item) => String(item.id ?? Math.random())} // Chiave unica per ogni elemento
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={({ item }) => (
              <View style={styles.cella}>
                {/* Mostra immagine se presente */}
                {(item.immagine || item.avatar) && (
                  <Image
                    source={{ uri: item.immagine || item.avatar }}
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
                {/* Visualizza tutte le proprietà dell'utente tranne immagine/avatar */}
                <View style={{ flex: 1 }}>
                  {Object.entries(item).map(([key, value]) =>
                    key !== 'immagine' && key !== 'avatar' && (
                      <Text key={key} style={styles.riga}>
                        <Text style={styles.label}>{key}: </Text>{value}
                      </Text>
                    )
                  )}
                </View>
                {/* Bottone per eliminare l'utente */}
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteUser(item.id)}
                >
                  <Text style={{color: 'red', fontSize: 20}}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* Bottone per aggiungere un utente */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addUser}
          >  
            <Text style={{color: 'white', fontSize: 30}}>＋</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// Stili per i componenti
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  cella: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deleteButton: {
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  riga: {
    fontSize: 14,
  },
});