import { useEffect, useState } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    
    const controller = new AbortController()
    const { signal } = controller

    async function buscarUsuarios() {
      try {
        setCarregando(true)
        setErro(null)

        const resposta = await fetch('https://typicode.com', { signal })
        
        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados = await resposta.json()
        setUsuarios(dados.slice(0, 10))
      } catch (error) {
        
        if (error.name !== 'AbortError') {
          setErro(error.message)
        }
      } finally {
        if (!signal.aborted) {
          setCarregando(false)
        }
      }
    }

    buscarUsuarios()

   
    return () => controller.abort()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>

  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  )
}

export default App
