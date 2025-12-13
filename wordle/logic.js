let word_rows = document.querySelectorAll(".row");
let current_row_index = 0;
let next_letter_box = word_rows[current_row_index].children[0];

let row_text = "";

WORD_LENGTH = 5;
// const word = "magic".toUpperCase();

let word = "";
getWordOfTheDay();


let flagFinished = false;

function isLetter(el){
  return /^[a-zA-Z]$/.test(el);
}

document.addEventListener('keydown', function(event){
  handleKeyBoardInput(event);
})

function handleKeyBoardInput(event){
  const key = event.key;
  if (!flagFinished){
    if (isLetter(key)){
      handleNewLetter(key);

    }else if (key=="Backspace" || key=="Delete"){
      deletePreviousLetter();
    }
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
    isWordValid();
    const colors = getCorrectLetters();
    markBoxesWithColors(colors);
    if (isRowCorrectWord()){
      flagFinished = true;
    }
    if (current_row_index==word_rows.length-1){
      flagFinished = true;
    }
    else{
      current_row_index += 1;
      next_letter_box = word_rows[current_row_index].children[0];
      row_text = "";
    }
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

function getCorrectLetters(){
  let colors = [];
  // https://stackoverflow.com/a/31733628
  let copy_correct_word = (' ' + word).slice(1);

  // First pass - only tagging green
  for (let i=0; i<WORD_LENGTH; i++){
    if (row_text[i]==word[i]){
      console.log("ROW LETTER ", row_text[i]);
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
  const word_url = "https://words.dev-apis.com/word-of-the-day/";
  const promise = await fetch(word_url);
  const processResponse = await promise.json();
  word = processResponse.word.toUpperCase();
}

async function isWordValid(){
  const check_valid_word_url = "https://words.dev-apis.com/validate-word"
  const check_word = {"word":row_text}
  const response = await fetch(check_valid_word_url, {
    method:"POST",
    // body:check_word
    body: JSON.stringify({word:row_text}),
  });
  console.log("response:", response)
}