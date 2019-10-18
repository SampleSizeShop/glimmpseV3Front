import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-help-text',
  templateUrl: './control-help-text.component.html',
  styleUrls: ['./control-help-text.component.scss']
})
export class ControlHelpTextComponent implements OnInit {

  private _selected_tab: string;
  constructor() { }

  ngOnInit() {
    this.selectTab('navigation');
  }

  isTabSelected(tab: string) {
    return this._selected_tab === tab ? true : false;
  }

  selectTab(tab: string) {
    this._selected_tab = tab;
  }

}
