import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthServiceMock } from 'src/app/testing/auth-service.mock';
import { UserService } from 'src/app/user/user.service';

import { UserServiceMock } from '../../testing/user-service.mock';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
