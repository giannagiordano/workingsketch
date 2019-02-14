//animation variables
var ghost, asterisk, cloud, box;

//heart variable
let heart = [];
let heart_num = 300;

//candy variable
let candy = [];
let candy_num = 300;

//variables for heart images
let heart_img;
let secondheart_img;
let thirdheart_img;

//variable for mousePressed function that allows users to create hearts by clicking
let a;

//variable for mousePressed function that allows users to create candies by clicking
let b;

//variable for mouseDragged function that allows users to create pink hearts by dragging the mouse
let c;

//loading the animation from the assets folder and loading the images from the images folder
function preload(){
    ghost = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
    asterisk = loadAnimation('assets/asterisk.png', 'assets/triangle.png', 'assets/square.png', 'assets/cloud.png', 'assets/star.png', 'assets/mess.png', 'assets/monster.png');
    cloud = loadAnimation('assets/cloud_breathing0001.png', 'assets/cloud_breathing0009.png');
    box = loadAnimation('assets/box0001.png', 'assets/box0003.png');
    heart_img = loadImage('images/heart.png');
    secondheart_img = loadImage('images/secondheart.png');
    thirdheart_img = loadImage('images/thirdheart.png');
}

//creating full screen Canvas
function setup(){
    createCanvas(windowWidth, windowHeight);
    }

function draw() {
    //if else statement for background; the background changes from pink to red depending on where the mouse is
    if (mouseX < width/2){
        background(255, 199, 225);
    }else{
        background(255, 84, 84);
    }

    /*
    if else statement for hearts and candies
    either hearts or candies show up depending on where the mouse is
    heart and candy arrays are in for loops to allow for interaction
    */
    if (mouseX < width/2){
        for(let i=0; i<heart.length; i++){
            heart[i].display();
            heart[i].move();
            heart[i].rollover(mouseX, mouseY)
        }
    }else{
        for(let i =0; i<candy.length; i++){
            candy[i].display();
            candy[i].move();
            candy[i].rollover(mouseX, mouseY)
        }
    }

    /*if else statement for animation; 
    when the mouse is pressed, either the box or the cloud animation shows up depending on where the mouse is
    when the mouse is not pressed, either the ghost or the asterisk shows up depending on where the mouse is
    */
    if (mouseIsPressed){
        if(mouseX < width/2){
            animation(box, mouseX, mouseY);
        }else{
            animation(cloud, mouseX, mouseY);
        }
    }else{
        if (mouseX < width/2){
            animation(ghost, mouseX, mouseY);
        }else{
            animation(asterisk, mouseX, mouseY);
        }
    }

    //removes hearts when there are too many to allow for continuous interaction
    if(heart.length > 150){
        heart.splice(0, 1)
    }

    //removes candies when there are too many to allow for continuous interaction
    if(candy.length > 150){
        candy.splice(0,1)
    }

  }

/*
interaction with heart and candy arrays

when the mouse is in a location where the background is pink and hearts show up,
a new heart is created with every click of the mouse

when the mouse is in a location where the background is red and candies show up,
a new candy is created with every click of the mouse 
*/
function mousePressed(){
    a = new Heart(mouseX, mouseY, 40, 40, random(0.1,1), color('red'));
    heart.push(a);
    for(let i=0; i<heart.length; i++){
        heart[i].clicked(mouseX, mouseY)
    }

    b = new Candy(mouseX, mouseY, random(20, 40), random(20,40), random(0.1,1), color(random(99, 255), random(99, 255), random(99, 255)));
    candy.push(b)
    for(let i=0; i<candy.length; i++){
        candy[i].clicked(mouseX, mouseY)
    }

}

/*
interaction with heart and candy arrays

when the mouse is in a location where the background is pink and hearts show up,
users can create pink hearts by dragging the mouse

when the mouse is in a location where the background is red and candies show up,
users can create candies by dragging the mouse
*/
function mouseDragged(){
    c = new Heart(mouseX, mouseY, random(40,60), random(40,60), 0.1, color('red'));
    heart.push(c)
    for(let i=0; i<heart.length; i++){
        heart[i].clicked(mouseX, mouseY)
    }

    e = new Candy(mouseX, mouseY, random(40,60), random(40,60), 0.1, color(random(99, 255), random(99, 255), random(99, 255)));
    candy.push(e)
    for(let i=0; i<candy.length; i++){
        candy[i].clicked(mouseX, mouseY)
    }
    
}

//setting up a class for Heart
class Heart{
    constructor(tempX, tempY, tempW, tempH, tempSpeed, tempShade){
        this.x = tempX;
        this.y = tempY;
        this.w = tempW;
        this.h = tempH;
        this.speed = tempSpeed;
        this.shade = tempShade;
        this.over = false;
        this.isclicked = false;
    }

    //setting up boolean that is used for interaction under display()
    rollover(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w){
            this.over = true;
        }else{
            this.over = false;
        }
    }

    //setting up boolean that is used for interaction under display()
    clicked(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d< this.w){
            this.isclicked = true;
        }else{
            this.isclicked = false;
        }
    }

    //hearts move in a horizontal motion
    move(){
        this.x = this.x + this.speed;
        if(this.x > width){
            this.x = 0;
        }
    }

     /*
    interaction with hearts
    when you initially click the mouse, a new red heart appears
    when you click the mouse elsewhere, the red heart then changes to a pink heart
    when the animation rolls over the hearts, they change to purple hearts
    */
    display(){
        fill(this.shade)
        if(this.isclicked){
            image(secondheart_img, this.x, this.y, this.w, this.h);
        }else{
            image(heart_img, this.x, this.y, this.w, this.h);
        }
        if(this.over){
            image(thirdheart_img, this.x, this.y, this.w, this.h);
        }
    }

}

//setting up a class for Candy
class Candy{
    constructor(tempX, tempY, tempW, tempH, tempSpeed, tempShade){
        this.x = tempX;
        this.y = tempY;
        this.w = tempW;
        this.h = tempH;
        this.speed = tempSpeed;
        this.shade = tempShade;
        this.over = false;
        this.isclicked = false;
    }

    //setting up boolean that is used for interaction under display()
    rollover(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d<this.w){
            this.over = true;
        }else{
            this.over = false;
        }
    }

    //setting up boolean that is used for interaction under display()
    clicked(mx, my){
        let d = dist(mx, my, this.x, this.y);
        if(d< this.w){
            this.isclicked = true;
        }else{
            this.isclicked = false;
        }
    }

    //candies move in a vertical motion
    move(){
        this.y = this.y + this.speed;
        if(this.y > height){
            this.y = 0;
        }
    }

    /*
    interaction with candies
    when you initially click the mouse, a new candy appears in a pastel green color
    when you click the mouse elsewhere, the candy then changes to a different pastel color because this.shade is defined as color(random(99, 255), random(99, 255), random(99, 255))
    when the animation rolls over the candies, they briefly change to pastel pink
    */
    display(){
        if(this.isclicked){
            fill(66, 244, 155);
        }else{
            fill(this.shade);
        }
        if(this.over){
            fill(255, 199, 225);
        }
        ellipse(this.x, this.y, this.w, this.h);
    }

}
