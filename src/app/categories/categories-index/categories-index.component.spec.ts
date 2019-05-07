import { TestBed, async } from '@angular/core/testing';
import { LocationsCategoriesComponent } from './locations-categories.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
describe('LocationsCategoriesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocationsCategoriesComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
      ],
    }).compileComponents();
  }));
  it('should render the categories page', () => {
    const fixture = TestBed.createComponent(LocationsCategoriesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Categories');
  });
});
