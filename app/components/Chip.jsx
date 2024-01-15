// Chip.js
import { TiDelete } from "react-icons/ti";
const Chip = ({ label, onDelete, isSelected }) => (
  
	<li
		className={`chip flex items-center p-2 rounded-full mr-4 ${
			isSelected ? "bg-red-500 font-bold" : "bg-blue-200"
		}`}
  >
    {console.log(isSelected)}
		<span className="text-blue-900 text-sm">{label}</span>
		<TiDelete
			onClick={onDelete}
			className="ml-2 text-blue-600 text-xl cursor-pointer transition duration-200 transform hover:scale-105"
		/>
	</li>
);

export default Chip;
