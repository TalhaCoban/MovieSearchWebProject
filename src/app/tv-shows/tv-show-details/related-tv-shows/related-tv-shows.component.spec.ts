import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTvShowsComponent } from './related-tv-shows.component';

describe('RelatedTvShowsComponent', () => {
  let component: RelatedTvShowsComponent;
  let fixture: ComponentFixture<RelatedTvShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedTvShowsComponent]
    });
    fixture = TestBed.createComponent(RelatedTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
