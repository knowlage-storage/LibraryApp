﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './Components/app.component';
import { AuthorComponent } from './Components/author.component';
import { BookComponent } from './Components/book.component';
import { NotFoundComponent } from './Components/not-found.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'authors', component: AuthorComponent },
    { path: 'books', component: BookComponent },
    { path: 'booksByAuthor/:id', component: BookComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, AuthorComponent, BookComponent, NotFoundComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }