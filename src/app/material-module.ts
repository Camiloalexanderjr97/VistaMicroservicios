import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPseudoCheckboxModule } from '@angular/material/core';


@NgModule({
  imports: [MatButtonModule, MatPseudoCheckboxModule,MatInputModule,MatIconModule],
  exports: [MatButtonModule, MatInputModule, MatIconModule]
})


export class MaterialModule{}