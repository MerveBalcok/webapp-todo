import React from 'react';
import { Link } from 'wouter';

export default function RecipeItem({ meal }) {
	return (
		<div className="recipe-item">
			<img src={meal.strMealThumb} alt={meal.strMeal} />
			<h3>{meal.strMeal}</h3>
			<button className="recipe-button">
				<Link href={`/recipe/${meal.idMeal}`}>View Recipe</Link>
			</button>
		</div>
	);
}
