import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";

import api from "../api/api";

const CharacterDetailScreen = ({ route }) => {
    const { characterId } = route.params;

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const buscarCharacterDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/character/${characterId}`);
                setCharacter(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar os detalhes do personagem:", err);
                setError("Não foi possível carregar os detalhes do personagem");
                setLoading(false);
            }
        };

        buscarCharacterDetails();
    }, [characterId]);

    if (loading) {
        return (
            <View style={styles.mensagemCentro}>
                <ActivityIndicator size="large" color="#000000"/>
                <Text>Buscando detalhes...</Text>
            </View>
        );
    }

    if (error || !character) {
        return (
            <View style={styles.mensagemCentro}>
                <Text style={styles.errorText}> {error} </Text>
            </View>
        );
    }

    return (
    <View>
        <Image
            source={{ uri: character.image }}
            style={styles.imagemGrande}
        />
        <View style={styles.card}>
            <Text style={styles.name}>{character.name}</Text>
            
            <DetailItem label="Status" value={character.status} />
            <DetailItem label="Espécie" value={character.species} />
            <DetailItem label="Gênero" value={character.gender} />
            <DetailItem label="Tipo" value={character.type || 'N/A'} />

            <View style={styles.divisao} />

            <DetailItem label="Origem" value={character.origin.name} />
            <DetailItem label="Localização Atual" value={character.location.name} />
        </View>
    </View>
    );
};

const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    mensagemCentro: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    imagemGrande: {
      width: '100%',
      height: 350,
      resizeMode: 'cover',
    },
    card: {
      backgroundColor: '#fff',
      margin: 15,
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#20232a',
      marginBottom: 15,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 10,
    },
    detailItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#f7f7f7',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
    },
    value: {
      fontSize: 16,
      color: '#333',
      maxWidth: '60%', // Evita que o texto quebre de forma estranha
      textAlign: 'right',
    },
    divisao: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 15,
    }
});

export default CharacterDetailScreen;