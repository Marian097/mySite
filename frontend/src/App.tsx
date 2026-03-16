
import Sing_up from "./page/Sing_up"
import Hooks from "./hooks/hooks"
import Header from "./components/Header.tsx"


function App() {
  const render = Hooks()
  return (
    <>
    <Header setIsSingUp = {render.setIsSingUp} />
    <Sing_up isSingUp = {render.isSingUp} name = {render.name} password = {render.password} email = {render.email} setEmail = {render.setEmail} setName = {render.setName} setPassword = {render.setPassword} sing_up = {render.sing_up} login = {render.login} phone = {render.phone} setPhone = {render.setPhone}/>
    </>
  )
}

export default App
