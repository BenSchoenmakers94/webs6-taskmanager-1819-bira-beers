import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NiceTextService {

  constructor() { }

  getNiceText(text: string): string {
    let textNice = text.charAt(0).toUpperCase() + text.slice(1);
    for (let index = 1; index < textNice.length; index++) {
      const element = textNice[index];
      let arrayOfWords = [];
      if (element === textNice.charAt(index).toUpperCase()) {
        arrayOfWords.push(index);
      }

      if (arrayOfWords.length > 0) {
      let textNicer: string;
      let prev = -1;
      for (let index = 0; index < arrayOfWords.length; index++) {
        const element = arrayOfWords[index];
        if (prev > -1) {
          let substring = textNice.substring(prev, element);
          textNicer += substring.charAt(0).toUpperCase() + substring.slice(1) + " ";
          prev = element;
        }
      }
      let substring = textNice.substring(prev);
      textNicer += substring.charAt(0).toUpperCase() + substring.slice(1);
    }
    }
    return textNice;
  }
}
