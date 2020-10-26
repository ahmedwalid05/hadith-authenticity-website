var express = require('express');
var app = express();
const axios = require('axios');
const qs = require('qs')
const HTMLparser = require('node-html-parser');


app.use(express.json())
app.use(express.static('assets'))

app.post('/urn', function (req, res) {
    // console.log(req.headers)

    let data = req.body?.hadith;
    // let headers = {
    //     'Content-Type': 'application/json',
    //     'x-api-key': 'AIzaSyBFRS72i24zKkjsRn3TwXDXBcAsMiEHU6s'
    // }
    // const data2 = {
    //     siteSearch: "sunnah.com",
    //     q: req.body.hadith

    // };

    let data2 = qs.stringify({
        key: "AIzaSyBFRS72i24zKkjsRn3TwXDXBcAsMiEHU6s",
        cx: "ef8afaba8f6e63814",
        q: req.body.hadith
    })

    // console.log(req.body)
    // theUrl = 'https://customsearch.googleapis.com/customsearch/v1'
    // console.log(data2);
    axios.get(`https://www.googleapis.com/customsearch/v1?${data2}`)
        .then(response => {
            // console.log(`statusCode: ${response.statusCode}`)
            let link = response.data.items[0].link
            // let urn = array.slice(-1)[0];
            // console.log(urn);
            axios({
                method: 'get',
                url: `${link}`
                // headers: { 'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' }
            }).then(response => {
                // console.log(response.data);
                let root = HTMLparser.parse(response.data);
                console.log(root.querySelector('.single_hadith').innerHTML);
                
                // res.send(root.querySelector('.single_hadith'));
                // res.send(response.body.hadith)
                // console.log(responce.body.hadith);
            }) 
            
        });

    // function httpGet(theUrl) {
    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    //     xmlHttp.send(  );
    //     return xmlHttp.responseText;
    // }
    // fetch('https://customsearch.googleapis.com/customsearch/v1', {
    //     // method: 'G', // or 'PUT'
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': 'AIzaSyBFRS72i24zKkjsRn3TwXDXBcAsMiEHU6s'
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    //return urn
    // res.json(data);
})
app.post('/autocomplete', (req, res) => {
    let data = req.body?.word;
    console.log(data);
    let s = qs.stringify({
        client: "firefox",
        q: data
    })
    let url = `http://suggestqueries.google.com/complete/search?${s}`
    console.log(url)
    axios({
        method: 'GET',
        url,
        // data: qs.stringify({
        // client:"firefox",
        // q:data
        // }),

    })
        .then(response => {
            // console.log(`statusCode: ${response.statusCode}`)
            // console.log(response.data)
            res.send(response?.data?.[1])
        })
        .catch(error => {
            console.error(error)
        })
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", `http://suggestqueries.google.com/complete/search?client=firefox&q=${data}`, false ); // false for synchronous request
    // xmlHttp.send( null );
    // console.log(xmlHttp.responseText)
    // return xmlHttp.responseText;
    // fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${data}`)
    // .then((response) => {
    // return response.json();
    // })
    // .then((data) => {
    // console.log(data);
    // });


})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})