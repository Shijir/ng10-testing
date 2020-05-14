import { Component, ViewChild, TemplateRef, EmbeddedViewRef, ViewContainerRef, ElementRef, ComponentFactoryResolver, Input, Injector, ContentChildren, QueryList } from '@angular/core';

@Component({ 
  selector: 'host-view-accessor',
  template: `<ng-template #portal><ng-content></ng-content></ng-template>`
})
export class HostViewAccessor {
  @ViewChild('portal', { static: true, read: TemplateRef }) templateRef: TemplateRef<void>;
}


@Component({
  selector: 'cell',
  template: `<ng-content></ng-content>`
})
export class CellComponent  {
  view: EmbeddedViewRef<void>;  

  constructor(private el: ElementRef, private cfr: ComponentFactoryResolver) {}

  ngOnInit() {
    const dynamicHostViewAccessorFactory = this.cfr.resolveComponentFactory(HostViewAccessor);
    const dynamicHostViewAccessorCompRef = dynamicHostViewAccessorFactory.create(Injector.NULL, [[this.el.nativeElement]]);
    this.view = dynamicHostViewAccessorCompRef.instance.templateRef.createEmbeddedView();
  }
}


@Component({
  selector: 'row',
  template: `<ng-content></ng-content><ng-container #cellsContainer></ng-container>`
})
export class RowComponent  {
  @ViewChild('cellsContainer', { static: false, read: ViewContainerRef }) cellsContainer: ViewContainerRef;

  @ContentChildren(CellComponent) cells: QueryList<CellComponent>;

  ngAfterViewInit() {
    this.cells.forEach(cell => this.cellsContainer.insert(cell.view));

    setTimeout(() => {

      this.cellsContainer.move(this.cellsContainer.get(1), 0);

    }, 3000);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng10';
}
