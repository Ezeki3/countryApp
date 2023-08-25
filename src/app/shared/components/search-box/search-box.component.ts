import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.debouncer
    .pipe( 
      debounceTime( 300 ) //ponemos un timer que despues de ese tiempo nos pase el dato
    )
    .subscribe( value => {
      this.onDebounce.emit( value ) // despues aqui emitimos el valor
    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value:string):void{
    this.onValue.emit(value)
  }

  onKeyPress( searchTerm: string){
    this.debouncer.next(searchTerm)
  }

}
