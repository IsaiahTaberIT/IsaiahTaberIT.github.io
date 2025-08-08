
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

let leftButtonElement = document.getElementById("leftCycle");

let rightButtonElement = document.getElementById("rightCycle"); 



class Vector2 {
    x = 0;
    y = 0;

    static get zero() {
        return new Vector2(0, 0);
    }

    static get up() {
        return new Vector2(0, 1);
    }
    constructor(x,y) {
        this.x = x;
        this.y = y;
      
    }
    get sqrMagnitude() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    } 
    get magnitude() {
        return Math.sqrt(this.sqrMagnitude);
    } 

    static pow(a,p) {
       

        return new Vector2(Math.pow(a.x, p), Math.pow(a.y, p));
    } 
    get normalize() {
        let mag = this.magnitude;

        if (mag == 0) {
            return Vector2.zero;
        }

        return Vector2.mult(this,1/mag);
    } 

    static distance(a,b) {
        return new Vector2(subtract(a,b).magnitude);
    }

    static mult(a,t) {
        return new Vector2(a.x * t, a.y * t);

    }

    static add(a,b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static subtract(a,b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static dot(a,b) {
        return (a.x * b.x) + (a.y * b.y)
    }

    static cross(a,b) {
        return (a.x * b.y) - (a.y * b.x)
    }

    static scale(a,b) {
        return new Vector2(a.x * b.x, a.y * b.y);
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

    console.log(event.key)

    if (event.key == "ArrowLeft") {
       // console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        animationQueue = -1;
    }

    if (event.key == "a") {
        //   console.log('Key Pressed:', event.key); // Logs the character of the key pressed
        doAccel = ! doAccel;
;
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


let mousePos = Vector2.zero;


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

let trailParticles = 50;
let trail = [];
let trailPositions = [];
let trailVelocities = [];
let trailElement = document.getElementById("trail");

for (var i = 0; i < trailParticles; i++) {
    trailElement.innerHTML += "<div id=" + ("circle" + (i + 1)) +" class=\"circle\"> </div>";
    trailPositions.push(Vector2.zero)
    trailVelocities.push(Vector2.zero)

}

for (var i = 0; i < trailParticles; i++) {
    trail.push(document.getElementById("circle" + (i + 1)));
}



const body = document.body;
const html = document.documentElement;





function AnimateMouseTrail() {

    let drag = 0.425;
    let t = 0.5;
    let falloff = 10;
    let acceleration = 0.175;
    let bounceefficency = 0.9;



    for (var i = 0; i < trail.length; i++) {


        if (doAccel) {

            let mag = Math.pow(trailVelocities[i].magnitude, 0.5);

            mag *= 1 / (drag + 1);
            mag = Math.pow(mag, 2);


            let normalize = trailVelocities[i].normalize;
            trailVelocities[i] = Vector2.mult(normalize, mag);

            if (i == 0) {

                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {

                    trailVelocities[i] = Vector2.add(Vector2.mult(Vector2.subtract(mousePos, trailPositions[i]), acceleration), trailVelocities[i]);
                }
                else {
                    trailPositions[i] = Vector2.zero;
                }
            }
            else {

                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {
                    
                
                  
                    trailVelocities[i] = Vector2.add(Vector2.mult(Vector2.subtract(trailPositions[i - 1], trailPositions[i]), acceleration), trailVelocities[i]);


                }
                else {
                    trailPositions[i] = Vector2.zero;
                }

            }


            let potentialPosition = Vector2.add(trailPositions[i], trailVelocities[i]);

            let totalHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
            );


            if (potentialPosition.x > innerWidth - innerWidth / 50) {
                trailVelocities[i].x *= -bounceefficency;
                potentialPosition.x = innerWidth - innerWidth / 50;
             //   console.log("bounce");
            }

            if (potentialPosition.y > totalHeight - (totalHeight / 50) ) {
                trailVelocities[i].y *= -bounceefficency;
                potentialPosition.y = totalHeight - (totalHeight / 50) ;

            }

            if (potentialPosition.x < 1) {
                trailVelocities[i].x *= -bounceefficency;
                potentialPosition.x = 0;
            }


            if (potentialPosition.y < 1) {
                trailVelocities[i].y *= -bounceefficency;
                potentialPosition.y = 0;

            }

            trailPositions[i] = potentialPosition;

        }
        else {


            if (i == 0) {
                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {

                    trailPositions[i] = lerp(trailPositions[i], mousePos, t);
                }
                else {
                    trailPositions[i] = Vector2.zero;

                }
            }
            else {

                if (!isNaN(trailPositions[i].x) && !isNaN(trailPositions[i].y)) {

                    trailPositions[i] = lerp(trailPositions[i], trailPositions[i - 1], t * (falloff / (i + (falloff - 1))));
                }
                else {
                    trailPositions[i] = Vector2.zero;
                }
            }
        }










        trail[i].style.top = trailPositions[i].y + 'px';
        trail[i].style.left = trailPositions[i].x + 'px';


        trail[i].style.width = (12 / (i + 10)) + '%';

    }

}

requestAnimationFrame(Update);

document.addEventListener('mousemove', function (event) {


    mousePos = new Vector2(event.pageX, event.pageY);


}); 





function lerp(start, end, t)
{
    if (start instanceof Vector2 && end instanceof Vector2) {
        return Vector2.add(start, Vector2.mult(Vector2.subtract(end,start),t))
    }



    return (start + (end-start) * t);
}
