import {ISUFactorCombination} from './ISUFactorCombination';
import {constants} from './constants';
import {PartialMatrix} from './PartialMatrix';
import {CombinationId} from './CombinationId';
import {isNull, isNullOrUndefined} from 'util';

// A representation of StudyDesign's data that can be converted to
// and from JSON without being altered.
export interface ISUFactorJSON {
  name: string;
  origin: string;
  nature: string;
  isuFactorNature: string;
  valueNames: string[];
  child: ISUFactor;
  inHypothesis: boolean;
  partialMatrix: PartialMatrix;
}

/**
 * Model class defining each independent sampling unit factor.
 * This is a parent class and should never be instantiated directly.
 * Instead one of it subclasses eg. Outcome, RepeatedMeasure, Cluster or BetweenISUFactor should be used.
 */
export class ISUFactor {
  name: string;
  origin: string;
  nature: string;
  isuFactorNature: string;
  valueNames: string[] = [];
  child: ISUFactor;
  inHypothesis: boolean;
  partialMatrix?: PartialMatrix;

  static parseChild(json: ISUFactorJSON) {
    if (!isNullOrUndefined(json.child)){
      ISUFactor.fromJSON(JSON.stringify(json.child))
    } else {
      return null;
    }
  }

  static parsePartialMatrix(json: ISUFactorJSON) {
    if (!isNullOrUndefined(json.partialMatrix)){
      PartialMatrix.fromJSON(JSON.stringify(json.partialMatrix))
    } else {
      return null;
    }
  }

  // fromJSON is used to convert an serialized version
  // of the StudyDesign to an instance of the class
  static fromJSON(json: ISUFactorJSON|string): ISUFactor {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, ISUFactor.reviver);
    } else {
      // create an instance of the StudyDesign class
      const isuFactor = Object.create(ISUFactor.prototype);
      // copy all the fields from the json object
      return Object.assign(isuFactor, json, {
        // convert fields that need converting
        child: this.parseChild(json),
        partialMatrix: this.parsePartialMatrix(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ISUFactors.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? ISUFactor.fromJSON(value) : value;
  }

  /**
   * Default constructor for use by subclasses.
   * @param {string} name Name of this factor.
   * @param {string} nature String describing the nature of this factor. should be 'Between' or 'Within'
   * @param {string} origin String denoting which type of ISUFactor this is eg. 'Outcome', 'Repeated Measure', 'Cluster' or 'Between'. Used for comparing types at superclass level.
   */
  constructor(name?: string, nature?: string, origin?: string) {
    if (name) {
      this.name = name;
    }
    if (nature) {
      this.nature = nature;
    }
    if (origin) {
      this.origin = origin;
    }
    this.inHypothesis = false;
    this.isuFactorNature = constants.CONTRAST_MATRIX_NATURE.GLOBAL_TRENDS;
  }

  /**
   * Recursive function which returns an array of ISUFactorCombinationIds.
   * This contains every combination of value names of this factor and all of it's children:
   *
   * Time, values 1,2
   *
   * Dose, values 30, 50
   *
   * Gender, values m, f
   *
   * ...
   *
   * First the developer would set up the following parent child relationship:
   *
   * Time - Dose - Gender
   *
   * Then this function would be used to get the combinations of the values as follows:
   *
   *
   * Time 1, Dose 30, Gender M
   *
   * Time 1, Dose 30, Gender F
   *
   * Time 1, Dose 50, Gender M
   *
   * Time 1, Dose 50, Gender F
   *
   * Time 2, Dose 30, Gender M
   *
   * Time 2, Dose 30, Gender F
   *
   * Time 2, Dose 50, Gender M
   *
   * Time 2, Dose 50, Gender F
   *
   * @returns {Array<ISUFactorCombination>}
   */
  mapCombinations(): Array<ISUFactorCombination> {
    let combinations = new Array<ISUFactorCombination>();
    this.valueIds.forEach( value => {
      combinations.push(new ISUFactorCombination( [value] ));
    });

    if (!this.child) {
      return combinations;
    } else {
      const childCombinations = this.child.mapCombinations();
      combinations = this.combineLists(combinations, childCombinations);
      return combinations;
    }
  }

  /**
   * Function which combines two lists of CombinationId and returns a new list of {@link ISUFactorCombination}.
   *
   * combinations = ['Time1Dose30', 'Time1Dose50']
   *
   * childCombinations = ['M','F']
   *
   * newList = combineLists(combinations, childCombinations)
   *
   * newList = ['Time1Dose30M','Time1Dose30F', 'Time1Dose50M', 'Time1Dose50F']
   *
   * @param combinations parent list of ISUFactorCombination
   * @param childCombinations child list of ISUFactorCombination
   * @returns {Array} new list of combined ISUFactorCombination
   */
  combineLists(combinations, childCombinations) {
    const newCombinations = [];
    combinations.forEach( combination => {
        childCombinations.forEach( childCombination => {
          const id = combination.id.concat(childCombination.id);
          newCombinations.push(new ISUFactorCombination(id));
        });
      }
    );
    return newCombinations;
  }

  /**
   * Function returning boolean value for whether Partial matrix is defined
   * **/
  hasPartialMatrix() {
    if (!isNullOrUndefined(this.partialMatrix)  &&
      !isNullOrUndefined(this.partialMatrix.values)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns a list of CombinationId for this {@link ISUFactor} e.g.
   *
   *
   * ISUFactor Gender values 'M', 'F'
   *
   * Result ['GenderM', 'GenderF']
   *
   * @returns {Array<CombinationId>}
   */
  get valueIds(): Array<CombinationId> {
    const nameValuePairs = [];
    for ( const valueName of this.valueNames ) {
      nameValuePairs.push( new CombinationId(this.name, this.origin, valueName));
    }
    return nameValuePairs;
  }

  /**
   * Comparator function for ISUFactor
   * @param {ISUFactor} variable ISUFactor to compare to this.
   * @returns {boolean} Whether or not the two ISUFactors have the same properties.
   */
  compare(variable: ISUFactor) {
    if (variable.origin === this.origin && variable.name === this.name) {
      return true;
    }
    return false;
  }
}
