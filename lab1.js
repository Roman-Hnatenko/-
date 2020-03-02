const width = 32;
const height = 20;
let gameOver = false;
let x, y, fruitx, fruity, timex, timey;
let fruitIndex, score = 0;
let dirx = 0, diry = 0, time = 300;

let fruits = ['🍒','🍑','🍓','🍅','🍌','🍏','🥝','🥐','🍫','🥕','🍕','🍺','🍋','🍇','🍉','🍦','🍬','🍩','🍗','🍍','🍭','🌭','🧀'];
let randomTimeOne;
let counter = 0;
let visible = false;
let p = 10;
function setup()
{

    x = Math.floor(width / 2);
    y = Math.floor(height / 2);
}

function randomFruits()
{
    fruitIndex = Math.floor(Math.random()*(fruits.length ));
    fruitx =  Math.floor(Math.random() * (width - 1) );
    fruity = Math.floor(Math.random() * height );
    if(fruitx == 0 )
    {
        randomFruits();
    }
}
function randomTimePlus()
{
    if (score >= 8) {
        p = 20;
    }
    else {
        p = 10;
    }
    randomTimeOne = Math.floor(Math.random() * 10 + p);
    timex =  Math.floor(Math.random() * (width - 1) );
    timey = Math.floor(Math.random() * height);
    if(timex == 0)
    {
        randomTimePlus();
    }
}

function draw(){
    
    if (counter === randomTimeOne) {
        visible = true;
    }
    movement(dirx, diry);
    for(let i = 0; i < width; i++)
    {
        process.stdout.write("—");
        if (i == width -1) {
            process.stdout.write("  Score:" + score);
            console.log();
        }
    }
   
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++){
            if (j=== 0 ) { 
            
                process.stdout.write("|");
            }
            else if ( j === width -1  )
            {
                process.stdout.write("|\n");
            }
            else if(i == fruity && j == fruitx )
            {
                process.stdout.write(fruits[fruitIndex]);
            }
            else if(i == y && j == x)
            {
                process.stdout.write("🐍");
            }
            else if(i == timey && j == timex && visible )
            {
                
                process.stdout.write("🕐");
                
            }
            else
            {
                process.stdout.write(" ");
            }
        }
    };
    

    for(let i = 0; i < width; i++)
    {
        process.stdout.write("—");
    }
    if (x >= width - 1 || x <= 0 || y >= height || y < 0) {
        gameOver = true;
    }
    if (x == fruitx && y == fruity) {
        randomFruits();
        score++;
        time -= 40;
    }

    // console.log(x, y, timex, timey);
    // console.log(time);
    // console.log(fruitx, fruity);
    console.log("Speed:" + (400 - time));
    if ((x == timex && y == timey) ) {
        if (time <= 500) {
            time+= 40;
        }
        randomTimePlus();
        counter = 0;
        visible = false;
    }
    else if( counter >= randomTimeOne*3){
        randomTimePlus();
        counter = 0;
        visible = false;
    }
    counter++;
   
     
}
function movement(ix,jy)
{
    if (ix == 0 && jy == 0) {
        return;
    }
    if (ix == 0) {
        if (jy == 1) {
            y++;
        }
        else{
            y--;
        }
    }
    else{
        if (ix == 1) {
            x++;
        }
        else{
            x--;
        }
    }
}



function processKey(key) {
    
    if(key === "x")
    {
        process.exit(-1);
    }

    switch (key) {
        case 'a':
        dirx = -1, diry = 0;
        break;
    
    case 'd':
    dirx = 1, diry = 0;
        break;
    
    case 'w':
    dirx = 0, diry = -1;
        break;

    case 's':
    dirx = 0, diry = 1;
        break;

    case 'x':
        gameOver = false;
        break;    
    }
  
}

function readKey()
{
    const readline = require('readline');

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (key) => {
      processKey(key);
    })
}

function printGameOver(){
    
    console.log("\n╔═══╦══╦╗──╔╦═══╗╔══╦╗╔╦═══╦═══╗");
    console.log("║╔══╣╔╗║║──║║╔══╝║╔╗║║║║╔══╣╔═╗║");
    console.log("║║╔═╣╚╝║╚╗╔╝║╚══╗║║║║║║║╚══╣╚═╝║");
    console.log("║║╚╗║╔╗║╔╗╔╗║╔══╝║║║║╚╝║╔══╣╔╗╔╝");
    console.log("║╚═╝║║║║║╚╝║║╚══╗║╚╝╠╗╔╣╚══╣║║║");
    console.log("╚═══╩╝╚╩╝──╚╩═══╝╚══╝╚╝╚═══╩╝╚╝" );   
    console.log("Your score:" + score);
}

setup();
readKey();
randomFruits();
randomTimePlus();
function loop(){


global.setTimeout(() => {
    if (gameOver) {
        printGameOver();
        process.exit();
    }
    console.clear();
    draw();
    loop();
}, time);
}
loop();

