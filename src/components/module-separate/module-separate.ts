import { Component, Renderer2, ElementRef, Input } from '@angular/core';

/**
 * Generated class for the ModuleSeparate component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'module-separate',
  template: '<div style="clear: both" [ngStyle]="{\'height\': num + \'rem\'}"></div>'
})
export class ModuleSeparateComponent {

  @Input() num: number = 1;

  constructor(public element:ElementRef, public render:Renderer2) {
  }

  /*ngAfterViewInit(){
    let divEle = this.element.nativeElement.querySelector('div');
    this.render.setStyle(divEle, 'height', 10 * this.num / 10 + 'rem');
  }*/
}
