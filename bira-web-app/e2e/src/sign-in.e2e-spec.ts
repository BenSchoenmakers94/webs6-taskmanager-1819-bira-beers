import { browser } from 'protractor';
import { CreateUserStory } from './create-userStory.po';
import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../src/app/services/authentication/auth.service';
import { SignIn } from './sign-in.po';

describe('Sign In', () => {
    let createPage: SignIn;

    beforeEach(() => {
        createPage = new SignIn();
        browser.get('');
    });

    it('should have correct titles and button text', () => {
        expect(createPage.pageTitle.getText()).toEqual('Hello you!');
        expect(createPage.pageSubtitle.getText()).toEqual('Take a moment to log in!');
        expect(createPage.signInButton.getText()).toEqual(' Log in with Google! ');
    });
    it('should display an error message to the user if they provided incorrect credentials', () => {

    });
    it('should redirect the user to the dashboard page if they provided correct credentials', () => {

    });
});
