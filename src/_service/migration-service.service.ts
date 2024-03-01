import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count } from 'src/_models/Count';
import { Info } from 'src/_models/Info';
import { MigrationInfoMap } from 'src/_models/MigrationInfoMap';
import { MigrationBody } from 'src/_models/migrationBody';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  private url = environment.apiBaseUrl + '/migration';

  constructor(private http: HttpClient) { 

  }

  public migrate(schema: any, table: any, param: any, limit: any): Observable<any> {
    console.log("inside migrate");
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',schema);
    httpParams = httpParams.set('table',table);
    httpParams = httpParams.set('param',param);
    httpParams = httpParams.set('limit',limit);
    return this.http.get<any>(`${this.url}?schema=` + schema + '&table=' + table + '&param=' + param + '&limit=' + limit);
  }

  public migratePost(body: MigrationBody): Observable<any> {
    return this.http.post<any>(`${this.url}`,body);
  }

  public getCount(schema: any, table: any, param: number): Observable<Count> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',schema);
    httpParams = httpParams.set('table',table);
    httpParams = httpParams.set('param',param)
    return this.http.get<Count>(`${this.url}/count?schema=` + schema + '&table=' + table + '&param=' + param);
  }

  public migrateDb(body: MigrationBody): Observable<any> {
    console.log("migrateDb");
    return this.http.post<any>(`${this.url}/tree`,body);
  }

  public getRelationInfo(schema: any, table: any, type: any): Observable<Info[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',schema);
    httpParams = httpParams.set('table',table);
    httpParams = httpParams.set('type',type)
    return this.http.get<Info[]>(`${this.url}/relation-type?schema=` + schema + '&table=' + table + '&type=' + type);
  }

  public getMigrationInfo(schema: any, table: any): Observable<MigrationInfoMap[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('schema',schema);
    httpParams = httpParams.set('table',table);
    return this.http.get<MigrationInfoMap[]>(`${this.url}/tree?schema=` + schema + '&table=' + table );
  } 

}
