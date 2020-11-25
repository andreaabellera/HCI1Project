checkInput = function() {
	var name = document.getElementById("nameInfo").value;
	var email = document.getElementById("emailInfo").value;
	var password = document.getElementById("passwordInfo").value;
	
	var errorMsg = "Signup Failed. Missing field(s):";
	
	var valid = true;
	
	if (name === '' || name == null) {
		errorMsg = errorMsg.concat(" Name");
		valid = false;
	}
	
	if(email === "" || email == null) {
		errorMsg = errorMsg.concat(" Email");
		valid = false;
	}
	
	if(password === "" || password == null) {
		errorMsg = errorMsg.concat(" Password");
		valid = false;
	}
	
	if(!valid){
		alert(errorMsg);
	}
	
	return valid;
	
}
	
