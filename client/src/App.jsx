import './App.css'
import {gql} from '@apollo/client'
import {useQuery} from '@apollo/client/react'

const query= gql`
query ExampleQuery {
  getTodos {
    title,
    userId,
    user {
      name
    }
  }
}
`
function App() {
  const {data}= useQuery(query)

  return (
    <>
      <table>
        <tbody>
            {
              data?.getTodos?.map((todo)=>(  
            <tr>
                <td>{todo?.title}</td>
                <td>{todo?.user?.name}</td>
            </tr>
              ))
            }
        </tbody>
      </table>
    </>
  )
}

export default App
