import React, { useState, useEffect } from 'react';
import StatusAPI from './statusAPI';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function carregarUsuarios() {
      setCarregando(true);
      setErro(null);

      try {
        
        const resposta = await fetch('https://typicode.com', { signal });

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();
        
        

        setUsuarios(dados);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErro(err.message);
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuarios();

    return () => controller.abort();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Lista de Usuários 👥</h1>
      
      <StatusAPI carregando={carregando} erro={erro} quantidade={usuarios.length} />

     
      {!carregando && !erro && usuarios.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {usuarios.map((usuario) => (
            <li 
              key={usuario.id} 
              style={{ 
                padding: '12px', 
                margin: '8px 0', 
                backgroundColor: '#f4f4f9', 
                borderRadius: '6px',
                borderLeft: '5px solid #646cff',
                color: '#333'
              }}
            >
              {usuario.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaUsuarios;
