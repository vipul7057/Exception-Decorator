//$("#decorate").addEventListener("click", decorator);
window.onload=function(){
    var mb = document.getElementById("decorate");
    mb.addEventListener("click", decorator);

    var mb1 = document.getElementById("download");
    mb1.addEventListener("click", Download);

    var mb2 = document.getElementById("detialsBtn");
    mb2.addEventListener("click", detialsBtn);
}   
function decorator()
{
    $(".outputArea").empty();
    var value = $("#inputData").val();
    if(value == '' || value == null || value == undefined)
    {
        alert('Please Enter The Stack Trace');
        return;
    }
    $(".formattedText").css("display","flex");
    $(".alertdiv").css("display","block");
    $("#download").css("display","block");
    $('#mainDiv').css('height','130vh');
    $("#textTitle").css("display","block");
    var arr = value.split('\n');
    $(".outputArea").css("padding", "20px");
    //First Line of Expection Name START

    var valueOf0 = arr[0].split(":");
    var valueOfPackage0 = valueOf0[0].split(".");
    for(var i = 0; i < valueOfPackage0.length - 1;i++) 
   {
    $( ".outputArea" ).append('<span style="color:#43ABC8;font-weight: 450;">'+valueOfPackage0[i]+"."+'</span>');
   }
    var exceptionName = valueOfPackage0[valueOfPackage0.length - 1];
  
    var html = '<a href="https://www.google.com/search?q='+exceptionName+'" id="exceptionName" target="_blank"><span style="color: #F7503D;font-weight: 700;" >'+exceptionName+'</span></a>';

    $( ".outputArea" ).append(html);
    if(valueOf0[1] != undefined)
        $( ".outputArea" ).append('<span style=color:#43ABC8>:'+valueOf0[1]+'</span><br>');
    else
    {
        $( ".outputArea" ).append('</br>');
    }
     //First Line of Expection Name END


    for(var i = 1; i < arr.length ;i++) {
       var valueOfI = arr[i].split("(");
       var last = valueOfI[0].substring(valueOfI[0].lastIndexOf(".") + 1);

        var valueOfISecond = valueOfI[1];
        $( ".outputArea" ).append('<span style="color:#43ABC8;font-weight: 450;margin-left:20px">'+valueOfI[0]+
        '</span>  <span style="color:#FF856E;margin-left:10px"> | </span>');
        if(valueOfISecond.includes('~'))
        {
            var valueOfISecondArr = valueOfISecond.split("~");
            if(valueOfISecondArr[0] != '<generated>) ' )
                $( ".outputArea" ).append('<span style="color:#43ABC8;font-weight: 450;margin-left:10px">('+valueOfISecondArr[0]+'</span><br>');
            else{
                    $( ".outputArea" ).append('</br>');
                }
        }
        else
        {
            var valueOfISecondArr2 = valueOfISecond.split(":")
            $( ".outputArea" ).append('<span style="color:#43ABC8;font-weight: 450;margin-left:10px">('+valueOfISecondArr2[0]+'</span>');
            if(valueOfISecondArr2[1] != undefined)
                $( ".outputArea" ).append('<span style="color:red">'+valueOfISecondArr2[1]+'</span><br>');
            else
                $( ".outputArea" ).append('</br>');
        }

      
      // console.log(valueOfISecondArr[0]+ " "+valueOfISecondArr[0].length)
      
   

    const element = document.querySelector(".outputArea");
    element.innerHTML = element.innerHTML
    .replace(last, `<span style="color:#EAC744">${last}</span>`);


       var $test = $('.outputArea').html();
       if(last.includes('Exception' || 'exception'))
       {
        console.log("inisde last ",last)
            $test = $test.replace(last, '<a href="https://www.google.com/search?q='+last+'">'
            +'<span style="color: #EAC744;font-weight:700">'+last+'</span></a>');
       }
       else
       {
        //console.log("inisde last ",last)
        $test = $test.replace(last, '<span style="color: #EAC744;font-weight:700">'+last+'</span>');
       }
     
       $('.outputArea').html($test);

       //console.log(last);
       
    }
}


function Download()
{
    var value = $("#inputData").val();
    var arr = value.split('\n');

    var valueOf0 = arr[0].split(":");
    var valueOfPackage0 = valueOf0[0].split(".");
    var exceptionName = valueOfPackage0[valueOfPackage0.length - 1];
     downloadDiv(exceptionName, 'outputAreaOuter','text/html');
}
function downloadDiv(filename, elementId, mimeType) {
    var elementHtml = document.getElementById(elementId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elementHtml));
    link.click(); 
}

