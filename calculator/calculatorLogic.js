let screenCalculation = document.querySelector(".focus")


let numberButtons = document.querySelectorAll(".number");
for(let i=0; i<numberButtons.length; i++){
    button = numberButtons[i];
    numberButtons[i].addEventListener("mouseover", function(){
        numberButtons[i].style.backgroundColor='rgba(230, 230, 230, 1)';
    })
    numberButtons[i].addEventListener("mousedown", function(){
        numberButtons[i].style.backgroundColor = 'rgba(194, 194, 194, 1)';
        if (screenCalculation.textContent=="0"){
            screenCalculation.textContent = ""
        }
        screenCalculation.append(numberButtons[i].textContent);
    })
    numberButtons[i].addEventListener("mouseup", function(){
        numberButtons[i].style.backgroundColor = '';
    })
    numberButtons[i].addEventListener("mouseout", function(){
        numberButtons[i].style.backgroundColor='';
    })
}


let delButtons = document.querySelectorAll(".del-operation");
for(let i=0; i<delButtons.length; i++){
    button = delButtons[i];
    delButtons[i].addEventListener("mouseover", function(){
        delButtons[i].style.backgroundColor='rgba(116, 167, 248, 1)';
    })
    delButtons[i].addEventListener("mousedown", function(){
        delButtons[i].style.backgroundColor = 'rgba(82, 106, 242, 1)';
        if (screenCalculation.textContent=="0"){
            screenCalculation.textContent = "0";
        }
        else{
            if (delButtons[i].textContent=='C'){
                screenCalculation.textContent = "0";
            }
            else if(delButtons[i].textContent=="←"){
                if (screenCalculation.textContent.length==1){
                    screenCalculation.textContent = "0";
                }else{
                    screenCalculation.textContent = screenCalculation.textContent.substring(0, screenCalculation.textContent.length-1);
                }
            }
        }
    })
    delButtons[i].addEventListener("mouseup", function(){
        delButtons[i].style.backgroundColor = '';
    })
    delButtons[i].addEventListener("mouseout", function(){
        delButtons[i].style.backgroundColor='';
    })
}


let operationButtons = document.querySelectorAll(".operation");
for(let i=0; i<operationButtons.length; i++){
    button = operationButtons[i];
    operationButtons[i].addEventListener("mouseover", function(){
        operationButtons[i].style.backgroundColor='rgba(255, 166, 57, 1)';
    })
    operationButtons[i].addEventListener("mousedown", function(){
        operationButtons[i].style.backgroundColor = 'rgba(194, 94, 1, 1)';
        if (screenCalculation.textContent=="0"){
            screenCalculation.textContent = ""
        }
        screenCalculation.textContent.
        // screenCalculation.append(operationButtons[i].textContent);
    })
    operationButtons[i].addEventListener("mouseup", function(){
        operationButtons[i].style.backgroundColor = '';
    })
    operationButtons[i].addEventListener("mouseout", function(){
        operationButtons[i].style.backgroundColor='';
    })
}
// calculationDetails.textContent = computation;

const COMPUTATIONS = ["+", "-", "x", "÷"]
function getComputationResult(computationString){

    let result = 0;
    let currentDigits = "";
    let currentOperation = "";

    for(let i=0; i<computationString.length;i++){
        if (COMPUTATIONS.includes(computationString[i]) || i == computationString.length-1){
            if (currentOperation){
                if (i==computationString.length-1){
                    currentDigits += computationString[i];
                }
                if (currentOperation=="+"){
                    result += Number(currentDigits);
                }
                else if(currentOperation=="-"){
                    result -= Number(currentDigits);
                }
                else if (currentOperation=="x"){
                    result *= Number(currentDigits);
                }
                else if (currentOperation=="÷"){
                    result /= Number(currentDigits);
                }
                else{
                    return "ERROR: the current operation " + currentOperation + " is not a legal operation.";
                }
                currentDigits = "";
                currentOperation = "";
            }
        }
        else{
            currentDigits += computationString[i];
        }
    }
    return result
}