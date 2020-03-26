import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handlelogin(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert('falied logon, tente novemente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Heroes" />

                <form onSubmit={handlelogin}>
                    <h1>Faca seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} 
                    />
                    <button className="bouton" type="submit">Entrar</button>

                    <Link to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Nao tenho cadastra
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes" />
        </div>
    );
}