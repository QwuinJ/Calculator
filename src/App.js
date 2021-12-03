import React, { useState } from "react";
import calcButtons from "./buttons.json";
import { evaluate } from "mathjs";

const App = () => {
	const [sum, setSum] = useState([""]);
	const [error, setError] = useState({ isError: false, message: "" });

	const handleButton = (val) => {
		try {
			setError({ isError: false, message: "" });
			if (val === "=") {
				let storedSum = [...sum];
				let joinedSum = storedSum.join("");
				let newSum = evaluate(joinedSum);
				setSum([newSum]);
			} else if (val === "clear") {
				setSum([""]);
			} else {
				let storedSum = [...sum, val];
				setSum(storedSum);
			}
		} catch (err) {
			setError({ isError: true, message: err });
			setSum([""]);
		}
	};
	return (
		<div className="App">
			<h1>CN Calc</h1>
			{error.isError && <div>You can't do that. try again.</div>}
			<div className="wrapper">
				<div className="screen">{sum}</div>
				<div className="buttonBox">
					<div className="buttons">
						{calcButtons.map((item, index) => (
							<button
								className={item.style}
								key={index}
								onClick={() => {
									handleButton(item.val);
								}}
							>
								{item.val}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
