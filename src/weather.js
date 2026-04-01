const fetchWeatherData = async (cityName) => {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=VJQ66CNKJ3UTF8C8FFFMLG787`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('The server rejected our request');
	}
	const data = await response.json();
	const address = data.resolvedAddress;
	const description = data.description;
	const feelsLike = data.currentConditions.feelslike;
	const humidity = data.currentConditions.humidity;
	const uvindex = data.currentConditions.uvindex;
	const precipitation = data.currentConditions.precipprob;
	const temperature = data.currentConditions.temp;

	return {
		address,
		description,
		feelsLike,
		humidity,
		uvindex,
		precipitation,
		temperature,
	};
};

export { fetchWeatherData };
