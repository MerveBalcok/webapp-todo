import axios from 'redaxios';

export const fetchMealdb = axios.create({
	baseURL: 'https://www.themealdb.com/api/json/v1/1',
});
