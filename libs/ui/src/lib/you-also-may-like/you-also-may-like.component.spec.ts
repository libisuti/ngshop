import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouAlsoMayLikeComponent } from './you-also-may-like.component';

describe('YouAlsoMayLikeComponent', () => {
  let component: YouAlsoMayLikeComponent;
  let fixture: ComponentFixture<YouAlsoMayLikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YouAlsoMayLikeComponent]
    });
    fixture = TestBed.createComponent(YouAlsoMayLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
