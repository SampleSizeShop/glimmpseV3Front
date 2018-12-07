import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import {StudyDesign} from './shared/study-design';
import {StudyService} from './study-form/study.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  disableAnimationa: boolean;

  constructor(private router: Router, private study_service: StudyService) {
    this.disableAnimationa = environment.disableAnimations;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const str = atob(reader.result.split(',')[1]);
        const study = JSON.parse(str, StudyDesign.reviver);
        this.study_service.updateAll(study);
      }
    };
    this.navigateToStudy();
  }

  newStudy() {
    this.study_service.updateAll(new StudyDesign());
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
