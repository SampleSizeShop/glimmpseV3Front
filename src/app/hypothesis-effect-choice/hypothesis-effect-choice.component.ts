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
    this.possibleEffects.sort(this.compare);
  }

  compare(a: HypothesisEffect, b: HypothesisEffect) {
    const alphabetScore = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26
    };

    let ret = 0;
    if (!a.equals(b)) {
      if (a.variables.length < b.variables.length) {
        ret = -1;
      }
      if (a.variables.length > b.variables.length) {
        ret = 1;
      }
      if (a.variables.length === b.variables.length) {
        const aNames: string[] = [];
        const bNames: string[] = [];

        a.variables.forEach(variable => {
          aNames.push(variable.name);
        });
        b.variables.forEach(variable => {
          bNames.push(variable.name);
        });

        let aScore = 0;
        aNames.forEach( name => {
          const char1 = name.substring(0, 1).toLowerCase();
          const sc = alphabetScore[char1];
          aScore = aScore + sc;
        });
        let bScore = 0;
        bNames.forEach( name => {
          const char1 = name.substring(0, 1).toLowerCase();
          const sc = alphabetScore[char1];
          bScore = bScore + sc;
        });

        if ( aScore === bScore ) {
          ret = 0;
        } else {
          ret = aScore > bScore ? 1 : -1;
        }
      }
    }
    return ret;
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
      if (effect.equals(value)) { effectInList = true; }
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
