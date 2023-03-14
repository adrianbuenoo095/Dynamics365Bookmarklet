// import { library, icon } from "@fortawesome/fontawesome-svg-core";

/**
 * @author: Adrian Bueno <adrianbueno095@gmail.com>
 */
//this only works for the crm
async function getCurrentSystemUser() {
    let formcontext = Xrm.Page;

    if (!formcontext) return;

    let userRecordId = formcontext.context.getUserId().replace(/\{​|\}​/g, "");
    let userFullname = await Xrm.WebApi.retrieveRecord(
        "systemuser",
        userRecordId,
        "?$select=fullname"
    );

    if (!userFullname) return;

    return userFullname;
}

function getUserCityNameInput() {
    let userInputCityName = prompt(`Hello Random Person, Type a City Name`);
    if (userInputCityName === null) return;
    return userInputCityName;
}

async function getCurrentWeatherByCityName() {
    let cityNameUserInput = getUserCityNameInput();
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameUserInput}&appid=0002cc42e0f7ee0022f9bfd9aa0d7161`;

    await fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
            let cityName = data.name;
            let celciusValue = Math.round(convertsKelvinToCelcious(data.main.temp));
            createDialogMessage(cityName, celciusValue);
        });
}

function convertsKelvinToCelcious(kelvinValue) {
    if (!kelvinValue) return;
    let temperatureInkelvin = kelvinValue;
    let resultInCelcius = temperatureInkelvin - 273.15;
    return resultInCelcius;
}

function createDialogMessage(cityName, celciusValue) {
    let dialogTable = document.createElement("div");
    let degreesCelsiusSymbol = "&#8451;";

    dialogTable.style.width = "500px";
    dialogTable.style.height = "500px";
    dialogTable.style.background = "#DCBAE0";
    dialogTable.style.transition = "translate(-50%, -50%)";
    dialogTable.style.display = "flex";
    dialogTable.style.alignItems = "center";
    dialogTable.style.justifyContent = "center"
    dialogTable.style.fontSize = "30px"

    dialogTable.innerHTML = `Current Weather in ${cityName} is : ${celciusValue} ${degreesCelsiusSymbol}`;
    document.body.appendChild(dialogTable);
}

getCurrentWeatherByCityName();
