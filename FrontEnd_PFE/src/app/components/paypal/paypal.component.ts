import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
declare var anime: any;

@Component({
  selector: 'app-forms',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  public pageData;

  constructor(router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.pageData = <any>this.route.snapshot.data;
    console.log(this.pageData.title)
  }


}
