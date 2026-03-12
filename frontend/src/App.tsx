
import Sing_up from "./page/Sing_up"
import Hooks from "./hooks/hooks"
import Header from "./components/Header.tsx"


function App() {
  const render = Hooks()
  return (
    <>
    <Header setIsSingUp = {render.setIsSingUp} />
    <Sing_up isSingUp = {render.isSingUp} name = {render.name} password = {render.password} email = {render.email} showRulePass = {render.showRulePass} showRuleFields = {render.showRuleFields} setEmail = {render.setEmail} setName = {render.setName} setPassword = {render.setPassword} singUp = {render.sing_up} login = {render.login}/>
    </>
  )
}

export default App
