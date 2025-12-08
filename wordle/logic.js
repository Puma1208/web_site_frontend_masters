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
  key = event.key;
  if (isLetter(key)){
    next_letter_box.textContent = key.toUpperCase();
    console.log(next_letter_box.nextElementSibling);
    updateNextLetterBox();
  }
  if (key)
})

function updateNextLetterBox(){
  // 1.
  // console.log("🤖", letter_boxes.length);
  // if (next_letter_box.nextElementSibling==null){
  //   current_row += 1;
  //   next_letter_box = letter_boxes[current_row];
  // }
  // else{
  //   next_letter_box = next_letter_box.nextElementSibling;
  // }

  // 2.
  if (next_letter_box.nextElementSibling==null){
    current_row += 1;
    next_word_row = word_rows[current_row];
    next_letter_box = next_word_row.children[0];

  }else{
    next_letter_box = next_letter_box.nextElementSibling;
  }
}