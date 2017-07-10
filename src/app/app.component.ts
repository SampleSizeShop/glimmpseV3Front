import { Component } from '@angular/core';
import { MatrixService } from './matrix-service';
import {MatrixComponent} from './matrix.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  public message: string;
  public matrix: MatrixComponent;
  constructor(matrixService: MatrixService) {
    this.message = matrixService.getMessage();
  }
}
