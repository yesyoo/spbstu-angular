import { Directive, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';



@Directive({
  selector: '[appBlockStyle]',
  host: {'(document:keyup)': 'initKeyUp($event)'},
  exportAs: 'blockStyle'
})
export class BlockStyleDirective implements OnInit, AfterViewInit, OnChanges{
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;

  public activeElementIndex: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if(this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if(this.initFirst) {
        if(this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');          
        }
      }
    } else {
      console.error("Не передан селектор")
    };

    setTimeout(() => {this.renderComplete.emit(true)}, 0)
  };
  ngOnChanges(changes: SimpleChanges): void {};

  initKeyUp(ev: KeyboardEvent): void {
    if(ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
        (this.items[this.index] as HTMLElement).removeAttribute('style'); 
    };
  
    if(ev.key === 'ArrowRight') {
      if(this.index !== this.items.length - 1) {
        this.index++;
        if(this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
          console.log(ev)
        };
      };
    }
    else if(ev.key === 'ArrowLeft' ) {
      if(this.index !== 0) {
        this.index--;
        if(this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
          console.log(ev)
        };
      };
    };
    this.activeElementIndex = this.index
  };
  initStyle(index: number): void {
    if(this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border:2px solid red')
    }
  };
};
