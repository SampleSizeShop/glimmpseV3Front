import {Directive, ElementRef, Input, OnChanges, OnInit} from "@angular/core";

@Directive({
  selector: '[mathJaxExpr]'})
export class FlaskDirective implements OnInit, OnChanges {
  @Input("flaskExpr") private value: string = "";
  constructor(private element: ElementRef){
  }

  ngOnInit(){
    this.element.nativeElement.innerHTML = this.value;
  }

  ngOnChanges(){
    this.element.nativeElement.innerHTML = this.value;
  }
}
