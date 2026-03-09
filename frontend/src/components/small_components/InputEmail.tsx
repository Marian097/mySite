export default function InputEmail() {
  return (
    <div>
      <label htmlFor="email" className="text-white font-medium">
        Email:
      </label>
      <input
        type="email"
        placeholder="Email address"
        className="border border-white rounded-md bg-white w-1/2 ml-3"
      />
    </div>
  );
}
