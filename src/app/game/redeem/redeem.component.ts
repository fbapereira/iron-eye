import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, filter, map, switchMap, catchError, pairwise } from 'rxjs/operators';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';
import { Game } from '../game.model';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent {

  private readonly keyPattern = '([a-zA-Z]{3})[-]([a-zA-Z]{3})[-]([a-zA-Z]{3})[-]([0-9]{4})';
  /**
   * Login form
   */
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      code: ['', [ Validators.required, Validators.pattern(this.keyPattern)]],
    });

    this.form.statusChanges.pipe(
      filter((status) => status === 'VALID'),
      map(() => this.form.controls.code.value),
      switchMap((code: string) => this.gameService.addGame(code.toUpperCase())),
    ).subscribe();
  }
}
