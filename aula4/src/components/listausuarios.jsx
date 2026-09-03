import React, { useState, useEffect } from 'react'
import StatusAPI from './statusAPI'

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function carregarUsuarios() {
      setCarregando(true)
      setErro(null)

      try {
        await new Promise((resolve) => setTimeout(resolve, 800))

        

        const dadosSimulados = [
          { id: 1, name: "Leanne Graham" },
          { id: 2, name: "Ervin Howell" },
          { id: 3, name: "Clementine Bauch" },
          { id: 4, name: "Patricia Lebsack" },
          { id: 5, name: "Chelsey Dietrich" }
        ]

        

        setUsuarios(dadosSimulados)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErro(err.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    carregarUsuarios()

    return () => controller.abort()
  }, [])

  return (
    <>
      <h1>Lista de Usuários — Exercício 5</h1>
      
      <StatusAPI carregando={carregando} erro={erro} quantidade={usuarios.length} />

      {!carregando && !erro && usuarios.length > 0 && (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>{usuario.name}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ListaUsuarios
