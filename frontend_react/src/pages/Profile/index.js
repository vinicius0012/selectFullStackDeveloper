import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'
import api from '../services/api'

export default function Profile() {

    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [publishs, setPublishs] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get(`users/${id}/posts`, {}).then(response => {
            setPublishs(response.data)
        })
    }, [id])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`users/${id}/post`, {});
            setPublishs(publishs.filter(publishs => publishs.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente!')
        }
    }

    async function handleLogout() {
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        history.push("/")
    }

    function formate(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    }

    return (
        <div className="profile-container">
            <header>
                <h1> Bem vindo(a), {name}</h1>

                <Link className={"button"} to="/publish/new">
                    Cadastrar nova publicação
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>
                Publicações cadastrados
            </h1>

            <ul>
                {publishs && publishs.map(({ id, title, description, date }) => {
                    let newDate = new Date(date).toLocaleDateString('pt-BR')
                    return (
                        <li key={id}>
                            <strong>{title}</strong>
                            <p></p>

                            <strong>Descrição:</strong>
                            <p>{description}</p>

                            <strong></strong>
                            <p>{newDate}</p>

                            <button type='button' onClick={() => handleDeleteIncident(id)}>
                                <FiTrash2 size={20} color="#A8A8B3" />
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}