import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TESTIMONIALSCTASERVICEComponent } from './testimonialsctaservice.component';

describe('TESTIMONIALSCTASERVICEComponent', () => {
  let component: TESTIMONIALSCTASERVICEComponent;
  let fixture: ComponentFixture<TESTIMONIALSCTASERVICEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TESTIMONIALSCTASERVICEComponent]
    });
    fixture = TestBed.createComponent(TESTIMONIALSCTASERVICEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
