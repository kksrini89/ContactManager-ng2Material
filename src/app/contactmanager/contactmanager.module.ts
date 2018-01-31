import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../shared/material.module';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserService } from './services/user.service';
import { NotesComponent } from './components/notes/notes.component';
import { NewcontactDialogComponent } from './components/newcontact-dialog/newcontact-dialog.component';

const routes: Routes = [
  {path: '', component: ContactmanagerAppComponent,
children: [
   {path: ':id', component: MainContentComponent},
   {path: '', component: MainContentComponent}
]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactmanagerAppComponent,
    MainContentComponent, SidenavComponent,
    ToolbarComponent, NotesComponent, NewcontactDialogComponent],
    entryComponents: [
      NewcontactDialogComponent
    ],
  providers: [
    UserService
  ]
})
export class ContactmanagerModule { }
