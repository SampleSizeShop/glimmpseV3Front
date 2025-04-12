import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {constants, getName} from 'app/shared/model/constants';
import {StudyService} from '../../shared/services/study.service';
import {Subscription, Observable} from 'rxjs';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {isNullOrUndefined} from 'util';
import {PartialMatrix} from '../../shared/model/PartialMatrix';
import {Router} from '@angular/router';
import {Predictor} from '../../shared/model/Predictor';
import {NGXLogger} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {ContrastMatrixService} from '../custom-contrast-matrix/contrast-matrix.service';
import {fadeTransition} from '../../animations/animations';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-mixed.component.html',
  providers: [ContrastMatrixService],
  animations: [fadeTransition],
  styleUrls: ['./hypothesis-mixed.component.css']
})
export class HypothesisMixedComponent implements OnInit, OnDestroy {
  private _stages = constants.HYPOTHESIS_MIXED_STAGES;
  private _stage = this._stages.INFO;
  private _next = this._stages.INFO;
  private _showAdvancedOptions: boolean;
  private _HYPOTHESIS_NATURE = constants.CONTRAST_MATRIX_NATURE;
  private _isuFactors: ISUFactors;
  private _formErrors = constants.HYPOTHESIS_BETWEEN_FORM_ERRORS;
  private _validationMessages = constants.HYPOTHESIS_BETWEEN_VALIDATION_MESSAGES;
  private _noRowsForm: UntypedFormGroup;
  private _maxRows: number;
  private _numCustomRows: number;
  private _noColsForm: UntypedFormGroup;
  private _maxCols: number;
  private _numCustomCols: number;
  private _contrast_matrix: PartialMatrix;
  private _contrast_matrix_for: string;
  private screenWidth;
  private _stashedBetweenNature: string;
  private _stashedWithinNature: string;

  private _isuFactorsSubscription: Subscription;
  private _contrastMatrixSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  texString = '';

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
      if (isNullOrUndefined(this._isuFactors.cMatrix)) {
        this._isuFactors.cMatrix = new PartialMatrix(this.HYPOTHESIS_NATURE.GLOBAL_TRENDS);
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
    this._stashedBetweenNature = this._isuFactors.cMatrix.type;
    this._stashedWithinNature = this._isuFactors.uMatrix.type;
    this.buildForm();
    this.onResize();
  }

  buildForm(): void {
    this._noRowsForm = this.fb.group({
      norows: [this._numCustomRows, minMaxValidator(1, this._maxRows)]
    });
    this._noColsForm = this.fb.group({
      nocols: [this._numCustomCols, minMaxValidator(1, this._maxCols)]
    });
    this._noRowsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this._noColsForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.noRowsForm) {
      return;
    }
    if (!this._noColsForm) {
      return;
    }
    const colsForm = this._noColsForm;
    const rowsForm = this.noRowsForm;

    for (const field in this._formErrors) {
      if (this._formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = rowsForm.get(field);
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
    for (const field in this._formErrors) {
      if (this._formErrors.hasOwnProperty(field)) {
        this._formErrors[field] = '';
        const control = colsForm.get(field);
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
    if (this._isuFactors.cMatrix.type === this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS ||
      this._isuFactors.cMatrix.type === this.HYPOTHESIS_NATURE.CUSTOM_C_MATRIX ||
      this._isuFactors.cMatrix.type === this.HYPOTHESIS_NATURE.IDENTITY) {
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
    this._stashedBetweenNature = this._isuFactors.cMatrix.type;
    this._stashedWithinNature = this._isuFactors.uMatrix.type;

    this._isuFactors.cMatrix.type = nature;
    this._isuFactors.uMatrix.type = nature;
    if (nature === this.HYPOTHESIS_NATURE.CUSTOM_C_MATRIX) {
      this._isuFactors.uMatrix.type = this.HYPOTHESIS_NATURE.CUSTOM_U_MATRIX;
      this.setCustomCMatrix();
    } else if (nature !== this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS) {
      this._isuFactors.predictors.forEach( predictor => {
          predictor.isuFactorNature = nature;
        }
      );
      this._isuFactors.repeatedMeasures.forEach( measure => {
          measure.isuFactorNature = nature;
        }
      );
    }
  }

  private setContrastMatrix(contrast_matrix) {
    this._contrast_matrix = contrast_matrix;
    if (this._contrast_matrix_for === 'CMATRIX') {
      this._isuFactors.cMatrix = new PartialMatrix(this.HYPOTHESIS_NATURE.CUSTOM_C_MATRIX);
      this._isuFactors.cMatrix.values = this._contrast_matrix.values;
    } else if (this._contrast_matrix_for === 'UMATRIX') {
      this._isuFactors.uMatrix = new PartialMatrix(this.HYPOTHESIS_NATURE.CUSTOM_U_MATRIX);
      this._isuFactors.uMatrix.values = this._contrast_matrix.values;
    } else {
      this._isuFactors.predictorsInHypothesis.forEach(predictor => {
        if (predictor.name === this._contrast_matrix_for) {
          predictor.partialMatrix = new PartialMatrix(this.selectedHypothesis);
          predictor.partialMatrix.values = this._contrast_matrix.values;
        }
      });

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
    this._isuFactors.predictors.forEach( predictor => {
      if (predictor.name === name) {
        predictor.isuFactorNature = nature;
      }
    });
    this._isuFactors.repeatedMeasures.forEach( measure => {
      if (measure.name === name) {
        measure.isuFactorNature = nature;
      }
    });
  }

  setMeasurePolynomialOrder(name: string, order: number) {
    this.log.debug( name + ' set: ' + order );
    this._isuFactors.repeatedMeasures.forEach( measure => {
      if (measure.name === name) {
        measure.polynomialOrder = order;
      }
    });
  }

  setPredictorPolynomialOrder(name: string, order: number) {
    this.log.debug( name + ' set: ' + order );
    this._isuFactors.predictors.forEach( predictor => {
      if (predictor.name === name) {
        predictor.polynomialOrder = order;
      }
    });
  }

  setCustomPartialCMatrix(predictor: Predictor) {
    predictor.isuFactorNature = this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS;
    this._contrast_matrix_for = predictor.name;
    if (!isNullOrUndefined(predictor)) {
      this.updateContrastBetweenMatrix(predictor);
      this.buildForm();
    }
    this.rows();
  }

  setCustomPartialUMatrix(repMeasure: RepeatedMeasure) {
    repMeasure.isuFactorNature = this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS;
    this._contrast_matrix_for = repMeasure.name;
    if (!isNullOrUndefined(repMeasure)) {
      this.updateContrastWithinMatrix(repMeasure);
      this.buildForm();
    }
    this.cols();
  }

  setCustomCMatrix() {
    this._contrast_matrix_for = 'CMATRIX';
    const cMatrixObject = this.createCustomCmatrixObject();
    if (!isNullOrUndefined(cMatrixObject)) {
      this.updateContrastBetweenMatrix(cMatrixObject);
      this.buildForm();
    }
    this.rows();
  }


  setCustomUMatrix() {
    this._contrast_matrix_for = 'UMATRIX';
    const uMatrixObject = this.createCustomUmatrixObject();
    if (!isNullOrUndefined(uMatrixObject)) {
      this.updateContrastWithinMatrix(uMatrixObject);
      this.buildForm();
    }
    this.cols();
  }

  private updateContrastBetweenMatrix(predictor: Predictor) {
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

  private updateContrastWithinMatrix(repMeasue: RepeatedMeasure) {
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

  private createCustomCmatrixObject() {
    const cMatrixObject = new Predictor();
    cMatrixObject.name = 'your ';

    this._isuFactors.predictors.forEach(predictor => {
      cMatrixObject.name = cMatrixObject.name + predictor.name + ' x '
      predictor.valueNames.forEach(name => {
        cMatrixObject.valueNames.push(name);
      });
    });
    cMatrixObject.name = cMatrixObject.name.slice(0, cMatrixObject.name.length - 2);
    cMatrixObject.name = cMatrixObject.name + 'hypothesis'
    return cMatrixObject;
  }

  private createCustomUmatrixObject() {
    const uMatrixObject = new RepeatedMeasure();
    uMatrixObject.name = 'your ';

    this._isuFactors.outcomes.forEach(outcome  => {
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

  rows() {
    this._next = this._stages.ROWS;
    this._stage = -1;
  }

  cols() {
    this._next = this._stages.COLS;
    this._stage = -1;
  }

  editCustomRows() {
    this.contrast_matrix_service.update_rows(this._noRowsForm.get('norows').value);
    this._next = this._stages.EDIT_BETWEEN_CUSTOM;
    this._stage = -1;
  }

  editCustomCols() {
    this.contrast_matrix_service.update_cols(this._noColsForm.get('nocols').value);
    this._next = this._stages.EDIT_WITHIN_CUSTOM;
    this._stage = -1;
  }

  showInfo(cancel?: boolean) {
    if (cancel) {
      this._isuFactors.cMatrix.type = this._stashedBetweenNature;
      this._isuFactors.uMatrix.type = this._stashedWithinNature;
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

  predictorsInHypothesis(): boolean {
    if (!isNullOrUndefined(this._isuFactors)
      && !isNullOrUndefined(this._isuFactors.predictorsInHypothesis)
      && this._isuFactors.predictorsInHypothesis.length > 0) {
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
      return false;
    }
  }

  isCols() {
    if (this._stage === this._stages.COLS) {
      return true;
    } else {
      return false;
    }
  }

  isEditBetweenPartialCustom() {
    if (this._stage === this._stages.EDIT_BETWEEN_CUSTOM
      && this.selectedHypothesis === this.HYPOTHESIS_NATURE.USER_DEFINED_PARTIALS) {
      return true;
    } else {
      return false
    }
  }

  isEditBetweenCustom() {
    if (this._stage === this._stages.EDIT_BETWEEN_CUSTOM
      && this.selectedHypothesis === this.HYPOTHESIS_NATURE.CUSTOM_C_MATRIX) {
      return true;
    } else {
      return false
    }
  }

  isEditWithinCustom() {
    if (this._stage === this._stages.EDIT_WITHIN_CUSTOM) {
      return true;
    } else {
      return false
    }
  }

  allPredictorsContinuous() {
    let isContinuous = true;
    this._isuFactors.predictorsInHypothesis.forEach( predictor => {
      if ( predictor.type !== getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS) ) {
        isContinuous = false;
      }
    });
    return isContinuous;
  }

  allMeasuresContinuous() {
    let isContinuous = true;
    this._isuFactors.repeatedMeasuresInHypothesis.forEach( measure => {
      if ( measure.type !== 'Numeric') {
        isContinuous = false;
      }
    });
    return isContinuous;
  }

  isPredictorContinuous(predictor: Predictor) {
    let isContinuous = false;
      if ( predictor.type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS) ) {
        isContinuous = true;
      }
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

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  get predictorsIn(): Array<Predictor> {
    return this._isuFactors.predictorsInHypothesis;
  }

  get repeatedMeasuresIn(): Array<RepeatedMeasure> {
    return this._isuFactors.repeatedMeasuresInHypothesis;
  }

  get stage(): number {
    return this._stage;
  }

  get formErrors(): { norows: string } {
    return this._formErrors;
  }

  get noRowsForm(): UntypedFormGroup {
    return this._noRowsForm;
  }

  get noColsForm(): UntypedFormGroup {
    return this._noColsForm;
  }

  get maxRows(): number {
    return this._maxRows;
  }

  get maxCols(): number {
    return this._maxCols;
  }

  get selectedHypothesis() {
    return this._isuFactors.cMatrix.type;
  }

  get cMatrixTex() {
    return this._isuFactors.cMatrix.toTeX();
  }

  get uMatrixTex() {
    return this._isuFactors.uMatrix.toTeX();
  }
}
