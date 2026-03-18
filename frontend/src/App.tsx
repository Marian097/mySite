
import Sing_up from "./page/Sing_up"
import Hooks from "./hooks/hooks"
import Header from "./components/Header.tsx"


function App() {
  const render = Hooks()
  return (
    <>
    <Header setIsSingUp = {render.setIsSignUp} />
    <Sing_up isSingUp = {render.isSignUp} value = {render.values} errors = {render.errors} touched = {render.touched} handleChange = {render.handleChange} handleBlur = {render.handleBlur} singUp = {render.signUp} login = {render.login} isLoggedForm = {render.isLoggedForm} setIsLoggedForm = {render.setIsLoggedForm} errorsLogin = {render.errorsLogin}/>
    </>
  )
}

export default App
