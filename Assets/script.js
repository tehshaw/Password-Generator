// Assignment Code (code provided with project)
var generateBtn = document.querySelector("#generate");

// Write password to the #password input (code provided with project)
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button (code provided with project)
generateBtn.addEventListener("click", writePassword);


//my code below
function generatePassword(){

  // Array to store input from all the prompts for reference.
  var promptAnswers = [];     


  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  var lowerCasedCharacters = [  'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h',  'i',  'j',  'k',  'l',  'm',  'n',
    'o',  'p',  'q',  'r',  's',  't',  'u',  'v',  'w',  'x',  'y',  'z'];

  var upperCasedCharacters = [  'A',   'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  
  'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z'];

  var specialCharaters = [  '@',  '%',  '+',  '\\',  '/',  "'",  '!',  '#',  '$',  '^',  '?',  ':',  ',',  ')',
    '(',  '}',  '{',  ']',  '[',  '~',  '-',  '_',  '.'];

  //array to hold all chars able to be used in their original array (see above) for furtre use.
  //place "Start" in index 0 to line up the char arrays with the questions array.
  //question 1 (index 0) asks for the len of the password, this does not line up with a char set
  //starting with question 2 (index 1) will match up with the char array stored here
  //so index 1 in the allChars array will match the question in prompText index 1 (lowercase char option) 
  var allChars = ["Start"];
  allChars.push(lowerCasedCharacters, upperCasedCharacters, numericCharacters, specialCharaters);


  //store all prompts in arary to easily access or change, will be called from the array when the prompt/confirm is called
  var promptText =["Please enter a password length: \n(Length must be between 8 and 128)", "Do you want lowercase letters?", "Do you want uppercase letters?",
  "Do you want numbers?", "Do you want special characters?" ];


  //will hold chars that will be used to generate the password based on the user selections
  //as the user confirms what char sets they want to use to generate the password they are added here
  var validChars = [];

  var keepGoing = false; //conditon tracker for the do-while looop
  var question = 0; //tracks what question is being asked in the prompts, question 0 is index 0 of the promptText array
  var answer; //used to store prompts from the console

  var password = ""; //be used to generate and return password

  do {   

    //check if this is the first question, since the first question requires an actuall input we want to 
    //use prompt, all other questions will be using a confirm box, this will also call the input validation 
    if(question == 0){
      answer = prompt(promptText[question]);
      //verify if answer is actually a number and within the range of numbers required
      if(!isNaN(answer) && answer >= 8 && answer <= 128){
        promptAnswers[question] = Math.trunc(answer); //will remove and point of presicion from answer as 'isNaN' will show a decimal as true.
        keepGoing = true; //conf selection is good and validate the loop check indicator
        question++; //iterate to next question in array promptText
      }
      else{ //if the prompt return is not a valid length, return null string to end function
        alert("Not a valid password length.\nPlease try again.");
        return "";
      }
    }
    else{
      answer = confirm(promptText[question])
      if (answer){
        //if user conf wants to use a char set, add those chars to the array that will hold all selected chars for the password gen
        //if user does not confirm will go to the next question with no changes to the chars to be used for the password gen
        validChars = validChars.concat(allChars[question]);
        promptAnswers[question] = answer; 
      }
      else{
        promptAnswers[question] = answer; 
      } 
      question++; //regardless of the choice interate to the next question to be asked
    }

    //ensures break from loop once all questions have been answered
    if (question > promptText.length-1) {
        keepGoing = false;
    }
    
    
  } while (keepGoing);


  //verify that at least one char set was elected to build the password, if not will exit and return a null string so text in the generate box does not change
  if(validChars.length == 0)
  {
    alert("No character sets were elected to create the password.\nPlease try again.")
    return "";
  }

  //based on user selected password length, define max limit for use in random number
  //must be the length minus one because this will be the upper bounds of the array and to avoid an out of bounds error
  var max = validChars.length-1;

  //create the number of chars based the length of the password the user desired
  //use a random index from the 'validChars' which contains all the chars selected by the user
  for(let x = 0; x < promptAnswers[0]; x++){
    password += validChars[random(0,max)];
  } 
  
  return password;

}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
