import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardPaymentComponent } from '../cardPayment/cardPayment.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  public pageData;
  focus: any;
  focus1: any;
  constructor(router: Router, private route: ActivatedRoute, private matDialog:MatDialog) { }

  ngOnInit(): void {


  this.pageData = <any>this.route.snapshot.data;
  console.log(this.pageData.title)
}
onOpenDialog(){
  let dialogRef = this.matDialog.open(PriceComponent,
     {
   width: '25%',
    panelClass: 'custom-modalbox',
    disableClose:true
});
}
}
