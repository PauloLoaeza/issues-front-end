import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issue/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title,
      responsible, 
      description,
      severity
    };

    return this.http.post(`${this.uri}/issues`, issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title,
      responsible, 
      description,
      severity,
      status
    };

    return this.http.post(`${this.uri}/issue/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.delete(`${this.uri}/issue/${id}`);
  }
}
