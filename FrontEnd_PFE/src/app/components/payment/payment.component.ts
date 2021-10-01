import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardPaymentComponent } from '../cardPayment/cardPayment.component';

@Component({
  selector: 'app-forms',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public pageData;
  focus: any;
  focus1: any;

  constructor(private router: Router, private route: ActivatedRoute, private matDialog:MatDialog) {

  }

  ngOnInit() {
    this.pageData = <any>this.route.snapshot.data;
    console.log(this.pageData.title)
  }
  onOpenDialog(){
    let dialogRef = this.matDialog.open(CardPaymentComponent, {
      width: '25%',
      panelClass: 'custom-modalbox',
      disableClose:true
  });
  }
  go(){
    this.router.navigate(['/cardPay']);
  }
}
