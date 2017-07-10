import {Directive, ElementRef, Input, OnChanges, OnInit} from "@angular/core";

@Directive({
  selector: '[mathJaxExpr]'})
export class MathJaxDirective implements OnInit, OnChanges {
  @Input("mathJaxExpr") private value: string = "";
  constructor(private element: ElementRef){
    MathJax.Hub.Config({
      showProcessingMessages: false,
      jax: ["input/TeX", "output/HTML-CSS"],
      TeX: {
        TagSide: "left",
        Macros: {
          RR: '{\\bf R}',
          bold: ['{\\bf #1}',1]
        }
      }});
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
