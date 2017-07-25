export class Outcome {
  constructor(public name?: string,
              public type?: string) {
  }
}

export const OUTCOME_TYPES = {
  0: 'Between',
  1: 'Within'
};
