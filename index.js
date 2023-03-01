const cfonts = require('cfonts');
const start = require('./helpers/startInquirer');

function welcomeMessage(){
    cfonts.say('Employee|Manager', {
        font: 'block',
        align: 'left',
        colors: ['system'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
    });
}

function init(){
    welcomeMessage();
    start();
}

init();