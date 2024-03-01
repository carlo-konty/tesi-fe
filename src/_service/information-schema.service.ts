import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInfo } from 'src/_models/TableInfo';
import { environment } from 'src/environments/environment.prod';
import {HttpClient, HttpParams} from "@angular/common/http";
import { RelationshipInfo } from 'src/_models/RelationshipInfo';
import { Count } from 'src/_models/Count';

@Injectable({
  providedIn: 'root'
})
export class InformationSchemaService {

  private url = environment.apiBaseUrl + '/information-schema';
 
  constructor(private http: HttpClient) { 

  }

  public getSchemas(): Observable<String[]> {
    return this.http.get<String[]>(`${this.url}/schemas`);
  }

  public getTables(param: any): Observable<TableInfo[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',param);
    return this.http.get<TableInfo[]>(`${this.url}/tables?schema=` +  param);
  }

  public getRelationships(schema: any, table: any): Observable<RelationshipInfo[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',schema);
    httpParams = httpParams.set('table',table);
    return this.http.get<RelationshipInfo[]>(`${this.url}/relationship?schema=` + schema + '&table=' + table);
  }

  public getReferentialConstraints(schema: any, table: any): Observable<RelationshipInfo[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',schema);
    httpParams = httpParams.set('table',table);
    return this.http.get<RelationshipInfo[]>(`${this.url}/referential-constraints?schema=` + schema + '&table=' + table);
  }

}
