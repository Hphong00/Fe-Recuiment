import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ForgotPasswordService } from '../../../../@core/services/forgot-pass.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  formPass = new FormGroup({
    code: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });
  message = '';

  constructor(private forgotPasswordService: ForgotPasswordService,
    private fb: FormBuilder, private router: Router) {


  }
  disableClick = "disableClick";

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formPass = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$')]],
      repeatPassword: [''],
    });
  }
  ngDoCheck(): void {
    if (this.formPass.valid) {
      this.disableClick = "";
    } else {
      this.disableClick = "disableClick";
    }
  }

  onSubmit() {

    const data = {
      code: this.formPass.controls.code.value, email: this.forgotPasswordService.email,
      password: this.formPass.controls.password.value
    }
    console.log(data);

    this.forgotPasswordService.changePassword(data).subscribe(
      data => {


        this.message = data.status
        console.log(this.message)
        if (this.message == 'OK' &&data.code!="Fail")
          this.router.navigate(['/auth'])
      }
    );
  }

}
