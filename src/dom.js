import { fetchWeatherData } from './weather.js';
import clearDay from './assets/clear-day.svg';
import clearNight from './assets/clear-night.svg';
import cloudy from './assets/cloudy.svg';
import fog from './assets/fog.svg';
import rain from './assets/rain.svg';
import snow from './assets/snow.svg';
import wind from './assets/wind.svg';
import partlyCloudyDay from './assets/partly-cloudy-day.svg';
import partlyCloudyNight from './assets/partly-cloudy-night.svg';
import { format } from 'date-fns';

const form = document.querySelector('form');
const userInput = document.querySelector('#text');
const locationDisplay = document.querySelector('.user_location');
const weatherData = document.querySelector('.weather-data');
const conditionsDisplay = document.querySelector('.conditions');
const feelsLikeDisplay = document.querySelector('.feelsLike');
const humidityDisplay = document.querySelector('.humidity-value');

const uvindexDisplay = document.querySelector('.uvindex-value');

const precipitationDisplay = document.querySelector('.precipitation-value');

const temperatureDisplay = document.querySelector('.temperature');
const sunriseDisplay = document.querySelector('.sunrise-value');

const sunsetDisplay = document.querySelector('.sunset-value');

const windspeedDisplay = document.querySelector('.windspeed-value');

const container = document.querySelector('.container');
const loadingIndicator = document.querySelector('.loading-text');
const spinnerIcon = document.querySelector('.spinner-icon');
const weatherIcon = document.querySelector('.weather-icon');
const date = document.querySelector('.date');
const currentDate = new Date();
const formattedDate = format(currentDate, 'EEEE, d MMMM yyyy');

const iconMap = {
	'clear-day': clearDay,
	'clear-night': clearNight,
	cloudy: cloudy,
	fog: fog,
	rain: rain,
	snow: snow,
	wind: wind,
	'partly-cloudy-day': partlyCloudyDay,
	'partly-cloudy-night': partlyCloudyNight,
};

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
	date.textContent = formattedDate;
	fetchWeatherData(standardInput)
		.then((data) => {
			weatherIcon.style.display = 'block';
			weatherIcon.src = iconMap[data.icon] || '';
			weatherIcon.alt = data.description;
			spinnerIcon.style.display = 'none';
			loadingIndicator.textContent = '';
			locationDisplay.textContent = `${standardInput}`;
			conditionsDisplay.textContent = `${data.conditions}`;
			feelsLikeDisplay.textContent = `Feels like ${data.feelslike}°C`;
			humidityDisplay.textContent = `${data.humidity}%`;
			uvindexDisplay.textContent = `${data.uvindex}`;
			precipitationDisplay.textContent = `${data.precipprob}%`;
			temperatureDisplay.textContent = `${data.temp}°C`;
			sunriseDisplay.textContent = `${data.sunrise}`;
			sunsetDisplay.textContent = `${data.sunset}`;
			windspeedDisplay.textContent = `${data.windspeed} km/h`;
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
	userInput.className = 'error active';
};

userInput.addEventListener('input', () => {
	userInput.setCustomValidity('');
	if (userInput.validity.valid) {
		userInput.className = 'error';
	} else {
		showError();
	}
});
