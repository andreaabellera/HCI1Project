checkInput = function() {
	
	var valid = true;
	var errorMsg = "Order failed. Missing field(s):"

	if(document.getElementById("creditRadio").checked){
		var cardNumber = document.getElementById("cardNumberInfo").value;
		var expiry = document.getElementById("expiryInfo").value;
		var cvc = document.getElementById("cvcInfo").value;
		
		if (cardNumber === '' || cardNumber == null) {
		errorMsg = errorMsg.concat(" Card Number");
		valid = false;
		}
		
		if (expiry === '' || expiry == null) {
		errorMsg = errorMsg.concat(" Expiry Date");
		valid = false;
		}
		
		if (cvc === '' || cvc == null) {
		errorMsg = errorMsg.concat(" CVC");
		valid = false;
		}
		
	}else if(document.getElementById("giftCardRadio").checked){
		var giftCard = document.getElementById("giftCardInfo").value;
		
		if (giftCard === '' || giftCard == null) {
		errorMsg = errorMsg.concat(" Giftcard Number");
		valid = false;
		}
	}
	
	if(!valid){
		alert(errorMsg);
	}
	
	
	return valid;
}

function popUp() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}