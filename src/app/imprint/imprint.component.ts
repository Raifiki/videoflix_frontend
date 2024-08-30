import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import log from 'video.js/dist/types/utils/log';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  redirectPage: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['redirectPage']) this.redirectPage = '/' + params['redirectPage'];
    });
  }
}
