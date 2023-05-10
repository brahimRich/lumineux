import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterTTechComponent } from './list-inter-t-tech.component';

describe('ListInterTTechComponent', () => {
  let component: ListInterTTechComponent;
  let fixture: ComponentFixture<ListInterTTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterTTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInterTTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
