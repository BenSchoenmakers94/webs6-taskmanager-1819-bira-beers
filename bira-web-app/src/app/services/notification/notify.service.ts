import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackbar: MatSnackBar) { }

  notifyUser(message: string, duration?: any) {
    if (!duration) { duration = 2000; }
    this.snackbar.open(message, 'OK', { duration });
  }
}
