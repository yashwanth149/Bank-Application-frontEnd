import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnbarComponent } from './mnbar.component';

describe('MnbarComponent', () => {
  let component: MnbarComponent;
  let fixture: ComponentFixture<MnbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
