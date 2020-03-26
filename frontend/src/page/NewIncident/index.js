import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';


import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
    
            history.push('/profile');
    
        } catch(err) {
            alert('Ero ao cadastrar caso, tento novamento');
        }
    
    }

    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastra novo caso</h1>
                    <p>Faca seu cadastro, entre na platform</p>

                    <Link className="back-link"to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home 
                    </Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setDescription(e.target.value)}
                    />
            
                    <textarea 
                        placeholder="Descripcao" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                         placeholder="Valor em reais"
                         value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="bouton" style={{ height: 60 }} type="subit">Cadastrar</button>
                </form>

            </div>
        </div>
    )
}