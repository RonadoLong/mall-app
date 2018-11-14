let host = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
let para = "&sensor=true_or_false";

//&key=AIzaSyDC8cptFuyT_XCqNr4Vp-GPNg_Npgnv7rY
export function getLocationByCon(lat, lng) {
    let url =host + lat + "," + lng + para

    console.log(url)
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                resolve(result)
            })
            .then(err => {
                reject(err)
            })
    })
}

// {long_name: "2022-2026", short_name: "2022-2026", types: Array(1)}
// 1
// :
// {long_name: "22nd Avenue", short_name: "22nd Ave", types: Array(1)}
// 2
// :
// {long_name: "Sunset District", short_name: "Sunset District", types: Array(2)}
// 3
// :
// {long_name: "San Francisco", short_name: "SF", types: Array(2)}
// 4
// :
// {long_name: "San Francisco County", short_name: "San Francisco County", types: Array(2)}
// 5
// :
// {long_name: "California", short_name: "CA", types: Array(2)}
// 6
// :
// {long_name: "United States", short_name: "US", types: Array(2)}
// 7
// :
// {long_name: "94116", short_name: "94116", types: Array(1)}
// 8
// :
// {long_name: "1211", short_name: "1211", types: Array(1)}