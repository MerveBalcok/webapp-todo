import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMealdb } from '../mealdb.js';
import useDebouncedValue from '../hooks/useDebouncedValue'; // Standard Import
import RecipeItem from './RecipeItem';

export default function SearchMeal() {
	const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm());
	const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

	useSearchParams(debouncedSearchTerm);

	const {
		data: meals = [],
		isError,
		isPending,
		isSuccess,
	} = useQuery({
		queryKey: ['meals', debouncedSearchTerm],
		queryFn: fetchMeals,
	});

	return (
		<>
			<div className="recipe">
				<h1>Delicious recipes</h1>
			</div>

			<form className="searchBox" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="searchLabel">Search: </label>
				<input
					id="search"
					type="search"
					className="searchInput"
					placeholder="Search recipe..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>

			{isError && (
				<strong>Es gab ein Problem 🙁. Vielleicht hilft Neuladen?</strong>
			)}
			{isPending && <strong>Laden…</strong>}
			{isSuccess && (
				<div className="recipe-list">
					{' '}
					{/* Hier die neue Klasse anwenden */}
					{meals.map((meal) => (
						<RecipeItem key={meal.idMeal} meal={meal} />
					))}
				</div>
			)}
		</>
	);
}

function getInitialSearchTerm() {
	const url = new URL(window.location.href);
	return url.searchParams.get('search') ?? '';
}

function useSearchParams(debouncedSearchTerm) {
	useEffect(() => {
		const url = new URL(window.location.href);
		url.searchParams.delete('search');

		if (debouncedSearchTerm.length >= 2) {
			url.searchParams.set('search', debouncedSearchTerm);
		}

		window.history.replaceState({}, '', url);
	}, [debouncedSearchTerm]);
}

async function fetchMeals({ queryKey }) {
	const searchTerm = queryKey[1];

	if (searchTerm.length < 2) {
		return [];
	}

	const { data } = await fetchMealdb('/search.php?', {
		params: {
			s: searchTerm,
		},
	});

	return data.meals || [];
}
