const cards = document.getElementById('deck');
cards.innerHTML = "";
const cardIcon = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-leaf',
    'fa-bomb',
    'fa-bolt',
    'fa-bicycle',
    'fa-paper-plane-o',
    'fa-cube'
];

let openCards = []; 
let matchCards = []; 
let num; 
const count = document.querySelector('.moves');
count.textContent = 0; 
let moves = Number(count.textContent); 
const stars = document.querySelector('.stars'); 
const times = document.getElementById('time'); 
let isFirstClick = true; 

// --Success modal windows-- 
const step = document.getElementById('step'); 
let time = document.querySelector('.timer'); 
let star = document.getElementById('star'); 

// h1 每个首字母大写
let title = document.querySelector('h1').textContent;
function titleCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
const t = titleCase(title);
document.querySelector('h1').textContent = t;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function createHtml(arr){
    shuffle(arr);
    let text = "";
    for(let i = 0 ;i < arr.length; i++){
        text += `<li class="card"><i class="fa ${arr[i]}"></i></li>\n`;
    }
    cards.insertAdjacentHTML('afterbegin', text);
}
createHtml(cardIcon);

function reset(){
    location.reload();
}

function openCard(event){
    if(!event.target.classList.contains('card')){
        return;
    }
    if (openCards.length >= 2) {
        return;
    }
    if (event.target.classList.contains('show') || event.target.classList.contains('match')) {
        console.log('show or match')
        return;
    }

    event.target.classList.add('open', 'show');
    const name = event.target.querySelector('i').classList[1];
    openCards.push(name);
    let el = document.querySelectorAll('.open'); 
    let cardStatu = Array.from(el); 

    if (cardStatu.length === 2) {
        if (openCards[0] === openCards[1]) {
            setTimeout(function() {
               cardStatu[0].classList.remove('open', 'show');
               cardStatu[1].classList.remove('open', 'show');
               cardStatu[0].classList.add('match');
               cardStatu[1].classList.add('match');
            }, 500);
            matchCards.push(openCards);
            num = matchCards.length;
            openCards.splice(0, 2);

        } else {
            setTimeout(function() {
                cardStatu[0].classList.remove('open', 'show');
                cardStatu[1].classList.remove('open', 'show');
                openCards.splice(0, 2);
            },500);
        }
        moves = moves + 1;
        count.textContent = moves;
        if (moves === 15 && num < 8) {
            stars.removeChild(stars.firstElementChild);
        } else if (moves === 25 && num < 8) {
            stars.removeChild(stars.firstElementChild);
        } else if (moves === 35 && num < 8) {
            stars.removeChild(stars.firstElementChild);
        } else if (num === 8) {
            showDiv();
        };      
    }
}

function showDiv() {
    document.getElementById("modal-bg").style.display = "block";
    document.getElementById("modal-window").style.display = "block";
    const contents = '一共移动了 ';
    const html = contents + moves + ' moves';
    step.insertAdjacentHTML('afterbegin',html);
    const long = document.querySelector('.timer').innerHTML;
    times.insertAdjacentHTML('afterbegin', long);
    star.insertAdjacentHTML('afterbegin', stars.innerHTML);
}

function hideDiv() {
    document.getElementById("modal-bg").style.display = 'none';
    document.getElementById("modal-window").style.display = 'none';
    createHtml(cardIcon);
}

const again = document.getElementById('play-again');
again.addEventListener('click', function () {
    hideDiv()
    reset();
});

let timer;
cards.addEventListener('click',function(event){
    if (isFirstClick === true){
        isFirstClick = false;
       timer = setInterval(function() {
            timeType = Number(time.innerHTML) + 1;
            document.querySelector('.timer').innerHTML = String(timeType);
        },1000);
    };
    if(num === 8){
        clearInterval(timer);
    };
    openCard(event);
});
const restart = document.getElementById('restart');
restart.addEventListener('click', function () {
    reset();
});
