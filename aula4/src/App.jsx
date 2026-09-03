import { useEffect, useState } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function buscarUsuarios() {
      try {
        setCarregando(true)
        setErro(null)

        await new Promise((resolve) => setTimeout(resolve, 600))

        const dados = [] 
        
        setUsuarios(dados)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErro(error.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()

    return () => controller.abort()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>

  if (usuarios.length === 0) {
    return <p>Nenhum usuário encontrado.</p>
  }

  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  )
}

export default App
