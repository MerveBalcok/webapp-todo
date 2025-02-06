import React, { useEffect } from 'react';

export default function TodoList({
	todos,
	toggleComplete,
	toggleImportant,
	deleteTodo,
	updateProgress,
}) {
	useEffect(() => {
		// Save todos to local storage on every change
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="todo-list">
			{todos.map((todo, index) => (
				<div
					key={index}
					className={`todo-item ${todo.completed ? 'completed' : ''} ${
						todo.important ? 'important' : ''
					}`}
				>
					<div className="todo-item-container">
						<div className="todo-details">
							<h3>{todo.title}</h3>
							<p>{todo.text}</p>
							<input
								type="range"
								min="0"
								max="100"
								value={todo.progress}
								onChange={(e) => {
									updateProgress(index, e.target.value);
									if (e.target.value === '100') {
										toggleComplete(index);
									}
								}}
								className="progress-range"
							/>
							<span className="progress-percent">{todo.progress}%</span>
						</div>
						<div className="todo-actions">
							<button onClick={() => toggleComplete(index)}>
								{todo.completed ? '☑' : '☐'}
							</button>
							<button onClick={() => toggleImportant(index)}>
								{todo.important ? '⚑' : '⚐'}
							</button>
							<button onClick={() => deleteTodo(index)}>☓</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
