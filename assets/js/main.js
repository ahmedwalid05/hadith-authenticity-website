$(document).ready(function () {
    // document.querySelector('#myProgress').hidden = true
    $("#button1").on("click", function () {
        document.querySelector('#myProgress').hidden = true
        document.querySelector('#myBar').hidden = true
        document.querySelector('#match').hidden = true
        document.querySelector('.single_hadith').innerHTML = ''
        console.log($('#searchTerm').val());
        const data = { 'hadith': $('#searchTerm').val() };
        console.log(data);

        $.ajax('/urn', {
            method: "POST",
            contentType: 'application/json',
            context: document.body,
            data: JSON.stringify(data),
            dataType: 'json',
            success: (res, textStatus, jqXHR) => {

                console.log(res)
                if (jqXHR.status == 200) {
                    document.querySelector(".single_hadith").innerHTML = res.html
                    let match = res.match;
                    console.log(((match * 100) | 0).toString());
                    if (document.querySelectorAll(".english_grade").length > 1)
                        var grade = document.querySelectorAll(".english_grade")[1].innerHTML
                    // document.querySelector('#myProgress').innerHTML = 
                    document.querySelector('#myBar').style.width = ((match * 100) | 0).toString() + "%";
                    if (!grade) {
                        document.querySelector('#match').innerHTML = `<b>The Hadith you typed matches this Hadith by ${((match * 100) | 0).toString() + "%"}</b>`
                    }
                    else {
                        document.querySelector('#match').innerHTML = `<b>The Hadith you typed matches this Hadith by ${((match * 100) | 0).toString() + "%"}</b> and it's Grade is ${grade}`
                    }

                    document.querySelector('#myProgress').hidden = false
                    document.querySelector('#myBar').hidden = false
                    document.querySelector('#match').hidden = false
                } else {
                    console.log('test')
                    document.querySelector('#myProgress').hidden = true
                    document.querySelector('#match').hidden = false
                    document.querySelector('#match').innerHTML = `<b>What you typed could not be matched with any hadith, It's most likely "mawdu"</b>`
                    document.querySelector('.single_hadith').innerHTML = ''
                }
                // document.querySelector('.actualHadithContainer').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                // document.querySelector('.chapter').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                // document.querySelector('head').innerHTML += res.css
            }
        }).catch((error) => {
            console.log("Error: ", error);
            document.querySelector('#myProgress').hidden = true
            document.querySelector('#match').hidden = false
            document.querySelector('#match').innerHTML = `<b>What you typed could not be matched with any hadith, It's most likely "mawdu"</b>`
            document.querySelector('.single_hadith').innerHTML = ''
        });

    });
    // $('#searchTerm').change(() => {
    //     let text = $('#searchTerm').val();
    //     let data = getAutoComplete(text);
    // })
});


//   $( "#button1" ).on( "click", function() {
//     console.log( $( '.searchTerm' ).text() );
//   });

function getAutoComplete(searchTerm) {
    const data = { word: searchTerm };
    $.ajax('/autocomplete', {
        method: "POST",
        contentType: 'application/json',
        context: document.body,
        data: JSON.stringify(data),
        dataType: 'json',
        success: (res) => {

            res.forEach(item => {
                // console.log(item)
                $("#list-container").empty();
                //  $("#list-container").append(`<div class="list-container"> <p>${item}</p></div>`)
                $("#list-container").append(` <p class="list-container">${item}</p>`)
                //  .addClass('list-container')
                // .text(item)
            })
        }

    }).catch((error) => {
        console.error('Error:', error);
    });

}
