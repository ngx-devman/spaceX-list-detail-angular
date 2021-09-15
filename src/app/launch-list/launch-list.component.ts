import { LaunchFacadeService } from "./../services/launch-facade.service";
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-launch-list",
  templateUrl: "./launch-list.component.html",
  styleUrls: ["./launch-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent {
  moment = moment
  curr_time = moment().format()
  isLoading: boolean
  constructor(private readonly launchFacade: LaunchFacadeService) {
    this.isLoading = true
  }
  pastLaunches$ = this.launchFacade.pastLaunchListStoreCache();
  hideLoader() {
    this.isLoading = false
  }
}
