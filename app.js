const https = require("https")
const parseString = require("xml2js").parseString


exports.current = function(location, resultCallBack){
    let options = {
        host: "forecast.weather.gov",
        path: "/xml/current_obs/" + location +".xml",
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; MyWeatherApp/1.0)'
        }
    };

    https.request(options, function(response){
        let buffer = "";
        let result = "";

        response.on('data', function(chunk){
            buffer += chunk
        });

        response.on('end', function(){
            // console.log(buffer)
            parseString(buffer, (error, result)=>{
                if (error){
                    resultCallBack(error);
                    return
                }
                // console.log(result)
                resultCallBack(null, result.current_observation.temp_f[0])
            })
            

        })
    }).end()

}