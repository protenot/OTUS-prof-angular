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
const url =`${this.apiUrl}?q=${word}&langpair=en|${targetLanguage}`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
return this.http.get<any>(url).pipe(
map(res=>res.responseData.translatedText)
)
}
compareTranslation(userAnswer:string, correctAnswer:string):boolean{
  console.log('correctAnswer ',correctAnswer,'userAnswer ', userAnswer )
  return userAnswer.trim().toLowerCase()==correctAnswer.trim().toLowerCase()
}

}
