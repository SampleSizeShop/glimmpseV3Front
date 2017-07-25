import {Outcome} from './outcome';

export const MODES = {0:'GUIDED', 1:'FLEXIBLE'}

export class StudyDesign {
  constructor(public name?: string,
              public outcomes?: Outcome[],
              public mode?: Boolean
) {}
}
