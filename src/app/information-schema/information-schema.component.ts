import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout, timer } from 'rxjs';
import { Info } from 'src/_models/Info';
import { MigrationInfoMap } from 'src/_models/MigrationInfoMap';
import { RelationshipInfo } from 'src/_models/RelationshipInfo';
import { TableInfo } from 'src/_models/TableInfo';
import { MigrationBody } from 'src/_models/migrationBody';
import { InformationSchemaService } from 'src/_service/information-schema.service';
import { MigrationService } from 'src/_service/migration-service.service';

@Component({
  selector: 'app-information-schema',
  templateUrl: './information-schema.component.html',
  styleUrls: ['./information-schema.component.css']
})
export class InformationSchemaComponent {

  public schema: string = "";
  public table: string = "";
  public relationship :boolean | undefined = false;
  public countFlag: boolean = false;
  public count: any | null;
  public migrationType: number = 0;
  public schemas: String[] | undefined;
  public tables: TableInfo[] | undefined;
  public relationships: Info[] | undefined;
  public btn_e: string | undefined = 'gray';
  public btn_r: string | undefined = 'gray';
  public btn_dat: string | undefined = 'gray';
  public btn_tb: string | undefined = 'gray';
  public test: string = 'red';
  public embed: boolean = true;
  public reference: boolean = false;
  public startFlag: boolean = false;
  public limit: number = 0;
  public offset: number = 0;
  public form!: FormGroup;
  public body: MigrationBody = {
    table: "",
    schema: "",
    param: 0,
    limit: 0,
    offset: 0
  };
  public succes: boolean | undefined;
  public successMessage: string = 'SUCCESS!';
  public errorMessage: string = 'ERROR!';
  public database: boolean | undefined;
  public notDatabase: boolean | undefined;
  public migrationMap: MigrationInfoMap[] | undefined;

  constructor(private service: InformationSchemaService,
              private migration: MigrationService) {}

  ngOnInit(): void {
    this.getData();
    this.form = new FormGroup({
      'limit' : new FormControl("",[Validators.pattern("[0-9]*")]),
      'offset' : new FormControl("",[Validators.pattern("[0-9]*")])
    });
  }

  onSubmit(op: number): void {
    switch(op) {
      case 1:  
      this.service.getTables(this.schema).subscribe(
        (data) => {
          this.tables = data;
          console.log(data);
        },
        (error) => {
          console.error('error: ', error);
        }
      ) 
      break;
      case 2:
        console.log(2);
        this.relationship = false;
        this.relationships = [];
        this.btn_e = 'gray'; this.btn_r = 'gray'; this.countFlag = false;
      break;
    }
  }

  onButtonMigration(op: number) {
    switch(op) {
    case 1:
      this.database = true;
      this.notDatabase = false;
      this.btn_tb = 'gray';
      this.btn_dat = '#4CAF50';
      this.migration.getMigrationInfo(this.schema,this.table).subscribe(
        (data) => {
          this.migrationMap = data;
          if(this.migrationMap.length != 0) {
            this.relationship = true;
          }
          else {
            this.relationship = false;
          }
        }
      )
      break;
    case 2:
      this.database = false;
      this.notDatabase = true;
      this.btn_dat = 'gray';
      this.btn_tb = '#4CAF50';
      break;
    }
  }

  onButtonSubmit(op: number) {
    switch(op) {
        case 1: 
        this.count = null;
        this.migration.getRelationInfo(this.schema,this.table,op).subscribe(
          (data) => {
            this.relationships = data;
            if(this.relationships.length != 0) {
              this.relationship = true;
            }
            else {
              this.relationship = false;
            }
            this.migrationType = 1;
            this.migrationCount(this.migrationType);
            this.btn_r = 'gray';
            this.btn_e = '#4CAF50';
            this.embed = true; this.reference = false;
            console.log(data);
          },
          (error) => {
            console.error('error: ', error);
          }
      )
      console.log("embedding in corso...")
      break;
      case 2:
        this.count = null;
        this.migration.getRelationInfo(this.schema,this.table,op).subscribe(
          (data) => {
            this.relationships = data;
            if(this.relationships.length != 0) {
              this.relationship = true;
            }
            else {
              this.relationship = false;
            }
            this.migrationType = 2;
            this.migrationCount(this.migrationType);
            this.btn_e = 'gray';
            this.btn_r = '#4CAF50';
            this.embed = false; this.reference = true;
            console.log(data);
          },
          (error) => {
            console.error('error: ', error);
          }
        )
        console.log("referencing in corso...")
        break;
    }
  }

  migrationCount(op: number) {
    this.countFlag = true;
    switch(op) {
      case 1: 
      this.migration.getCount(this.schema,this.table,1).subscribe(
        (data) => {
          this.count = data.count;
        }
      );
      break;
      case 2:
        this.migration.getCount(this.schema,this.table,2).subscribe(
          (data) => {
            this.count = data.count;
          }
        );
        break;
    }
  }

  start_migration_db() {
    this.limit = this.form.value.limit;
    this.body = {
      table: this.table,
      schema: this.schema,
      param: this.migrationType,
      limit: this.limit,
      offset: this.offset
    }
    this.migration.migrateDb(this.body).subscribe(
      (res) => this.succes = res
    );
    this.close;
  }

  start_migration(op: number) {
    this.limit = this.form.value.limit;
    this.offset = this.form.value.offset;
    this.body = {
      table: this.table,
      schema: this.schema,
      param: this.migrationType,
      limit: this.limit,
      offset: this.offset
    }
    this.migration.migratePost(this.body).subscribe(
      (res) => this.succes = res
    );
    this.close;
  }

  close($event: string | undefined) {
    this.succes = undefined
  }

  getData() {
    this.service.getSchemas().subscribe(
      (data) => {
        this.schemas = data;
      }
    )
  }
}