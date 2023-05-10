import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarTechComponent } from './top-bar-tech.component';

describe('TopBarTechComponent', () => {
  let component: TopBarTechComponent;
  let fixture: ComponentFixture<TopBarTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
