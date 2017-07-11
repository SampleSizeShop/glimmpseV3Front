import {Directive, ElementRef, Input, OnChanges, OnInit} from "@angular/core";

@Directive({
  selector: '[flaskExpr]'})
export class FlaskDirective implements OnInit, OnChanges {
  @Input("flaskExpr") private value: string = "";
  constructor(private element: ElementRef){
  }

  ngOnInit(){
    this.element.nativeElement.innerHTML = this.value;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
  }

  ngOnChanges(){
    this.element.nativeElement.innerHTML = this.value;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
  }
}
