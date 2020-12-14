import { Component } from '@angular/core';
import { slideInOut, fadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInOut, fadeInOutAnimation],
})
export class HomeComponent { }
