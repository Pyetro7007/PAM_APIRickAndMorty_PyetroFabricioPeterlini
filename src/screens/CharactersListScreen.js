import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, Dimensions } from "react-native";

import api from "../api/api";
import Botao from "../components/Botao";

const windowWidth = Dimensions.get('window').width;

const CharacterCard = ({ character, navigation }) => (
    <Botao style={styles.card} 
    aoPressionar={() => navigation.navigate("CharacterDetail", { characterId: character.id })}
    >

    <Image
        source={{ uri: character.image }}
        style={styles.imagem}
    />
    <View style={styles.infoContainer}>
        <Text style={styles.nome} numberOfLines={1}> {character.name} </Text>
        <Text style={styles.detalhes}>
            <Text style={{ fontWeight: "bold" }}> Status: </Text> {character.status}
        </Text>

        <Text style={styles.detalhes}>
            <Text style={{ fontWeight: "bold" }}> Espécie: </Text> {character.species}
        </Text>
    </View>
    </Botao>
);

const CharactersListScreen = ({ navigation }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const BuscarCharacters = async () => {
            try {
                const response = await api.get(`/character`);

                setCharacters(response.data.results);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar personagens:", err);
                setError("Não foi possível carregar os personagens");
                setLoading(false);
            }
        };

        BuscarCharacters();
    }, []);

    if (loading) {
        return (
            <View style={styles.mensagemCentro}>
                <ActivityIndicator size="large" color="#000000"/>
                <Text>Buscando personagens...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.mensagemCentro}>
                <Text style={styles.errorText}> {error} </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
          <View style={styles.header}>
          </View>
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
  mensagemCentro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    backgroundColor: "#dbdbdb",
    height: windowWidth * 0.1,
    width: windowWidth * 1,
    position: 'absolute',
    top: 0,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 40,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detalhes: {
    fontSize: 14,
    color: '#666',
  },
});

export default CharactersListScreen;