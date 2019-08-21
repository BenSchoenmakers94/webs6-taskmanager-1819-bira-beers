import {browser, element, by} from 'protractor';

export class CreateUserStory {

    get pageTitle() {
        return element(by.css('mat-card-title ng-star-inserted'));
    }
}
