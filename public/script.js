const key = "22ec4dc3a1ce18b422d9b1218ab2509d";
let city_name = "cornelio procopio";
const weatherCodes = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Nevoeiro",
    48: "Nevoeiro",
    51: "Chuvisco",
    53: "Chuvisco",
    55: "Chuvisco",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Pancadas de chuva",
    81: "Pancadas de chuva",
    82: "Pancadas de chuva",
    95: "Trovoada",
    96: "Trovoada com granizo",
    99: "Trovoada com granizo"
};
async function buscarClima() {
    //https://radarmeteorologico.com.br/api/v1/alertas?uf=PR
    //let url = "https://api.openweathermap.org/data/2.5/weather?lat=-23.18111&lon=-50.64667&appid=22ec4dc3a1ce18b422d9b1218ab2509d&units=metric&lang=pt_br`";
    let url = "https://radarmeteorologico.com.br/api/v1/alertas?uf=PR";
    let open_meteo = "https://api.open-meteo.com/v1/forecast?latitude=-23.1819&longitude=-50.6669&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America/Sao_Paulo";
    const result = await fetch(url);
    const Json = await result.json();
    const result2 = await fetch(open_meteo);
    const Json2 = await result2.json();
    const encontrados = [];

    for (const alerta of Json.alertas) {
        if (alerta.geocodes.includes(4106407)) {
            encontrados.push(alerta);
        }
    }

    console.log(encontrados);
    console.log(encontrados[0].evento,encontrados[0].severidade + '\n', `instuções:${encontrados[0].instrucoes}`)
    let code = Json2.current_weather.weathercode;
    console.log(code)
    console.log(`temperatura: ${Json2.current_weather.temperature} 
        max:${Json2.daily.temperature_2m_max[0]} min:${Json2.daily.temperature_2m_min[0]}`);
    console.log(weatherCodes[code])

    document.getElementById("temp").innerText = Json2.current_weather.temperature;
    document.getElementById("des").innerText = weatherCodes[code];
    document.getElementById("max").innerText = `max ${Json2.daily.temperature_2m_max[0]}`;
    document.getElementById("min").innerText = `min ${Json2.daily.temperature_2m_min[0]}`;


    
    if (code >=51 & code <=82 ){
        document.getElementById("imgC").setAttribute("src","img/waether/chovendo.png")
    }

        if (code ==2|| code ==3 ){
        document.getElementById("imgC").setAttribute("src","img/waether/nublado.png")
    }

    if (code ==0 ){
        document.getElementById("imgC").setAttribute("src","img/waether/ensoralado.png")
    }
}

buscarClima();