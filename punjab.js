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
//defaults
var bp = 0;
//var iDef = document.getElementById("instructs").value="";
//var qtyDef =  document.getElementById("qty").innerHTML=1+"";
function getModal() {
    var baseList = document.getElementById("list");
    var elements = baseList.getElementsByTagName("li");
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
        //console.log(prices[j]);
        //prices[j].substring(prices[j].indexOf('$'),prices[j].length);
    }

    //when btn clicked, open modal
    for (let k = 0; k < open.length; k++) {
        open[k].addEventListener("click", function () {
            modal.style.display = "block";
            //alert(aImg[0]);
            modalImg.src = "res/Food/" + aImg[k];
            //set the title of the food item
            document.getElementById("food-title").innerHTML = htags[k].innerHTML;


            //if item with name is not in the list or nothing is in the list, modal gets defaults
            var inList=checkElements(htags[k].innerHTML);
            if(baseList.length==0 ||inList==null){
                //set prices
                document.getElementById("cost").innerHTML=prices[k];
                bp=parseFloat(prices[k]);
                document.getElementById("qty").innerHTML=1+"";
                //reset instructions
                document.getElementById("instructs").value="";
                //reset checkboxes
                var cb = document.getElementsByName("option");
                cb[0].checked = false;
                cb[1].checked = false;
                cb[2].checked = false;
            }else{
                //alert("persistence");
                //TODO: remove old list entry, re-add
                var pEle = inList.getElementsByClassName("price")[0].innerHTML;
                document.getElementById("cost").innerHTML = pEle.substring(pEle.indexOf("$")+1);
                //substring
                var str = inList.getElementsByClassName("qty")[0].innerHTML;
                document.getElementById("qty").innerHTML=str.substring(2,str.length-1);
                var ins = inList.getElementsByClassName("addit")[0].innerHTML;
                document.getElementById("instructs").value= ins.substring(0,ins.indexOf("<"));
                var cb = document.getElementsByName("option");
                var eCb = document.getElementsByClassName("checkbx").innerHTML;//works
                if(eCb.indexOf(cb[0].innerHTML)>-1)
                    cb[0].checked=true;
                if(eCb.indexOf(cb[1].innerHTML)>-1)
                    cb[1].checked=true;
                if(eCb.indexOf(cb[2].innerHTML)>-1)
                    cb[2].checked=true;
            }
            /*
            document.getElementById("qty").innerHTML=1+"";
            //reset instructions
           document.getElementById("instructs").value="";
            //reset checkboxes
            var cb = document.getElementsByName("option");
            cb[0].checked = false;
            cb[1].checked = false;
            cb[2].checked = false;
            */

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
function checkElements(eName){
    var eList = document.getElementById("list");
    var elements = eList.getElementsByTagName("li");
    for(let i = 0; elements.length;i++){
        if(elements[i].innerHTML.indexOf(eName)>-1){
            //remove this element from the list
            var save = elements[i]
             elements[i].remove();
            return save;
        }
    }
    return null;
}
//For calculating price of item & updating addOrderBtn
window.addEventListener("storage",updatePrice);

function updatePrice(clickedElement){
    var id = clickedElement.id;
    var howMany=document.getElementById("qty").innerHTML;
    var totalPrice = parseFloat(document.getElementById("cost").innerHTML);
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

function resolve(){
    //save all info from modal
    var item = document.getElementById("food-title");
    var quantity = document.getElementById("qty").textContent;
    var price = document.getElementById("cost").textContent;
    var cb = document.getElementsByName("option"); //array of checkboxes
    //find which checkboxes are checked off
    var cbStr="";
    var count=0;
    for(let i = 0; i < cb.length;i++){
        if(cb[i].checked) {
            //console.log(cb[i].innerHTML);
            count++;
            if(count==1)
                cbStr+=cb[i].getAttribute("id");
            else
                cbStr+=", "+cb[i].getAttribute("id");
        }
    }
    var addInstructs = document.getElementById("instructs").value; //TODO:check
    var thelist = document.getElementById("list");
    var listItem = document.createElement("li");
    listItem.id="listitem";
    listItem.innerHTML=item.innerHTML+" "+"<span class=\"qty\">(x"+quantity+")</span>"
        +"<span class=\"closeele\">&times;</span><br>"
        +"<span class=\"addit\">"+addInstructs+"<br></span>"
        +"<span class=\"checkbx\">"+cbStr+"</span>"
        +"<span class=\"price\">$"+price+"</span><br>";
    thelist.appendChild(listItem);
   // var span = document.getElementsByClassName("closeele")[0];
    //updateTotal();
    //close modal
    var orderbtn = document.getElementsByClassName("add-to-order")[0];
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
        if (event.target == orderbtn) {
            modal.style.display = 'none';
            updateRecieptItems();
        }//event target
    }//mouse event
}//resolve method

function updateRecieptItems(){
    console.log("calling updatetotal()");
    updateTotal();
    var thelist = document.getElementById("list");
    var items=thelist.getElementsByTagName("li");
    var btn = thelist.getElementsByClassName("closeele");
    //set eventListener
    for(let i = items.length-1; i >= 0; i--) {//add an event listener to
        btn[i].addEventListener("click", remove);
    }
}

function remove(){
    var item = this.closest('li');
    item.remove();
    updateTotal();
}

//updates total on order details
function updateTotal(){
    //get all list items
    //var items = document.getElementsByTagName("li"); //should get all elements
    var thelist = document.getElementById("list");
    var items=thelist.getElementsByTagName("li");
    //var receiptTotal=document.getElementById("tID").innerHTML;
    var receiptTotal=0;
    for(let i = 0; i < items.length;i++){
        var substr=items[i].getElementsByClassName("price")[0].innerHTML.substring(1);
        receiptTotal+=parseFloat(substr);
        console.log(items[i].getElementsByClassName("price")[0].innerHTML);
    }
    document.getElementById("tID").innerHTML="$"+receiptTotal;
    console.log(receiptTotal);
}