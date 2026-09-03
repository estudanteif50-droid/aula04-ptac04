import { useEffect, useState } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        // URL alterada de propósito para forçar o erro 404
        const resposta = await fetch('https://typicode.com')
        
        if (!resposta.ok) {
          // Lança o erro se a resposta não for bem-sucedida
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados = await resposta.json()
        setUsuarios(dados.slice(0, 10))
      } catch (error) {
        // Captura a mensagem e guarda no estado
        setErro(error.message)
      } finally {
        // Desliga a mensagem de carregando
        setCarregando(false)
      }
    }

    buscarUsuarios()
  }, [])

  // 1. Enquanto busca os dados, mostra isso:
  if (carregando) return <p>Carregando...</p>

  // 2. Se der erro (que é o que vai acontecer), mostra isso:
  if (erro) return <p>Erro: {erro}</p>

  // 3. Se tudo desse certo (sucesso), mostraria isso:
  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  )
}

export default App
