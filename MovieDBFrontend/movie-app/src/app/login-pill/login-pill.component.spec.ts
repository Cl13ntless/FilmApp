import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPillComponent } from './login-pill.component';

describe('LoginPillComponent', () => {
  let component: LoginPillComponent;
  let fixture: ComponentFixture<LoginPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
