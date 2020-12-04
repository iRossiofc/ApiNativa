import React from 'react';
import {View, Text, Button, TextImput } from 'react-native';

const TextToSpeech = () => {
    
    const [text,setText] = useState('');

    const speak = () => {
        Speech.speak(text);
    }

    return(
        <View style={styles.container}>
            <TextImput 
            value={text}
            onChangeText={ t => setText(t)}
            style={styles.input}
            />

            <Button
            title="Clique para falar"
            onPress={() => speak()}
            />
            
            <Text>TextToSpeech</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    input : {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        borderRadius: 6        
    },
    
})

export default TextToSpeech;