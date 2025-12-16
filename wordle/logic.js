let word_rows = document.querySelectorAll(".row");
let current_row_index = 0;
let current_letter_box = word_rows[current_row_index].children[0];

let row_text = "";

WORD_LENGTH = 5;
let word = "";
getWordOfTheDay();


let flagFinished = false;

function isLetter(el){
  return /^[a-zA-Z]$/.test(el);
}


async function handleKeyBoardInput(event){
  const key = event.key;
  if (!flagFinished){
    if (isLetter(key)){
      handleNewLetter(key);

    }else if (key=="Backspace" || key=="Delete"){
      deletePreviousLetter();
    }else if (key=="Enter" && row_text.length==WORD_LENGTH){
      promise_valid = await isWordValid();

      if (promise_valid){
        if (isRowCorrectWord()){
          flagFinished = true;
        }else{
          increaseRow();
        }
      }
    }
    updateWord();
  }
  }
}


function handleNewLetter(letter){
  addLetterToBox(letter);
  increasePointer();
}
function deletePreviousLetter(){
  decreasePointer();
  deleteLetterFromBox();

}


function addLetterToBox(letter){
  if (current_letter_box.textContent == ""){
    current_letter_box.textContent = letter.toUpperCase();
  }
}
function increasePointer(){

  let current_row_index = 0;
  if (current_letter_box.nextElementSibling==null){
    if (current_row_index>=word_rows.length-1){
      flagFinished = true;
    }
  }
  else{
    current_letter_box = current_letter_box.nextElementSibling
  }
}

function increaseRow(){
  current_row_index += 1
  current_letter_box = word_rows[current_row_index].children[0];
}
function deleteLetterFromBox(){
  current_letter_box.textContent = "";
}
function decreasePointer(){
  if (current_letter_box.previousElementSibling!=null){
    if (current_letter_box.nextElementSibling==null){
      // This is the last cell of the row -> check if there is a letter or not to delete
      if (current_letter_box.textContent==""){
        current_letter_box = current_letter_box.previousElementSibling;
      }
    }else{
      current_letter_box = current_letter_box.previousElementSibling;
    }
  }
}

function updateWord(){
  current_cell = word_rows[current_row_index].children[0];
  input_letters = "";
  while (current_cell !== current_letter_box){
    input_letters += current_cell.textContent;
    current_cell = current_cell.nextElementSibling;
  }
  input_letters += current_cell.textContent;
  row_text = input_letters;
}

function isRowCorrectWord(){
  return (row_text == word);
}

function getCorrectLetters(){
  let colors = [];
  // https://stackoverflow.com/a/31733628
  let copy_correct_word = (' ' + word).slice(1);

  // First pass - only tagging green
  for (let i=0; i<WORD_LENGTH; i++){
    if (row_text[i]==word[i]){
      colors[i] = "green";
      copy_correct_word = copy_correct_word.replace(word[i], "");
    }
  }

  // Second pass - tag the rest
  for (let i=0; i<WORD_LENGTH; i++){
    let letter = row_text[i];
    if (colors[i]!='green'){

      if (copy_correct_word.includes(letter)){
          colors[i] = "yellow";
          copy_correct_word = copy_correct_word.replace(letter, "");
      }
      else
      {
        colors[i] = "gray";
      }
    }
  }
  return colors;
}

function markBoxesWithColors(colors){
  let letter_boxes = word_rows[current_row_index].children
  for (let i=0;i<WORD_LENGTH;i++){
    const current_color = colors[i];
    letter_boxes[i].style.backgroundColor = colors_dictionary[current_color];
    letter_boxes[i].style.borderColor = colors_dictionary[current_color];
    letter_boxes[i].style.color = "white";
  }
}

async function getWordOfTheDay(){
  const word_url = "https://words.dev-apis.com/word-of-the-day";
  const promise = await fetch(word_url);
  const processResponse = await promise.json();
  word = processResponse.word.toUpperCase();
}

async function isWordValid(){
  const check_valid_word_url = "https://words.dev-apis.com/validate-word"
  const check_word = {"word":row_text}
  const response = await fetch(check_valid_word_url, {
    method:"POST",
    body: JSON.stringify(check_word)
  });


  const promise_valid = await response.json();
  return promise_valid.validWord;
}
document.addEventListener('keydown', async function(event){
  handleKeyBoardInput(event);
})
