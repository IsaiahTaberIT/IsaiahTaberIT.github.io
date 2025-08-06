
let projectindex = 0;
let animationProgress = 0;
let animationQueue = 0;
let scrollDirection = 0;

let animationRunning = false;
const step = 0.05;

function ScrollAnimation() {
    animationRunning = true;
    AnimateProjects();

    if (animationProgress < 1) {
        animationProgress += step;
      //  console.log(animationProgress);
        
        requestAnimationFrame(ScrollAnimation);

    }
    else if (animationQueue != 0) {
      //  console.log("RestartedAnimation");

        projectindex += scrollDirection;

        if (projectindex < 0) {
            projectindex += projects.length -1;
        }
        else {
            projectindex %= (projects.length);
        }

        animationProgress = 0;
        scrollDirection = animationQueue;
        animationQueue = 0;
        requestAnimationFrame(ScrollAnimation);
    }
    else {
     
        projectindex += scrollDirection;

        if (projectindex < 0) {
            projectindex += projects.length;
        }
        else {
            projectindex %= (projects.length);
        }
        animationProgress = 0;
        animationRunning = false;
       
        AnimateProjects();
    }
}

function AnimateProjects() {

    let element = document.getElementById("projectinjection")
    element.innerHTML = "";
    let afters = [];
    let afterthresholds = [];
    let afterindicies = [];

    let scaleThreshold = 0;

    for (var i = 0; i < projects.length; i++) {




    

        let index = projectindex - 1 + i;
        if (index < 0) {
            index += projects.length;
        }
        let modindex = index % projects.length;

        let forwardwrapdistance = projects.length - projectindex + i + (animationProgress * scrollDirection) ;
        let reversewrapdisrance = projects.length - i + projectindex + ( animationProgress * scrollDirection) ; 

     

       // + (animationProgress * scrollDirection)

       
        let distance = (projectindex - i + (animationProgress * scrollDirection));
        let absdistance = Math.abs(projectindex - i + (animationProgress * scrollDirection));

        if (projectindex == i) {
            distance = 0;
            absdistance = 0;
        }
        if (i == 0) {
       

        }
        //

         scaleThreshold = 1.9 - absdistance;


        if (scaleThreshold >= 0) {

            if (distance > 0) {

                element.innerHTML += projects[i].NewProjectPanel();
                let temp = document.getElementById("id" + (i + 1));

                let scalefactor = lerp(5, 50, scaleThreshold / 2);

                temp.style.width = scalefactor + "%";
                temp.style.height = scalefactor + "%";
            }
            else {
                afters.push(projects[i]);
                afterthresholds.push(scaleThreshold)
                afterindicies.push(i);
            }
        }
            // temp.style.height = (mousePosX / 10) + "px";
    }

    for (var i = 0; i < afters.length; i++) {

        element.innerHTML += afters[i].NewProjectPanel();
        let temp = document.getElementById("id" + (afterindicies[i] + 1) );

        console.log((i));

        console.log("id" + (i + 1));

        let scalefactor = lerp(5, 50, afterthresholds[i] / 6);

        temp.style.width = scalefactor + "%";
        temp.style.height = scalefactor + "%";
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

    if (animationRunning == false && animationQueue != 0) {
        console.log("StartedAnimation");
        animationProgress = 0;
        scrollDirection = animationQueue;
        animationQueue = 0;
        animationRunning = true;
        requestAnimationFrame(ScrollAnimation);
    }

});


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

projects.push(new ProjectPanelData("images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id1"));
projects.push(new ProjectPanelData("images/ComplexBrackground2.png", "about.html", "sample text", "id2"));
projects.push(new ProjectPanelData("images/SimpleNoiseBackground.png", "about.html", "sample text", "id3"));

projects.push(new ProjectPanelData("images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id4"));
projects.push(new ProjectPanelData("images/SimpleNoiseBackgroundGreyScale.png", "about.html", "sample text", "id5"));

function Update() {

    console.log(projectindex);

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
