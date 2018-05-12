import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  hostName: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    //
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.hostName = params.get('name'));
  }
}
