/**
 * @author: Adrian Bueno <adrianbueno095@gmail.com>
 */

"use strict";

async function getCurrentSystemUser() {
  let formcontext = Xrm.Page;
  let userRecordId = formcontext.context.getUserId().replace(/\{​|\}​/g, "");

  await Xrm.WebApi.retrieveRecord(
    "systemuser",
    userRecordId,
    "?$select=fullname"
  ).then(getCurrrentWeatherByCity);
}

async function getCurrrentWeatherByCity(result) {
  if (!result) return;
  askUser = prompt(`Hello ${result.fullname}, Type a City Name`);

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${askUser.toLowerCase()}&appid={0002cc42e0f7ee0022f9bfd9aa0d7161}`;

  await fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      let celciusValue = Math.round(convertsKelvinToCelcious(data.main.Ò));
      alert(`Current weather in ${data.name} is ${celciusValue}`);
    });
}

function convertsKelvinToCelcious(kelvinValue) {
  if (!kelvinValue) return;
  let temperatureInkelvin = kelvinValue;
  let resultInCelcius = temperatureInkelvin - 273.15;
  return resultInCelcius;
}

function createDialogMessage() {
  let dialogTable = document.createElement("div");
  dialogTable.style.width = "500px";
  dialogTable.style.height = "500px";
  dialogTable.style.background = "#C8EFFD";
  dialogTable.style.position = "absolute";
  dialogTable.style.left = "50%";
  dialogTable.style.right = "50%";
  dialogTable.style.transition = "translate(-50%, -50%)";

  dialogTable.innerHTML = "Current Weather is: ";
  document.body.appendChild(dialogTable);
}

getCurrentSystemUser();
