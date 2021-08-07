var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

// bg image 
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}

bgImage.src = "./images/bacground.png"

// hero 

var hero = {
    speed: 256,
    x: 0.
    y: 0
};

var monster = {
    x:0,
    y:0
};

var monstersCaught = 0;


//  Handle keybpard controls

var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.key] = true;
}, false)

addEventListener("keyup", function(e) {
    keysDown[e.key] = true;
}, false)

// resets the game when the player catches monster

var reset = () => {
    hero.x = canvas.width /2;
    hero.y = canvas.height /2;

    monster.x = 32 + (Math.random() * (canvas.width - 60));
    monster.y = 32 + (Math.random() * (canvas.height - 60));
}

// update game objects 

var update = function(modifier) {

    // player holding down
    if(38 in keysDown) {
        hero.y -= hero.speed * modifier;
    }
    // player holding up 
    if(40 in keysDown) {
        hero.y += hero.speed * modifier;
    }

    // player holding left
    if(37 in keysDown) {
        hero.x -= hero.speed * modifier;
    }
    // player holding right
    if(39 in keysDown) {
        hero.x += hero.speed * modifier;
    }

    //Are they touching 

    if ( 
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)   
    ) {
        ++monstersCaught;
        reset();
    }
}


// Draw everything 
