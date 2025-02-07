let gameSeq = [];
let userSeq = [];
let btns = ['red', 'green', 'yellow', 'purple'];
let started = false;
let level = 0;

document.addEventListener('keypress', startGame);
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
    if (!started) {
        started = true;
        levelUp();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    document.querySelector('h2').innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(randColor);

    gameSeq.push(randColor);
    flash(randBtn);
}

function flash(btn) {
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 200);
}

function btnPress() {
    let btn = this;
    let userColor = btn.id;
    userSeq.push(userColor);
    flash(btn);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.querySelector('h2').innerHTML = `Game Over! Score: <b>${level}</b><br>Press any key or button to restart`;
        document.body.style.backgroundColor = 'red';
        setTimeout(() => document.body.style.backgroundColor = 'white', 200);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', btnPress));
