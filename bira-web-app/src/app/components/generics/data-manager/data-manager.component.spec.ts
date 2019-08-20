import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataManagerComponent } from './data-manager.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DataManagerComponent', () => {
  let component: DataManagerComponent;
  let fixture: ComponentFixture<DataManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataManagerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
