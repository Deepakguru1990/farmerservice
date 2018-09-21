import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder } from'@angular/forms';
import { Router } from '@angular/router';
import { formControlBinding } from '../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_directive';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  Lotid: any;
  userid: any;
  AssetId: any;
  certid:any;
  Targetid:any;
  status:any;

  myGroup:FormGroup;

  constructor(private router: Router){}
  
  cattleInit() {
    console.log('coming inside function');
    if(this.userid == 'abc')
    {
      console.log('success!');
      this.router.navigate(['./cattle']);
    }
            }
  ngOnInit() {
    this.myGroup = new FormGroup({
      Lotid:new FormControl(''),
      userid:new FormControl(''),
      AssetId:new FormControl(''),
      status:new FormControl(''),
      Targetid:new FormControl('')})        
            }
}
