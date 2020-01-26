let colors = ['green', 'red', 'yellow', 'blue'],
    sequence = [],
    clickedSequence = [],
    randColor,
    begun = false,
    level = 0;

const next = () => {
    $('#level-title').text(`Level ${++level}`);
    clickedSequence = [];
    randColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randColor);
    $(`#${randColor}`).fadeOut(100).fadeIn(100);
    playSound(randColor);
}

const startOver = () => {
    level = 0;
    sequence = 0;
    begun = false;
}

const checkAns = (i) => {
    if (clickedSequence[i] === sequence[i]) {
        if (clickedSequence.length === sequence.length) setTimeout(() => {
            next();
        }, 1000);
    } else {
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)
        startOver();
    }
}

const playSound = (color) => {
    new Audio(`sounds/${color}.mp3`).play();
};

const animPress = (color) => {
    $(`#${color}`).addClass('pressed');
    setTimeout(() => {
        $(`#${color}`).removeClass('pressed');
    }, 100)
}

$('.btn').click((e) => {
    playSound(e.currentTarget.id);
    animPress(e.currentTarget.id);
    clickedSequence.push(e.currentTarget.id);
    checkAns(clickedSequence.length - 1);
});

$(document).on('keypress', () => {
    if (!begun) {
        begun = true;
        next();
    }
});