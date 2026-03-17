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

export default function InputUsername({ value, errors, touched, handleChange, handleBlur }: Props) {
  return (
    <div>
      <label htmlFor="phone" className="text-white font-medium">
        Telefon:
      </label>
      <input
        type="text"
        placeholder="Numar de telefon"
        name="phone"
        className={touched.phone && errors.phone ? "border border-red-500 rounded-md bg-red-100  w-1/2" : "border border-white rounded-md bg-white w-1/2" }
        value={value.phone}
        onChange={handleChange}
        onBlur = { handleBlur }
      />
        {touched.phone && errors.phone && (
          <p style={{ color: "red" }}>{errors.phone}</p>
        )}
    </div>
  );
}
