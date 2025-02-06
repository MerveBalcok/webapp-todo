import React, { useState } from 'react';
import { Route, Switch } from 'wouter';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Timer from './components/Timer';
import Sidebar from './components/Sidebar';
import SearchMeal from './components/SearchMeal';
import RecipeDetail from '../src/components/RecipeDetails.jsx';

export default function App() {
	// Load todos from local storage or set default
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos');
		return savedTodos ? JSON.parse(savedTodos) : [];
	});

	const addTodo = (title, text) => {
		const newTodo = {
			title,
			text,
			completed: false,
			important: false,
			progress: 0,
		};
		setTodos([...todos, newTodo]);
	};
	const toggleComplete = (index) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const toggleImportant = (index) => {
		const newTodos = [...todos];
		newTodos[index].important = !newTodos[index].important;
		setTodos(newTodos);
	};

	const deleteTodo = (index) => {
		const newTodos = todos.filter((_, i) => i !== index);
		setTodos(newTodos);
	};

	const updateProgress = (index, progress) => {
		const newTodos = [...todos];
		newTodos[index].progress = progress;
		if (progress === 100 && !newTodos[index].completed) {
			newTodos[index].completed = true;
		} else if (progress < 100 && newTodos[index].completed) {
			newTodos[index].completed = false;
		}
		setTodos(newTodos);
	};

	return (
		<div className="app">
			<Sidebar />
			<div className="content">
				<Switch>
					<Route path="/">
						<h1>To-Do-List</h1>
						<TodoForm addTodo={addTodo} />
						<TodoList
							todos={todos}
							toggleComplete={toggleComplete}
							toggleImportant={toggleImportant}
							deleteTodo={deleteTodo}
							updateProgress={updateProgress}
						/>
					</Route>
					<Route path="/timer" component={Timer} />
					<Route path="/searchMeal" component={SearchMeal} />
					<Route path="/recipe/:id" component={RecipeDetail} />
				</Switch>
			</div>
		</div>
	);
}
