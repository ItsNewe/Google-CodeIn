var win = document.getElementById('winput');
var secondary = document.getElementById('secondary');

function weather() {
    event.preventDefault();
    fetch('https://secure.geonames.org/searchJSON?q=' + win.value + '&maxRows=1&username=newe', {
        method: 'GET'
    }).then(function (response) {
        response.text().then(function (text) {
            objNCity = JSON.parse(text);
            console.log(objNCity);

            if (objNCity.totalResultsCount != 0) {
                fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + objNCity.geonames[0].name + ',' + objNCity.geonames[0].countryCode + '&appid=77acf19773c56a89912b921dccb3e560').then(function (response) {
                    response.text().then(function (text) {
                        weatherData = JSON.parse(text);
                        try{
                            $('#WDT').remove();
                        }
                        catch{
                            console.log('none');
                        }

                        var date = new Date(weatherData.list[0].dt * 1000);
                        var currentT = Math.round(weatherData.list[0].main.temp) - 273;
                        var minT = Math.round(weatherData.list[0].main.temp_min) - 273;
                        var maxT = Math.round(weatherData.list[0].main.temp_max) - 273;
                        var wText = weatherData.list[0].weather[0].main;
                        var wDesc = weatherData.list[0].weather[0].description;

                        g = document.createElement('div');
                        g.setAttribute("ID", "WDT");

                        loc = document.createElement('h1');
                        loc.innerHTML = `Weather for ${objNCity.geonames[0].name}  `;
                        imloc = document.createElement('img');
                        imloc.setAttribute("src", "https://www.countryflags.io/"+objNCity.geonames[0].countryCode+"/flat/32.png");
                        loc.appendChild(imloc);
                        g.appendChild(loc);
                        
                        e1 = document.createElement("h4");
                        e1.innerHTML = `${date.getUTCDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getUTCHours()}h`;
                        g.appendChild(e1);

                        w1 = document.createElement("h3");
                        w1.innerHTML = `Current condition: ${wText}`;
                        g.appendChild(w1);

                        w2 = document.createElement("h4");
                        w2.innerHTML = `Description: ${wDesc}`;
                        w2.style = "padding-top: 2px";
                        g.appendChild(w2);

                        lm = document.createElement("ul");
                        l1 = document.createElement("li");
                        l1.innerHTML = `<i class="fas fa-thermometer-half"></i> Current temp: ${currentT}°C`;
                        lm.appendChild(l1);

                        l2 = document.createElement("li");
                        l2.innerHTML = `<i class="fas fa-arrow-down min"></i> Min: <span class="min">${minT}°C</span>`;
                        lm.appendChild(l2);

                        l3 = document.createElement("li");
                        l3.innerHTML = `<i class="fas fa-arrow-up max"></i> Max: <span class="max">${maxT}°C</span>`;
                        lm.appendChild(l3);

                        g.appendChild(lm);
                        document.body.appendChild(g);
                    });
                });
            } else {
                secondary.innerHTML = "The provided city doesn't exist, please try again";
                secondary.style = "visibility: visible";
            }
        });
    });
}

document.getElementById('mform').addEventListener("submit", weather());