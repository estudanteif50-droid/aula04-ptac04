import React from 'react';

function StatusAPI({ carregando, erro, quantidade }) {
  if (carregando) {
    return <h2 style={{ textAlign: 'center', color: '#666' }}>Carregando...</h2>;
  }

  if (erro) {
    return <h2 style={{ textAlign: 'center', color: 'red' }}>Erro: {erro}</h2>;
  }

  if (quantidade === 0) {
    return <h2 style={{ textAlign: 'center', color: '#ff9900' }}>Nenhum usuário encontrado.</h2>;
  }

  return (
    <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>
      Sucesso: {quantidade} itens carregados.
    </p>
  );
}

export default StatusAPI;
