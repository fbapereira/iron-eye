import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxNotifierService } from 'ngx-notifier';
import { GameServiceMock } from 'src/app/testing/game-service.mock';
import { NgxNotifierServiceMock } from 'src/app/testing/notifier-service.mock';

import { GameService } from '../game.service';

import { RedeemComponent } from './redeem.component';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'games', redirectTo: '' }])
      ],
      providers: [
        FormBuilder,
        {
          provide: GameService,
          useClass: GameServiceMock,
        },
        {
          provide: NgxNotifierService,
          useClass: NgxNotifierServiceMock,
        },
      ],
      declarations: [
        RedeemComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
