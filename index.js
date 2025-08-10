
let projectindex = 1;
let animationProgress = 0;
let animationQueue = 0;
let scrollDirection = 0;

let animationRunning = false;
let step = 0.05;
const baseStep = 0.05;
let pow = 1.25;
const basePow = 1.25;
let doAccel = true;

const body = document.body;

const html = document.documentElement;

let leftButtonElement = document.getElementById("leftCycle");

let rightButtonElement = document.getElementById("rightCycle"); 

let tStartColorPicker = document.getElementById("tStartColorPicker");

let tEndColorPicker = document.getElementById("tEndColorPicker");

let tSettingsMenu = document.getElementById("tSettingsMenu");

let tSettingsButton = document.getElementById("tSettingsButton");

let showTSettings = false;
class Vector2 {
    x = 0;
    y = 0;

    static get zero() {
        return new Vector2(0, 0);
    }

    static get up() {
        return new Vector2(0, 1);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
    get sqrMagnitude() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }
    get magnitude() {
        return Math.sqrt(this.sqrMagnitude);
    }

    static pow(a, p) {


        return new Vector2(Math.pow(a.x, p), Math.pow(a.y, p));
    }
    get normalize() {
        let mag = this.magnitude;

        if (mag == 0) {
            return Vector2.zero;
        }

        return Vector2.mult(this, 1 / mag);
    }

    static distance(a, b) {
        return new Vector2(subtract(a, b).magnitude);
    }

    static mult(a, t) {
        return new Vector2(a.x * t, a.y * t);

    }

    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static subtract(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static dot(a, b) {
        return (a.x * b.x) + (a.y * b.y)
    }

    static cross(a, b) {
        return (a.x * b.y) - (a.y * b.x)
    }

    static scale(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }


}

class ProjectPanelData {

    constructor(url, href, text, inid) {
        this.url = url;
        this.href = href;
        this.text = text;
        this.id = inid;
    }

    NewProjectPanel() {

        return " <div id=" + this.id + " class=\"projectpanel\">  <button style = \"background-image: url(" + this.url + ")\" class=\"projectpanelbutton\" onclick = \"location.href='" + this.href + "'\" type = \"button\"" /* ><p class=\"buttontext\">" + this.text +  "</p> */ + "</button> <div class=\"shadow\"> </div> </div > "
    }
}

let mousePos = Vector2.zero;
let lastClientPos = Vector2.zero;


// trail vars

let trailDrag = 0.175;
let trailInterolationRate = 0.5;
let trailSizeFalloff = 10;
let trailAcceleration = 0.065;
let trailBounceEfficency = 0.9;

let trailParticles = 5;
let trail = [];
let trailPositions = [];
let trailVelocities = [];
let trailElement = document.getElementById("trail");

// handle inputs

var dragslider = document.getElementById("drag");
var accelslider = document.getElementById("accel");
var lengthslider = document.getElementById("len");
var lerpslider = document.getElementById("lerp");

tStartColorPicker.oninput = function () {

    localStorage.setItem("StartColor", tStartColorPicker.value)

}

tEndColorPicker.oninput = function () {

    localStorage.setItem("EndColor", tEndColorPicker.value)

}

lerpslider.oninput = function () {
    console.log(this.value);
    localStorage.setItem("lerpSpeed", this.value / 100)
    trailInterolationRate = this.value / 100;
}


accelslider.oninput = function () {
    console.log(this.value);
    localStorage.setItem("trailAccel", this.value / 1000)
    trailAcceleration = this.value / 1000;
}


lengthslider.oninput = function () {
    console.log(this.value);
    localStorage.setItem("trailLength", this.value)
    trailParticles = this.value;
    GenerateTrail()
}

dragslider.oninput = function () {
    console.log(this.value);
    localStorage.setItem("trailDrag", this.value / 1000)

    trailDrag = (this.value / 1000);
}



LoadTrailVars();

GenerateTrail();

ToggleAccel();
function GenerateTrail() {

    trailElement.innerHTML = "";
    trail = [];
    trailPositions = [];
    trailVelocities = [];

    for (var i = 0; i < trailParticles; i++) {
        trailElement.innerHTML += "<div id=" + ("circle" + (i + 1)) + " class=\"circle\"> </div>";
        trailPositions.push(Vector2.zero)
        trailVelocities.push(Vector2.zero)

    }

    for (var i = 0; i < trailParticles; i++) {
        trail.push(document.getElementById("circle" + (i + 1)));
    }
}
function ToggleAccel() {

    // this is done too early on purpose because this function is called on load which flips the bool
    localStorage.setItem("doAccel", doAccel)

    doAccel = !doAccel;
    let accelSettings = document.getElementById("accelSettings");
    let lerpSettings = document.getElementById("lerpSettings");

    accelSettings.style.display = (doAccel) ? "initial" : "none";
    lerpSettings.style.display = (!doAccel) ? "block" : "none";


}
function LoadTrailVars() {

    let tempDoAcc = localStorage.getItem("doAccel");

    doAccel = (tempDoAcc === "true") ? true : false;

    let acc = parseFloat(localStorage.getItem("trailAccel"));
    let len = parseFloat(localStorage.getItem("trailLength"));
    let drg = parseFloat(localStorage.getItem("trailDrag"));
    let spd = parseFloat(localStorage.getItem("lerpSpeed"));
    let c1 = localStorage.getItem("StartColor");
    let c2 = localStorage.getItem("EndColor");


    if (c1 != null) {

        tStartColorPicker.value = c1;
        
    }


    if (c2 != null) {

        tEndColorPicker.value = c2;
    }




    if (!isNaN(spd)) {

        console.log(spd);
        trailInterolationRate = spd;
        lerpslider.value = spd * 100;
    }


    if (!isNaN(acc)) {
 
        trailAcceleration = acc;
        accelslider.value = acc * 1000;
    }

    if (!isNaN(len)) {
   
        trailParticles = len;
        lengthslider.value = len ;
    }


    if (!isNaN(drg)) {

        trailDrag = drg;
        dragslider.value = drg * 1000;
     


    }

   // console.log(trailAcceleration);
  //  console.log(trailDrag);
  //  console.log(trailParticles);

}
function HandleScrollEdges() {

    if (projectindex == projects.length - 1) {

        rightButtonElement.disabled = true;
    }
    else {
        rightButtonElement.disabled = false;

    }

    if (projectindex == 0) {
        leftButtonElement.disabled = true;

    }
    else {
        leftButtonElement.disabled = false;

    }

}
function ScrollAnimation() {
    animationRunning = true;
    AnimateProjects();

    if (animationProgress < 1) {
        animationProgress += step;
     //   console.log(animationProgress);
        
        requestAnimationFrame(ScrollAnimation);

    }
    else if (animationQueue != 0) {
      //  console.log("RestartedAnimation");
        projectindex += scrollDirection;

        HandleScrollEdges();
        let samedir = animationQueue == scrollDirection;

        
        if (TryStartAnimation() && samedir) {
            step += 0.02;
            pow = 1;
        }

        if (!samedir) {
            pow = basePow;
            step = baseStep;
        }
      

    }
    else {
   
        projectindex += scrollDirection;
        HandleScrollEdges();
        animationProgress = 0;
        animationRunning = false;
        pow = basePow;
        AnimateProjects();
    }
}
function AnimateProjects() {

    let scaleThreshold = 0;

    for (var i = 0; i < projects.length; i++) {

        
        let projectedindex = projectindex + (Math.pow(animationProgress, pow) * scrollDirection);

        let distance = Math.abs(i - projectedindex);

        let temp = document.getElementById("id" + (i + 1));

        let dif = 0;

      
        dif = 1.9 - distance;

        if (dif > 0) {
            temp.style.display = "flex";
            temp.style.width = 30 * dif + "%";
            temp.style.height = 50 * dif + "%"
        }
        else {
            temp.style.display = "none";
            
        }
          
   
    }



}

function Cycle(dir) {

    animationQueue = dir;

    if (animationRunning == false) {
        TryStartAnimation();
    }
   

}
function TryStartAnimation() {



    if (animationQueue != 0) {

        if (animationQueue == 1 && projectindex == projects.length -1) {
            animationQueue = 0;
            animationRunning = false;

            return false;
        }


        if (animationQueue == -1 && projectindex == 0) {
            animationQueue = 0;
            animationRunning = false;

            return false;
        }

        console.log("StartedAnimation");
        animationProgress = 0;
        scrollDirection = animationQueue;
        animationQueue = 0;
        animationRunning = true;

        requestAnimationFrame(ScrollAnimation);

        return true;

    }

    return false;
}

function ToggleSettingsMenu() {
    showTSettings = !showTSettings;
    if (showTSettings) {
       
        tSettingsMenu.style.display = 'block';

    }
    else {
        tSettingsMenu.style.display = 'none';
    }

} 

//hide the menu if clicked outside 

document.addEventListener('click', function (event) {
   // console.log("clicked")

    if (!tSettingsMenu.contains(event.target) && event.target !== tSettingsButton && showTSettings) {

       // console.log("clicked outside")
        ToggleSettingsMenu();
    }
});


document.addEventListener('keydown', function (event) {
    // Code to execute when a key is pressed down

    if (event.key == "ArrowRight") {
        //   console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        animationQueue = 1;
    }

    console.log(event.key)

    if (event.key == "ArrowLeft") {
        // console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        animationQueue = -1;
    }

    if (event.key == "a") {
        //   console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        doAccel = !doAccel;
        ;
    }

    if (animationRunning == false) {
        TryStartAnimation();
    }



});

//assign projects
const projects = []; 

projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/ComplexBrackground2.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackground.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));

projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/ComplexBrackground2.png", "about.html", "sample text", "id7"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackground.png", "about.html", "sample text", "id8"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));

projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/ComplexBrackground2.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackground.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text"));


let element = document.getElementById("projectinjection")   



for (var i = 0; i < projects.length; i++) {
    projects[i].id = "id" + (i + 1);

   // console.log(projects[i].id);

    element.innerHTML += projects[i].NewProjectPanel();
}


AnimateProjects();
function Update() {



    if (animationRunning == false) {

        if (step > baseStep) {
            step *= 0.98;

            step -= 0.005;
        }

        if (step < baseStep) {
            step = baseStep;
        }

    }

    //console.log("projectindex" + projectindex);
    AnimateMouseTrail();

    requestAnimationFrame(Update);
}


function RotLerpHexColors(hexColor1, hexColor2,t) {

    //im going to treat the color like a vector capture it's length for the start and end
    // and interpolate both seperately so colors on oposite sides wont cut through the middle
    //of the color space, i have no idea if this is a standard algorithm or not but i wrote it for unity


    // i dont feel like writing a vector3 class for this so manually it is


 
    let r1 = parseInt(hexColor1.slice(1, 3), 16);
    let g1 = parseInt(hexColor1.slice(3, 5), 16);
    let b1 = parseInt(hexColor1.slice(5, 7), 16);

    let r2 = parseInt(hexColor2.slice(1, 3), 16);
    let g2 = parseInt(hexColor2.slice(3, 5), 16);
    let b2 = parseInt(hexColor2.slice(5, 7), 16);



    let r3 = lerp(r1, r2, t);
    let g3 = lerp(g1, g2, t);
    let b3 = lerp(b1, b2, t);



    let mag1 = Math.sqrt((r1 * r1) + (g1 * g1) + (b1 * b1));
    let mag2 = Math.sqrt((r2 * r2) + (g2 * g2) + (b2 * b2));
    let mag3 = Math.sqrt((r3 * r3) + (g3 * g3) + (b3 * b3));

   // if (mag3 < 0.01) {

   // }

    let mag4 = lerp(mag1, mag2,t);

  //  console.log(mag4);

    r3 /= (mag3 / mag4);
    g3 /= (mag3 / mag4);
    b3 /= (mag3 / mag4);
 //   console.log(`rgb(${r3},${ g3 },${b3})`);


    return `rgb(${r3},${g3},${b3})`


}

function AnimateMouseTrail() {

    for (var i = trail.length - 1; i >= 0; i--) {

        let t = i / (trail.length);
        t = (isNaN(t)) ? 0.5 : t;
    
        trail[i].style.backgroundColor = RotLerpHexColors(tStartColorPicker.value, tEndColorPicker.value,t)
        if (doAccel) {

            if (i == 0) {

                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {

                    trailVelocities[i] = Vector2.add(Vector2.mult(Vector2.subtract(mousePos, trailPositions[i]), trailAcceleration), trailVelocities[i]);
                }
                else {
                    trailPositions[i] = Vector2.zero;
                }
            }
            else {

                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {
                    
                
                  
                    trailVelocities[i] = Vector2.add(Vector2.mult(Vector2.subtract(trailPositions[i - 1], trailPositions[i]), trailAcceleration), trailVelocities[i]);


                }
                else {
                    trailPositions[i] = Vector2.zero;
                }

            }

            let mag = Math.pow(trailVelocities[i].magnitude, 0.5);

            mag /= (trailDrag + 1);
            mag = Math.pow(mag, 2);


            let normalize = trailVelocities[i].normalize;
            trailVelocities[i] = Vector2.mult(normalize, mag);

            let potentialPosition = Vector2.add(trailPositions[i], trailVelocities[i]);

            let totalHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
            );

           // console.log(trailElement.style.clientHeight);



            if (potentialPosition.x > innerWidth - innerWidth / 50) {
                trailVelocities[i].x *= -trailBounceEfficency;
                potentialPosition.x = innerWidth - innerWidth / 50;
             //   console.log("bounce");
            }

            if (potentialPosition.y > totalHeight - (totalHeight / 50) ) {
                trailVelocities[i].y *= -trailBounceEfficency;
                potentialPosition.y = totalHeight - (totalHeight / 50) ;

            }

            if (potentialPosition.x < 1) {
                trailVelocities[i].x *= -trailBounceEfficency;
                potentialPosition.x = 0;
            }


            if (potentialPosition.y < 1) {
                trailVelocities[i].y *= -trailBounceEfficency;
                potentialPosition.y = 0;

            }

            trailPositions[i] = potentialPosition;

        }
        else {


            if (i == 0) {
                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {

                    trailPositions[i] = lerp(trailPositions[i], mousePos, trailInterolationRate);
                }
                else {
                    trailPositions[i] = Vector2.zero;

                }
            }
            else {

                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {

                    trailPositions[i] = lerp(trailPositions[i], trailPositions[i - 1], trailInterolationRate * (trailSizeFalloff / (i + (trailSizeFalloff - 1))));
                }
                else {
                    trailPositions[i] = Vector2.zero;
                }
            }
        }










        trail[i].style.top = trailPositions[i].y + 'px';
        trail[i].style.left = trailPositions[i].x + 'px';


        trail[i].style.width = lerp(1, 0.1, i / trail.length) + '%';

    }

}

requestAnimationFrame(Update);

document.addEventListener('mousemove', function (event) {


    mousePos = new Vector2(event.pageX, event.pageY);
    lastClientPos = new Vector2(event.clientX, event.clientY);

}); 



window.addEventListener("scroll", function () {
    mousePos.y = lastClientPos.y + window.scrollY;
});



function lerp(start, end, t)
{
    if (start instanceof Vector2 && end instanceof Vector2) {
        return Vector2.add(start, Vector2.mult(Vector2.subtract(end,start),t))
    }



    return (start + (end-start) * t);
}
