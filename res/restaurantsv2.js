filterSelection("all")
function filterSelection(c) {
  var classItems, i;
  classItems = document.getElementsByClassName("gallery");
  
  if (c == "all") 
	c = "";
  
  for (i = 0; i < classItems.length; i++) {
    w3RemoveClass(classItems[i], "show");
    if (classItems[i].className.indexOf(c) > -1) w3AddClass(classItems[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, classNameList, namesList;
  classNameList = element.className.split(" ");
  namesList = name.split(" ");
  
  for (i = 0; i < namesList.length; i++) {
    if (classNameList.indexOf(namesList[i]) == -1) 
		{element.className += " " + namesList[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, classNameList, namesList;
  classNameList = element.className.split(" ");
  namesList = name.split(" ");
  
  for (i = 0; i < namesList.length; i++) {
    while (classNameList.indexOf(namesList[i]) > -1) {
      classNameList.splice(classNameList.indexOf(namesList[i]), 1);     
    }
  }
  element.className = classNameList.join(" ");
}





var optionsList = document.getElementById("options");
var filterList = optionsList.getElementsByClassName("filter");

for (var i = 0; i < filterList.length; i++) {
  filterList[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}












