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
const weatherData = document.querySelector('.weather-data');
const container = document.querySelector('.container');
const loadingIndicator = document.querySelector('.loading-text');
const spinnerIcon = document.querySelector('.spinner-icon');

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

const createNode = (type, className, text) => {
	const element = document.createElement(type);

	if (className) {
		const classArray = className.split(' ');
		element.classList.add(...classArray);
	}
	if (text) {
		element.textContent = text;
	}

	return element;
};

const standardInput = (user) => {
	return user.value
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
		.join(' ');
};

form.addEventListener('submit', (e) => {
	container.innerHTML = '';
	if (!userInput.validity.valid) {
		e.preventDefault();
		showError();
		return;
	}
	e.preventDefault();
	loadingIndicator.textContent = `Loading weather for ${standardInput(userInput)}...`;
	spinnerIcon.style.display = 'block';
	fetchWeatherData(standardInput(userInput))
		.then((data) => {
			const topSection = createNode('div', 'top-section', '');
			container.appendChild(topSection);
			const rightpart = createNode('div', 'right-part', '');
			topSection.appendChild(rightpart);
			const leftpart1 = createNode('div', 'left-part-1', '');
			topSection.appendChild(leftpart1);
			const leftpart2 = createNode('div', 'left-part-2', '');
			topSection.appendChild(leftpart2);
			const conditions = createNode(
				'span',
				'conditions',
				data.conditions
			);
			const weatherIcon = createNode('img', 'weather-icon', '');
			weatherIcon.src = iconMap[data.icon] || '';
			weatherIcon.alt = data.conditions;
			const feelslike = createNode(
				'span',
				'feelslike',
				`Feels like ${data.feelslike}°C`
			);
			const temp = createNode('span', 'temperature', `${data.temp}°C`);
			const userLocation = createNode(
				'span',
				'user_location',
				standardInput(userInput)
			);
			const currentDate = new Date();
			const formattedDate = format(currentDate, 'EEEE, d MMMM yyyy');
			const date = createNode('span', 'date', formattedDate);
			rightpart.appendChild(weatherIcon);
			rightpart.appendChild(conditions);
			leftpart1.appendChild(temp);
			leftpart1.appendChild(feelslike);
			leftpart2.appendChild(userLocation);
			leftpart2.appendChild(date);

			const bottomSection = createNode('div', 'bottom-section', '');
			container.appendChild(bottomSection);
			const left = createNode('div', 'left', '');
			bottomSection.appendChild(left);
			const right = createNode('div', 'right', '');
			bottomSection.appendChild(right);
			const windspeedContainer = createNode('div', 'windspeed', '');
			const windspeedLabel = createNode(
				'p',
				'windspeed-label',
				'Wind Speed: '
			);
			const windspeedValue = createNode(
				'span',
				'windspeed-value',
				`${data.windspeed} km/h`
			);
			windspeedContainer.appendChild(windspeedLabel);
			windspeedContainer.appendChild(windspeedValue);
			const precipitationContainer = createNode(
				'div',
				'precipitation',
				''
			);
			const precipitationLabel = createNode(
				'p',
				'precipitation-label',
				'Precipitation Probability: '
			);
			const precipitationValue = createNode(
				'span',
				'precipitation-value',
				`${data.precipprob}%`
			);
			precipitationContainer.appendChild(precipitationLabel);
			precipitationContainer.appendChild(precipitationValue);
			const sunriseContainer = createNode('div', 'sunrise', '');
			const sunriseLabel = createNode('p', 'sunrise-label', 'Sunrise: ');
			const sunriseValue = createNode(
				'span',
				'sunrise-value',
				`${data.sunrise}`
			);
			sunriseContainer.appendChild(sunriseLabel);
			sunriseContainer.appendChild(sunriseValue);
			left.appendChild(windspeedContainer);
			left.appendChild(precipitationContainer);
			left.appendChild(sunriseContainer);
			const uvindexContainer = createNode('div', 'uvindex', '');
			const uvindexLabel = createNode('p', 'uvindex-label', 'UV Index: ');
			const uvindexValue = createNode(
				'span',
				'uvindex-value',
				`${data.uvindex}`
			);
			uvindexContainer.appendChild(uvindexLabel);
			uvindexContainer.appendChild(uvindexValue);
			const humidityContainer = createNode('div', 'humidity', '');
			const humidityLabel = createNode(
				'p',
				'humidity-label',
				'Humidity: '
			);
			const humidityValue = createNode(
				'span',
				'humidity-value',
				`${data.humidity}%`
			);
			humidityContainer.appendChild(humidityLabel);
			humidityContainer.appendChild(humidityValue);
			const sunsetContainer = createNode('div', 'sunset', '');
			const sunsetLabel = createNode('p', 'sunset-label', 'Sunset: ');
			const sunsetValue = createNode(
				'span',
				'sunset-value',
				`${data.sunset}`
			);
			sunsetContainer.appendChild(sunsetLabel);
			sunsetContainer.appendChild(sunsetValue);
			right.appendChild(uvindexContainer);
			right.appendChild(humidityContainer);
			right.appendChild(sunsetContainer);

			spinnerIcon.style.display = 'none';
			loadingIndicator.textContent = '';
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
