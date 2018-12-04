import {Component, ElementRef, Input, Renderer2,} from '@angular/core';

/**
 * Generated class for the EmptyView component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'empty-view',
  template: '<div class="empty-view"><div class="icon"></div><div title-color-2 class="title">{{text}}</div> </div>'
})
export class EmptyViewComponent {

  @Input() text: string = '暂无记录';
  @Input() excessHeight: number = 0;

  constructor(public element:ElementRef, public render:Renderer2) {
  }

  ngAfterViewInit(){
    let divEle = this.element.nativeElement.querySelector('div');
    this.render.setStyle(divEle, 'margin-top', ((window.innerHeight - 64 - this.excessHeight)/2 - 100)/ 10 + 'rem');
  }
}
