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
        //return " <div id=" + this.id + " class=\"projectpanel\">  <button style = \"background-image: url(" + this.url + ")\" class=\"projectpanelbutton\" onclick = \"location.href='" + this.href + "'\" type = \"button\"" /* ><p class=\"buttontext\">" + this.text +  "</p> */ + "</button> <div class=\"shadow\"> </div> </div > "
        // <div class=\"shadow\">  </div>

        // <p class =\"hover\">" + this.text + "</p>
        // title="This is a simple tooltip.">
       
     

        return " <div  id=" + this.id + " class=\"projectpanel\">  <button style = \"background-image: url(" + this.url + ")\" class=\"projectpanelbutton\" onclick = \"location.href='" + this.href + "'\" type = \"button\">     <p class =\"hover-text\">" + this.text + "</p>     </button> <div class=\"shadow\">  </div>  </div> "

    }
}



