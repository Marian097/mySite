export default function InputPassword() {
  return (
    <div>
      <label htmlFor="password" className = "text-white font-medium">Parola:</label>
      <input type="password" placeholder="Password" className = "border border-white rounded-md bg-white w-1/2 ml-2"/>
      <div className="text-sm py-3">
        <a
          href="#"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Ai uitat parola?
        </a>
      </div>
    </div>
  );
}
