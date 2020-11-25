checkInput = function() {
	
	var valid = true;
	
	var email = document.getElementById("recoveryInfo").value;
	
	if(email === "" || email == null){
		alert("Error: No email entered");
		valid = false;
	}else{
		alert("A confirmation email has been sent to " + email);
	}
	
	return valid;
}