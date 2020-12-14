import { trigger, transition, animate, style, state } from '@angular/animations';

export const fadeInOutAnimation = [
  trigger('fadeInOutAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('500ms', style({ opacity: 0 })),
    ]),
  ]),
];

export const slideInOut = [
  trigger('slideInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateY(50%)', opacity: 0 }),
      animate(500)
    ]),
    transition('* => void', [
      animate(500, style({ transform: 'translateY(-50%)', opacity: 1 }))
    ])
  ])
]