import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-textengine',
  templateUrl: './textengine.component.html',
  styleUrls: ['./textengine.component.scss'],
    animations: [routerTransition()]
})
export class TextengineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



