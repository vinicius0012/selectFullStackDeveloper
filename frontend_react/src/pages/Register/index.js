import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import '../../global.css'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';

export default function Register() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            password,
        };
        try {
            const response = await api.post('users', data);
            alert(`Cadastro realizado com sucesso`);
            history.push("/")
        } catch(err){
            alert("Erro no cadastro, tente novamente.")
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Insira as informações para realizar seu cadastro.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color={'#E02041'} />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome do usuário"
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
                    
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}