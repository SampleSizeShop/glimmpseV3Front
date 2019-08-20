import {animate, animateChild, group, query, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from 'ng-animate';

export const routeSlideAnimation =
  trigger('routeSlide', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '{{offsetLeave}}%'})
      ], { optional: true }),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('450ms ease-out', style({ left: '{{offsetEnter}}%'}))
        ], {optional: true}),
        query(':enter', [
          animate('450ms ease-out', style({ left: '0%'}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(),{ optional: true }),
    ])
  ]);

export const fadeTransition =
  trigger('fade', [
  transition('* => *', [
      query(':enter',
        useAnimation(fadeIn, {
          params: { timing: 0.1}
        }), {optional: true}
      ),
      query(':leave',
        useAnimation(fadeOut, {
          params: { timing: 0.1}
        }), {optional: true})
    ]
  )
]);
