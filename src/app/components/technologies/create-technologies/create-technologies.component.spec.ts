import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnologiesComponent } from './create-technologies.component';

describe('CreateTechnologiesComponent', () => {
  let component: CreateTechnologiesComponent;
  let fixture: ComponentFixture<CreateTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTechnologiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
