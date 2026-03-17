import type { User } from "../../types/User";
import type { Errors } from "../../types/Errors";
import type { Touched } from "../../types/Touched";

type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function InputPassword({
  value,
  errors,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div>
      <label htmlFor="password" className="text-white font-medium">
        Parola:
      </label>
      <input
        type="password"
        placeholder="Parola"
        className={
         errors.password
            ? "border border-red-500  bg-red-100 rounded-md ml-2 w-1/2"
            : "border border-white rounded-md bg-white ml-2 w-1/2"
        }
        name="password"
        value={value.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {touched.name && errors.name && (
        <p style={{ color: "red" }}>{errors.password}</p>
      )}
    </div>
  );
}
