import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryManagerComponent } from './story-manager.component';

describe('StoryManagerComponent', () => {
  let component: StoryManagerComponent;
  let fixture: ComponentFixture<StoryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
