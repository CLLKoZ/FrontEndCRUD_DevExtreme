import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { MatGridListModule } from '@angular/material/grid-list';
import { DxAutocompleteModule, DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxSelectBoxModule, DxSpeedDialActionModule } from 'devextreme-angular';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogoDeleteComponent } from './Modals/dialogo-delete/dialogo-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule, SideNavOuterToolbarModule, SideNavInnerToolbarModule,
    SingleCardModule, FooterModule, ResetPasswordFormModule,
    CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule,
    UnauthenticatedContentModule, AppRoutingModule, ReactiveFormsModule,
    HttpClientModule, MatFormFieldModule, DxDataGridModule, 
    DxFormModule, DxButtonModule, DxSpeedDialActionModule, 
    DxAutocompleteModule, DxSelectBoxModule, DxDateBoxModule, 
    MatDatepickerModule, MatDialogModule, MatGridListModule, 
    MatNativeDateModule, MomentDateModule, MatSnackBarModule,
    MatIconModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    ScreenService,
    AppInfoService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
