import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesFavoriteComponent} from './pages-favorite/pages-favorite.component';

describe('FavoritePageComponent', () => {
  let component: PagesFavoriteComponent;
  let fixture: ComponentFixture<PagesFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
