import type { User } from "../../types/User";
import type { Errors } from "../../types/Errors";
import type { Touched } from "../../types/Touched";



type Props = {
  value: User,
  errors: Errors,
  touched: Touched,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
};

export default function InputUsername({ value, touched, errors, handleChange, handleBlur }: Props) {
  return (
    <div>
      <label htmlFor="name" className="text-white font-medium">
        Nume:
      </label>
      <input
        type="text"
        placeholder="Nume"
        name="name"
        className={touched.name && errors.name ? "border border-red-500 bg-red-100 rounded-md ml-2 w-1/2" : "border border-white rounded-md bg-white ml-2 w-1/2" }
        value={value.name}
        onChange={handleChange}
        onBlur = {handleBlur}
      />
      {touched.name && errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}
    </div>
  );
}
