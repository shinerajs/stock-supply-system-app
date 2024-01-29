import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
// import { SinglenewsitemComponent } from './singlenewsitem/singlenewsitem.component';
// import { UsernamepicComponent } from './usernamepic/usernamepic.component';
import {MatCardModule} from '@angular/material/card';
//import { DaywidgetComponent } from './daywidget/daywidget.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
// import { PopupaddimageComponent } from './popupaddimage/popupaddimage.component';
// import { DndDirective } from 'src/app/directives/dnd.directive';
// import { UploadfileComponent } from './uploadfile/uploadfile.component';
// import { NopremiumwallComponent } from './nopremiumwall/nopremiumwall.component';
// import { EditimageComponent } from './editimage/editimage.component';
//import { TagsAddingChipCompComponent } from './tags-adding-chip-comp/tags-adding-chip-comp.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
//import { PremiumaggrementComponent } from './premiumaggrement/premiumaggrement.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
//import { ProfilecardComponent } from './profilecard/profilecard.component';
//import { IndividualproductComponent } from './individualproduct/individualproduct.component';
import { MatBadgeModule } from '@angular/material/badge';
import { LoadingscreenComponent } from './loadingscreen/loadingscreen.component';
import { OverlayModule } from '@angular/cdk/overlay';
//import { ProgressbarComponent } from './progressbar/progressbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { ImagecropuploadComponent } from './imagecropupload/imagecropupload.component';
//import { ImageCropperModule } from 'ngx-image-cropper';
import {MatSliderModule} from '@angular/material/slider';
//import { PopupaddRequirementComponent } from './popupadd-requirement/popupadd-requirement.component';
//import { ImagecroppermodelComponent } from './imagecroppermodel/imagecroppermodel.component';
//import { ImageSliderViewComponent } from './image-slider-view/image-slider-view.component';
//import { NewCalendarModule } from './new-calendar/new-calendar.module';
//import { CustomProgressbarModule } from './custom-progressbar/custom-progressbar.module';
//import { PopupadddocbyadminComponent } from './popupadddocbyadmin/popupadddocbyadmin.component';
import { MatRadioModule } from '@angular/material/radio';
import { SidetoastnotiComponent } from './sidetoastnoti/sidetoastnoti.component';
//import { PopupdateselectionComponent } from './popupdateselection/popupdateselection.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { DatepickerComponent } from './datepicker/datepicker.component';
//import { MeetingModule } from './meeting/meeting.module';
//import { EachDocComponent } from './each-doc/each-doc.component';
//import { DividerwithheaderComponent } from './dividerwithheader/dividerwithheader.component';
//import { PopupchatdetailComponent } from './popupchatdetail/popupchatdetail.component';
//import { PopupchatroomslistComponent } from './popupchatroomslist/popupchatroomslist.component';
import { CustomalertComponent } from './customalert/customalert.component';
import { PipeModule } from '../pipe/pipe.module';
//import { PhotonameComponent } from './photoname/photoname.component';
//import { ReadmoreComponent } from './readmore/readmore.component';
//import { CustombannertemplateComponent } from './custombannertemplate/custombannertemplate.component';
//import { PopupdocuploadComponent } from './popupdocupload/popupdocupload.component';
//import { GooglemapsModule } from './googlemaps/googlemaps.module';
//import { ModerndashboardModule } from './moderndashboard/moderndashboard.module';
//import { PaymentModule } from '../views/payments/payment/payment.module';
// import { PopuppaymentsucessComponent } from './popup-payment-sucess/popuppaymentsucess.component';
// import { DateandtimeselectionModule } from './dateandtimeselection/dateandtimeselection.module';


@NgModule({
  declarations: [
   // SearchbarComponent,
  //  SinglenewsitemComponent,
   // DaywidgetComponent,
    //UsernamepicComponent,
    //PopupaddimageComponent,
   // DndDirective,
   // UploadfileComponent,
   // NopremiumwallComponent,
    //EditimageComponent,
   // TagsAddingChipCompComponent,
    //PremiumaggrementComponent,
    //ProfilecardComponent,
    //IndividualproductComponent,
    LoadingscreenComponent,
    //ProgressbarComponent,
    //ImagecropuploadComponent,
   // PopupaddRequirementComponent,
   // ImagecroppermodelComponent,
   // ImageSliderViewComponent,
    //PopupadddocbyadminComponent,
    SidetoastnotiComponent,
    //PopupdateselectionComponent,
   // DatepickerComponent,
   // EachDocComponent,
   // DividerwithheaderComponent,
   // PopupchatdetailComponent,
   // PopupchatroomslistComponent,
    CustomalertComponent,
   // PhotonameComponent,
   // ReadmoreComponent,
   // CustombannertemplateComponent,
   // PopupdocuploadComponent,
   // PopuppaymentsucessComponent
   ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatBadgeModule,
    OverlayModule,
    MatProgressBarModule,
    //ImageCropperModule,
    MatSliderModule,
   // NewCalendarModule,
    //CustomProgressbarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
   // GooglemapsModule,
   // ModerndashboardModule,
   // PaymentModule,
    //DateandtimeselectionModule
  ],
  exports:[
    //SearchbarComponent,
   // SinglenewsitemComponent,
   /// UsernamepicComponent,
   // DaywidgetComponent,
   // PopupaddimageComponent,
   // DndDirective,
   // UploadfileComponent,
    //NopremiumwallComponent,
    //EditimageComponent,
    //TagsAddingChipCompComponent,
   // PremiumaggrementComponent,
   // ProfilecardComponent,
   // IndividualproductComponent,
    LoadingscreenComponent,
   // ProgressbarComponent,
   // ImagecropuploadComponent,
   // PopupaddRequirementComponent,
   // ImageSliderViewComponent,
    //DatepickerComponent,
    //EachDocComponent,
   // DividerwithheaderComponent,
    CustomalertComponent,
    PipeModule,
    //PhotonameComponent,
    //ReadmoreComponent,
   // NewCalendarModule,
    //CustombannertemplateComponent,
    //PopupdocuploadComponent,
  //  GooglemapsModule,
   // ModerndashboardModule,
    //PopuppaymentsucessComponent
    
  ],
  //entryComponents: [LoadingscreenComponent]
})
export class ComponentsModuleModule { }
