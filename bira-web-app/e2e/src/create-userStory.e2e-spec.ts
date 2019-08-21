import { browser } from 'protractor';
import { CreateUserStory } from './create-userStory.po';
import { Observable, Subject } from 'rxjs';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AuthService } from '../../src/app/services/authentication/auth.service';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireauthStub } from 'src/fixtures/fireauth-stub';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/fixtures/firestore-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';

// const AuthStub = {
//     userLogged: Observable.of({ name: 'test' })
// };

describe('Create UserStory', () => {
    // let createPage: CreateUserStory;
    // let fixture: ComponentFixture<SignInComponent>;

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [SignInComponent, DashboardComponent],
    //         schemas: [NO_ERRORS_SCHEMA],
    //         providers: [
    //             { provide: AuthService, useValue: AuthStub },
    //             { provide: AngularFireAuth, useValue: FireauthStub },
    //             { provide: AngularFirestore, useValue: FirestoreStub }
    //         ],
    //         imports: [
    //             RouterTestingModule.withRoutes([{ path: 'dashboard', component: DashboardComponent }]),
    //             MatSnackBarModule
    //         ]
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(SignInComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    //     createPage = new CreateUserStory();
    //     browser.get('/userstories/add');
    // });

    // it('should have correct titles and button text', () => {
    //     expect(createPage.pageTitle.getText()).toEqual('Add - UserStories');
    // });
    // it('should display an error message to the user if they provided incorrect credentials', () => {

    // });
    // it('should redirect the user to the dashboard page if they provided correct credentials', () => {

    // });
});
