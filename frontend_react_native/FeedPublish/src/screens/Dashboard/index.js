import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import api from '../../service/api';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Dashboard = () => {

  const navigation = useNavigation()
  const [id, setId] = useState()
  const [token, setToken] = useState()
  const [publishs, setPublishs] = useState([])

  useEffect(async () => {
    const id = JSON.parse(await AsyncStorage.getItem("id"));
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    setId(id)
    setToken(token)
  }, [])

  useEffect(() => {
    api.get(`users/${id}/posts`, {}).then(response => {
      console.log(response)
      setPublishs(response.data)
    })
  }, [id])

  async function handleDeletePublish(id) {
    try {
      await api.delete(`users/${id}/post`, {});
      setPublishs(publishs.filter(publishs => publishs.id !== id))
    } catch (err) {
      alert('Erro ao deletar, tente novamente!')
    }
  }

  async function logout() {
     AsyncStorage.removeItem("id");
     AsyncStorage.removeItem("token");
    
  }

  return (
    <View style={styles.container}>
      <Button style={{ marginLeft: '65%', marginBottom: -35 }} mode="text" onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.description}>
          Sair
         </Text>
      </Button>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={styles.title}>
            Bem-vindo!
           </Text>
          <Text style={styles.description}>
            Suas publicações
         </Text>
        </View>
        <Button style={{ width: '50%', alignSelf: 'center', marginTop: '16%', marginLeft: '8%', marginBottom: 35, height: 55, alignItems: 'center', backgroundColor: '#2196f3', borderRadius: 8 }} mode="contained" onPress={() => navigation.navigate('CreatePublish')}>
          Nova publicação
        </Button>
      </View>

      <FlatList
        style={styles.incidentsList}
        data={publishs}
        keyExtractor={publishs => publishs.id}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => {
          let newDate = new Date(item.date).toLocaleDateString('pt-BR')
          return (
            (
              <View style={styles.incidents}>

                <TouchableOpacity
                  style={{ alignSelf:'flex-end' }}
                  onPress={() => handleDeletePublish(item.id)}>
                  <Icon name="delete-outline" size={18} />
                </TouchableOpacity>

                <Text style={styles.incidentsProperty}></Text>
                <Text style={styles.incidentsValue}>{item.title}</Text>

                <Text style={styles.incidentsProperty}>Descrição:</Text>
                <Text style={styles.incidentsValue}>{item.description}</Text>

                <Text style={styles.incidentsProperty}>Data:</Text>
                <Text style={styles.incidentsValue}>{newDate}</Text>

              </View>
            )
          )
        }}
      />
    </View>
  )
}

export default Dashboard;