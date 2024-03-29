/**
 * Get the crm system user 
 * @author: Adrian Bueno <adrianbueno095@gmail.com>
 */
const getCurrentSystemUser = async () => {
    let formcontext = Xrm.Page;

    if (!formcontext) return;

    let userId = formcontext.context.getUserId()?.replace(/\{​|\}​/g, "");

    if (!userId) return;

    let systemUserFullname = await Xrm.WebApi.retrieveRecord(
        "systemuser",
        userId,
        "?$select=fullname"
    );

    if (!systemUserFullname) return;

    return systemUserFullname;
};

const cityByName = () => {

    let cityName;
    do {
        cityName = prompt(`Hello Random Person, Type a City Name`);

    } while (!cityName)

    return cityName;
};

const displayCurrentWeather = async () => {
    let city = cityByName();

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0002cc42e0f7ee0022f9bfd9aa0d7161`;

    await fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            let cityName = data.name;
            let celcius = convertsKelvinToCelcius(data.main.temp);
            createDialogMessage(cityName, celcius);
        });
}

const convertsKelvinToCelcius = (celcius) => {
    if (!celcius) return;

    const KELVIN_CELSIUS_DIFF = 273.15;
    let celciusResult = Math.round(celcius - KELVIN_CELSIUS_DIFF);

    return celciusResult;
}

const createDialogMessage = (city, celcius) => {
    let dialogTable = document.createElement("div");
    let degreesCelsiusSymbol = "&#8451;";

    dialogTable.style.width = "500px";
    dialogTable.style.height = "500px";
    dialogTable.style.background = "#DCBAE0";
    dialogTable.style.transition = "translate(-50%, -50%)";
    dialogTable.style.display = "flex";
    dialogTable.style.alignItems = "center";
    dialogTable.style.justifyContent = "center";
    dialogTable.style.fontSize = "30px";

    dialogTable.innerHTML = `Current Weather in ${city} is : ${celcius} ${degreesCelsiusSymbol}`;
    document.body.appendChild(dialogTable);
}

displayCurrentWeather();
