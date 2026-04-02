
import Sing_up from "./page/Sing_up"
import Hooks from "./hooks/hooks"
import Header from "./components/Header.tsx"
// import ExplorePage from "./page/ExplorePage.tsx"


function App() {
  const render = Hooks()
  return (
    <>
    <Header setIsSingUp = {render.setIsSignUp} setIsDropdown = {render.setIsDropdown} isDropdown = {render.isDropdown}/>
    <Sing_up message ={render.message} isSingUp = {render.isSignUp} value = {render.values} errors = {render.errors} touched = {render.touched} handleChange = {render.handleChange} handleBlur = {render.handleBlur} singUp = {render.signUp} login = {render.login} isLoggedForm = {render.isLoggedForm} setIsLoggedForm = {render.setIsLoggedForm} errorsLogin = {render.errorsLogin}/>
    {/* <ExplorePage/> */}
    </>
  )
}

export default App
