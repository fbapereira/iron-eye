import { Component, ElementRef, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxNotifierService } from 'ngx-notifier';
import { Subject, Subscription } from 'rxjs';
import { tap, filter, map, switchMap, first, skip } from 'rxjs/operators';

import { GameService } from '../game.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements AfterContentInit, OnDestroy {
  /**
   * emit a close event when required
   */
  @Output() closeEvent = new EventEmitter();

  /**
   * Login form
   */
  public form: FormGroup;

  // tslint:disable-next-line: no-restricted-globals
  private clickEvent$ = new Subject<Event>();



  /**
   * RegEx key pattern
   * fe: KEY-KEY-KEY-0001
   */
  private readonly keyPattern = '([a-zA-Z]{3})[-]([a-zA-Z]{3})[-]([a-zA-Z]{3})[-]([0-9]{4})';

  private subscription: Subscription = new Subscription();

  constructor(
    private eRef: ElementRef,
    private fb: FormBuilder,
    private gameService: GameService,
    private ngxNotifierService: NgxNotifierService,
  ) {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    // close when click outside the component
    this.subscription.add(
      this.clickEvent$.pipe(
        filter((event) => !this.eRef.nativeElement.contains(event.target)),
        skip(1), // ignores the opening click
        first(),
      ).subscribe(() => this.closeEvent.next()),
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      code: ['', [ Validators.required, Validators.pattern(this.keyPattern)]],
    });

    // when form valid submit the value to avoid an extra click
    this.subscription.add(
      this.form.statusChanges.pipe(
        filter((status) => status === 'VALID'),
        map(() => this.form.controls.code.value),
        switchMap((code: string) => this.gameService.addGame(code.toUpperCase())),
        filter((hasAdded) => hasAdded),
        tap(() => {
          this.ngxNotifierService.createToast('The game has been added');
          this.closeEvent.next();
        }),
      ).subscribe(),
    );
  }
}
