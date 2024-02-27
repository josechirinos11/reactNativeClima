import React, { useState, useCallback  }  from 'react'
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar}) => {

const {pais, ciudad} =busqueda
    // animaciones.........................................
    const [animacionboton] = useState(new Animated.Value(1))
    //....................................................



const consultarClima = () => {
    if(pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta()
        return
    }

    // consultar la api
    guardarConsultar(true)

}
const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'Agrega una ciudad y pais para la busqueda',
        [{text: 'Entendido'}]
    )
}



    // seguir con la animacion ......................................
    const animacionEntrada = () => {
        console.log('Entrada')
        Animated.spring( animacionboton, {
            toValue: .9
          
        }).start()
    }
    const animacionSalida = () => {
        Animated.spring( animacionboton, {
            toValue: 1,
            friction: 4,
            tension: 30
        }).start()
    }
    const estiloAnimacion = {
       transform: [{ scale: animacionboton}]
    }
// ............................................



  return (
    <>
     <View style={StyleSheet.formulario}>
        <View>
            <TextInput 
            value={ciudad}
            style={styles.input}
            onChangeText={(ciudad) => { 
                guardarBusqueda({...busqueda, ciudad})}
            }
            placeholder="Ciudad"
            placeholderTextColor="#666"
            />
        </View>
        <View style={styles.picker}>
        <Picker
        selectedValue={pais}
      itemStyle={{ height: 120, backgroundColor: '#FFF' , }}
      onValueChange={(pais) => {
         guardarBusqueda({...busqueda, pais}
        )}
    }
                       
                    >
                        <Picker.Item label="-- Seleccione un país --" value="" />
                        <Picker.Item label="Estados Unidos" value="USA" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
        </View>
        <TouchableWithoutFeedback
        onPressIn={() => {
            animacionEntrada()
        }}
        onPressOut={() => {
            animacionSalida()
        }}
        onPress={() => {
            consultarClima()
        }}
        >
            
            <Animated.View
            style={[styles.btnBuscar, estiloAnimacion]}
            >
                <Text style={styles.textoBuscar}>Buscar Clima</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
     </View>
    </>
  )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        padding: 10,
        height: 50,
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    picker: {
        height: 120,
        backgroundColor: '#FFF',
        justifyContent:'center',
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent:'center',
        alignItems: 'center'
    },
    textoBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18  
    }
});

export default Formulario
