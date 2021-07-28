let skorKen=0;
let skorPlayer=0;
let timeout="";

let ken = document.getElementById("ninja-ken");

let splashScreen = document.getElementsByClassName("splash")[0];
let startGame = document.getElementsByClassName("start")[0];
let displaySkorKen = document.getElementsByClassName("skor-ken")[0];
let displaySkorPlayer = document.getElementsByClassName("skor-player")[0];

let reset = document.getElementById("reset");
let exit = document.getElementById("exit");
let batu = document.getElementById("batu");
let gunting = document.getElementById("gunting");
let kertas = document.getElementById("kertas");
let opsi = document.getElementsByClassName("opsi");

if (localStorage.getItem("skorKen")) {
    skorKen = localStorage.getItem("skorKen");
    displaySkorKen.innerHTML = skorKen;
}

if (localStorage.getItem("skorPlayer")) {
    skorPlayer = localStorage.getItem("skorPlayer");
    displaySkorPlayer.innerHTML = skorPlayer;
}

startGame.addEventListener("click",() =>{
    splashScreen.style.top = "-120vh";
    splashScreen.style.transition=".75s";
});

exit.addEventListener("click",() =>{
    splashScreen.style.top = "0vh";
    splashScreen.style.transition=".75s";
});


batu.addEventListener("click",() =>{
    janken(0);
    batu.disabled = true;
    gunting.disabled = true;
    kertas.disabled = true;
});
gunting.addEventListener("click",() =>{
    janken(1);
    batu.disabled = true;
    kertas.disabled = true;
    gunting.disabled = true;
});
kertas.addEventListener("click",() =>{
    janken(2);
    batu.disabled = true;
    gunting.disabled = true;
    kertas.disabled = true;
});

reset.addEventListener("click",() =>{
    if (confirm("Ini akan memulai ulang permainan Anda yakin?")) {
        skorKen = 0;
        skorPlayer = 0;
        displaySkorKen.innerHTML = skorKen;
        displaySkorPlayer.innerHTML = skorPlayer;
        ken.style.removeProperty("background-image");
        ken.classList.add("goyang");
        localStorage.clear();
    };
});



function janken(tangan){
    let jariKen = Math.floor(Math.random() * 3);

    switch (jariKen) {
        case 0:
            ken.style.backgroundImage = "url(res/img/ken-batu.png)";
            break;
        case 1:
            ken.style.backgroundImage = "url(res/img/ken-gunting.png)";         
            break;
        case 2:
            ken.style.backgroundImage = "url(res/img/ken-kertas.png)";
            break;
        default:
            break;
    }
    ken.classList.remove("goyang");

    switch (tangan) {
        case 0:
            if (jariKen == 0) {
                result("draw");
            } else  if (jariKen == 1) {
                result("player");
            } else{
                result("ken");
            }
            break;
        case 1:
            if (jariKen == 0) {
                result("ken");
            } else  if (jariKen == 1) {
                result("draw");
            } else{
                result("player");
            }
            break;
        case 2:      
            if (jariKen == 0) {
                result("player");
            } else  if (jariKen == 1) {
                result("ken");
            } else{
                result("draw");
            }
            break;
        default:
            break;
    }

}

function result(who) {
    clearTimeout(timeout);

    switch (who) {
        case "ken":
            skorKen++;
            localStorage.setItem("skorKen",skorKen);
            displaySkorKen.innerHTML = skorKen;
            console.log("Ninja Ken Menang");
            break;
        case "player":
            skorPlayer++;
            localStorage.setItem("skorPlayer",skorPlayer);
            displaySkorPlayer.innerHTML =skorPlayer;
            console.log("Player Menang");
            break;   
        default:
            console.log("Seri");
            break;
    }

    timeout = setTimeout(()=>{
        ken.style.removeProperty("background-image");
        ken.classList.add("goyang");        
        gunting.disabled = false;
        kertas.disabled = false;
        batu.disabled = false;
    } ,3000);
}