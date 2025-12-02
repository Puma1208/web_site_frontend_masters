let screenCalculation = document.querySelector(".focus")

let currentResult = "";
let operation = "";
let equals = false;

let numberButtons = document.querySelectorAll(".number");
for(let i=0; i<numberButtons.length; i++){
    numberButtons[i].addEventListener("mouseover", function(){
        numberButtons[i].style.backgroundColor='rgba(230, 230, 230, 1)';
    })
    numberButtons[i].addEventListener("mousedown", function(){
        numberButtons[i].style.backgroundColor = 'rgba(194, 194, 194, 1)';
        if (screenCalculation.textContent=="0"){
            screenCalculation.textContent = "";
        }
        if (operation){
            if (currentResult){
                screenCalculation.append(numberButtons[i].textContent);
            }else{
                currentResult = screenCalculation.textContent;
                screenCalculation.textContent = numberButtons[i].textContent;
            }
        }else{
            screenCalculation.append(numberButtons[i].textContent);
        }
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
    delButtons[i].addEventListener("mouseover", function(){
        delButtons[i].style.backgroundColor='rgba(116, 167, 248, 1)';
    })
    delButtons[i].addEventListener("mousedown", function(){
        delButtons[i].style.backgroundColor = 'rgba(82, 106, 242, 1)';
        if (screenCalculation.textContent!="0"){
            if (delButtons[i].textContent=='C'){
                screenCalculation.textContent = "0";
                operation = "";
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
    operationButtons[i].addEventListener("mouseover", function(){
        operationButtons[i].style.backgroundColor='rgba(255, 166, 57, 1)';
    })
    operationButtons[i].addEventListener("mousedown", function(){
        operationButtons[i].style.backgroundColor = 'rgba(194, 94, 1, 1)';
        if (currentResult){
            let result = getComputationResult(currentResult, screenCalculation.textContent, operation);
            screenCalculation.textContent = result.toString();
            currentResult = "";
            if (operationButtons[i].textContent == "="){
                operation = "";
            }
        }
        operation = operationButtons[i].textContent;
    })
    operationButtons[i].addEventListener("mouseup", function(){
        operationButtons[i].style.backgroundColor = '';
    })
    operationButtons[i].addEventListener("mouseout", function(){
        operationButtons[i].style.backgroundColor='';
    })
}

const COMPUTATIONS = ["+", "-", "x", "÷"]
function getComputationResult(digits1, digits2, operation){
    switch (operation){
        case "+":
            return Number(digits1) + Number(digits2);
        case "-":
            return Number(digits1) - Number(digits2);
        case "x":
            return Number(digits1) * Number(digits2);
        case "÷":
            return Number(digits1) / Number(digits2);
    }
    return "ERROR: the current operation " + operation + " is not a legal operation.";

}
