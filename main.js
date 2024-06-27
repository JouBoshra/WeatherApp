async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=58fcad097bc144f2991194325232612&q=${city}&days=3`
    );
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

document.addEventListener('click', function(e) {
  console.log(e.target);
});

function displayWeather(data) {
  const getDateName = (dateNum) => {
    const date = new Date(dateNum);
    return days[date.getDay()];
  };

  const getDateAndMonth = (dateNum) => {
    const date = new Date(dateNum);
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const forecast = data.forecast.forecastday;
  const location = data.location.name;
  const current = data.current;

  const box = `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="inner color3 rounded-4 text-white px-0 overflow-hidden">
        <div class="date color2 fw-medium d-flex justify-content-between align-items-center px-4 border-bottom border-info">
          <p class="my-2">${getDateName(forecast[0].date)}</p>
          <p class="my-2">${getDateAndMonth(forecast[0].date)}</p>
        </div>
        <div class="info px-4">
          <h3 class="city mt-5 fs-4 text-info">${location}</h3>
          <div class="temp d-flex justify-content-between align-items-center mt-5 pe-4">
            <p class="display-2 fw-bold">${current.temp_c}<sup>o</sup>C</p>
            <img src="${current.condition.icon}" alt="icon" class="w-25" />
          </div>
          <p class="statu mt-2 fs-6 text-info">${current.condition.text}</p>
        </div>
        <div class="wind px-4 mt-5 mb-3">
          <span class="me-4"><i class="fa-solid fa-umbrella me-2 text-info"></i>${current.feelslike_c}%</span>
          <span class="me-4"><i class="fa-solid fa-wind me-2 text-info"></i>${current.wind_kph}km/h</span>
          <span><i class="fa-solid fa-compass me-2 text-info"></i>${current.wind_dir}</span>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="inner color4 rounded-4 text-white px-0 overflow-hidden h-100">
        <div class="date color5 fw-medium d-flex justify-content-center px-4 border-bottom border-info">
          <p class="my-2">${getDateName(forecast[1].date)}</p>
        </div>
        <div class="info px-4 text-center">
          <img src="${forecast[1].day.condition.icon}" alt="icon" class="w-25 mt-5" />
          <p class="fs-2 fw-semibold mb-0 mt-3">${forecast[1].day.maxtemp_c}<sup>o</sup>C</p>
          <p class="fs-5 opacity-75 fw-medium">${forecast[1].day.mintemp_c}<sup>o</sup></p>
          <p class="statu mt-4 fs-6 text-info">${forecast[1].day.condition.text}</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="inner color3 rounded-4 text-white px-0 overflow-hidden h-100">
        <div class="date color2 fw-medium d-flex justify-content-center px-4 border-bottom border-info">
          <p class="my-2">${getDateName(forecast[2].date)}</p>
        </div>
        <div class="info px-4 text-center">
          <img src="${forecast[2].day.condition.icon}" alt="icon" class="w-25 mt-5" />
          <p class="fs-2 fw-semibold mb-0 mt-3">${forecast[2].day.maxtemp_c}<sup>o</sup>C</p>
          <p class="fs-5 opacity-75 fw-medium">${forecast[2].day.mintemp_c}<sup>o</sup></p>
          <p class="statu mt-4 fs-6 text-info">${forecast[2].day.condition.text}</p>
        </div>
      </div>
    </div>
  `;
  
  document.querySelector(".row").innerHTML = box;
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const searchInput = document.querySelector("#home .container-search input");
searchInput.addEventListener("input", function() {
  getWeather(this.value);
});

getWeather("alexandria");

const success = (position) => {
  console.log(position);
};

const error = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(success, error);