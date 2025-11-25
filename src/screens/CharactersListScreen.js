import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from "react-native";

import api from "../api/api";

const CharacterCard = ({ character, navigation }) => (
    <TouchableOpacity style={styles.card} 
    //onPress={() => navigation.navigate("CharacterDetail", { characterId: character.id })}
    OnPress={() => console.log("Clicado:", character.name)}
    >

    <Image
        source={{ uri: character.image }}
        style={styles.image}
    />
    <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}> {character.name} </Text>
        <Text style={styles.details}>
            <Text style={{ fontWeight: "bold" }}> Status: </Text> {character.status}
        </Text>

        <Text style={styles.details}>
            <Text style={{ fontWeight: "bold" }}> Espécie: </Text> {character.species}
        </Text>
    </View>
    </TouchableOpacity>
);

const CharactersListScreen = ({ navigation }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await api.get("/character");

                setCharacters(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar personagens:", error);
                setError("Não foi possível carregar os personagens");
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000000"/>
                <Text>Buscando personagens...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}> {error} </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList data={characters} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                <CharacterCard character={item} navigation={navigation} />
            )}
            contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default CharactersListScreen;