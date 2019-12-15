import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SearchuserComponent } from './searchuser.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('SearchuserComponent', () => {
  let comp: SearchuserComponent;
  let fix: ComponentFixture<SearchuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchuserComponent],
      imports: [HttpClientModule],
      providers: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fix = TestBed.createComponent(SearchuserComponent);
    comp = fix.componentInstance;
    fix.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });
});
