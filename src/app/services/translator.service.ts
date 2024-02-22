import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private apiUrl = 'https://api.mymemory.translated.net/get';
  constructor(private http:HttpClient) {}
translateWord(word:string, targetLanguage:string):Observable<string>{
  console.log("На перевод отправлено слово ", word)
  const regex = /[^\p{L}\p{M}]/gu;
  const url =`${this.apiUrl}?q=${word}&langpair=en|${targetLanguage}&mt=1`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
return this.http.get<any>(url).pipe(
map(res=>res.responseData.translatedText.replace(regex,''))
)
}

translateRussianWord(word:string):Observable<string>{
  console.log("На перевод отправлено слово ", word)
 // const regex = /[^\p{L}\p{M}]/gu;
  const url =`${this.apiUrl}?q=${word}&langpair=en|ru`
console.log("url ", url)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
return this.http.get<any>(url).pipe(
map(res=>res.responseData.translatedText)
)
}

compareTranslation(correctAnswer:string, userAnswer:string):boolean{
  const regex = /^[a-z]+$/i;
  const cleanUserAnswer = userAnswer.trim().replace(regex,'');
  const cleanCorrectAnswer = correctAnswer.trim().replace(regex,'');
  console.log('correctAnswer ',cleanCorrectAnswer,'userAnswer ', cleanUserAnswer )
  return cleanUserAnswer.trim().toLowerCase()==cleanCorrectAnswer.trim().toLowerCase()
}

}
