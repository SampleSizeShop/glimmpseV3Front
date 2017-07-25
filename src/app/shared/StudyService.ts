import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StudyService {
  private study: Subject<FormGroup> = new BehaviorSubject<FormGroup>(
    new FormGroup({
      mode: new FormControl()
    })
  );
  study$ = this.study.asObservable();
}

