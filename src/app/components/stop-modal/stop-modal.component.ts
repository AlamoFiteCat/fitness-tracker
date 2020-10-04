import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-modal',
  templateUrl: './stop-modal.component.html',
  styleUrls: ['./stop-modal.component.css'],
})
export class StopModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

  ngOnInit(): void {}
}
