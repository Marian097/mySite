type Props = {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
};
export default function InputUsername({ phone, setPhone }: Props) {
  return (
    <div>
      <label htmlFor="phone" className="text-white font-medium">
        Nume:
      </label>
      <input
        type="text"
        placeholder="Numar de telefon"
        name="phone"
        className="border border-white rounded-md bg-white ml-2 w-1/2"
        value={phone}
        onChange={(e) =>setPhone(e.target.value)}
      />
    </div>
  );
}
