import { Component, OnInit, HostListener, ElementRef, Output, EventEmitter, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxNotifierService } from 'ngx-notifier';
import { Subject, fromEvent, Observable } from 'rxjs';
import { tap, filter, map, switchMap, catchError, pairwise, first, skip } from 'rxjs/operators';

import { GameService } from '../game.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements AfterContentInit {
  @Output()
  closeEvent = new EventEmitter();

  // tslint:disable-next-line: no-restricted-globals
  private clickEvent$: Observable<Event> = fromEvent(document, 'click');

  private readonly keyPattern = '([a-zA-Z]{3})[-]([a-zA-Z]{3})[-]([a-zA-Z]{3})[-]([0-9]{4})';
  /**
   * Login form
   */
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private eRef: ElementRef,
    private ngxNotifierService: NgxNotifierService,
  ) {
    this.createForm();
  }

  ngAfterContentInit(): void {
    this.clickEvent$.pipe(
      filter((event) => !this.eRef.nativeElement.contains(event.target)),
      skip(1), // ignores the opening click
      first(),
    ).subscribe(() => this.closeEvent.next());
  }

  private createForm(): void {
    this.form = this.fb.group({
      code: ['', [ Validators.required, Validators.pattern(this.keyPattern)]],
    });

    this.form.statusChanges.pipe(
      filter((status) => status === 'VALID'),
      map(() => this.form.controls.code.value),
      switchMap((code: string) => this.gameService.addGame(code.toUpperCase())),
      filter((hasAdded) => hasAdded),
      tap(() => {
        this.ngxNotifierService.createToast('The game has been added');
        this.closeEvent.next();
      }),
    ).subscribe();
  }
}
