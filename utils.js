var CHARCODE_SHADDA = 1617;
var CHARCODE_SUKOON = 1618;
var CHARCODE_SUPERSCRIPT_ALIF = 1648;
var CHARCODE_TATWEEL = 1600;
var CHARCODE_ALIF = 1575;

function isCharTashkeel(letter)
{
    if (typeof(letter) == "undefined" || letter == null)
        return false;

    var code = letter.charCodeAt(0);
    //1648 - superscript alif
    //1619 - madd: ~
    return (code == CHARCODE_TATWEEL || code == CHARCODE_SUPERSCRIPT_ALIF || code >= 1612 && code <= 1631); //tashkeel
}

function stripTashkeel(input)
{
  var output = "";
  //todo consider using a stringbuilder to improve performance
  
  for (var i = 0; i < input.length; i++)
  {
    var letter = input.charAt(i);
    if (!isCharTashkeel(letter)) //tashkeel
      output += letter;                                
  }


return output;                   
}
function isArabic(text) {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  let result = pattern.test(text);
  return result;
}
module.exports = {stripTashkeel,isCharTashkeel, isArabic }