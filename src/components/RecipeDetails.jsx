import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { fetchMealdb } from '../mealdb.js';

export default function RecipeDetail() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchRecipe() {
			try {
				const response = await fetchMealdb(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
				);

				if (response.data.meals) {
					setRecipe(response.data.meals[0]);
				} else {
					setError('No recipe found for the given ID.');
				}
			} catch (error) {
				console.error('Error fetching the recipe details:', error);
				setError('An error occurred while fetching the recipe details.');
			}
		}
		fetchRecipe();
	}, [id]);

	if (error) {
		return <div className="recipe-error">{error}</div>;
	}

	if (!recipe) return <div className="recipe-loading">Loading...</div>;

	return (
		<div className="recipe-detail-container">
			<button className="back-button" onClick={() => window.history.back()}>
				← Back
			</button>
			<div className="recipe-detail-image-container">
				<div className="recipe-detail-image">
					<img src={recipe.strMealThumb} alt={recipe.strMeal} />
				</div>
			</div>
			<div className="recipe-detail-content">
				<h1 className="recipe-title">{recipe.strMeal}</h1>
				<div className="recipe-section">
					<h2>Ingredients</h2>
					<ul>
						{Object.keys(recipe)
							.filter((key) => key.startsWith('strIngredient') && recipe[key])
							.map((key, index) => (
								<li key={index}>
									{recipe[`strMeasure${key.slice(13)}`]} - {recipe[key]}
								</li>
							))}
					</ul>
				</div>
				<div className="recipe-section">
					<h2>Instructions</h2>
					<p>{recipe.strInstructions}</p>
				</div>
				<div className="recipe-section">
					<h2>Other Details</h2>
					<p>
						<strong>Category:</strong> {recipe.strCategory}
					</p>
					<p>
						<strong>Cuisine:</strong> {recipe.strArea}
					</p>
					<p>
						<strong>Video:</strong>{' '}
						{recipe.strYoutube ? (
							<a
								href={recipe.strYoutube}
								target="_blank"
								rel="noopener noreferrer"
							>
								Watch on YouTube
							</a>
						) : (
							'N/A'
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
