/* 
remove vowels from string

removeVowels(str) 

removeVowels('AMD to the moon') = 'MD t th mn'

removeVowels('YAeiOu') = 'Y'

removeVowels('This is the rhythm of the night') = 'Ths s th rhythm 

*/




const removeVowels = (str) => {
  let vowels = 'aeiouAEIOU';
  let result = '';
  for(let i = 0; i < str.length; i++) {
    console.log(vowels.includes(str[i]))
    if(!vowels.includes(str[i])){
      result += str[i]
    }
  }
  return result;
}
console.log(removeVowels('YamEmy'))