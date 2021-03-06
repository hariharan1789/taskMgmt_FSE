import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchparentComponent } from './searchparent.component';

describe('SearchparentComponent', () => {
  let fixture: ComponentFixture<SearchparentComponent>;
  let component: SearchparentComponent;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchparentComponent],
      imports: [HttpClientModule],
      providers: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
