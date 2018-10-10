import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const slideForwardAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '{{offsetEnter}}%'
        })
      ]),
      query(':enter', [
        style({ right: '{{offsetLeave}}%'})
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ right: '{{offsetEnter}}%'}))
        ], {optional: true}),
        query(':enter', [
          animate('500ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
