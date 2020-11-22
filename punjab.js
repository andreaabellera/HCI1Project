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
    //get all header tags
    for(let j = 0; j < open.length;j++){
        htags[j]=open[j].getElementsByTagName("h3")[0];
    }
    //when btn clicked, open modal
    for (let k = 0; k < open.length; k++) {
        open[k].addEventListener("click", function () {
            modal.style.display = "block";
            //alert(aImg[0]);
            modalImg.src = "res/Food/" + aImg[k];
            //set the title of the food item
            document.getElementById("food-title").innerHTML = htags[k].innerHTML;
        }, false);
    }
    //}
    //When user clicks on <span X, close the modal //TODO: replace with add order btn
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

    var totalPrice = 1.99;
    if(id=="increase"){
       // totalPrice+=1.99;
        howMany++;
    }else if(id=="decrease"&&howMany>1){
        //totalPrice-=1.99;
        howMany--;
    }else{
        console.log("yikes");
    }
    document.getElementById("qty").innerHTML=howMany;
    document.getElementById("cost").innerHTML = "$"+(totalPrice*howMany);
}
//TODO: Adding item to the order panel outside of the modal box
function resolve(){
    //save all info and add to Order Details section
    //close modal
    var orderbtn = document.getElementsByClassName("add-to-order")[0];
    var modal = document.getElementById("myModal");
    window.onclick=function(event){
        if(event.target==orderbtn)
            modal.style.display='none';
    }
}