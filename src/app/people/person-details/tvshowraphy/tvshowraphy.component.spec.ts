import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowraphyComponent } from './tvshowraphy.component';

describe('TvshowraphyComponent', () => {
  let component: TvshowraphyComponent;
  let fixture: ComponentFixture<TvshowraphyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowraphyComponent]
    });
    fixture = TestBed.createComponent(TvshowraphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
