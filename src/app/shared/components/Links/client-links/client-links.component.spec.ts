import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLinksComponent } from './client-links.component';

describe('ClientLinksComponent', () => {
  let component: ClientLinksComponent;
  let fixture: ComponentFixture<ClientLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
