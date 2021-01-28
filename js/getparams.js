/*************************************
 * 
 *  JS to get data from the api
 * 
 *************************************/

$(document).ready(function () {
    setTimeout('getUser()',3000);
});

//Get the data from the URL parameter
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }

//Gets search engine user results.
function getUser(){

    var param = GetURLParameter("email");
    var api = 'https://ltv-data-api.herokuapp.com/api/v1/records.json';//Path of user data
    var email = param;
    var url = api + '?email=' + email; //path to obtain the user data by email.

    //Ajax with JQUERY to get data from api
    $.get(url, function (data) {

        //if there is no data in the array show the message "0 Results"
        if(data.length===0){
            $('#result').css('height', '500px')
            $('#result').css('display', 'flex')
            $('#result').css('flex-direction', 'column')
            $('#result').css('justify-content', 'center')

            $('#result').html('<h1 class="text2"><strong>0 Results</strong></h1> <p class="text4">Try starting a new search below.</p>')

        }else{//If you have data, show the cards with the user's data 

            var person = data;
            var datosUser = $("#datosUser");
            
            var html = `
                <div class="d-flex justify-content-center mb-3">
                <div class="card d-flex  flex-row flex-wrap">
                    <!--Foto de perfil-->
                
                    <div class="content-fotoPerfil">
                        <div class="fotoPerfil mt-1">
                            <img src="../assets/PNG/icn_person@2x.png" />
                        </div>
                    </div>
                    
                    <!--Informacion del usuario-->
                    <div class="info-user ps-5 mt-1">
        
                        <h2 class="tituloPerfil">`+person.first_name +`</h2>
                        <p class="w-100 text-justify w-100" style="font-size: 18px;">`+person.description +`</p>
        
                
                        <div class="infoPhoneAdress w-100 d-flex flex-row justify-content-center">
                            <div class="address col-6">
                                <h6 class="tituloDescripcionUsuario">Address</h6>
                                <p>`+person.address +`</p>
                            </div>
                            <div class="phone ps-4 col-6">
                                <h6 class="tituloDescripcionUsuario">Phone Numbers</h6>
                                <ul id="listadoNumero" class="listadoTelefono ps-0">
                                </ul>
                            </div>
                        </div>
        
                        <div class="infoEmailRelatives w-100 d-flex flex-row justify-content-center">
                            <div class="email col-6">
                                <h6 class="tituloDescripcionUsuario">Email</h6>
                                <p>`+person.email +`</p>
                            </div>
                            <div class="relatives ps-4 col-6">
                                <h6 class="tituloDescripcionUsuario">Relatives</h6>
                                <ul id="listadoRelatives" class="listadoTelefono ps-0">
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    
    
            //add the user card with the data in the html
            datosUser.append(html);
            
            //Enter the user's phone data on the card
            var listadoNumero  = "";
            person.phone_numbers.forEach(number => {   
                //console.log(number)
                listadoNumero+="<li><a>"+ number  +" </a></li>";
                
            });
                
            $('#listadoNumero').append(listadoNumero) 
                                
                
            //Enter the user's relatives data on the card
            var listadoRelatives = "";
            person.relatives.forEach(relative => {   
                listadoRelatives+="<li>"+ relative  +"</li>";
            });
                
            $('#listadoRelatives').append(listadoRelatives) 
            
            /*Titulo resultado*/
            $('#result').html('<h1 class="text2"><strong>1 Result</strong></h1> <p class="text4">Look at the result below to see the details of the person you’re searched for.</p>')
     
        }
    
  });
}


