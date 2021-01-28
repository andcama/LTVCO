
//Email verification in the search engine - Mark the input in red and show the message "Enter Any Email Address. They won't be notified."
function search(evt){
    var email = document.getElementById('email');

    if(email.validity.valid){
        location.href = 'page2.html?email='+email.value;
        evt.preventDefault(); // We avoid submitting in new browsers
            return false; // We avoid submitting old browsers
    }else{
        $("#email").css("border", "2px solid red");
        document.querySelector("#emailError").className = "emailError d-auto"
        evt.preventDefault(); // We avoid submitting in new browsers
        return false; // We avoid submitting old browsers
    }
    
  }
  