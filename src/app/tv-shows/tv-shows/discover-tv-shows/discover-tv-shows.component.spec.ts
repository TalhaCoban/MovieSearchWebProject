import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverTvShowsComponent } from './discover-tv-shows.component';

describe('DiscoverTvShowsComponent', () => {
  let component: DiscoverTvShowsComponent;
  let fixture: ComponentFixture<DiscoverTvShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverTvShowsComponent]
    });
    fixture = TestBed.createComponent(DiscoverTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
