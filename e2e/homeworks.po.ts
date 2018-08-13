import { browser, by, element, protractor } from 'protractor';

export class HomeworkDataModelE2E {
    loadGoldStandard(file: string){
        return require(file);
    };

    getOutputDataModelValue(cid:string, field: string){
        return element(by.id(cid)).getText().then(x => {return JSON.parse(x)[field]})
    }

    getOutputDataModel(cid:string){
        return element(by.id(cid)).getText().then(x => {return JSON.parse(x)})
    }
}