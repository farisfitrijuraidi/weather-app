import { fetchWeatherData } from './weather.js';

const form = document.querySelector('form');
const userInput = document.querySelector('#text');
const locationDisplay = document.querySelector('.user_location');
const weatherData = document.querySelector('.weather-data');
const descriptionDisplay = document.querySelector('.description');
const feelsLikeDisplay = document.querySelector('.feelsLike');
const humidityDisplay = document.querySelector('.humidity');
const uvindexDisplay = document.querySelector('.uvindex');
const precipitationDisplay = document.querySelector('.precipitation');
const temperatureDisplay = document.querySelector('.temperature');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	fetchWeatherData(userInput.value)
		.then((data) => {
			locationDisplay.textContent = `Location: ${data.address}`;
			descriptionDisplay.textContent = `Description: ${data.description}`;
			feelsLikeDisplay.textContent = `Feels Like: ${data.feelsLike}°C`;
			humidityDisplay.textContent = `Humidity: ${data.humidity}%`;
			uvindexDisplay.textContent = `UV Index: ${data.uvindex}`;
			precipitationDisplay.textContent = `Precipitation: ${data.precipitation}%`;
			temperatureDisplay.textContent = `Temperature: ${data.temperature}°C`;
		})
		.catch((error) => {
			console.error('Error fetching weather data:', error);
			weatherData.textContent =
				'Failed to fetch weather data. Please try again.';
		});
});
