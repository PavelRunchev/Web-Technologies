import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyIDComponent } from './technology-id.component';

describe('TechnologyIDComponent', () => {
  let component: TechnologyIDComponent;
  let fixture: ComponentFixture<TechnologyIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyIDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
