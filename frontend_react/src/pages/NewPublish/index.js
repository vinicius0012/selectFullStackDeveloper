import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import '../../global.css'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api'


export default function NewPublish() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const history = useHistory()
    const id = localStorage.getItem("id");
    const [token, setToken] = useState()
    const [publishs, setPublishs] = useState([])
  
    useEffect(async () => {
      const id = JSON.parse(await AsyncStorage.getItem("id"));
      const token = JSON.parse(await AsyncStorage.getItem("token"));
  
      setId(id)
      setToken(token)
    }, [])

    async function handleCreateIncidents(e) {
        e.preventDefault();
        const date = new Date()
        const data = {
            title,
            description,
            date
        };
        try {
            const response = await api.post(`users/${id}/post`, data,{});
            alert(`Publicação criada com sucesso`);
            history.push("/profile")
        } catch(err){
            alert("Erro no cadastro, tente novamente.")
        }
    }

    return (
        <div className="incidents-container">
            <div className="content">
                <section>
                    <h1>Cadastrar nova publicação</h1>
                    <p>Descreva sua nova publicação</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color={'#E02041'} />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleCreateIncidents}>
                    <input
                        placeholder="Titulo da publicação"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value)
                        }}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value)
                        }}
                    />

                    <button className="button" type="submit">
                        Cadastrar
                </button>
                </form>
            </div>
        </div>
    )
}