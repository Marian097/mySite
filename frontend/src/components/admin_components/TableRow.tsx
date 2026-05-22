import img from "../../assets/image/235089438.png"

export default function TableRow() {
  return (
    <tr >
      <td>e36d7cfc-6cb9-41e2-a650-3c4f7372b33b</td>
      <td>Marian</td>
      <td>lungumarian15@gmail.com</td>

      <td>
        <img src={img} alt="" className="h-15" />
      </td>

      <td>01-01-2028</td>
      <td>Success</td>
    </tr>
  )
}