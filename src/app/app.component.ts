import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {Router, NavigationEnd} from '@angular/router';
import {StudyDesign} from './shared/model/study-design';
import {StudyService} from './shared/services/study.service';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {GoogleAnalyticsService} from './shared/services/google-analytics.service';
import {AuthService} from '@auth0/auth0-angular';


declare let gtag: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  disableAnimationa: boolean;

  constructor(private router: Router,
              public  auth: AuthService,
              private study_service: StudyService,
              private googleAnalyticsService: GoogleAnalyticsService,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private titleService: Title) {
    this.titleService.setTitle( 'Glimmpse 3.1.3' );
    this.disableAnimationa = environment.disableAnimations;
    this.matIconRegistry.addSvgIcon(
      `glimmpsediamond`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/glimmpse_diamond_min_blue.svg')
    );
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'UA-21939703-3',
            {
              'page_path': event.urlAfterRedirects
            }
          );
        }
      }
    );
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const res = reader.result.toString()
        const str = atob(res.split(',')[1]);
        const study = JSON.parse(str, StudyDesign.reviver);
        this.study_service.updateAll(study);
        this.googleAnalyticsService.eventEmitter(
            'json_upload',
            'study',
            'upload',
            'upload',
            1);
      }
    };
    this.navigateToStudy();
  }

  newStudy() {
    this.googleAnalyticsService.eventEmitter(
      'new_study',
      'study',
      'new',
      'new',
      1);
    this.navigateToStudy();
  }

  navigateToStudy() {
    this.router.navigateByUrl('/design/STUDY_TITLE');
  }

  isLanding() {
    if (this.router.url === '/') {
      return true;
    } else {
      return false;
    }
  }
}
