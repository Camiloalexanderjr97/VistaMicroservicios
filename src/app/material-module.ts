import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { MatDialogModule } from '@angular/material/dialog';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
// import { DataTablesModule } from '@angular/cdk/collections';


@NgModule({
  imports: [NgxChartsModule,NgbCarouselModule,MatButtonModule,MatNativeDateModule,MatDatepickerModule,NgbCarouselModule,CarouselModule, MatPseudoCheckboxModule,MatInputModule,MatIconModule,MatSortModule,CommonModule,DataTablesModule,MatTableModule,MatPaginatorModule],
  exports: [NgxChartsModule,NgbCarouselModule,MatButtonModule,MatNativeDateModule,MatDatepickerModule, MatInputModule, NgbCarouselModule,CarouselModule,MatIconModule,MatProgressBarModule,MatSortModule,CommonModule,DataTablesModule,MatTableModule,MatPaginatorModule,MatAutocompleteModule]
})


export class MaterialModule{}