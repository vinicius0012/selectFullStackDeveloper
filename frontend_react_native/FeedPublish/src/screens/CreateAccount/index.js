import React, { useState, useEffect } from 'react';
import { View, Animated, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../service/api';

const CreateAccount = () => {

  const [name, setName] = useState("")
  const navigation = useNavigation()
  const [password, setPassword] = useState("")
  const [errorName, setErrorName] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [offsetCreate, setOffsetCreate] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
  const [opacity, setOpacity] = useState(new Animated.Value(0))

  async function handleRegister() {
    
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
      password,
    };
    try {
      const response = await api.post('users', data);
      Alert.alert(`Cadastro realizado com sucesso`);
      navigation.navigate('Login')
    } catch (err) {
      Alert.alert("Erro no cadastro, tente novamente.")
    }
  }

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

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginBottom: '8%', marginTop: '8%' }}>
        <TouchableOpacity
          style={{ marginRight: '35%', marginLeft: '-25%' }}
          onPress={() => navigation.navigate('Login')}>
          <Icon name="arrow-left" size={25} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", color: '#333333', fontSize: 24, marginLeft: '-12%' }}>Cadastre-se</Text>
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

        <Button style={{ width: '70%', alignSelf: 'center', marginTop: 16, marginBottom: 35, height: 55, alignItems: 'center', backgroundColor: '#2196f3', borderRadius: 8 }} mode="contained" onPress={() => handleRegister()}>
          <Text style={{ alignItems: 'center', alignSelf: 'center', fontSize: 18 }}>
            Cadastrar
           </Text>
        </Button>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text style={{ alignItems: 'center', alignSelf: 'center' }}>
            Já possue conta ? login
           </Text>
        </TouchableOpacity>

      </Animated.View>

    </View>
  );
}

export default CreateAccount;