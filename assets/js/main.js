$(document).ready(function () {

    $("#button1").on("click", function () {
        console.log($('#searchTerm').val());
        const data = { 'hadith':  $('#searchTerm').val() };
        console.log(data);
        
        $.ajax('/urn', {
            method:"POST",
            contentType: 'application/json',
            context: document.body,
            data:JSON.stringify(data),
            dataType: 'json',
            success: (res) =>{
                console.log(res)
                document.querySelector(".single_hadith").innerHTML=res.html
                // document.querySelector('head').innerHTML += res.css
            }

        }).catch((error) => {
                console.error('Error:', error);
            });

    });
    $('#searchTerm').change(() => {
        let text = $('#searchTerm').val();
        let data = getAutoComplete(text);
    })
});


//   $( "#button1" ).on( "click", function() {
//     console.log( $( '.searchTerm' ).text() );
//   });

function getAutoComplete(searchTerm) {
    const data = { word:  searchTerm};
    $.ajax('/autocomplete', {
        method:"POST",
        contentType: 'application/json',
        context: document.body,
        data:JSON.stringify(data),
        dataType: 'json',
        success: (res) =>{
            
            res.forEach(item=>{
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
