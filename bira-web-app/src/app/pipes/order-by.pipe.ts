import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any {
    if (propertyName) {
      value = value.sort((a: any, b: any) => {
        if (!a[propertyName]) { return -1; }
        if (!b[propertyName]) { return 1; }
        const aValue = a[propertyName].toDate().getTime();
        const bValue = b[propertyName].toDate().getTime();

        if (aValue > bValue) {
          return 1;
        } else if (aValue < bValue) {
          return -1;
        } else {
          return 0;
        }
      });
      return value;
    } else {
      return value;
    }
  }

}
