const fetchWeatherData = async (cityName) => {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('The server rejected our request');
	}
	const data = await response.json();
	const address = data.resolvedAddress;
	const {
		feelslike,
		humidity,
		uvindex,
		precipprob,
		temp,
		icon,
		conditions,
		sunrise,
		sunset,
		windspeed,
	} = data.currentConditions;
	console.log(data);

	return {
		address,
		conditions,
		feelslike,
		humidity,
		uvindex,
		precipprob,
		temp,
		icon,
		sunrise,
		sunset,
		windspeed,
	};
};

export { fetchWeatherData };
