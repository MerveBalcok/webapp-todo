import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !text) return;
		addTodo(title, text);
		setTitle('');
		setText('');
	};

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<div className="input-group">
				<input
					type="text"
					placeholder="Titel"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="input-title"
				/>
				<button type="submit" className="add-task-button">
					Add Task
				</button>
			</div>
			<textarea
				placeholder="Text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="input-text"
			/>
		</form>
	);
};

export default TodoForm;
