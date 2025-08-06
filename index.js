
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
        else {
            step = baseStep;
            pow = basePow;
        }

    }
    else {
     
        projectindex += scrollDirection;
        animationProgress = 0;
        animationRunning = false;
        step = baseStep;
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
    constructor(url, href, text,id) {
        this.url = url;
        this.href = href;
        this.text = text;
        this.id = id;
    }

    NewProjectPanel() {

        return "<div id=" + this.id + " class=\"projectpanel\"> <button style = \"background-image: url(" + this.url + ")\" class=\"projectpanelbutton\" onclick = \"location.href='" + this.href + "'\" type = \"button\"" /* ><p class=\"buttontext\">" + this.text +  "</p> */ + "</button > </div >"
    }
}

const projects = []; 

projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id1"));
projects.push(new ProjectPanelData("Images/ComplexBrackground2.png", "about.html", "sample text", "id2"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackground.png", "about.html", "sample text", "id3"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id4"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id5"));

projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id6"));
projects.push(new ProjectPanelData("Images/ComplexBrackground2.png", "about.html", "sample text", "id7"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackground.png", "about.html", "sample text", "id8"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id9"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id10"));

projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id11"));
projects.push(new ProjectPanelData("Images/ComplexBrackground2.png", "about.html", "sample text", "id12"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackground.png", "about.html", "sample text", "id13"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id14"));
projects.push(new ProjectPanelData("Images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id15"));


let element = document.getElementById("projectinjection")   



for (var i = 0; i < projects.length; i++) {
    element.innerHTML += projects[i].NewProjectPanel();
}


AnimateProjects();
function Update() {

    console.log("projectindex" + projectindex);

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

    requestAnimationFrame(Update);
}

requestAnimationFrame(Update);

document.addEventListener('mousemove', function (event) {


    mousePosX = event.pageX;
    mousePosY = event.pageY;

}); 



let circlelement = document.getElementById("circleid")


function lerp(start, end, t)
{

    return (start + (end-start) * t);
}
