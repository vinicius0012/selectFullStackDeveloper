import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import '../../global.css'
import api from '../services/api';

export default function Logon() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    async function handleLogon(e) {
        e.preventDefault();
        const data = {
            name,
            password
        };
        try {
            const response = await api.post('users/login', data);
            localStorage.setItem("id", response.data.id)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("name", name)

            history.push("/profile")
        } catch (err) {
            alert("Erro no login, tente novamente.")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Seu nome de usuário"
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                        }}
                    />

                    <input
                        type={'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button type={'submit'} className={'button'}>
                        Entrar
                    </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color={'#2196f3'} />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    )
}