import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  private apiUrl = 'https://api.mymemory.translated.net/get';
  constructor(private http: HttpClient) {}
  translateWord(word: string, targetLanguage: string): Observable<string> {
    console.log('На перевод отправлено слово ', word);
    const regex = /[^\p{L}\p{M}]/gu;
    const url = `${this.apiUrl}?q=${word}&langpair=en|${targetLanguage}&mt=1`;

   
    return this.http
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .get<any>(url)
      .pipe(map((res) => res.responseData.translatedText.replace(regex, '')));
  }

  translateRussianWord(word: string): Observable<string> {
    console.log('На перевод отправлено слово ', word);
    const regex = /[^\p{L}\p{M}]/gu;
    const url = `${this.apiUrl}?q=${word}&langpair=ru|en`;
    console.log('url ', url);
  
    return this.http
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .get<any>(url)
      .pipe(map((res) => res.responseData.translatedText.replace(regex, '')));
  }

  compareTranslation(correctAnswer: string, userAnswer: string): boolean {
    console.log('correctAnswer ', correctAnswer, 'userAnswer ', userAnswer);
    const cleanUserAnswer = userAnswer.trim();
    const cleanCorrectAnswer = correctAnswer.trim();
    console.log(
      'cleancorrectAnswer ',
      cleanCorrectAnswer,
      'cleanuserAnswer ',
      cleanUserAnswer,
    );
    return (
      cleanUserAnswer.trim().toLowerCase() ==
      cleanCorrectAnswer.trim().toLowerCase()
    );
  }
}
