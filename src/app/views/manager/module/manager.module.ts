import {NgModule} from "@angular/core";
import { ManagerRoutingModule } from './manager-routing.module';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { ProjectManagerComponent } from '../projectManager/project-manager.component';

@NgModule({
  declarations: [
    BootstrapComponent,
    ProjectManagerComponent,
  ],
  imports: [
    ManagerRoutingModule,
  ],
  providers: [],
})
export class ManagerModule { }
