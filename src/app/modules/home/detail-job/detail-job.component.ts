import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogRejectComponent} from './dialog-reject/dialog-reject.component';
import {Toaster} from 'ngx-toast-notifications';

@Component({
  selector: 'ngx-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {
  job: job;
  id: any;
  jobPosition;
  workingForm;
  academicLevel;
  rank;
  statusJob;
  userContact;
  role = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private dialog: MatDialog,
    private router: Router,
    private toaster: Toaster,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const a = JSON.parse(localStorage.getItem('auth-user'));
    this.role = a.auth;
    console.log(this.role);
    this.geJobById();
  }

  geJobById() {
    this.jobService.getJobById(this.id).subscribe(data => {
      this.job = data;
      this.jobPosition = this.job.jobPosition;
      this.workingForm = this.job.workingForm;
      this.academicLevel = this.job.academicLevel;
      this.statusJob = this.job.statusJob;
      this.rank = this.job.rank;
      this.userContact = this.job.userContact;
    });
  }

  openDialog() {
    this.jobService.tranferData(this.job);
    this.router.navigate(['home/job/update']);
  };


  update() {
    this.jobService.tranferData(this.job);
    this.router.navigate(['home/job/addorupdate']);
  }

  openDialogReject() {

    const dialogRef = this.dialog.open(DialogRejectComponent, {
      data: this.job,
    })
    dialogRef.afterClosed().subscribe(data => this.geJobById());
  };

  showToaster(message: string, typea: any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Th??nh c??ng',
      type: type,
      duration: 3000,
    });
  }

  statusAccept() {
    this.jobService.changeStatus(this.id, 'Ch??a ????ng tuy???n').subscribe(data => {
      if (data.status === 'OK') {
        this.geJobById();
        this.showToaster('X??t duy???t th??nh c??ng', 'success');
      } else {
        this.showToaster('X??t duy???t th???t b???i', 'danger');
      }
    });
  }

  statusRecruit() {
    this.jobService.changeStatus(this.id, '??ang tuy???n').subscribe(data => {
      if (data.status === 'OK') {
        this.geJobById();
        this.showToaster('X??t duy???t th??nh c??ng', 'success');
      } else {
        this.showToaster('X??t duy???t th???t b???i', 'danger');
      }
    });
  }

  statusStopRecruit() {
    this.jobService.changeStatus(this.id, '??ang kh??ng tuy???n').subscribe(data => {
      if (data.status === 'OK') {
        this.geJobById();
        this.showToaster('X??t duy???t th??nh c??ng', 'success');
      } else {
        this.showToaster('X??t duy???t th???t b???i', 'danger');
      }
    });
  }

  statusClosed() {
    this.jobService.changeStatus(this.id, '???? ????ng').subscribe(data => {
      if (data.status === 'OK') {
        this.geJobById();
        this.showToaster('X??t duy???t th??nh c??ng', 'success');
      } else {
        this.showToaster('X??t duy???t th???t b???i', 'danger');
      }
    });
  }

  deleteJob() {
    this.jobService.deleteJobById(this.id).subscribe(data => {
      if (data.status === 'OK') {
        this.showToaster('X??a  th??nh c??ng', 'success');
        this.router.navigate(['home/job']);
      } else {
        this.showToaster('X??a th???t b???i', 'danger');
      }
    });
  }

  openNewTab() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/public-job/detail/' + this.id])
    );
    window.open(url, '_blank');
  }
}
