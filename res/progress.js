const progressBar = document.getElementsByClassName('progress-bar')[0]
setInterval(() => {
  const computedStyle = getComputedStyle(progressBar)
  const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
  progressBar.style.setProperty('--width', width + .05)
}, 5)

var x = document.getElementById("status");
function swapText() 
{  if (x.textContent == "Accepting Order...")
        {x.textContent = "Preparing your order";} 
 else if (x.textContent == "Preparing your order") 
{ x.textContent ="Delivering to your home"}
else{x.textContent="Your order has arrived!"}}setInterval(swapText, 3100) 




var timeleft = 8;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("counter").innerHTML = "";
  } else {
    document.getElementById("counter").innerHTML = "ETA : " + timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);