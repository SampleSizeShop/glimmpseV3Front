import {Outcome} from './outcome';

export class StudyDesign {
  constructor(public name: string,
              public outcomes?: Outcome[]
) {}
}
