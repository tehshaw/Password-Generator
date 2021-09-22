// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


function generatePassword(){
  var promptText =["Please enter a password length:", "Do you want lowercase letters?", "Do you want uppercase letters?",
                    "Do you want numbers?", "Do you want special characters?" ];

  var promptAnswers = [];     

  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  var lowerCasedCharacters = [  'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h',  'i',  'j',  'k',  'l',  'm',  'n',
    'o',  'p',  'q',  'r',  's',  't',  'u',  'v',  'w',  'x',  'y',  'z'];

  var upperCasedCharacters = [  'A',   'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  
  'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z'];

  var specialCharaters = [  '@',  '%',  '+',  '\\',  '/',  "'",  '!',  '#',  '$',  '^',  '?',  ':',  ',',  ')',
    '(',  '}',  '{',  ']',  '[',  '~',  '-',  '_',  '.'];

  var allChars = ["Start"];
  allChars.push(lowerCasedCharacters, upperCasedCharacters, numericCharacters, specialCharaters);

  var validChars = [];

  var keepGoing = false;
  var question = 0;
  var answer;

  var password = "";

  do {   

    if(question == 0){
      answer = prompt(promptText[question]);
      if(!isNaN(answer) && answer >= 8 && answer <= 128){
        promptAnswers[question] = Math.trunc(answer); 
        keepGoing = true;
        question++;
      }
      else{
        keepGoing = false;
        alert("Please enter a valid length");
      }
    }
    else{
      answer = confirm(promptText[question])
      if (answer){
        validChars = validChars.concat(allChars[question]);
        promptAnswers[question] = answer; 
       }
       else{
        promptAnswers[question] = answer; 
       } 
      question++;
    }

    if (question > promptText.length-1) {
        keepGoing = false;
    }
    
    
  } while (keepGoing);

  var max = validChars.length-1;

  for(let x = 0; x < promptAnswers[0]; x++){
    password += validChars[random(0,max)];
  } 
  
  console.log(promptAnswers);
  console.log(validChars);
  return password;

}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
