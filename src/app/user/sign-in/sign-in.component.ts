import { Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  gUser: any;

  constructor(
    private userService: UserService,
    private router : Router,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {}

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile');
  }
  afterSignUp(googleUser: any){
    this.gUser = googleUser;
  }
  onSubmit(form : NgForm){
    this.spinner.show();
    this.userService.login(form.value).subscribe(
      res => {
        this.toastr.success('Signed in Successfully');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }
  onSubmitGUserLogin(gUser){
    this.spinner.show();
    const json = {};
    json['email'] = gUser.gt.Rt;
    json['password'] = gUser.gt.GS;
    this.userService.login(json).subscribe(
      res => {
        this.toastr.success('Signed in Successfully');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }
  googleLogin(){
     window['onSignIn'] = (user: any) => this.ngZone.run(
        ()=>{
          this.onSubmitGUserLogin(user);
        }
      )
  }
}
