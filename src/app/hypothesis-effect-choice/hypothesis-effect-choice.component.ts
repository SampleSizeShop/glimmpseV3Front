import { Component, OnInit } from '@angular/core';
import {HypothesisEffectVariable} from '../shared/HypothesisEffectVariable';
import {HypothesisEffect} from '../shared/HypothesisEffect';

@Component({
  selector: 'app-hypothesis-effect-choice',
  templateUrl: './hypothesis-effect-choice.component.html',
  styleUrls: ['./hypothesis-effect-choice.component.css']
})
export class HypothesisEffectChoiceComponent implements OnInit {
  private _variables: HypothesisEffectVariable[];
  private _possibleEffects: HypothesisEffect[];

  constructor() {
    this.variables = [];
    this.possibleEffects = [];
  }

  ngOnInit() {
  }

  determinePossibleEffects() {
    this.variables.forEach( variable =>  {
      const vars = this.deepCopyList(this.variables);
      const effect = new HypothesisEffect();
      effect.addVariable(variable);
      this.generateCombinations(effect, vars);
    });
  }

  generateCombinations(effect: HypothesisEffect, variables) {
    this.addEffectToList(effect);
    variables = this.removeExistingVariables(effect, variables);
    variables.forEach(variable => {
      const vars = this.deepCopyList(variables);
      const newEffect = this.deepCopyEffect(effect);
      newEffect.addVariable(variable);
      this.addEffectToList(newEffect);
      this.generateCombinations(newEffect, vars);
    });
  }

  addEffectToList(effect: HypothesisEffect) {
    if (!this.effectInList(effect, this.possibleEffects)) {
      const newEffect = this.deepCopyEffect(effect);
      this.possibleEffects.push(newEffect);
    }
  }

  effectInList(effect: HypothesisEffect, list: HypothesisEffect[]) {
    let effectInList = false;
    list.forEach(value => {
      if (effect.compare(value)) { effectInList = true; }
    })
    return effectInList;
  }

  removeExistingVariables(effect: HypothesisEffect, variables: HypothesisEffectVariable[]) {
    effect.variables.forEach( val => {
      const index = variables.indexOf(val);
      if (index !== -1) {
        variables.splice(index, 1)
      };
    })
    return variables;
  }

  deepCopyList(list) {
    const newList = [];
    list.forEach( val => { newList.push(val); } );
    return newList;
  }

  deepCopyEffect(effect: HypothesisEffect) {
    const newEffect = new HypothesisEffect();
    effect.variables.forEach(val => {
      newEffect.addVariable(val);
    })
    return newEffect;
  }

  get variables(): HypothesisEffectVariable[] {
    return this._variables;
  }

  set variables(value: HypothesisEffectVariable[]) {
    this._variables = value;
  }

  get possibleEffects(): HypothesisEffect[] {
    return this._possibleEffects;
  }

  set possibleEffects(value: HypothesisEffect[]) {
    this._possibleEffects = value;
  }
}
