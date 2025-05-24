const card = document.querySelector('.card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 12;
  const rotateY = ((x - centerX) / centerX) * 12;

  card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

  card.style.setProperty('--glow-x', `${x}px`);
  card.style.setProperty('--glow-y', `${y}px`);
  card.style.setProperty('--glow-opacity', `1`);

  const edgeThreshold = 40;
  const isNearEdge = (
    x < edgeThreshold ||
    x > rect.width - edgeThreshold ||
    y < edgeThreshold ||
    y > rect.height - edgeThreshold
  );

  card.style.setProperty('--border-opacity', isNearEdge ? '1' : '0');
});

card.addEventListener('mouseleave', () => {
  card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  card.style.setProperty('--glow-opacity', `0`);
  card.style.setProperty('--border-opacity', `0`);
});






const apiKey = "985417362ea2336467b327a1d5d12420";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const userInput = document.querySelector('.input');
const searchBtn = document.querySelector('.searchBtn');
const weatherIcon = document.querySelector('.weather-icon');

// const weather = document.querySelector('.weather');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);


    if(response.status  == 404)
    {
        document.querySelector('.error').style.display = "block"
        document.querySelector('.weather').style.display = "none"
    }
    else
    {

        var data = await response.json();


        // console.log(data);
        

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%"; 
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main == "Clouds")
        {
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear")
        {
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain")
        {
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Mist")
        {
            weatherIcon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Drizzle")
        {
            weatherIcon.src = "images/drizzle.png";
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(userInput.value)
});

