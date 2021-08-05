//To find age and days
function ageInDays(){
    let birthYear= prompt('Your birth Year');
    let ageInDays = ((2021-birthYear)*365);
    let h1= document.createElement('h1');
    let textAnswer = document.createTextNode('You are '+ ageInDays + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//generate Dog
function generateDog(){
    let image = document.createElement('img');
    let div =document.getElementById('flex-dog-gen');
    image.src= "https://cdn2.thedogapi.com/images/ByUgoQiE7.gif";
    div.appendChild(image);
}
//rock scissors and paper game

function rpsGame(yourChoice){
   console.log(yourChoice);
   var humanChoice, botChoice;
   humanChoice=yourChoice.id;
   botChoice= numberToChoice(randToRpsInt()); 
   console.log('Computer choice:', botChoice);
   results=decideWinner(humanChoice, botChoice); //bot won
   console.log(results);
   message = finalMessage(results);  // {'message: 'you won!', 'color':'green'}
   console.log(message);
   rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return['rock','paper','scissor'][number]
}

function decideWinner(yourChoice, computerChoice){
    let rpsDatabase={
        'rock': {'scissor':1, 'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissor':0},
        'scissor': {'paper':1, 'scissor':0.5, 'rock':0},

        
    }
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[yourChoice][computerChoice];

    return [yourScore, computerScore];

}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message': 'You Lose', 'color':'red'};
    }
    else if(yourScore === 0.5){
        return {'message': 'You Tied', 'color':'pink'};
    }
    else{
        return {'message': 'You Won', 'color':'blue'};
    }
    

}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    let imagesDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,

    }
    //removing all image
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height =150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML= "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height =150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);



}

//4: change color button
let all_buttons = document.getElementsByTagName('button');

let copyAllButtons=[]; //copy all button to know the previous color
for (let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]); //
}

console.log(copyAllButtons);
function buttonColorChange(buttonThing){
    if (buttonThing.value ==='red'){
        buttonsRed();
    }
    else if (buttonThing.value ==='green'){
        buttonsGreen();
    }
    else if (buttonThing.value ==='reset'){
        buttonColorReset();
    }
    else if (buttonThing.value ==='random'){
        randomColors();
    }
}

function buttonsRed(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
        //all_buttons[i].classList.add('btn-success');
    }
}


function randomColors(){
    let choices = ['primary', 'btn-danger', 'btn-success', 'btn-warning']

    for(let i=0; i<all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }

}

//blackjack

let blackjackGame ={
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2, '3':3, '4':4,'5':5,'6':6, '7':7, '8':8, '9':9, '10':10, 'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins': 0,
    'looses':0,
    'draws':0,
    'isStand': false,
    'turnsOver':false,

};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

//checked
function blackjackHit(){
    if(blackjackGame['isStand']===false){
    let card= randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
   
    }

}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
    
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true){

    blackjackGame['isStand']= false;
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    for(i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score']= 0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

    document.querySelector('#blackjack-result').textContent= "Lets Play";
    document.querySelector('#blackjack-result').style.color= 'black';

    blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer){
    if (card === 'A'){
    //if 11 make the score< 21add 11 else put 1
    if(activePlayer['score']+ blackjackGame['cardsMap'][card][1]<=21){
        activePlayer['score'] +=blackjackGame['cardsMap'][card][1];

    }else{
        activePlayer['score'] +=blackjackGame['cardsMap'][card][0];
    }
    }else{
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms)); 
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while(DEALER ['score' < 16] && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

//winner and retur who just won
//updating status
function computeWinner(){
    let winner;
    if (YOU['score'] <= 21){
        if (YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner = YOU;
        }else if (YOU['score']< DEALER['score']){
            blackjackGame['looses']++;
            winner = DEALER;


        } else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
        // condition when user bust not dealer
    }else if(YOU['score']>21 && DEALER['score'] <=21){
        blackjackGame['looses']++;
        winner= DEALER;
    }
    else if (YOU ['score'] >21 && DEALER['score']>21){
        blackjackGame['draws']++;

    }
    console.log(blackjackGame);
    return winner;
}
//checked already
function showResult(winner){
    let message, messageColor;

    if(blackjackGame ['turnsOver'] === true){

    

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message= 'You won';
            messageColor = 'green';
            winSound.play();
        
        }else if(winner === DEALER){
            document.querySelector('#looses').textContent = blackjackGame['looses'];
            message = 'You lost';
            messageColor = 'red';
            lossSound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message ='You drew';
            messageColor= 'black';
        }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

