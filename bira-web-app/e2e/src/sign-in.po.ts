import {browser, element, by} from 'protractor';

export class SignIn {
    get pageTitle() {
        return element(by.xpath('/html/body/app-root/mat-card/mat-card-content/app-sign-in/div/mat-card/h3'));
    }

    get pageSubtitle() {
        return element(by.xpath('/html/body/app-root/mat-card/mat-card-content/app-sign-in/div/mat-card/p'));
    }

    get signInButton() {
        return element(by.xpath('/html/body/app-root/mat-card/mat-card-content/app-sign-in/div/mat-card/button/span'));
    }
}
