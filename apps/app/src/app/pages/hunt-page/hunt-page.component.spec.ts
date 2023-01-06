import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntPageComponent } from './hunt-page.component';

describe('RegisterPageComponent', () => {
  let component: HuntPageComponent;
  let fixture: ComponentFixture<HuntPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HuntPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
