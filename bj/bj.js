setInterval(play, 3000);  

      let index=0;              
      
      function play(){
	    let imgs = document.getElementById("thumbs").    
                            getElementsByTagName("img"); 
        let showImg = document.getElementById("show");
        index++;  
        
        if(index == imgs.length) index=0; 

        showImg.setAttribute("src", imgs[index].getAttribute("src"));
      }

function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

function init(){
    initGameValues();
    initUI();
}

function Reset() {
    init();
}

function initGameValues(){
    const deck = [];
    for (i = 0;i <52;i++){
        deck[i] = i;
    }
    shuffleArray(deck);
    console.log(deck);
    game.deck = deck;
    game.count = 0;
    game.player_count = 0;
    game.banker_count = 0;
    game.player_points = 0;
    game.banker_points = 0; 
}

function initUI() {
    const player_desk = document.getElementById("player_desk");
    const banker_desk = document.getElementById("banker_desk");
    const information = document.getElementById("information");
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    if (player_desk) {
        player_desk.innerHTML = "";
    } 
    if (banker_desk) {
        banker_desk.innerHTML = "";
    }
    if (information) {
        information.innerHTML = "";
    }
    if (start) {
        start.style.display = "flex";
    }
    if (stop) {
        stop.style.display = "flex";
    }

}

function Onclick(){
    const parent = document.getElementById("player_desk");
    const point = game.deck[game.count];
    const pointmapping = [1,2,3,4,5,6,7,8,9,10,0.5,0.5,0.5];
    game.count += 1;
    game.player_count += 1;

    
    game.player_points += pointmapping[point%13];
    player_think();

    
    parent.appendChild(GetCardUI(point));
 }

 function GetCardUI(point){
    const numbermapping = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]; 
    const flowermapping = ["spade.png","heart.jpeg","diamond.png","club.png"];
    
    const card = document.createElement("div");
    const upborder = document.createElement("div");
    const upflower = document.createElement("img");
    const downborder = document.createElement("div");
    const downflower = document.createElement("img");
    const number = document.createElement("div");
    
    upborder.setAttribute("class","upborder");
    downborder.setAttribute("class","downborder");
    card.setAttribute("class","card");

    upflower.setAttribute("class","flower" );
    upflower.setAttribute("src","img/heart.jpeg")
    downflower.setAttribute("class","flower");    
    downflower.setAttribute("src","img/heart.jpeg")

    
    number.setAttribute("class","number");
    number.innerText=numbermapping[point%13];
    upflower.setAttribute("src","img/"+flowermapping[Math.floor(point/13)]);
    downflower.setAttribute("src","img/"+flowermapping[Math.floor(point/13)]);


    card.appendChild(upborder);
    card.appendChild(number);
    card.appendChild(downborder);
    upborder.appendChild(upflower);
    downborder.appendChild(downflower);
    return card;
}

function player_think() {
    if(game.player_points>10.5){
        document.getElementById("information").innerHTML = "玩家輸了,";
        document.getElementById("information").innerHTML += "點數："+game.player_points;
        document.getElementById("start").style.display = "none";
        document.getElementById("stop").style.display = "none";
    } else if (game.player_points == 10.5 || game.count == 5) {
        document.getElementById("information").innerHTML = "玩家贏了,";
        document.getElementById("information").innerHTML += "點數："+game.player_points;
        document.getElementById("start").style.display = "none";
        document.getElementById("stop").style.display = "none";

    } else{
        document.getElementById("information").innerHTML = "玩家點數："+game.player_points;
    }

}

function Finsh(){
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "none";
    banker_turn();
}

function banker_think() {
    let status = "";
    if(game.banker_points>10.5){
        status = "lose";
        document.getElementById("information").innerHTML = "莊家輸了,";
        document.getElementById("information").innerHTML += "點數："+game.banker_points;
    } else if (game.banker_points == 10.5 || game.banker_count == 5 || game.banker_points>game.player_points) {
        status = "win";
        document.getElementById("information").innerHTML = "莊家贏了,";
        document.getElementById("information").innerHTML += "點數："+game.banker_points;

    } else{
        status = "draw";
        document.getElementById("information").innerHTML = "莊家點數："+game.banker_points;
    }
    return status;

}



function banker_turn() {
    const parent = document.getElementById("banker_desk");
    const pointmapping = [1,2,3,4,5,6,7,8,9,10,0.5,0.5,0.5];
    let status = "";
    
    const point = game.deck[game.count];
    game.count += 1;
    game.banker_count += 1;
    game.banker_points += pointmapping[point%13];
    parent.appendChild(GetCardUI(point));
    status = banker_think();
    if (status == "draw") {
        setTimeout(banker_turn,1000);
    }
}



window.game = {}
init();