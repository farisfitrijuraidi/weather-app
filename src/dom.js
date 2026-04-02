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
const container = document.querySelector('.container');
const loadingIndicator = document.querySelector('.loading-text');
const errorMessage = document.querySelector('.error-message');
const spinnerIcon = document.querySelector('.spinner-icon');

form.addEventListener('submit', (e) => {
	if (!userInput.validity.valid) {
		e.preventDefault();
		showError();
		return;
	}
	e.preventDefault();
	const standardInput = userInput.value
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
		.join(' ');
	loadingIndicator.textContent = `Loading weather for ${standardInput}...`;
	const allSpans = container.querySelectorAll('span');
	allSpans.forEach((span) => {
		span.textContent = '';
	});
	spinnerIcon.style.display = 'block';
	fetchWeatherData(standardInput)
		.then((data) => {
			spinnerIcon.style.display = 'none';
			loadingIndicator.textContent = '';
			locationDisplay.textContent = `Location: ${data.address}`;
			descriptionDisplay.textContent = `Description: ${data.description}`;
			feelsLikeDisplay.textContent = `Feels Like: ${data.feelsLike}°C`;
			humidityDisplay.textContent = `Humidity: ${data.humidity}%`;
			uvindexDisplay.textContent = `UV Index: ${data.uvindex}`;
			precipitationDisplay.textContent = `Precipitation: ${data.precipitation}%`;
			temperatureDisplay.textContent = `Temperature: ${data.temperature}°C`;
		})
		.catch((error) => {
			spinnerIcon.style.display = 'none';
			loadingIndicator.textContent = '';
			console.error('Error fetching weather data:', error);
			weatherData.textContent =
				'Failed to fetch weather data. Please try again.';
		});
});

const showError = () => {
	if (userInput.validity.valueMissing) {
		userInput.setCustomValidity('Please enter a location.');
	} else if (userInput.validity.patternMismatch) {
		userInput.setCustomValidity('You can only enter letters and spaces.');
	}
	errorMessage.textContent = userInput.validationMessage;
	userInput.className = 'error active';
};

userInput.addEventListener('input', () => {
	userInput.setCustomValidity('');
	if (userInput.validity.valid) {
		userInput.className = 'error';
		errorMessage.textContent = '';
	} else {
		showError();
	}
});
