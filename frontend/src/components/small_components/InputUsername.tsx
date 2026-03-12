type Props = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
export default function InputUsername({ name, setName }: Props) {
  return (
    <div>
      <label htmlFor="name" className="text-white font-medium">
        Nume:
      </label>
      <input
        type="text"
        placeholder="Nume"
        name="name"
        className="border border-white rounded-md bg-white ml-2 w-1/2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
