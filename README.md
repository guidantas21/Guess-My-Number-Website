# Guess My Number Website Version 1.0

## Overview

1. The project
    This projct is a simple game that runs on the browser, in which the player is supposed to guess a secret number from 1 to x (usually x is 200). As the player tries to guess the number, he receives feedback if the guess is higher or lower than the secret number, and also the player can get some help on his last try, that will give some hints about the secret number.

2. Technology
    Basically [HTML & CSS](https://www.w3.org/standards/webdesign/htmlcss) with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and basic [Document Object Model (DOM)](https://www.freecodecamp.org/news/javascript-dom-manipulation/#:~:text=In%20website%20development%2C%20DOM%20stands,very%20common%20in%20web%20development.). For the HTML & CSS part I was able to implement grid and flex layouts as well create reusable classes and classes that will interact with JavaSrcipt in order to change the atributes and styling of its element. This way, DOM manipulation is a handy way to implement these interactions. 

4. More about
    - TODO

## How to install and run

1. HTML, CSS and JavaScript are pre-installed if you have a browser (Chrome, Mozilla, Safari, Opera...)

2. Clone the git repository
    - Cmd: `git clone https://github.com/guidantas21/Guess-My-Number-Website.git`

3. On the repository open the index.html file with the browser

## How to play

- Guess the secret number:
    Input a number, if your guess is not correct the game will give you a hint if your number is too high or too low. To win, you have to guess the secret number.

- Score:
    Everytime you make a wrong guess your score decreases by 1, if it reaches 0 it's gameover. So to get a nice score, guess the secret number in as few attempts as possible.

- Highscore:
    Your highscore is stored in the browser memory, so if you refresh the page it goes back to 0.

- Help:
    If your score equals 1, your last attempt to guess the secret number, you can press the button "Help", which will display a modal with some pretty handy hints about the secret number, so you can make a better last attempt.

## References

- The Complete JavaScript Course 2023: From Zero to Expert!
>https://www.udemy.com/course/the-complete-javascript-course/

- Build Responsive Real-World Websites with HTML and CSS
> https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/


