
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
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 50,
    },
});