import {constants, getStageName} from './constants';

describe('ISUFactors', () => {

  it('Should correctly match address and routing name', () => {
    const stagename = []
    Object.keys(constants.STAGES).forEach( key => { stagename.push(key) });
    stagename.forEach( function (value, i){
      expect(getStageName(i)).toBe(value);
    });
  });

});
