/*Exclusion Tags*/
function exclusionTags() {
    var tags = ['no_meat', 'no_cooler', 'no_gluten'];
    var gallery = document.getElementsByClassName("gallery");
    var items = document.getElementsByClassName("gallery-info");
    var fDev = document.getElementsByClassName("filterDev");
    for (let i = 0; i < items.length; i++) {
        var flag = true;
        //loop through all the possible elements to check
        for (let j = 0; j < tags.length; j++) {
            //loop through all the possible tags
            if ((fDev[i].className.indexOf(tags[j]) == -1) && document.getElementById(tags[j]).checked) {
                //if the current element does not have the tag and, the tag's box is checked
                //i.e. the element doesn't have the 'gluten' tag, but the gluten exclusion box is checked
                flag = false;
                //it must be removed
                //items[i].style.display = 'none';
                gallery[i].style.display='none';
                break;
            }
            //otherwise do nothing
            //continue the loop until all tags are checked
            //or until the element is removed
        }
        if (flag) {
            items[i].style.display = 'block';
            gallery[i].style.display='grid';
        }
    }
}
/*Lightbox*/
var bp = 0;
function getModal() {
    var modal = document.getElementById("myModal");
    var images = document.querySelectorAll(".gallery-image");
    var img, aImg = [];
    for (var i = 0; i < images.length; i++) {
        img = window.getComputedStyle(images[i]).backgroundImage;
        var temp = img.split("/");
        aImg[i] = temp[temp.length - 1].substr(0, temp[temp.length - 1].length - 2);

    }
    //alert(aImg);
    var span = document.getElementsByClassName("close")[0];
    var open = document.getElementsByClassName("gallery-info");
    var modalImg = document.getElementById("myImg");
    var htags=[];
    var pricetxt=[];
    var prices=[];
    //get all header tags and prices
    for(let j = 0; j < open.length;j++){
        htags[j]=open[j].getElementsByTagName("h3")[0];
        pricetxt[j]=open[j].getElementsByTagName("p")[0].innerHTML;
        prices[j]=pricetxt[j].substring(pricetxt[j].indexOf("$")+1);
        console.log(prices[j]);
        //prices[j].substring(prices[j].indexOf('$'),prices[j].length);
    }

    //TODO: get base costs of all items
    //when btn clicked, open modal
    for (let k = 0; k < open.length; k++) {
        open[k].addEventListener("click", function () {
            modal.style.display = "block";
            //alert(aImg[0]);
            modalImg.src = "res/Food/" + aImg[k];
            //set the title of the food item
            document.getElementById("food-title").innerHTML = htags[k].innerHTML;
            //set prices
            document.getElementById("cost").innerHTML=prices[k];
            bp=parseFloat(prices[k]);
        }, false);
    }
    //}
    //When user clicks on <span X, close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    //If anywhere outside of modal, close t
    window.onclick = function (event) {
        if (event.target == modal)
            modal.style.display = "none";
    }
}
//For calculating price of item & updating addOrderBtn

window.addEventListener("storage",updatePrice);
function updatePrice(clickedElement){
    var id = clickedElement.id;
    var howMany=document.getElementById("qty").innerHTML;
    var totalPrice = parseFloat(document.getElementById("cost").innerHTML);
   // var totalPrice=parseFloat(preSubstr.substring(preSubstr.indexOf("$")-1));
    //var totalPrice=1;
    //var totalPrice=basePrice;
    if(id=="increase"){
       totalPrice+=bp;
        howMany++;
    }else if(id=="decrease"&&howMany>1){
        totalPrice-=bp;
        howMany--;
    }else{
        console.log("yikes");
    }
    document.getElementById("qty").innerHTML=howMany;
    //document.getElementById("cost").innerHTML = ""+(totalPrice*howMany);//reset the cost
    console.log(totalPrice);
    document.getElementById("cost").innerHTML=""+totalPrice;
}
//Process Checked off Options
/*function processOptions(){
    var tags = ['calorie-free', 'sodium-free', 'dairy-free'];
    var mOptions = document.getElementsByClassName("options");
    for(let i = 0; i < mOptions.length; i++ ){

    }
}
//Process Additional Instructions
function processInstructs(){

}*/
//TODO: Adding item to the order panel outside of the modal box
function resolve(){
    //save all info
    var quantity = document.getElementById("qty").innerHTML;
    var price = document.getElementById("cost").innerHTML;
    var cb = document.getElementsByName("option"); //array of checkboxes
    var addInstructs = document.getElementById("instructs").value;
    //check values -- all g
    console.log("Quantity: "+quantity)
    console.log("Price: "+price)
    console.log("Instructions: "+addInstructs)
    //receipt
   var orderDetails = document.getElementById("receipt");
   var total = document.getElementsByClassName("total")[0];
    console.log(total);
    //update receipt
    total.innerHTML+=price; //TODO: update the span element
    //console.log(total.innerHTML);
    //close modal
    var orderbtn = document.getElementsByClassName("add-to-order")[0];
    var modal = document.getElementById("myModal");
    window.onclick=function(event){
        if(event.target==orderbtn)
            modal.style.display='none';
    }

}