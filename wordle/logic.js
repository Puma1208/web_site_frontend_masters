let letter_boxes = document.querySelectorAll(".input");
let word_rows = document.querySelectorAll(".row");

let current_row_index = 0;
let next_letter_box = word_rows[current_row_index].children[0];

let row_text = "";

const word = "aword".toUpperCase();

function isLetter(el){
    return /^[a-zA-Z]$/.test(el);
}

document.addEventListener('keydown', function(event){
  handleKeyBoardInput(event);
})

function handleKeyBoardInput(event){
  const key = event.key;

  if (isLetter(key)){
    handleNewLetter(key);

  }else if (key=="Backspace" || key=="Delete"){
    deletePreviousLetter();
  }

}


function handleNewLetter(letter){
  updateTrackingVariable(letter);
  updatePointer();

}

function updateTrackingVariable(letter){
  letter = letter.toUpperCase();
  next_letter_box.textContent = letter
  row_text += letter;
}

function updatePointer(){
  if (next_letter_box.nextElementSibling==null){
    if (isRowCorrectWord()){
    console.log("🌋 YEAY! 🌋")
  }
    current_row_index += 1;
    next_letter_box = word_rows[current_row_index].children[0];
    row_text = "";
  }else{
    next_letter_box = next_letter_box.nextElementSibling;
  }
}

function deletePreviousLetter(){
  if (next_letter_box.previousElementSibling != null ){
    current = next_letter_box.previousElementSibling;
    row_text = row_text.slice(0, -1);
    if (current.previousElementSibling){
      next_letter_box.previousElementSibling.textContent = "";
      next_letter_box = next_letter_box.previousElementSibling;
    }else{
      current.textContent = "";
      next_letter_box = current;
    }
  }
}

function isRowCorrectWord(){
  return (row_text == word);
}