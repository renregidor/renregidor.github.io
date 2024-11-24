const API_KEY = `14951c93f3d11e8ac8bed96dd90e8bc7`;

// Function to toggle the rain animation visibility
const toggleLoadingRain = (isLoading) => {
    const rain = document.getElementById('loading-rain');
    if (isLoading) {
        rain.classList.remove('d-none'); // Show rain animation
    } else {
        rain.classList.add('d-none'); // Hide rain animation
    }
};

const searchTemperature = () => {
    const city = document.getElementById('city-name').value.trim();

    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    // Show rain animation and set loading message
    toggleLoadingRain(true);
    setInnerText('city', 'Loading...');
    setInnerText('temp', '');
    setInnerText('weather', '');
    const imgIcon = document.getElementById('image-icon');
    imgIcon.setAttribute('src', '');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('City not found');
            }
            return res.json();
        })
        .then((data) => displayTemperature(data))
        .catch((error) => {
            console.error('Error fetching the weather data:', error);
            setInnerText('city', 'Unable to fetch data. Try again.');
        })
        .finally(() => {
            toggleLoadingRain(false); // Hide rain animation after fetch completes
        });
};

const setInnerText = (id, text) => {
    document.getElementById(id).innerText = text;
};

const displayTemperature = (temperature) => {
    console.log(temperature);

    setInnerText('city', temperature.name);
    setInnerText('temp', temperature.main.temp + '°C');
    setInnerText('weather', temperature.weather[0].main);

    const url = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById('image-icon');
    imgIcon.setAttribute('src', url);
};
