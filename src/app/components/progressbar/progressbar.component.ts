import { Component, Input, OnInit ,OnChanges} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit,OnChanges {
  @Input() _value:any;
  @Input() _color:any;
  @Input() _buffercolor:any;
  @Input() _height:any;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: any) {
    
  }
}
