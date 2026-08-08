// ==========================
// BEAN CLICKER
// PART 1
// ==========================

const countEl = document.getElementById("count");
const highscoreEl = document.getElementById("highscore");
const clickPowerEl = document.getElementById("clickPower");
const beansPerSecondEl = document.getElementById("beansPerSecond");

const bean = document.getElementById("bean");
const clickButton = document.getElementById("clickButton");

const buyClick = document.getElementById("buyClick");
const buyAuto = document.getElementById("buyAuto");
const buyFarm = document.getElementById("buyFarm");
const buyFactory = document.getElementById("buyFactory");

const clickCostEl = document.getElementById("clickCost");
const autoCostEl = document.getElementById("autoCost");
const farmCostEl = document.getElementById("farmCost");
const factoryCostEl = document.getElementById("factoryCost");

const toast = document.getElementById("toast");
const floatingContainer = document.getElementById("floatingContainer");

let beans = 0;
let highScore = Number(localStorage.getItem("beanHighScore")) || 0;

let clickPower = 1;
let beansPerSecond = 0;

let clickCost = 10;
let autoCost = 50;
let farmCost = 250;
let factoryCost = 1000;

countEl.textContent = beans;
highscoreEl.textContent = highScore;
clickPowerEl.textContent = clickPower;
beansPerSecondEl.textContent = beansPerSecond;

clickCostEl.textContent = clickCost;
autoCostEl.textContent = autoCost;
farmCostEl.textContent = farmCost;
factoryCostEl.textContent = factoryCost;

function updateUI(){

    countEl.textContent = Math.floor(beans);

    clickPowerEl.textContent = clickPower;

    beansPerSecondEl.textContent = beansPerSecond;

    clickCostEl.textContent = clickCost;
    autoCostEl.textContent = autoCost;
    farmCostEl.textContent = farmCost;
    factoryCostEl.textContent = factoryCost;

    if(beans > highScore){

        highScore = Math.floor(beans);

        highscoreEl.textContent = highScore;

        localStorage.setItem("beanHighScore", highScore);

    }

}

function clickBean(){

    beans += clickPower;

    updateUI();

    floatingNumber("+" + clickPower);

}

bean.addEventListener("click", clickBean);

clickButton.addEventListener("click", clickBean);

document.addEventListener("keydown", function(e){

    if(e.code === "Space"){

        e.preventDefault();

        clickBean();

    }

});

function floatingNumber(text){

    const div = document.createElement("div");

    div.className = "floating-text";

    div.textContent = text;

    const rect = bean.getBoundingClientRect();

    div.style.left = rect.left + rect.width/2 + "px";

    div.style.top = rect.top + "px";

    floatingContainer.appendChild(div);

    setTimeout(function(){

        div.remove();

    },1000);

}

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },2000);

}

buyClick.onclick = function(){

    if(beans >= clickCost){

        beans -= clickCost;

        clickPower++;

        clickCost = Math.floor(clickCost * 1.6);

        updateUI();

        showToast("Click Power Upgraded!");

    }

}

buyAuto.onclick = function(){

    if(beans >= autoCost){

        beans -= autoCost;

        beansPerSecond += 1;

        autoCost = Math.floor(autoCost * 2);

        updateUI();

        showToast("Auto Clicker Purchased!");

    }

}

buyFarm.onclick = function(){

    if(beans >= farmCost){

        beans -= farmCost;

        beansPerSecond += 5;

        farmCost = Math.floor(farmCost * 2);

        updateUI();

        showToast("Bean Farm Purchased!");

    }

}

buyFactory.onclick = function(){

    if(beans >= factoryCost){

        beans -= factoryCost;

        beansPerSecond += 20;

        factoryCost = Math.floor(factoryCost * 2);

        updateUI();

        showToast("Bean Factory Purchased!");

    }

}
// ==========================
// BEAN CLICKER
// PART 2
// ==========================

// Auto beans every second
setInterval(function () {

    beans += beansPerSecond;

    updateUI();

}, 1000);

// Achievement list
const achievements = [
    { amount: 10, name: "First 10 Beans" },
    { amount: 100, name: "Bean Collector" },
    { amount: 500, name: "Bean Farmer" },
    { amount: 1000, name: "Bean Master" },
    { amount: 5000, name: "Bean Legend" },
    { amount: 10000, name: "Bean Millionaire" }
];

const achievementsDiv = document.getElementById("achievements");

const unlocked = [];

function checkAchievements(){

    achievements.forEach(function(a){

        if(beans >= a.amount && !unlocked.includes(a.name)){

            unlocked.push(a.name);

            const div = document.createElement("div");

            div.className = "achievement unlocked";

            div.textContent = "🏆 " + a.name;

            achievementsDiv.appendChild(div);

            showToast("Achievement Unlocked!");

        }

    });

}

// Check achievements every half second
setInterval(checkAchievements,500);

// Save game every 5 seconds
setInterval(function(){

    const save = {

        beans,
        highScore,
        clickPower,
        beansPerSecond,
        clickCost,
        autoCost,
        farmCost,
        factoryCost

    };

    localStorage.setItem("beanSave",JSON.stringify(save));

},5000);

// Load game
function loadGame(){

    const save = JSON.parse(localStorage.getItem("beanSave"));

    if(!save) return;

    beans = save.beans || 0;
    highScore = save.highScore || 0;
    clickPower = save.clickPower || 1;
    beansPerSecond = save.beansPerSecond || 0;

    clickCost = save.clickCost || 10;
    autoCost = save.autoCost || 50;
    farmCost = save.farmCost || 250;
    factoryCost = save.factoryCost || 1000;

    updateUI();

}

loadGame();

// Random bean wobble
setInterval(function(){

    bean.style.transform =
        "rotate(" + (Math.random()*8-4) + "deg)";

    setTimeout(function(){

        bean.style.transform = "";

    },250);

},4000);

// Welcome
showToast("🫘 Welcome to Bean Clicker!");

const bgMusic = document.getElementById("bgMusic");

document.addEventListener("click", () => {
    bgMusic.play();
}, { once: true });