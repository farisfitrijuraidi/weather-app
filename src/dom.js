import { fetchWeatherData } from './weather.js';

const form = document.querySelector('form');
const submit = document.querySelector('#submit');
const userInput = document.querySelector('#text');
const locationDisplay = document.querySelector('.user_location');
const weatherData = document.querySelector('.weather-data');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	locationDisplay.textContent = `${userInput.value}`;
	fetchWeatherData(userInput.value)
		.then((data) => {
			weatherData.textContent = `Temperature: ${data.currentConditions.temp}°C, Conditions: ${data.currentConditions.conditions}`;
		})
		.catch((error) => {
			console.error('Error fetching weather data:', error);
			weatherData.textContent =
				'Failed to fetch weather data. Please try again.';
		});
});
