import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NiceTextService {

  constructor() { }

  getNiceText(text: string): string {
    const textNice = text.charAt(0).toUpperCase() + text.slice(1);
    for (let index = 1; index < textNice.length; index++) {
      const element = textNice[index];
      const arrayOfWords = [];
      if (element === textNice.charAt(index).toUpperCase()) {
        arrayOfWords.push(index);
      }

      if (arrayOfWords.length > 0) {
      let textNicer: string;
      let prev = -1;
      for (let index = 0; index < arrayOfWords.length; index++) {
        const element = arrayOfWords[index];
        if (prev > -1) {
          const substring = textNice.substring(prev, element);
          textNicer += substring.charAt(0).toUpperCase() + substring.slice(1) + ' ';
          prev = element;
        }
      }
      const substring = textNice.substring(prev);
      textNicer += substring.charAt(0).toUpperCase() + substring.slice(1);
    }
    }
    return textNice;
  }

  getNiceTextList(notSoNiceList: string[]): any[] {
    const returnList = [];
    notSoNiceList.forEach(item => returnList[notSoNiceList.indexOf(item)] = this.getNiceText(item));
    return returnList;
  }

  getNiceNameForId(propertyId: string) {
    return propertyId.lastIndexOf('Id') > 0 ? this.getNiceText(propertyId.substring(0, propertyId.lastIndexOf('Id'))) : this.getNiceText(propertyId);
  }

  getTypeForId(propertyId: string) {
    return propertyId.substring(0, propertyId.lastIndexOf('Id')) + 's';
  }

  getSingular(type: string) {
    let typeLessS = type.substring(0, type.length - 1);
    if (typeLessS.substring(typeLessS.length - 2, typeLessS.length) === 'ie') {
      typeLessS = typeLessS.substring(0, typeLessS.length - 2) + 'y';
    }
    return typeLessS;
  }
}
