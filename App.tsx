
import React, { useState, useEffect } from 'react';
import {  StyleSheet, ScrollView, View, Text, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Formulario from './components/Formulario'
import Clima from './components/Clima'




//   https://api.tomorrow.io/v4/weather/forecast?location=10.086939,-69.269519&apikey=5XpYrVev5ygsxlttEZbY4qZ2pmDb2mUL

// const temperatura = dataAPI.timelines.daily.values.temperatureAvg

// https://api.tomorrow.io/v4/weather/forecast?location=USA,FL,Miami&apikey=5XpYrVev5ygsxlttEZbY4qZ2pmDb2mUL

//  1c8e8a1f56a9e836705a3ebd958dcb84

//https://api.openweathermap.org/data/2.5/weather?q=USA,Miami&appid=1c8e8a1f56a9e836705a3ebd958dcb84



const App = () => {
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad:'',
    pais:''
  })

  const [ consultar, guardarConsultar] = useState(false)

  const [resultado, guardarResultado] = useState({})

  const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)')

  const {ciudad, pais} = busqueda

  useEffect( () => {
    const consultarClima = async () => {
      if(consultar){
        console.log('consultando la api......................')
        const appId = '1c8e8a1f56a9e836705a3ebd958dcb84'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        console.log(url)
      
        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          guardarResultado(resultado)
          guardarConsultar(false)
          console.log(resultado)
          if(resultado.message){
            Alert.alert(
              'Error',
              resultado.message,
              [{text: 'OK'}]
          )
          }
          // modificando los colores de fondo basado en la tempreatura

          const kelvin = 273.15;
              const { main } = resultado;
              const actual = main.temp - kelvin;

              if(actual < 10) {
                guardarBgcolor('rgb( 105, 108, 149 )');
              } else if(actual >= 10 && actual < 25) {
                guardarBgcolor('rgb(71, 149, 212)');
              } else {
                guardarBgcolor('rgb( 178, 28, 61)');
              }

        } catch (error) {
          console.log(error)
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  },[consultar])

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultado intenta con otra ciudad o pais',
        [{text: 'OK'}]
    )
}
 

 const  ocultarTeclado = () => {
  console.log('desde teclado')
  Keyboard.dismiss()
 }

const bgcolorApp = {
  backgroundColor: bgcolor
}


  return (
    <>
 <TouchableWithoutFeedback
 onPress={() => {
  ocultarTeclado()
 }}
 >

<View style={[styles.app, bgcolorApp]}>
  <View style={styles.contenido}>
  <Clima
                  resultado={resultado}
                />
  <Formulario
  busqueda={busqueda}
  guardarBusqueda={guardarBusqueda}
  guardarConsultar={guardarConsultar}
  />
  </View>
</View>

</TouchableWithoutFeedback>

   

  </>
  );
}

const styles = StyleSheet.create({
 app: {
 
  
  flex: 1,
  justifyContent: 'center'
 },
 contenido: {
marginHorizontal: '2.5%'
 }
});

export default App;
