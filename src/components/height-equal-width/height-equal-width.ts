import {Directive, ElementRef, Renderer2} from '@angular/core';

/**
 * Generated class for the HeightEqualWidth directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[height-equal-width]' // Attribute selector
})
export class HeightEqualWidthDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(){
    // this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.elementRef.nativeElement.clientWidth / 10 + 'rem');
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.elementRef.nativeElement.clientWidth + 'px');
  }

}
