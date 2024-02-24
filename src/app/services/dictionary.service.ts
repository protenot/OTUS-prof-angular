import { Injectable } from '@angular/core';
import { WORDS, RussianWords } from '../../fakeDB/database';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private englishWordsKey = 'englishWords';
  private russianWordsKey = 'russianWords';

  constructor() { }

  addWord(word:string,language:string){
const words:string[] = this.getWordsByLanguage(language);
words.push(word);

this.setWordsByLanguage(language, words);
if(language==='russian'){
  RussianWords.push(word)
}
if(language==='english'){
  WORDS.push(word)
}

  }

  getWordsByLanguage(language:string):string[]{
    const key = language ==="english"?this.englishWordsKey :this.russianWordsKey;
    const wordsJson = localStorage.getItem(key);
    if (!wordsJson){
      const defailtWords = language === "english"? WORDS:RussianWords;
      localStorage.setItem(key, JSON.stringify(defailtWords));
      return defailtWords
    }
    return JSON.parse(wordsJson)
  }

  private setWordsByLanguage(language:string, words:string[]){
    const key = language === 'english'? this.englishWordsKey:this.russianWordsKey;
    localStorage.setItem(key, JSON.stringify(words))
  }
}
