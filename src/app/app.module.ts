import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../app/services/auth.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/interceptors/token-interceptor';
import { JwtInterceptor } from '../app/interceptors/jwt-interceptor';

import { AdminGuard } from '../app/guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AuthorizedGuard } from './guards/authorized.guard';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { Routes } from './constants/routes';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        AdminComponent,
        TeachersComponent,
        SubjectsComponent,
        TeacherEditComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: Routes.login, pathMatch: 'full' },
            { path: Routes.login, component: LoginComponent },
            { path: Routes.main, component: MainComponent, canActivate: [AuthorizedGuard]},
            { path: Routes.admin, component: AdminComponent, canActivate: [AdminGuard],
                children: [
                    { path: '', redirectTo: Routes.teachers, pathMatch: 'full' },
                    { path: Routes.teachers, component: TeachersComponent, children: [
                        { path: Routes.teacherEdit, component: TeacherEditComponent }
                    ]},
                    { path: Routes.subjects, component: SubjectsComponent }
                ]
            },
            { path: '**', redirectTo:  Routes.login}
        ])
    ],
    bootstrap: [AppComponent],
    providers: [AdminGuard, AuthService, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      }
    ]
})

export class AppModule { }
