import React, { useState, useEffect } from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreatePublish = () => {


  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [offsetCreate, setOffsetCreate] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
  const [opacity, setOpacity] = useState(new Animated.Value(0))

  async function handleCreatePublish() {
   
    const date = new Date()
    const data = {
        title,
        description,
        date
    };
    try {
        const response = await api.post(`users/${id}/post`, data,{});
        alert(`Publicação criada com sucesso`);
        history.push("/Dashboard")
    } catch(err){
        alert("Erro no cadastro, tente novamente.")
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
          onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-left" size={25} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", color: '#333333', fontSize: 24, marginLeft: '-12%' }}>Nova publicação</Text>
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
          label='Titulo da publicação'
          value={title}
          mode={'outlined'}
          onChangeText={name => setName(name)}
          style={{ width: '90%', marginBottom: 16, marginHorizontal: 20, marginTop: 16 }}
        />

        <TextInput
          label='Descrição'
          value={description}
          numberOfLines={5}
          onChangeText={description => setDescription(description)}
          style={{ width: '90%', marginBottom: 16, marginHorizontal: 20, marginTop: 16,height: 200,}}
          mode={'outlined'}

        />

        <Button style={{ width: '70%', alignSelf: 'center', marginTop: 16, marginBottom: 35, height: 55, alignItems: 'center', backgroundColor: '#2196f3', borderRadius: 8 }} mode="contained" onPress={() => handleCreatePublish()}>
          <Text style={{ alignItems: 'center', alignSelf: 'center', fontSize: 18 }}>
            Cadastrar 
           </Text>
        </Button>

      </Animated.View>

    </View>
  );
}

export default CreatePublish;