import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopModalComponent } from './stop-modal.component';

describe('StopModalComponent', () => {
  let component: StopModalComponent;
  let fixture: ComponentFixture<StopModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
