import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { NestedobjectsearchPipe } from './nestedobjectsearch.pipe';



@NgModule({
  declarations: [
    SearchPipe,
    NestedobjectsearchPipe
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    SearchPipe,
    NestedobjectsearchPipe
  ]
})
export class PipeModule { }
