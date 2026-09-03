import { useEffect, useState } from 'react'

function Exercicio2() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null) // Novo estado para erro

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        // URL alterada de propósito para testar o erro 404
        const resposta = await fetch('https://jsonplaceholder.typicode.com/usuariosenterrado')
        
        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados = await resposta.json()
        setUsuarios(dados.slice(0, 10))
      } catch (error) {
        setErro(error.message) // Captura a mensagem de erro
      } finally {
        setCarregando(false) // Sempre desliga no finally
      }
    }

    buscarUsuarios()
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

export default Exercicio2