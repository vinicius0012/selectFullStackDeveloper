import React, { useState, useEffect } from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';

const Login = () => {

  const [name, setName] = useState("")
  const navigation = useNavigation()
  const [password, setPassword] = useState("")
  const [errorName, setErrorName] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [offsetCreate, setOffsetCreate] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
  const [opacity, setOpacity] = useState(new Animated.Value(0))

  useEffect(() => {
    fadeIn()
  }, [])

  const fadeIn = () => {
    Animated.parallel([
      Animated.spring(offsetCreate.y, {
        toValue: 0,
        speed: 2,
        bounciness: 20,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start()
  };

  async function handleLogon() {
    
    if(name =='' ){
      setErrorName(true)
      return
    }
    setErrorName(false)
    if(password =='' ){
      setErrorPassword(true)
      return
    }
    setErrorPassword(false)
    const data = {
        name,
        password
    };
    try {
        const response = await api.post('users/login', data);

        AsyncStorage.setItem("id", JSON.stringify(response.data.id))
        AsyncStorage.setItem("token", JSON.stringify(response.data.token))
        AsyncStorage.setItem("name", JSON.stringify(name))

        navigation.navigate('Dashboard')
    } catch (err) {
        console.log(err )
        alert("Erro no login, tente novamente.")
    }
}

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ justifyContent: 'flex-start', marginBottom: '25%', marginTop: '20%' }}>
        <Text style={{ fontWeight: "bold", color: '#333333', fontSize: 24 }}>Bem vindo(a).</Text>
      </View>

      <Animated.View style={{
        width: '100%',
        opacity: opacity,
        transform: [
          {
            translateY: offsetCreate.y
          }
        ]
      }}>
        <TextInput
          error={errorName}
          label='Nome do usuário'
          value={name}
          mode={'outlined'}
          onChangeText={name => setName(name)}
          style={{ width: '90%', marginBottom: 16, marginHorizontal: 20, marginTop: 16 }}
        />

        <TextInput
          error={errorPassword}
          label='Senha'
          value={password}
          onChangeText={password => setPassword(password)}
          style={{ width: '90%', marginBottom: 16, marginHorizontal: 20, marginTop: 16 }}
          secureTextEntry={true}
          mode={'outlined'}

        />

        <Button style={{ width: '70%', alignSelf: 'center', marginTop: 16, marginBottom: 35, height: 55, alignItems: 'center', backgroundColor:'#2196f3', borderRadius:8 }} mode="contained" onPress={() => handleLogon()}>
          <Text style={{ alignItems: 'center', alignSelf: 'center',fontSize:18  }}>
            Login
           </Text>
        </Button>

        <TouchableOpacity
          onPress={() =>  navigation.navigate('Account')}>
          <Text style={{ alignItems: 'center', alignSelf: 'center' }}>
            Não possue conta ? cadastre-se
           </Text>
        </TouchableOpacity>

      </Animated.View>

    </View>
  );
}

export default Login;