import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {MonsterComponent} from './monster/monster.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import {ContextDialogComponent} from './shared/dialogs/context-dialog/context-dialog.component';
import {EditFormComponent} from './shared/dialogs/context-dialog/edit-form/edit-form.component';
import {AddFormComponent} from './shared/dialogs/context-dialog/add-form/add-form.component';
import {RemoveFormComponent} from './shared/dialogs/context-dialog/remove-form/remove-form.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {HeaderComponent} from './shell/header/header.component';
import {SortHeaderComponent} from './monster/sort-header/sort-header.component';
import {SearchBarComponent} from './monster/search-bar/search-bar.component';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    MonsterComponent,
    ContextDialogComponent,
    EditFormComponent,
    AddFormComponent,
    RemoveFormComponent,
    HeaderComponent,
    SortHeaderComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    NgbModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
    ProgressSpinnerModule,
    CheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
