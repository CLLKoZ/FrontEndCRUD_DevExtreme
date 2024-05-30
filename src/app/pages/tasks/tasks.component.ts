import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/data/odata/store';
import { lastValueFrom } from 'rxjs';
import { createStore } from 'devextreme-aspnet-data-nojquery';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  remoteDataSource: any;
    constructor() {
        const serviceUrl: String = 'http://localhost:5288/departamento';
        this.remoteDataSource = createStore({
            key: 'idDepartamento',
            loadUrl: serviceUrl + '/lista',
            insertUrl: serviceUrl + '/InsertAction',
            updateUrl: serviceUrl + '/UpdateAction',
            deleteUrl: serviceUrl + '/DeleteAction'
        });
    }
}
