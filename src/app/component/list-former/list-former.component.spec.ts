import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormerComponent } from './list-former.component';

describe('ListFormerComponent', () => {
  let component: ListFormerComponent;
  let fixture: ComponentFixture<ListFormerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFormerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFormerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
