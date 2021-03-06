import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaypalComponent } from './paypal.component';

describe('ReserveComponent', () => {
  let component:PaypalComponent;
  let fixture: ComponentFixture<PaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
