import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {constants} from '../../shared/model/constants';
import {Subscription, Observable} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {PartialMatrix} from '../../shared/model/PartialMatrix';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContrastMatrixService} from '../custom-contrast-matrix/contrast-matrix.service';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';
import {fadeTransition} from '../../animations/animations';

@Component({
  selector: 'app-hypothesis-within',
  templateUrl: './hypothesis-within.component.html',
  providers: [ContrastMatrixService],
  animations: [fadeTransition],
  styleUrls: ['./hypothesis-within.component.css']
})
export class HypothesisWithinComponent implements OnInit, OnDestroy {
  private _stages = constants.HYPOTHESIS_BETWEEN_STAGES;
  private _stage = this._stages.INFO;
  private _next = this._stages.INFO;
  private _showAdvancedOptions: boolean;
  private _HYPOTHESIS_NATURE = constants.CONTRAST_MATRIX_NATURE;
  private _isuFactors: ISUFactors;
  private _formErrors = constants.HYPOTHESIS_WITHIN_FORM_ERRORS;
  private _validationMessages = constants.HYPOTHESIS_WITHIN_VALIDATION_MESSAGES;
  private _noColsForm: UntypedFormGroup;
  private _maxCols: number;
  private _numCustomCols: number;
  private _contrast_matrix: PartialMatrix;
  private _contrast_matrix_for: string;
  private screenWidth;
  private _isMixed: boolean;
  private _stashedNature: string;

  private _isuFactorsSubscription: Subscription;
  private _contrastMatrixSubscription: Subscription;
  texString = '';
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  @ViewChild('canDeactivate', {static: true}) canDeactivateModal;
  private modalReference: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private study_service: StudyService,
              private navigation_service: NavigationService,
              private contrast_matrix_service: ContrastMatrixService,
              private fb: UntypedFormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._showAdvancedOptions = false;

    this._isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this._isuFactors = isuFactors;
      this._isMixed = isuFactors.isHypothesisMixed;

      if (isNullOrUndefined(this._isuFactors.uMatrix)) {
        this._isuFactors.uMatrix = new PartialMatrix(this.HYPOTHESIS_NATURE.GLOBAL_TRENDS);
      }
    } );
    this._contrastMatrixSubscription = this.contrast_matrix_service.contrast_matrix$.subscribe(contrast_matrix => {
      this.setContrastMatrix(contrast_matrix);
    });
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._stashedNature = this._isuFactors.uMatrix.type;
    this.buildForm();
    this.onResize();
  }

  buildForm(): void {
    this._noColsForm = this.fb.group({
    nocols: [this._numCustomCols, minMaxValidator(1, this._maxCols)]
  });

  this._noColsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this._noColsForm) {
      return;
    }
    const form = this._noColsForm;

    for (const field in this._formErrors) {
      if (this._formErrors.hasOwnProperty(field)) {
        this._formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this._validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this._formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this._afterInit = true;
    if (this._isuFactors.uMatrix.type === this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS ||
      this._isuFactors.uMatrix.type === this.HYPOTHESIS_NATURE.CUSTOM_U_MATRIX) {
      this.toggleAdvancedOptions();
    }
  }

  ngOnDestroy() {
    this.study_service.updateIsuFactors(this._isuFactors);
    this.navigation_service.updateInternalFormSource(false);
    this._isuFactorsSubscription.unsubscribe();
    this._contrastMatrixSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this._stage === this._stages.INFO) {
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.canDeactivateModal);
      this.study_service.updateDirection('CANCEL');
      return this.navigation_service.navigateAwaySelection$;
    }
  }

  selectHypothesisNature(nature: string) {
    this._stashedNature = this._isuFactors.uMatrix.type;
    this._isuFactors.uMatrix.type = nature;
    if (nature === this.HYPOTHESIS_NATURE.CUSTOM_U_MATRIX) {
      this.setCustomUMatrix();
    } else if (nature !== this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS) {
      this._isuFactors.repeatedMeasures.forEach( repMeasure => {
          repMeasure.isuFactorNature = nature;
        }
      );
    }
  }

  private setContrastMatrix(contrast_matrix) {
    this._contrast_matrix = contrast_matrix;
    if (this._contrast_matrix_for === 'UMATRIX') {
      this._isuFactors.uMatrix = new PartialMatrix(this.HYPOTHESIS_NATURE.CUSTOM_U_MATRIX);
      this._isuFactors.uMatrix.values = this._contrast_matrix.values;
    } else {
      this._isuFactors.repeatedMeasuresInHypothesis.forEach(repMeasure => {
        if (repMeasure.name === this._contrast_matrix_for) {
          repMeasure.partialMatrix = new PartialMatrix(this.selectedHypothesis);
          repMeasure.partialMatrix.values = this._contrast_matrix.values;
        }
      });
    }
  }

  toggleAdvancedOptions() {
    this._showAdvancedOptions = !this.showAdvancedOptions;
  }

  setNature(name: string, nature: string) {
    this.log.debug( name + ' set: ' + nature );
    this._isuFactors.repeatedMeasures.forEach( repMeasure => {
      if (repMeasure.name === name) {
        repMeasure.isuFactorNature = nature;
      }
    });
  }

  setPolynomialOrder(name: string, order: number) {
    this.log.debug( name + ' set: ' + order );
    this._isuFactors.repeatedMeasures.forEach( measure => {
      if (measure.name === name) {
        measure.polynomialOrder = order;
      }
    });
  }

  setCustomPartialUMatrix(repMeasure: RepeatedMeasure) {
    repMeasure.isuFactorNature = this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS;
    this._contrast_matrix_for = repMeasure.name;
    if (!isNullOrUndefined(repMeasure)) {
      this.updateContrastMatrix(repMeasure);
      this.buildForm();
    }
    this.cols();
  }

  setCustomUMatrix() {
    this._contrast_matrix_for = 'UMATRIX';
    const uMatrixObject = this.createCustomUmatrixObject();
    if (!isNullOrUndefined(uMatrixObject)) {
      this.updateContrastMatrix(uMatrixObject);
      this.buildForm();
    }
    this.cols();
  }

  private updateContrastMatrix(repMeasue: RepeatedMeasure) {
    const contrast_matrix = new PartialMatrix();
    if (isNullOrUndefined(repMeasue.partialMatrix) || isNullOrUndefined(repMeasue.partialMatrix.values)) {
      repMeasue.partialMatrix = new PartialMatrix();
    }
    contrast_matrix.values = repMeasue.partialMatrix.values;
    this.contrast_matrix_service.update_contrast_matrix(contrast_matrix);
    this.contrast_matrix_service.update_factor(repMeasue);
    this.contrast_matrix_service.update_rows(repMeasue.valueNames.length);
    this._maxCols = repMeasue.valueNames.length;
  }

  private createCustomUmatrixObject() {
    const uMatrixObject = new RepeatedMeasure();
    uMatrixObject.name = 'your ';

    this.isuFactors.outcomes.forEach(outcome  => {
      this._isuFactors.repeatedMeasures.forEach(repMeasure => {
        uMatrixObject.name = uMatrixObject.name + ' ' + outcome.name + ' ' +  repMeasure.name + ' x '
        repMeasure.valueNames.forEach(name => {
          uMatrixObject.valueNames.push(name);
        });
      });
    });
    uMatrixObject.name = uMatrixObject.name.slice(0, uMatrixObject.name.length - 2);
    uMatrixObject.name = uMatrixObject.name + 'hypothesis';
    return uMatrixObject;
  }

  cols() {
    this._next = this._stages.ROWS;
    this._stage = -1;
  }

  editCustom() {
    this.contrast_matrix_service.update_cols(this._noColsForm.get('nocols').value);
    this._next = this._stages.EDIT_CUSTOM;
    this._stage = -1;
  }

  showInfo(cancel?: boolean) {
    if (cancel) {
      this._isuFactors.uMatrix.type = this._stashedNature;
    }
    this._next = this._stages.INFO;
    this._stage = -1;
  }

  getButtonClass() {
    if (this.screenWidth < 601 ) {
      return 'btn-group-vertical';
    } else {
      return 'btn-group';
    }
  }

  setStage(next: number) {
    if (next === this._stages.INFO) {
      this.navigation_service.updateInternalFormSource(false);
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateInternalFormSource(true);
      this.navigation_service.updateValid(false);
    }
    this._stage = next;
  }

  startTransition(event) {
  }

  doneTransition(event) {
    this.setStage(this._next);
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

  repeatedMeasuresInHypothesis(): boolean {
    if (!isNullOrUndefined(this._isuFactors)
      && !isNullOrUndefined(this._isuFactors.repeatedMeasuresInHypothesis)
      && this._isuFactors.repeatedMeasuresInHypothesis.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  isInfo() {
    if (this._stage === this._stages.INFO) {
      return true;
    } else {
      return false
    }
  }

  isRows() {
    if (this._stage === this._stages.ROWS) {
      return true;
    } else {
      return false
    }
  }

  isEditCustom() {
    if (this._stage === this._stages.EDIT_CUSTOM) {
      return true;
    } else {
      return false
    }
  }

  isContinuous() {
    let isContinuous = true;
    this._isuFactors.repeatedMeasuresInHypothesis.forEach( measure => {
      if ( measure.type !== 'Numeric') {
        isContinuous = false;
      }
    });
    return isContinuous;
  }

  isMeasureContinuous(measure: RepeatedMeasure) {
    let isContinuous = false;
    if ( measure.type === 'Numeric') {
      isContinuous = true;
    }
    return isContinuous;
  }

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  showHelpText(content) {
    this.modalService.dismissAll();
    this.helpTextModalReference = this.modalService.open(content);
    this.helpTextModalReference.result.then(
      (closeResult) => {
        this.log.debug('modal closed : ' + closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          this.log.debug('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          this.log.debug('modal dismissed when used pressed backdrop');
        } else {
          this.log.debug(dismissReason);
        }
      });
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  get HYPOTHESIS_NATURE(): { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any {
    return this._HYPOTHESIS_NATURE;
  }

  get selectedHypothesis() {
    return this._isuFactors.uMatrix.type;
  }

  get repeatedMeasuresIn(): Array<RepeatedMeasure> {
    return this._isuFactors.repeatedMeasuresInHypothesis;
  }

  get stage(): number {
    return this._stage;
  }

  get formErrors(): { nocols: string } {
    return this._formErrors;
  }

  get noRowsForm(): UntypedFormGroup {
    return this._noColsForm;
  }

  get maxCols(): number {
    return this._maxCols;
  }

  get uMatrixTex() {
    return this._isuFactors.uMatrix.toTeX();
  }

  get isMixed(): boolean {
    return this._isMixed;
  }
}
