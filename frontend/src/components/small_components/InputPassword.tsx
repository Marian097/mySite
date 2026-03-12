type Props = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputPassword({password,setPassword}: Props) {
  return (
    <div>
      <label htmlFor="password" className = "text-white font-medium">Parola:</label>
      <input type="password" placeholder="Parola" className = "border border-white rounded-md bg-white w-1/2 ml-2" name = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
    </div>
  );
}
