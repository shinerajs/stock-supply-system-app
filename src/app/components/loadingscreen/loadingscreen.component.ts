import { Component, Input, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.scss']
})
export class LoadingscreenComponent implements OnInit,OnChanges {
  @Input() myInput:any;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
  }
}
