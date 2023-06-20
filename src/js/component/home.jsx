import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
	const[todos, setTodos] = useState(() => {
	
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
		  return JSON.parse(savedTodos);
		} else {
		  return [];
		}
	  });

	  const[inputValue, setInputValue] = useState("");
	
	  useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	  }, [todos]);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	  };
	
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			const newTodos = [...todos,inputValue]
			setTodos(newTodos);
			setInputValue("")
		}
	  };
	return (
		<div className="container">
			<h1>My Todo List</h1>
			<ul>
				<li>
					<input type="text"
					value={inputValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder="Tasks To Be Done"></input>
					</li>
				{todos.map((item, index) =>
					<li>{item}{""} <i className="fas fa-trash-alt"
					onClick={() =>
					setTodos(
						todos.filter(
							(t,currentIndex) =>
							index != currentIndex
						)
					)
				}
					></i></li>
				)

				}
				
			</ul>
			<div>{todos.length===0 ? <h4>No tasks, add one!</h4> : <h5>You have {todos.length} tasks to complete</h5>}</div>
		</div>
	);
};

export default Home;
