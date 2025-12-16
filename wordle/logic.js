let word_rows = document.querySelectorAll(".row");

let message_to_user = document.querySelector(".loading-logo");
let current_row_index = 0;
let current_letter_box = word_rows[current_row_index].children[0];

let row_text = "";
current_letter_box.style.borderWidth = "2px";
current_letter_box.style.borderColor = "#97a5b5ff";

WORD_LENGTH = 5;
let word = "";
getWordOfTheDay();

let colors_dictionary = {"green":"#63a088", "yellow":"#f9dc5c", "gray":"#465362"}
// let colors_dictionary = {"green":"#63a088", "yellow":"#db9d47", "gray":"#37505c"}

let flagFinished = false;

function isLetter(el){
  return /^[a-zA-Z]$/.test(el);
}


async function handleKeyBoardInput(event){
  const previous = current_letter_box;
  const key = event.key;
  if (!flagFinished){
    if (isLetter(key)){
      handleNewLetter(key);

    }else if (key=="Backspace" || key=="Delete"){
      deletePreviousLetter();
    }else if (key=="Enter" && row_text.length==WORD_LENGTH){
      message_to_user.textContent = "🌀";
      animateLoading(message_to_user);
      promise_valid = await isWordValid();

      if (promise_valid){
        message_to_user.textContent = " ";
        const colors = getCorrectLetters();
        markBoxesWithColors(colors);
        if (isRowCorrectWord()){
          message_to_user.textContent = "🎊 CORRECT WORD! 🎊";
          current_letter_box.style.borderColor = colors_dictionary["green"];
          current_letter_box.style.borderWidth = "";
          animateCorrectWord();
          flagFinished = true;
        }else{
          increaseRow();
        }
      }
      else{
        animateNotValidWord();
        message_to_user.textContent = "❌ Not a valid word ❌";
      }
    }
    updateWord();
  }
  if (!flagFinished){
    previous.style.borderWidth = "";
    previous.style.borderColor = "";
    current_letter_box.style.borderWidth = "2px";
    current_letter_box.style.borderColor = "#97a5b5ff";
  }
}

function animateLoading(element){
  element.classList.add("rotate");
  element.addEventListener("animationend", function(){
    this.classList.remove("rotate");
  });

}
function animateNotValidWord() {
  word_rows[current_row_index].classList.add("shake");
  word_rows[current_row_index].addEventListener("animationend", function(){
    this.classList.remove("shake");
  }, {once:true});
}
function animateCorrectWord(){
  const boxes = word_rows[current_row_index].querySelectorAll(".input");
  boxes.forEach((box, index) => {
    box.classList.add("animate");
    box.style.animation = `zoom-in 1s ease 1`;
    box.style.animationDelay = `${index*.1}s`;
  });
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
