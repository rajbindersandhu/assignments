/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if(str1.length == str2.length){
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    str1Array = str1.split("")
    str2Array = str2.split("")
    for (let char of str1Array){
      if(!str2Array.includes(char)){
        return false
      }
    }
    return true
  }
  return false
}

module.exports = isAnagram;
