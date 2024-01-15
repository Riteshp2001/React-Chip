// ChipInput.js
"use client";

import React, { useState } from "react";
import Chip from "./../components/Chip.jsx";

const ChipList = ({ chips, removeChip, focusIndex }) => (
	<ul className="chips flex flex-wrap">
		{chips.map((chip, index) => (
			<Chip
				key={chip.label}
				label={chip.label}
				onDelete={() => removeChip(chip.label)}
				isSelected={focusIndex === index}
			/>
		))}
	</ul>
);

const ChipInput = () => {
	const [text, setText] = useState("");
	const [chips, setChips] = useState([]);
	const [validationError, setValidationError] = useState("");
	const [focusedChipIndex, setFocusedChipIndex] = useState(null);

	const removeChip = (chipToRemove) => {
		const updatedChips = chips.filter((chip) => chip.label !== chipToRemove);

		if (updatedChips.length > 0) {
			updatedChips[updatedChips.length - 1].isSelected = true;
		}

		setChips(()=>updatedChips);
	};

	const addChip = () => {
		setChips((prevChips) => [...prevChips, { label: text, isSelected: false, isDropdownLabel: false }]);

		setText("");
		setValidationError("");
		setFocusedChipIndex(chips.length); // Set focus on the newly added chip
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") e.preventDefault();

		if (e.key === "Backspace" && text === "" && chips.length > 0) {
			handleBackspace();
		} else if (e.key !== "Enter" || !text) {
			return;
		} else if (chips.some((chip) => chip.label === text)) {
			setValidationError("Cannot add the same input more than once");
		} else {
			addChip();
		}
	};

	const handleBackspace = () => {
		if (focusedChipIndex === null) {
			setFocusedChipIndex(chips.length - 1);
		} else {
			removeChip(chips[focusedChipIndex].label);
			setFocusedChipIndex(focusedChipIndex === 0 ? null : focusedChipIndex - 1);
		}
	};

	const focusIndex = (index) => {
		setFocusedChipIndex(index);
	};

	return (
		<div className="relative p-8 rounded-lg max-w-screen-lg mx-auto bg-orange-500">
			<label htmlFor="tags" className="relative block text-lg font-bold mb-2 text-gray-800">
				Tags
			</label>
			<div className="relative input-container focus-within:border focus:bg-blue-100 text-black font-bold italic border-blue-500 flex flex-wrap items-center bg-gray-100 rounded-md p-4 transition duration-200">
				<ChipList chips={chips} removeChip={removeChip} focusIndex={focusIndex} />
				<input
					id="tags"
					placeholder="Add tags and press Enter"
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
					onKeyDown={handleKeyPress}
					className="font-sans text-lg flex-grow bg-transparent outline-none focus:outline-none"
				/>
			</div>
			{validationError && (
				<p className="error-message mt-2 text-red-600 font-extrabold text-sm">{validationError}</p>
			)}
			<div className="mt-4">
				<label htmlFor="chips" className="block text-lg font-bold mb-2 text-gray-800">
					Chips as JSON
				</label>
				<pre className="bg-orange-100 text-black italic p-4 rounded-md">{JSON.stringify(chips, null, 2)}</pre>
			</div>
		</div>
	);
};

export default ChipInput;
