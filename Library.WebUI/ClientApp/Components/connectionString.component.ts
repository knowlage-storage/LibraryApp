﻿import { Component, OnDestroy } from '@angular/core';
import { СonnectionString } from '../Models/connectionString';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { connectionStringService } from '../Services/connectionString.service';

@Component({
    selector: 'chose-connection-string',
    template: `<div><h2> Выбор БД </h2>
        <p><a (click)="choseDb(DefaultConnection)">MsSql</a> <a (click)="choseDb(MongoDbConnection)">MongoDb</a></p>
<div>{{error}}</div>
    </div>`,
    providers: [connectionStringService]
})

export class ConnectionStringComponent implements OnDestroy {

    private sub: Subscription;
    DefaultConnection: string = "DefaultConnection";
    MongoDbConnection: string = "MongoDbConnection";
    conStringDb: СonnectionString;
    error: any;

    constructor(private serv: connectionStringService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.sub = activatedRoute.params.subscribe();
    }

    choseDb(conString: string) {
        this.conStringDb = new СonnectionString(conString);
        this.serv.sendConnectionString(this.conStringDb).subscribe(error => { this.error = error; console.log(error); });
    }

    redirectToAuthors() {
        this.router.navigate(['']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}