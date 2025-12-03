import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from './src/screens/CharactersListScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CharacterList">
                <Stack.Screen name="CharacterList" component={CharactersListScreen} options={{headerShown: false}} />
                <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
