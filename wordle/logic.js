let letter_boxes = document.querySelectorAll(".input");
let word_rows = document.querySelectorAll(".row");
let current_row = 0;
let next_word_row = word_rows[current_row];
let next_letter_box = next_word_row.children[0];


let stack_row = [];

function isLetter(el){
    return /^[a-zA-Z]$/.test(el);
}

document.addEventListener('keydown', function(event){
  const key = event.key;
  if (isLetter(key)){
    next_letter_box.textContent = key.toUpperCase();
    updateNextLetterBox();
  }else if (key=="Backspace" || key=="Delete"){
    deletePreviousLetter();
  }
})

function deletePreviousLetter(){
  if (next_letter_box.previousElementSibling != null ){
    current = next_letter_box.previousElementSibling;
    if (current.previousElementSibling){
      next_letter_box.previousElementSibling.textContent = "";
      next_letter_box = next_letter_box.previousElementSibling;
    }else{
      current.textContent = "";
      next_letter_box = current;
    }
  }
}

function updateNextLetterBox(){
  if (next_letter_box.nextElementSibling==null){
    current_row += 1;
    next_word_row = word_rows[current_row];
    next_letter_box = next_word_row.children[0];

  }else{
    next_letter_box = next_letter_box.nextElementSibling;
  }
}