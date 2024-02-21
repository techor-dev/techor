import ReactDOM from 'react-dom'
import Client from './components/Client'
import Server from './components/Server'

const App = () => {
    return (
        <>
            <h1>Hello, World!</h1>
            <Client></Client>
            <Server></Server>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

type baseType<E> = string
    | string[]
    | Record<string, boolean>
    | [string, { [key in keyof E]?: E[key] }]
    | { [key in keyof E]?: E[key] extends boolean | undefined ? string : Record<string, string> }