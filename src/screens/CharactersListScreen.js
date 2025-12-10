import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, Dimensions, TextInput, ImageBackground } from "react-native";

import api from "../api/api";
import Botao from "../components/Botao";
import Logo from "../../assets/logo.png";
import Portal from "../../assets/portal.jpg";

const windowWidth = Dimensions.get('window').width;
const INITIAL_URL = '/character';

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
    const [buscaQuery, setBuscaQuery] = useState('');
    const [proximaPaginaUrl, setProximaPaginaUrl] = useState(null);
    const [loading2, setLoading2] = useState(false);

    const BuscarCharacters = async (url, isLoadMore = false) => {
      const isInitialPageLoad = !isLoadMore && buscaQuery === '';
 
      if (isInitialPageLoad) {
        setLoading(true);
        setError(null);
      } else if (!isLoadMore) {
        setLoading2(true);
        setError(null);
      } else {
        setLoading2(true);
      }

        try {
          const response = await api.get(url);

          setCharacters(prevCharacters => {
            if (isLoadMore) {
              const existingIds = new Set(prevCharacters.map(char => char.id));

              const newUniqueCharacters = response.data.results.filter(
                char => !existingIds.has(char.id)
              );

              return [...prevCharacters, ...newUniqueCharacters];
            } else {
              return response.data.results;
            }
          });

          const proximaUrl = response.data.info.next;
            setProximaPaginaUrl(proximaUrl || null);

        } catch (err) {
            if (err.response && err.response.status === 404) {
              setCharacters([]);
              setError(`Nenhum personagem encontrado com o nome "${buscaQuery}".`);
            } else {
                console.error("Erro ao buscar personagens:", err);
                setError("Não foi possível carregar os personagens");
            }
          } finally {
            setLoading(false);
            setLoading2(false);
          }
      };

    useEffect(() => {
      const urlComFiltro = buscaQuery
        ? `${INITIAL_URL}/?name=${buscaQuery}`
        : INITIAL_URL;

        BuscarCharacters(urlComFiltro, false);
    }, [buscaQuery]);

    const handleLoadMore = () => {
      if (proximaPaginaUrl && !loading2 && buscaQuery === '') {
        BuscarCharacters(proximaPaginaUrl, true);
      }
    };

    if (loading) {
        return (
            <View style={styles.mensagemCentro}>
                <ActivityIndicator size="large" color="#000000"/>
                <Text>Buscando personagens...</Text>
            </View>
        );
    }

    if (error && characters.length === 0) {
        return (
            <View style={styles.mensagemCentro}>
                <Text style={styles.errorText}> {error} </Text>
            </View>
        );
    }

    return (
        <ImageBackground source={Portal} style={styles.container} resizeMode="cover" blurRadius={3}>
          <View style={styles.header}>
            <Image 
              source={Logo}
              style={styles.logo}
            />
            <TextInput
              style={styles.pesquisaInput}
              placeholder="Buscar personagem"
              placeholderTextColor="#999999"
              value={buscaQuery}
              onChangeText={setBuscaQuery}
            />
          </View>
            <FlatList 
            data={characters} 
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <CharacterCard character={item} navigation={navigation} />
            )}
            contentContainerStyle={styles.listContent}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => loading2 ? <ActivityIndicator size="large" color="#000000" style={styles.loading2}/> :  null}
            />  
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mensagemCentro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontSize: 16,
  },
  header: {
    backgroundColor: "#20232a",
    height: windowWidth * 0.3,
    width: windowWidth * 1,
    borderBottomWidth: 3,
    borderColor: '#97ce4c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2.5%',
    paddingTop: '7%',
  },
  logo: {
    width: windowWidth * 0.35,
    height: 50,
    resizeMode: 'contain',
  },
  pesquisaInput: {
    flex: 1,
    maxWidth: windowWidth * 0.55,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  loading2: {
    paddingVertical: 20,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  detalhes: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default CharactersListScreen;