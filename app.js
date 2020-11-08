var express = require('express');
var app = express();
const axios = require('axios');
const qs = require('qs')
const HTMLparser = require('node-html-parser');
const levenshtein = require('js-levenshtein');;
var difflib = require('difflib');

const { stripTashkeel, isArabic } = require('./utils')




app.use(express.json())
app.use(express.static('assets'))

app.post('/urn', function (req, res) {
    console.log(req.body)
    if (req.body.hadith == '') {
        console.log('test');
        res.send({ 'html': '' })
        return null
    }
    let data = req.body?.hadith;
    // let headers = {
    //     'Content-Type': 'application/json',
    //     'x-api-key': 'AIzaSyBFRS72i24zKkjsRn3TwXDXBcAsMiEHU6s'
    // }
    // const data2 = {
    //     siteSearch: "sunnah.com",
    //     q: req.body.hadith

    // };

    // let data2 = qs.stringify({
    //     // key: "AIzaSyBFRS72i24zKkjsRn3TwXDXBcAsMiEHU6s",
    //     // cx: "ef8afaba8f6e63814",
    //     q: req.body.hadith
    // })

    // console.log(req.body)
    // theUrl = 'https://customsearch.googleapis.com/customsearch/v1'
    // console.log(data2);
    let data2 = qs.stringify({
        key: "AIzaSyBFRS72i24zKkjsRn3TwXDXBcAsMiEHU6s",
        cx: "ef8afaba8f6e63814",
        q: req.body.hadith
    })

    console.log(req.body)
    // theUrl = 'https://customsearch.googleapis.com/customsearch/v1/siterestrict'
    console.log(data2);
    axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?${data2}`)
        .then(response => {
            console.log(`statusCode: ${response.status}`)
            let link = response.data.items[0].link
            // let link = "https://sunnah.com/urn/804950"
            let urn = link.slice(-1)[0];
            console.log(urn);
            axios({
                method: 'get',
                url: `${link}`
                // headers: { 'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' }
            }).then(response => {
                // console.log(response.data);
                let root = HTMLparser.parse(response.data);
                // console.log(root.querySelector('.single_hadith').innerHTML);
                // if (root.querySelector('.actualHadithContainer') == undefined){
                //     res.end()
                //     return
                // }
                let y = root.querySelector('.single_hadith').querySelector('.hadith_nav_wrapper');
                // root.querySelector('.arabic_text_details ').removeChild(y);
                root.querySelector('.single_hadith').removeChild(y);

                let searchText = stripTashkeel(req.body.hadith);
                // searchText.removeWhitespace();

                

                
                // console.log(`arab: ${arabic}\n engl:${english}`)
                

                

                var temp;
                if (isArabic(searchText)) {
                    temp = root.querySelector('.arabic_text_details').removeWhitespace().innerText
                    
                } else {
                    temp  = root.querySelector('.text_details').removeWhitespace().innerText;
                }
                // console.log(temp)
                // root.removeAttribute(".hadith_nav_wrapper");
                // var temp = HTMLparser.parse(root.querySelector('.text_details').innerText);
                // temp = temp.trim();



                // var lev = levenshtein(req.body.hadith, temp.innerText);
                // console.log(lev)
                // var percentage = (1-lev/temp.innerText.length)*100;

                let fullHadith = stripTashkeel(temp)

                console.log(`full Hadith: ${fullHadith}\t search Text: ${searchText}`)
                let s = new difflib.SequenceMatcher(null, fullHadith, searchText);
                var percentage = s.ratio();
                // var s = levenshtein(fullHadith, searchText);
                // console.log(s)
                // var percentage = (1-s/fullHadith.length)*100;
                
                res.send({ 'html': root.querySelector('.single_hadith').innerHTML, 'match': percentage });
                // res.send(root.querySelector('.single_hadith'));
                // res.send(response.body.hadith)
                // console.log(responce.body.hadith);
            })
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
// })
// app.post('/autocomplete', (req, res) => {
//     let data = req.body?.word;
//     console.log(data);
//     let s = qs.stringify({
//         client: "firefox",
//         q: data
//     })
//     let url = `http://suggestqueries.google.com/complete/search?${s}`
//     console.log(url)
//     axios({
//         method: 'GET',
//         url,
//         // data: qs.stringify({
//         // client:"firefox",
//         // q:data
//         // }),

//     })
//         .then(response => {
//             // console.log(`statusCode: ${response.statusCode}`)
//             // console.log(response.data)
//             res.send(response?.data?.[1])
//         })
//         .catch(error => {
//             console.error(error)
//         })
//     // var xmlHttp = new XMLHttpRequest();
//     // xmlHttp.open( "GET", `http://suggestqueries.google.com/complete/search?client=firefox&q=${data}`, false ); // false for synchronous request
//     // xmlHttp.send( null );
//     // console.log(xmlHttp.responseText)
//     // return xmlHttp.responseText;
//     // fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${data}`)
//     // .then((response) => {
//     // return response.json();
//     // })
//     // .then((data) => {
//     // console.log(data);
//     // });


// })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
