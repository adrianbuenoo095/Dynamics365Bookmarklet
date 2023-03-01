function getCurrentSystemUser() {
  let formcontext = Xrm.Page;
  let recordId = formcontext.context.getUserId().replace(/\{​|\}​/g, "");
  Xrm.WebApi.retrieveRecord("systemuser", recordId, "?$select=fullname").then(
    getUserInput,
    errorFunction
  );
}

function getUserInput(result) {
  if (!result) return;
  let question = prompt("Hello" + result.fullname + "Ask me anything?");
  let answer = question.toLowerCase();
  let weatherForcastinCelcius = convertsKelvinToCelcious(data.main.temp);
  answer === "What is the weather?"
    ? alert(`The currect weather is ${weatherForcastinCelcius}`)
    : alert("Invalid Answer");
}

function getCurrrentWeatherByCity() {
  let askUser = prompt("Type the city");
  let citeAnswer = askUser.toLowerCase();
  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  fetch(weatherUrl + citeAnswer + "&appid=0002cc42e0f7ee0022f9bfd9aa0d7161")
    .then((response) => response.json())
    .then((data) => { 
      let celciusValue = convertsKelvinToCelcious(data.main.temp);
      alert(celciusValue);
    });
}

function convertsKelvinToCelcious(kelvinValue) {
  if (!kelvinValue) return;
  let temperatureInkelvin = Math.round(kelvinValue);
  let resultInCelcius = temperatureInkelvin - 273.15;
  return resultInCelcius;
}

function createDialogMessage() {
  let dialogTable = document.createElement("div");
  dialogTable.style.width = "500px";
  dialogTable.style.height = "500px";
  dialogTable.style.background = "#C8EFFD";
  dialogTable.style.position = "absolute";
  dialogTable.style.background = src = svgIcon;
  dialogTable.style.left = "50%";
  dialogTable.style.right = "50%";
  dialogTable.style.transition = "translate(-50%, -50%)";

  dialogTable.innerHTML = "Current Weather is: ";
  document.body.appendChild(dialogTable);
}

function errorFunction(error) {
  console.log(error.message);
  // handle error conditions
}

getCurrrentWeatherByCity();
