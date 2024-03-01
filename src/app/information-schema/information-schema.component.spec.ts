import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSchemaComponent } from './information-schema.component';

describe('InformationSchemaComponent', () => {
  let component: InformationSchemaComponent;
  let fixture: ComponentFixture<InformationSchemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationSchemaComponent]
    });
    fixture = TestBed.createComponent(InformationSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
