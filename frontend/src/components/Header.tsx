export default function Header() {
  return (
    <header className="sticky z-20 min-w-screen sm:h-16 h-12 bg-black/55">
      <nav className = "h-full flex justify-center items-center gap-x-7 text-white font-myfont sm:text-xl cursor-pointer">
        <div>
          <span>Sing-up</span>
        </div>
        <div>
          <span>Login</span>
        </div>
      </nav>
    </header>
  );
}
