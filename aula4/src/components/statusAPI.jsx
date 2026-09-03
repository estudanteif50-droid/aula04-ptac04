import React from 'react'

function StatusAPI({ carregando, erro, quantidade }) {
  if (carregando) {
    return <h2>Carregando...</h2>
  }

  if (erro) {
    return <h2>Erro: {erro}</h2>
  }

  if (quantidade === 0) {
    return <h2>Nenhum usuário encontrado.</h2>
  }

  return <p>Sucesso: {quantidade} itens carregados.</p>
}

export default StatusAPI
