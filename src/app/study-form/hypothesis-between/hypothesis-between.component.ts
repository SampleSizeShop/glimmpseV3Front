import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {constants} from 'app/shared/constants';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import * as math from 'mathjs';
import {PartialMatrix} from '../../shared/PartialMatrix';
import {Router} from '@angular/router';
import {Predictor} from '../../shared/Predictor';
import {NGXLogger} from 'ngx-logger';
import {query, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from 'ng-animate';
import {NavigationService} from '../../shared/navigation.service';
import {Observable} from 'rxjs/Observable';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {minMaxValidator} from '../../shared/minmax.validator';
import {ContrastMatrixService} from '../custom-contrast-matrix/contrast-matrix.service';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  providers: [ContrastMatrixService],
  animations: [
    trigger('fade', [
      transition('* => *', [
          query(':enter',
            useAnimation(fadeIn, {
              params: { timing: 0.2}
            }), {optional: true}
          ),
          query(':leave',
            useAnimation(fadeOut, {
              params: { timing: 0.2}
            }), {optional: true})
        ]
      )
    ])
  ],
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit, OnDestroy {
  private _stages = constants.HYPOTHESIS_BETWEEN_STAGES;
  private _stage = this.stages.INFO;
  private _next = this.stages.INFO;
  private _showAdvancedOptions: boolean;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  private _isuFactors: ISUFactors;
  private _predictorsIn: Array<Predictor>;
  private _formErrors = constants.HYPOTHESIS_BETWEEN_FORM_ERRORS;
  private _validationMessages = constants.HYPOTHESIS_BETWEEN_VALIDATION_MESSAGES;
  private _noRowsForm: FormGroup;
  private _maxRows: number;
  private _numCustomRows: number;
  private _contrast_matrix: PartialMatrix;
  private _contrast_matrix_for: string;
  private screenWidth;

  private _isuFactorsSubscription: Subscription;
  private _contrastMatrixSubscription: Subscription;
  texString = '';

  @ViewChild('canDeactivate') canDeactivateModal;
  private modalReference: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private study_service: StudyService,
              private navigation_service: NavigationService,
              private contrast_matrix_service: ContrastMatrixService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.predictorsIn = [];
    this.showAdvancedOptions = false;

    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
        this.isuFactors = isuFactors;
      if (isNullOrUndefined(this.isuFactors.cMatrix)) {
        this.isuFactors.cMatrix = new PartialMatrix(this.HYPOTHESIS_NATURE.GLOBAL_TRENDS);
      }
    } );
    this._contrastMatrixSubscription = this.contrast_matrix_service.contrast_matrix$.subscribe(contrast_matrix => {
      this.setContrastMatrix(contrast_matrix);
    });
    this.buildForm();
    this.onResize();
  }

  buildForm(): void {
    this._noRowsForm = this.fb.group({
      norows: [this._numCustomRows, minMaxValidator(1, this.maxRows)]
    });

    this.noRowsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.noRowsForm) {
      return;
    }
    const form = this.noRowsForm;

    for (const field in this._formErrors) {
      if (this._formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this._validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
    this._contrastMatrixSubscription.unsubscribe();
  }

  selectHypothesisNature(nature: string) {
    this.isuFactors.cMatrix.type = nature;
    if (nature === this.HYPOTHESIS_NATURE.CUSTOM_C_MATRIX) {
      this.setCustomCMatrix();
    } else if (nature !== this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS) {
      this.isuFactors.predictors.forEach( predictor => {
          predictor.isuFactorNature = nature;
        }
      );
    }
  }

  private setContrastMatrix(contrast_matrix) {
    this._contrast_matrix = contrast_matrix;
    if (this._contrast_matrix_for === 'CMATRIX') {
      this.isuFactors.cMatrix = new PartialMatrix();
      this.isuFactors.cMatrix.values = this._contrast_matrix.values;
      this.isuFactors.cMatrix.type = this.HYPOTHESIS_NATURE.CUSTOM_C_MATRIX;
    } else {
      this.isuFactors.predictorsInHypothesis.forEach(predictor => {
        if (predictor.name === this._contrast_matrix_for) {
          if (isNullOrUndefined(predictor.partialMatrix)) {
            predictor.partialMatrix = new PartialMatrix(this.selectedHypothesis);
          }
          predictor.partialMatrix.values = this._contrast_matrix.values;
        }
      });
    }
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  setNature(name: string, nature: string) {
    this.log.debug( name + ' set: ' + nature );
    this.isuFactors.predictors.forEach( predictor => {
      if (predictor.name === name) {
        predictor.isuFactorNature = nature;
      }
    });
  }

  setCustomPartialCMatrix(predictor: Predictor) {
    predictor.isuFactorNature = this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS;
    this._contrast_matrix_for = predictor.name;
    if (!isNullOrUndefined(predictor)) {
      this.updateContrastMatrix(predictor);
      this.buildForm();
    }
    this.rows();
  }

  setCustomCMatrix() {
    this._contrast_matrix_for = 'CMATRIX';
    const cMatrixObject = this.createCustomCmatrixObject();
    if (!isNullOrUndefined(cMatrixObject)) {
      this.updateContrastMatrix(cMatrixObject);
      this.buildForm();
    }
    this.rows();
  }

  private updateContrastMatrix(predictor: Predictor) {
    const contrast_matrix = new PartialMatrix();
    if (isNullOrUndefined(predictor.partialMatrix) || isNullOrUndefined(predictor.partialMatrix.values)) {
      predictor.partialMatrix = new PartialMatrix();
    }
    contrast_matrix.values = predictor.partialMatrix.values;
    this.contrast_matrix_service.update_contrast_matrix(contrast_matrix);
    this.contrast_matrix_service.update_factor(predictor);
    this.contrast_matrix_service.update_cols(predictor.valueNames.length);
    this._maxRows = predictor.valueNames.length;
  }

  private createCustomCmatrixObject() {
    const cMatrixObject = new Predictor();
    cMatrixObject.name = 'your ';

    this.isuFactors.predictors.forEach(predictor => {
      cMatrixObject.name = cMatrixObject.name + predictor.name + ' x '
      predictor.valueNames.forEach(name => {
        cMatrixObject.valueNames.push(name);
      });
    });
    cMatrixObject.name = cMatrixObject.name.slice(0, cMatrixObject.name.length - 2);
    cMatrixObject.name = cMatrixObject.name + 'hypothesis'
    return cMatrixObject;
  }

  rows() {
    this._next = this.stages.ROWS;
    this._stage = -1;
  }

  editCustom() {
    this.contrast_matrix_service.update_rows(this.noRowsForm.get('norows').value);
    this._next = this.stages.EDIT_CUSTOM;
    this._stage = -1;
  }

  showInfo() {
    this._next = this.stages.INFO;
    this._stage = -1;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value) {
    this._HYPOTHESIS_NATURE = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  get predictorsIn(): Array<Predictor> {
    return this._predictorsIn;
  }

  set predictorsIn(value: Array<Predictor>) {
    this._predictorsIn = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get stages() {
    return this._stages;
  }

  get stage(): number {
    return this._stage;
  }

  setStage(next: number) {
      if (next === this.stages.INFO) {
        this.navigation_service.updateValid(true);
      } else {
        this.navigation_service.updateValid(false);
      }
      this._stage = next;
  }

  isInfo() {
    if (this._stage === this.stages.INFO) {
      return true;
    } else {
      return false
    }
  }

  isRows() {
    if (this._stage === this.stages.ROWS) {
      return true;
    } else {
      return false
    }
  }

  isEditCustom() {
    if (this._stage === this.stages.EDIT_CUSTOM) {
      return true;
    } else {
      return false
    }
  }

  startTransition(event) {
  }

  doneTransition(event) {
    this.setStage(this._next);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.stage === this.stages.INFO) {
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.canDeactivateModal);
      this.study_service.updateDirection('CANCEL');
      return this.navigation_service.navigateAwaySelection$;
    }
  }

  showModal(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then(
      (closeResult) => {
        console.log('modal closed : ', closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          console.log('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          console.log('modal dismissed when used pressed backdrop');
        } else {
          console.log(dismissReason);
        }
      })
  }

  modalChoice(choice: boolean) {
    this.modalReference.close();
    if (choice) {
      // this.resetForms();
      this.navigation_service.updateValid(true);
    }
    this.navigation_service.navigateAwaySelection$.next(choice);
  }

  get formErrors(): { norows: string } {
    return this._formErrors;
  }

  get noRowsForm(): FormGroup {
    return this._noRowsForm;
  }

  get maxRows(): number {
    return this._maxRows;
  }

  get selectedHypothesis() {
    return this.isuFactors.cMatrix.type;
  }

  predictorsInHypothesis(): boolean {
    if (!isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.predictorsInHypothesis)
      && this.isuFactors.predictorsInHypothesis.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getButtonClass() {
    if (this.screenWidth < 601 ) {
      return 'btn-group-vertical';
    } else {
      return 'btn-group';
    }
  }
}
