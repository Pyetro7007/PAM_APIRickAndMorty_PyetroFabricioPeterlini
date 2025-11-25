import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from './src/screens/CharactersListScreen';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CharacterList">
                <Stack.Screen name="CharacterList" component={CharactersListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
