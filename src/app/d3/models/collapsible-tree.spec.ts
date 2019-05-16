import {CollapsibleTree} from './collapsible-tree';


describe('CollapsibleTree', () => {
  let tree: CollapsibleTree;

  beforeEach(() => {
    const data = [
      {id: '1', description: 'root'},
      {id: '2', description: '2', parent: '1'},
      {id: '3', description: '3', parent: '2'},
      {id: '4', description: '4', parent: '2'},
      {id: '5', description: '5', parent: '2'},
      {id: '6', description: '6', parent: '2'},
      {id: '7', description: '7', parent: '2'},
      {id: '8', description: '8', parent: '2'},
      {id: '9', description: '9', parent: '2'}
    ]
    tree = new CollapsibleTree(data, {width: 100, height: 100});
  });

  it('should be created', () => {
    const a = 1;
  });
});
