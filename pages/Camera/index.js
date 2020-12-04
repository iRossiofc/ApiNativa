import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';

const ImagemCamera = () => {
        const [hasPermission, setHasPermission] = useState(null);
        //define o lado da camera (frontal ou traseira)
        const [type, setType] = useState(Camera.Constants.Type.back);
        const [imagemUri, setImagemUri] = useState(null);

        //pede a permissão do nosso usuario  
        useEffect(() => {
          (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
          })();
        }, []);

        const tirarFoto = async () => {
            if(camera){
                let foto = await camera.takePictureAsync();
                setImagemUri(foto.uri)
                alert('Foto Tirada');
            }
        }
      
        if (hasPermission === null) {
          return <View />;
        }
        if (hasPermission === false) {
          return <Text>Sem acesso a câmera</Text>;
        }

        return (
          <View style={{ flex: 1 }}>
            <Camera 
            style={{ flex: 1 }} 
            type={type}
            ref ={ref =>{
                camera = ref;
            }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Virar </Text>
                </TouchableOpacity>
              </View>
            </Camera>

            {imagemUri && <Image 
            source={{uri : imageUri}} 
            style={{height : 300}}
            />}

            <Button 
            title= "Tirar foto" onPress={() => tirarFoto()} />
          </View>
        );
}

export default ImagemCamera