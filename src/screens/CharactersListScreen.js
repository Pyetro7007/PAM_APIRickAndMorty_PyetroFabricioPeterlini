const CharactersListScreen = ({ navigation }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCharacters();
    }, []);

    const loadCharacters = async () => {
        try {
            setLoading(true)
            const data = await fetchCharacters(1);
            setCharacters(data);
            setLoading(false);
        } catch (error) {
            console.error("Falaha ao carregar os dados:", error);
            setError("Não foi possível carregra os personagens. Tente Novamente");
            setLoading(false);
            Alert.alert("Erro", "Houve um problema ao buscar os dados da API")
        }
    };

    if
}