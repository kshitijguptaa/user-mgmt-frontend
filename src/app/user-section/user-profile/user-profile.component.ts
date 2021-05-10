import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userDetails: any;
  public editSwitch: boolean;
  showSucessMessage: boolean;
  serverErrorMessages: any;
  public allUsersData: any;


  constructor(private userService: UserService, 
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.getUserProfileDetails()  
  }

getUserProfileDetails(){
  this.spinner.show()
  this.userService.getUserProfile().subscribe(
    res => {
      this.editSwitch = false;
      this.userDetails = res['user'];
      this.spinner.hide();
    },
    err => { 
      this.toastr.error('Something went wrong');
    }
  );
}
enableEdit(){
    this.editSwitch = true;
  }
onSubmit(form: NgForm) {
  this.spinner.show();
    this.userService.updateUserProfile(form.value).subscribe(
      res => {
        this.toastr.success('Profile Updated Successfully','Success');
        this.editSwitch = false;
        this.showSucessMessage = true;
        this.spinner.hide();
      },
      err => {
        if (err.status === 422) {
          this.toastr.error(err.error.join('<br/>'));
        }
        else
        this.toastr.error('Something went wrong');
      }
    );
  }
}
