// Will only run code once the page is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Array that hold the four integers
    var numbs = [4];  

    // Variables the track the user's wins, losses, and current goal number
    var game_wins = 0;
    var game_loss = 0;
    var goal = 0;

    // What current operation number they are on (1-3)
    var numberOperation = 0;

    // This variable tracks the first number the user presses in an operation
    var currNumb_1 = 0;

    /* These variables track the operand the user selects in the current operation.
       Stores the numeric value (1-3) and the symbol (+,-,*) */
    var curr_Operand = 0;
    var currOperandSymbol;

    // This variable tracks the second number the user presses in an operation
    var currNumb_2 = 0;

    /* The variables below are assigned to the elements on the HTML page. The variables will be used
       to change the text being displayed by the element during the game. */
    
    // Text above 'play again' button
    const gameStatus = document.getElementById('gameStatus');

    // Main game buttons (1-4)  
    const numb1 = document.getElementById('numb1');
    const numb2 = document.getElementById('numb2');
    const numb3 = document.getElementById('numb3');
    const numb4 = document.getElementById('numb4');

    // Different sections in the work area text box
    const firstOperation = document.getElementById('firstOperation');
    const secondOperation = document.getElementById('secondOperation');
    const thirdOperation = document.getElementById('thirdOperation');

    // Displays the current number of wins and losses 
    const wins = document.getElementById('wins');
    const loss = document.getElementById('loss');

    /* This function randomlyassigns the starting four numbers for the game
       when a new game is started. */
    function assignNumbers() {
        // Assigns four numbers
        for (let i = 0; i < 4; i++) {
            var prev_choosen = 0;
            // While loop to ensure the same number isn't choosen twice
            while (prev_choosen < 1) {
                // Randomly picks a number 1-10
                numbs[i] = Math.floor(Math.random() * 10) + 1;
                for (let j = 0; j < 4; j++) {
                    if (j != i) {
                        // If any of the numbers match, choose another
                        if (numbs[i] == numbs[j]) 
                            prev_choosen = -1;
                    }
                }
                // Loop is broken if a unique number is choosen
                if (prev_choosen != -1)
                    prev_choosen = 1;
                else
                    prev_choosen = 0;
            }
        }

        // Displays the numbers on their respective 
        numb1.textContent = numbs[0];
        numb2.textContent = numbs[1];
        numb3.textContent = numbs[2];
        numb4.textContent = numbs[3];
    }

    /* Generates the numeric goal for the user to reach through arithmetic operations.
       Randomly chooses two random numbers and a random operation three seperate times, 
       then sets the goal. */
    function generateGoal() {
        // Copies over the current numbers (stored in the numbs[] array)
        var numbs_Goal = [];
        for (let i = 0; i < 4; i++) {
            numbs_Goal[i] = numbs[i];
        }

        // Variables for generating two random indexes  
        var randIdx1;
        var randIdx2;

        const randOperation = [];

        var work = 0;

        // Chooses the three random operations and stores them in an array
        for (let i = 1; i < 4; i++)
            randOperation[i] = Math.floor(Math.random() * 3) + 1;

        // Chooses the random indexes three times for the three operations
        for (let i = 1; i < 4; i++) {
            var selectedNew = 0;
            // Selects the first random index 
            while (selectedNew == 0) {
                randIdx1 = Math.floor(Math.random() * 4);
                if (numbs_Goal[randIdx1] != 0)
                    // Will break the loop if the random index does not return 0
                    selectedNew = 1;
            }

            selectedNew = 0;
            // Selects the second random index
            while (selectedNew == 0) {
                randIdx2 = Math.floor(Math.random() * 4);
                if (numbs_Goal[randIdx2] != 0 && numbs_Goal[randIdx2] != numbs_Goal[randIdx1])
                    /* Will break the loop if the random index does not return 0 and is not the same
                       as the index choosen above*/
                    selectedNew = 1;
            }

            // Performs the specific operation depending on what operand was choosen above
            work = numbs_Goal[randIdx1];
            if (randOperation[i] == 1)
                work += numbs_Goal[randIdx2];
            else if (randOperation[i] == 2)
                work -= numbs_Goal[randIdx2];
            else if (randOperation[i] == 3)
                work *= numbs_Goal[randIdx2];

            // Per how the game works, first index value is set to 0, the second is set equal to the work done
            numbs_Goal[randIdx1] = 0;
            numbs_Goal[randIdx2] = work;
        }

        // Goal variable is set equivalent to the operations done above, and the text is updated
        goal = work;
        const goalText = document.getElementById('goalText');
        goalText.textContent = goal;
    }  

    /* Function that is called when a new game is to be started. Variables are initalized and
       the respective functions are called. 
    */
    function newGame() {
        // Initalizes the variables back to default values
        numbs = [4];    
        goal = 0;

        numberOperation = 0;

        currNumb_1 = 0;

        curr_Operand = 0;
        currOperandSymbol;

        currNumb_2 = 0;
        
        // If game was previously played, the buttons are reenabled
        numb1.disabled = false;
        numb2.disabled = false;
        numb3.disabled = false;
        numb4.disabled = false;

        // Calls the respective setup functions
        assignNumbers();
        generateGoal();

        // Updates the win/loss tracker 
        wins.textContent = game_wins;
        loss.textContent = game_loss;

        // Clears the work board
        firstOperation.textContent = "";
        secondOperation.textContent = "";
        thirdOperation.textContent = "";

        // Updates the game status text 
        gameStatus.textContent = "Let's Play!";
    }

    /* This function is called to disable a certain button and clear the text after
       the user selects it (per demo)
    */
    function disableButton(buttonNum) {
        // Disables the given button and clears the text as needed
        if (buttonNum == 0) {
            numb1.textContent = "";
            numb1.disabled = true;
        } else if (buttonNum == 1) {
            numb2.textContent = "";
            numb2.disabled = true;
        } else if (buttonNum == 2) {
            numb3.textContent = "";
            numb3.disabled = true;
        } else if (buttonNum == 3) {
            numb4.textContent = "";
            numb4.disabled = true;
        }
    }

    /* This function performs the arithmetic operation as the user entered and returns
       the result to be displayed.
    */
    function getResult() {
        // Adds
        if (curr_Operand == 1)
            return (currNumb_1 + currNumb_2)
        // Subtracts
        else if (curr_Operand == 2)
            return (currNumb_1 - currNumb_2)
        // Multiplies 
        else if (curr_Operand == 3)
            return (currNumb_1 * currNumb_2)
    }

    /* This function is called when the game concludes to check if the user won. If the goal matches
       the output, the user wins! The win counter increases. Otherwise, the user looses, and the loss
       count increases. Either way, the gameStatus text changes to the respective outcome. 
    */
    function checkWin(result) {
        // The user won! 
        if (result == goal) {
            gameStatus.textContent = "You won! Congrats!";
            game_wins++;
            wins.textContent = game_wins;
        // The user lost. 
        } else {
            gameStatus.textContent = "Game Over! Better luck next time.";
            game_loss++;
            loss.textContent = game_loss;
        }
    }

    /* This function is called when one of the four numbers is pressed. This function handles much of 
       the game architecture.
    */
    function numbPressed(buttonNum) {
        // If the first number has not been selected yet:
        if (currNumb_1 == 0) {
            // Assigns the first number
            currNumb_1 = numbs[buttonNum];
            // Changes the game text to insturct the user to choose an operator
            gameStatus.textContent = "Select an operator";
            numberOperation++; 
            // Disables that button (can't be used in the future)
            disableButton(buttonNum);
        // If the second number has not been selected yet BUT the operand has:
        } else if (currNumb_2 == 0 && curr_Operand != 0) {
            // Assigns the second number
            currNumb_2 = numbs[buttonNum]
            // Gets the result of the arithmetic operation
            var result = getResult();
            
            // Displays the text at different levels depending on how many equations have been created yet
            if (numberOperation == 1)
                firstOperation.textContent = currNumb_1 + " " + currOperandSymbol + " " + currNumb_2 + " = " + result;
            else if (numberOperation == 2)
                secondOperation.textContent = currNumb_1 + " " + currOperandSymbol + " " + currNumb_2 + " = " + result;
            else if (numberOperation == 3)
                thirdOperation.textContent = currNumb_1 + " " + currOperandSymbol + " " + currNumb_2 + " = " + result;

            // Assigns the result to that given button, updates the text on the button and in the array
            if (buttonNum == 0) {
                numb1.textContent = result;
                numbs[0] = result;
            } else if (buttonNum == 1) {
                numb2.textContent = result;
                numbs[1] = result;
            } else if (buttonNum == 2) {
                numb3.textContent = result;
                numbs[2] = result;
            } else if (buttonNum == 3) {
                numb4.textContent = result;
                numbs[3] = result;
            }

            // Resets the current number / operand tracker variables to 0
            currNumb_1 = 0;
            curr_Operand = 0;
            currNumb_2 = 0;

            // If three equations have been created, the code checks if the user won
            if (numberOperation == 3)
                checkWin(result);
        }
    }

    /* This function is called when the user presses an operand. It will update the operandSymbol
       variable to be used later to display in the work area. 
    */
    function operandPressed(operandNum) {
        // Displays the operand symbol depending on which button is pressed 
        if (curr_Operand == 0) {
            curr_Operand = operandNum;
            if (operandNum == 1) 
                currOperandSymbol = "+";
            else if (operandNum == 2)
                currOperandSymbol = "-"; 
            else if (operandNum == 3) 
                currOperandSymbol = "*";
        }
        // Updates the gameStatus text
        gameStatus.textContent = "Select a number";
    }

    // Starts a new game once the page loads
    newGame();


    /* Event listeners. These will call a given function if a specific button
       is pressed.
    */

    // Calls the newGame function when the newGame button is pressed 
    document.getElementById('newGame').addEventListener('click', function() {
        newGame();
    });

    // Calls the numbPressed(0-3) function when one of the main buttons is pressed
    document.getElementById('numb1').addEventListener('click', function() {
        numbPressed(0);
    });
    document.getElementById('numb2').addEventListener('click', function() {
        numbPressed(1);
    });
    document.getElementById('numb3').addEventListener('click', function() {
        numbPressed(2);
    });
    document.getElementById('numb4').addEventListener('click', function() {
        numbPressed(3);
    });

    // Calls the operandPressed(1-3) function when one of the operand buttons is pressed
    document.getElementById('calcadd').addEventListener('click', function() {
        operandPressed(1);
    });
    document.getElementById('calcsub').addEventListener('click', function() {
        operandPressed(2);
    });
    document.getElementById('calcmult').addEventListener('click', function() {
        operandPressed(3);
    });
});