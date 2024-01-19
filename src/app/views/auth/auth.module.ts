import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        LandingComponent,
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        AuthRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        // BrowserAnimationsModule,
        // BrowserModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        LandingComponent,
    ]
})
export class AuthModule { }
