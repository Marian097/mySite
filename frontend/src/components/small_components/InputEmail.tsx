type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

export default function InputEmail({email, setEmail}: Props) {
  return (
    <div>
      <label htmlFor="email" className="text-white font-medium">
        Email:
      </label>
      <input
        type="email"
        placeholder="Adresa de email"
        name = "email"
        className="border border-white rounded-md bg-white w-1/2 ml-3"
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
      />
    </div>
  );
}
