import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    KeyValuePipe,
    JsonPipe,
    RouterLink,    

    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    OverlayModule,
  ],
  exports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    KeyValuePipe,
    JsonPipe,
    RouterLink,

    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    OverlayModule,
  ]
})
export class SharedModule { }
