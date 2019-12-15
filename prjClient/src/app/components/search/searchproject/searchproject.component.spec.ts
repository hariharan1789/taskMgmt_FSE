import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchprojectComponent } from './searchproject.component';

describe('SearchprojectComponent', () => {
  let comp: SearchprojectComponent;
  let fixt: ComponentFixture<SearchprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchprojectComponent],
      imports: [HttpClientModule],
      providers: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixt = TestBed.createComponent(SearchprojectComponent);
    comp = fixt.componentInstance;
    fixt.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
