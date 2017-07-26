import {Outcome} from './outcome';

export class StudyDesign {
  public mode: string;
  public outcomes: Outcome[];
  public name: string;

  constructor(name?: string,
              outcomes?: Outcome[],
              mode?: Boolean
) {}
}
