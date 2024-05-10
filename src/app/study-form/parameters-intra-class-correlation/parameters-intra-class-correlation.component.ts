import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudyService} from '../../shared/services/study.service';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Cluster} from '../../shared/model/Cluster';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../../shared/validators/minmax.validator';

@Component({
  selector: 'app-parameters-intra-class-correlation',
  templateUrl: './parameters-intra-class-correlation.component.html',
  styleUrls: ['./parameters-intra-class-correlation.component.scss']
})
export class ParametersIntraClassCorrelationComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _cluster: Cluster;
  private _intraClassCorrForm: UntypedFormGroup;
  private _formErrors = constants.PARAMETERS_INTRA_CLASS_CORRELATION_ERRORS;
  private _validationMessages = constants.PARAMETERS_INTRA_CLASS_CORRELATION_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;
  private _graphData = [];

  constructor(private study_service: StudyService,
              private _fb: UntypedFormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
      this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
        this.isuFactors = isuFactors;
      } );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.cluster = this.isuFactors.cluster;
    this.buildForm();
  }

  ngDoCheck() {
    this._updateIntraCorrelation();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    this.intraClassCorrForm = this.fb.group(
      this._defineControls()
    );
    this._defineControlsValidators();
    this.intraClassCorrForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
    this.setGraphData();
  }

  onValueChanged(data?: any) {
    if (!this.intraClassCorrForm) {
      return;
    }
    const form = this.intraClassCorrForm;

    this.formErrors['vectorofcorrelation'] = '';
    for (const field of Object.keys(this.intraClassCorrForm.value)) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages.vectorofcorrelation;
        for (const key in control.errors ) {
          if (!this.formErrors.vectorofcorrelation.includes(messages[key])) {
            this.formErrors.vectorofcorrelation += '' + messages[key];
          }
        }
      }
    }
  }

  _defineControls() {
    const controlArray = {};
    this.isuFactors.cluster.levels.forEach(
      level => {
        controlArray[level.levelName] = [level.intraClassCorellation];
      }
    );
    return controlArray;
  }

  _defineControlsValidators() {
    this.isuFactors.cluster.levels.forEach( level => {
      this.intraClassCorrForm.controls[level.levelName].setValidators(minMaxValidator(0, 1));
    });
  }

  _updateIntraCorrelation() {
    this.isuFactors.cluster.levels.forEach( level => {
      level.intraClassCorellation = this.intraClassCorrForm.get(level.levelName).value;
    });
    this.study_service.updateIsuFactors(this.isuFactors);
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

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get cluster(): Cluster {
    return this._cluster;
  }

  set cluster(value: Cluster) {
    this._cluster = value;
  }

  get intraClassCorrForm(): UntypedFormGroup {
    return this._intraClassCorrForm;
  }

  set intraClassCorrForm(value: UntypedFormGroup) {
    this._intraClassCorrForm = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  get formErrors(): { vectorofcorrelation: string; } {
    return this._formErrors;
  }

  set formErrors(value: { vectorofcorrelation: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    vectorofcorrelation: { required: string; minval: string; maxval: string; };
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    vectorofcorrelation: { required: string; minval: string; maxval: string;  };
  }) {
    this._validationMessages = value;
  }



  getLevelId(level, elementNo) {
    return level + ' ' + elementNo;
  }

  getTreePosition(parent) {
    const r = parent.split(' ');
    const pos = r[r.length - 1];
    return pos;
  }

  getElementNoFromPos(pos, parentId) {
    let elementNo = 1;
    if (parentId !== 'root') {
      elementNo = pos;
    }
    return elementNo;
  }

  /**
   * Build the input data for out d3 visualisation of the cluster.
   * **/
  setGraphData() {
    const graphData = [];

    // add the root
    const isuId = this._cluster.name
    let parentIds = ['root'];

    graphData.push({id: parentIds[0], description: isuId});

    this._cluster.levels.forEach( level => {
      let newIds = [];
      parentIds.forEach(parentId => {
        let p = 'root';
        if (parentId !== p) {
          p = parentId[0];
        }

        // get position
        let pos = 1
        if (parentId !== 'root') {
          pos = this.getTreePosition(parentId[0]);
        }
        const elementNo = this.getElementNoFromPos(pos, parentId) * level.noElements;

        // set lower id
        let id = this.getLevelId(level.levelName, elementNo - (level.noElements - 1));
        newIds.push([id, level.noElements, level.noElements - 1]);
        graphData.push({id: id, description: id, parent: p});

        if (level.noElements > 2) {
          id = level.levelName + ' ...';
          graphData.push({id: id, description: id, parent: p});
        }

        // set upper id
        id = this.getLevelId(level.levelName, elementNo);
        newIds.push([id, level.noElements, 0]);
        graphData.push({id: id, description: id, parent: p});
      });
      // remove extra branches we don't want to display - really I should sort this algorithmically, but this is simple.
      if (newIds.length > 2) {
        newIds = [newIds[0], newIds[newIds.length - 1]];
      }
      parentIds = newIds;
    });

    this._graphData = graphData;
  }

  get graphData(): any[] {
    return this._graphData;
  }

  set graphData(value: any[]) {
    this._graphData = value;
  }
}
