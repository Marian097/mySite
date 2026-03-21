
type Props = {
  setIsSingUp: (option:boolean) => void;
}


export default function NavDesktop({setIsSingUp}: Props) {
  return (
     <nav className = "flex gap-x-2 items-center px-7 mr-5 font-myGeistExtraBold md:text-xl">
        <div>
          <span onClick = {() => setIsSingUp(true)} className = "cursor-pointer hover:bg-indigo-500 px-7 py-3 rounded-md">Sing In</span>
        </div>
        <div>
          <span onClick = {() => setIsSingUp(false)} className = "cursor-pointer  hover:bg-indigo-500 px-7 py-3 rounded-md">Login</span>
        </div>
      </nav>
  )
}
