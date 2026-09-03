import { useState, useEffect } from 'react'

function App() {
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
          { id: 5, name: "Chelsey Dietrich" },
          { id: 6, name: "Mrs. Dennis Schulist" },
          { id: 7, name: "Kurtis Weissnat" },
          { id: 8, name: "Nicholas Runolfsdottir V" },
          { id: 9, name: "Glenna Reichert" },
          { id: 10, name: "Clementina DuBuque" }
        ]

        setUsuarios(dadosSimulados)
      } catch (err) {
        setErro(err.message)
      } finally {
        setCarregando(false)
      }
    }

    carregarUsuarios()

    return () => controller.abort()
  }, [])


  if (carregando) {
    return <h2>Carregando...</h2>
  }

  
  if (erro) {
    return <h2>Erro: {erro}</h2>
  }

 
  if (usuarios.length === 0) {
    return <h2>Nenhum usuário encontrado.</h2>
  }

  return (
    <>
      <h1>Lista de Usuários</h1>
      <p>Sucesso: {usuarios.length} itens carregados.</p>
      
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
