function newCity(){
    const city = window.prompt("Type in the name of the city:");
    const loader = document.getElementById("loader");
    // const city = "Nigeria";

    if (city) {
        deletePrev();
        let APIkey = "5fff2bc3d5c73b0aa70be7ab516fb66c";

        async function getWeather() {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
            try {
                const response = await fetch(apiUrl);
                if (!response || response.status != 200) {
                    throw new Error(`Invalid Input with error code - ${response.status}`);
                }
                const jsonData = await response.json();
                console.log(jsonData);
                const {main: {humidity, temp}, weather: [{description, id}], name: city} = jsonData;
                createElements(city, id, humidity, temp, description)
            } catch (error) {
                console.error(error);
                createElements("ERROR", null, null, null, `${error}`)
            }
        }
        
        getWeather()
    }

    function createElements(city, id, humidity, temp, description) {
        deletePrev();
        const main = document.createElement("main");
        document.body.append(main)

        const cityCont = document.createElement("h1");
        cityCont.className = "city";
        cityCont.textContent = city;
        main.append(cityCont)
        
        
        const weatherDetails = document.createElement("div");
        weatherDetails.classList.add("weatherDetails");
        main.append(weatherDetails)

        const weatherDescriptionCont = document.createElement("span");
        weatherDescriptionCont.textContent = description;
        weatherDetails.append(weatherDescriptionCont)

        if (id) {
            if (id == 800) {
                emojiSrc = "clear.png";            
            }
            else { 
                switch (Math.floor(id / 100)) {
                    case 2:
                        emojiSrc = "thunderStorm.png";
                        emojiSrc = "thunderStorm.png";
                        break;
                
                    case 3:
                        emojiSrc = "showerRain.png";
                        break;
                
                    case 5:
                        emojiSrc = "rain.png";
                        break;
                
                    case 6:
                        emojiSrc = "snow.png";
                        break;
                
                    case 7:
                        emojiSrc = "mist.png";
                        break;
                    
                    case 8:
                        emojiSrc = "fewClouds.png";
                        break;
                        
                    default:
                        emojiSrc = "fewClouds.png";
                        break;
                }
            }
            const emoji = document.createElement("img");
            emoji.className = "emoji";
            emoji.src = emojiSrc;
            emoji.alt = "Weather icon"
            main.insertBefore(emoji, weatherDetails);

            const tempCont = document.createElement("span");
            tempCont.textContent = `${(temp-273).toFixed(1)}⁰C`;
            weatherDetails.append(tempCont)
            
            const humidityCont = document.createElement("span");
            humidityCont.textContent = `${humidity}%`;
            weatherDetails.append(humidityCont)
            
            const humiditytext = document.createElement("small");
            humiditytext.textContent = ` humidity`;
            humidityCont.append(humiditytext)
        }
    }
 
}
function deletePrev() {
    const main = document.querySelector("main");
    if (main) {
        main.remove(main.children)
    }
    

    // document.body.remove(main.children)
    // console.log(main.children[0]);
    
}

newCity()