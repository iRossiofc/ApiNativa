import React, { useEffect } from 'react'
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native'
import * as Contacts from 'expo-contatacts';

const Item = ({nome}) => {
    return(
        <View style={styles.item}>
            <Text style={styles.nome}>{nome}</Text>
        </View>
    )
}

const Contatos = () => {
    
    const [contatos, setContatos] = useState([]);

    useEffect(() =>{
        (async () => {
            const { status } = await Contacts.requestPermissionAsync();
            if (status === 'granted'){
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if(data.length > 0){
                    setContatos(data);
                }
            }
        })();
    }, []);

    const renderItem = ({item}) => {
        return (
            <Item nome={item.name}/>
        )
    }

    return(
        <View style={styles.container}>
            <Text>Contatos</Text>
            <FlatList
                data={contatos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    nome: {
        fontSize: 32,
    },
})

export default Contatos;