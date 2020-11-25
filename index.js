checkInput = function() {
	var valid = true;
	
	var email = document.getElementById("emailInfo").value;
	var password = document.getElementById("passwordInfo").value;
	
	var errorMsg = "Login Failed. Missing field(s):";
	
	if (email === '' || email == null) {
		errorMsg = errorMsg.concat(" Email");
		valid = false;
	}
	
	if (password === '' || password == null) {
		errorMsg = errorMsg.concat(" Password");
		valid = false;
	}
	
	if(!valid){
		alert(errorMsg);
	}
	
	return valid;
}