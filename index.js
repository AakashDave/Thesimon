let buttonColours=["red","blue","green","yellow"]
let gamePattern=[];
let userClickedPattern=[];
$("#Info").text("Press A Key To Start");
let level=0;
let start=false;
$("body").keypress(function(){
     if(start==false){
        start=true;
        nextSequence();
     }
})

let playSound=(name)=>{
    var audio=new Audio("./sounds/"+name+".mp3")
    audio.play();
}
let animatePress=(name)=>{
    $("."+name).animate({opacity:0.3});
    setTimeout(() => {
        $("."+name).animate({opacity:1})
    }, 300);
}
let nextSequence=()=>{
    userClickedPattern=[];
    let randomChosenColour=Math.floor(Math.random()*4);
    gamePattern.push(buttonColours[randomChosenColour]);
    playSound(buttonColours[randomChosenColour])
    animatePress(buttonColours[randomChosenColour])
    level+=1;

    $("#Info").text("Level "+ level);
}

let startOver=()=>{
    level=0;
    gamePattern=[];
    start=false;
}
let checkAnswer=(currentLevel)=>{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       if(gamePattern.length===userClickedPattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
       }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over")
        },200)
        $("#Info").text("Game Over, Press Any Key To Start");
        startOver();
    }
}

// user click the button
$("button").on("click",function(){
    let userChosenColour=this.id;
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
    console.log(userClickedPattern, (userClickedPattern.length));
});

