const fetchWeatherData = async (cityName) => {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=VJQ66CNKJ3UTF8C8FFFMLG787`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('The server rejected our request');
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
};

export { fetchWeatherData };
