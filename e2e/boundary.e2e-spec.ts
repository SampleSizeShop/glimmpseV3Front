import { NavigationE2E } from './navigation.po';
import { BoundaryE2E  } from './boundary.po';

describe('demo-front-app input boundary check test', () => {   
    let page: NavigationE2E;
    let boundary: BoundaryE2E;  
    
    beforeEach(() => {
        page = new NavigationE2E();   
        boundary = new BoundaryE2E();
        page.navigateTo('/design/MODE');
    });

    it('', () => {
        
    });
});