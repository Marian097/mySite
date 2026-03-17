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

export default function InputEmail({value, errors, touched, handleChange, handleBlur}: Props) {
  return (
    <div>
      <label htmlFor="email" className="text-white font-medium">
        Email:
      </label>
      <input
        type="email"
        placeholder="Adresa de email"
        name = "email"
        className={errors.email && touched.email ? "border border-red-500  bg-red-100 rounded-md w-1/2 ml-3" : "border border-white rounded-md bg-white w-1/2 ml-3" }
        value = {value.email}
        onChange = {handleChange}
        onBlur = {handleBlur}
      />

     {touched.email && errors.email && (
          <p style={{ color: "red" }}>{errors.email}</p>
        )}
    </div>
  );
}
