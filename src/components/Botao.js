
import { TouchableOpacity, StyleSheet } from "react-native";

// children - conteúdo do botão
// aoPressionar - mesma coisa que o onPress, função que é executada quando o botão é apertado
export default function Botao({children, aoPressionar}){
    return(
        <TouchableOpacity style={styles.botao}onPress={aoPressionar} >
            {children}
        </TouchableOpacity>
    )
}

// estilizações do botão, usado em todos as outras telas
const styles = StyleSheet.create({
    botao:{
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
});