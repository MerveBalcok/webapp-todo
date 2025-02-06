import React from 'react';
import { Link } from 'wouter';

export default function Sidebar() {
	return (
		<div className="sidebar">
			<Link href="/">
				<button>
					<img src="/img/todoImage.png" alt="Todo" className="icon-image" />
					<span>Todo</span>
				</button>
			</Link>
			<Link href="/timer">
				<button>
					<img src="/img/timerImage.png" alt="Timer" className="icon-image" />
					<span>Timer</span>
				</button>
			</Link>
			<Link href="/searchMeal">
				<button>
					<img src="img/recipeImage.png" alt="recipe" className="icon-image" />
					<span>Recipe</span>
				</button>
			</Link>
		</div>
	);
}
