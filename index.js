
let projectindex = 1;
let animationProgress = 0;
let animationQueue = 0;
let scrollDirection = 0;

let animationRunning = false;
let step = 0.05;
const baseStep = 0.05;
let pow = 1.25;
const basePow = 1.25;

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

        if (TryStartAnimation()) {
            step += 0.05;
            pow = 1;
        }
      

    }
    else {
     
        projectindex += scrollDirection;
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


document.addEventListener('keydown', function (event) {
    // Code to execute when a key is pressed down

    if (event.key == "ArrowRight") {
     //   console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        animationQueue = 1;
    }

    if (event.key == "ArrowLeft") {
       // console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        animationQueue = -1;
    }


    if (animationRunning == false) {
        TryStartAnimation(); 
    }
    
  

});

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


let mousePosX = 0;
let mousePosY = 0;


class ProjectPanelData {
  
    constructor(url, href, text, inid) {
        this.url = url;
        this.href = href;
        this.text = text;
        this.id = inid;
    }




    NewProjectPanel() {

        return "<div id=" + this.id + " class=\"projectpanel\"> <button style = \"background-image: url(" + this.url + ")\" class=\"projectpanelbutton\" onclick = \"location.href='" + this.href + "'\" type = \"button\"" /* ><p class=\"buttontext\">" + this.text +  "</p> */ + "</button > </div >"
    }
}

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
            step -= 0.01;
        }

        if (step < baseStep) {
            step = baseStep;
        }

    }

    //console.log("projectindex" + projectindex);
    AnimateMouseTrail();

    requestAnimationFrame(Update);
}


let Trail = [];
let TrailPositionsX = [];
let TrailPositionsY = [];

for (var i = 0; i < 7; i++) {
    Trail.push(document.getElementById("circle" + (i + 1)));
    TrailPositionsX.push(0)
    TrailPositionsY.push(0)
}


let circlelement = document.getElementById("circle1")



function AnimateMouseTrail() {

    let t = 0.2;

    for (var i = 0; i < Trail.length; i++) {

        if (i == 0) {

           

        
            TrailPositionsY[i] = parseFloat(circlelement.style.top) - (parseInt(Trail[i].clientHeight) / 2) * t;
            TrailPositionsX[i] = parseFloat(circlelement.style.left) - (parseInt(Trail[i].clientWidth) / 2) * t;

            if (!isNaN(TrailPositionsX[i]) && !isNaN(TrailPositionsY[i])) {
                TrailPositionsX[i] = lerp(TrailPositionsX[i], mousePosX, t);
                TrailPositionsY[i] = lerp(TrailPositionsY[i], mousePosY, t);
            }
            else {
                TrailPositionsX[i] = 0;
                TrailPositionsY[i] = 0;
            }

            Trail[i].style.top = TrailPositionsY[i] + 'px';
            Trail[i].style.left = TrailPositionsX[i] + 'px';


        }
        else {
           

        //    TrailPositionsY[i] = parseFloat(circlelement.style.top) - (parseInt(Trail[i].clientHeight) / 2) * t;
        //    TrailPositionsY[i] = parseFloat(circlelement.style.left) - (parseInt(Trail[i].clientWidth) / 2) * t;

            if (!isNaN(TrailPositionsX[i]) && !isNaN(TrailPositionsY[i])) {

                TrailPositionsX[i] = lerp(TrailPositionsX[i], TrailPositionsX[i - 1], t * (3/ (i + 2)));
                TrailPositionsY[i] = lerp(TrailPositionsY[i], TrailPositionsY[i - 1], t * (3 / (i + 2)));
            }
            else {
                TrailPositionsX[i] = 0;
                TrailPositionsY[i] = 0;
            }

            Trail[i].style.top = TrailPositionsY[i] + 'px';

            Trail[i].style.left = TrailPositionsX[i] + 'px';
            Trail[i].style.width = (4/(i+3)) + '%';



        }



    }


    /*


    let t = 0.1;
    let ypos = parseFloat(circlelement.style.top) - (parseInt(circlelement.clientHeight) / 2) * t;
    let xpos = parseFloat(circlelement.style.left) - (parseInt(circlelement.clientWidth) / 2) * t;

    if (!isNaN(xpos) && !isNaN(ypos)) {
        xpos = lerp(xpos, mousePosX, t);
        ypos = lerp(ypos, mousePosY, t);
    }
    else {
        xpos = 0;
        ypos = 0;
    }

    circlelement.style.top = ypos + 'px';
    circlelement.style.left = xpos + 'px';
    */

}

requestAnimationFrame(Update);

document.addEventListener('mousemove', function (event) {


    mousePosX = event.pageX;
    mousePosY = event.pageY;

}); 





function lerp(start, end, t)
{

    return (start + (end-start) * t);
}
