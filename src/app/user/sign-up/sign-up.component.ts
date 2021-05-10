import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private userService: UserService, 
    private ngZone: NgZone,
    private toastr: ToastrService,
    private router : Router,
    ) {}

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    form.value.isLocalLogin = true;
    this.userService.postUser(form.value).subscribe(
      res => {
        this.toastr.success('Registration SuccessFull');
        this.router.navigateByUrl('/signup');
        this.resetForm(form);
      },
      err => {
        this.toastr.error('Something Went Wrong');
      }
    );
  }
  onSubmitGUserRegister(gUserDetails) {
    gUserDetails.isLocalLogin = false;
    this.userService.postUser(gUserDetails).subscribe(
      res => {
        this.toastr.success('Registration SuccessFull');
        this.router.navigateByUrl('/signup');
      },
      err => {
        this.toastr.error('Something Went Wrong');
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      city: '',
      state: '',
      country: ''
    };
    form.resetForm();
  }
  googleSignup(){
    window['onSignUp'] = (user: any) => this.ngZone.run(
       ()=>{
         this.onSubmitGUserRegister(user)
       }
     )
 }
}
