import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from './../../services/issue.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any;
  updateForm: FormGroup;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { 
    this.createForm();
  }
  
  createForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
  }

  getIssue(id) {
    this.issueService.getIssueById(id)
      .subscribe(issue => {
        this.issue = issue
        this.updateValues();
      });
  }

  updateValues() {
    this.updateForm.get('title').setValue(this.issue.title);
    this.updateForm.get('responsible').setValue(this.issue.responsible);
    this.updateForm.get('description').setValue(this.issue.description);
    this.updateForm.get('severity').setValue(this.issue.severity);
    this.updateForm.get('status').setValue(this.issue.status);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getIssue(this.id);
    })
  }

  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateIssue(this.id, title, responsible, description, severity, status)
      .subscribe(() => {
        this.snackBar.open('Issue updated succesfully', 'OK', {
          duration: 3000
        })
      });
  }
}
