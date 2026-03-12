
type Props = {
  setIsSingUp: (option:boolean) => void;
}

export default function Header({setIsSingUp}: Props) {
  return (
    <header className="sticky z-20 min-w-screen sm:h-16 h-12 bg-black/55">
      <nav className = "h-full flex justify-center items-center gap-x-7 text-white font-myfont sm:text-xl">
        <div>
          <span onClick = {() => setIsSingUp(true)} className = "cursor-pointer">Sing-up</span>
        </div>
        <div>
          <span onClick = {() => setIsSingUp(false)} className = "cursor-pointer">Login</span>
        </div>
      </nav>
    </header>
  );
}
