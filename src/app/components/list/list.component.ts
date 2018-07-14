import { IssueService } from './../../services/issue.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    this.issueService.getIssues()
      .subscribe((issues: Issue[]) => this.issues = issues);
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id)
      .subscribe(_ => this.getIssues());
  }
}
