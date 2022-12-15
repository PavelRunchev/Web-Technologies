import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTechnologyComponent } from './details-technology.component';

describe('TechnologyIDComponent', () => {
  let component: DetailsTechnologyComponent;
  let fixture: ComponentFixture<DetailsTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTechnologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
