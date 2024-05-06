/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let start=0;
  let end = str.length-1;
  while(start<end){
    if((new RegExp("[A-Za-z]")).test(str[start]) && (new RegExp("[A-Za-z]")).test(str[end])){
      if(str[start].toLowerCase() != str[end].toLowerCase()){
        return false;
      }
      start ++;
      end --;
    }else if(!(new RegExp("[A-Za-z]")).test(str[start])){
      start ++;
    }else if(!(new RegExp("[A-Za-z]")).test(str[end])){
      end --;
    }
  }
  return true;
}

module.exports = isPalindrome;
