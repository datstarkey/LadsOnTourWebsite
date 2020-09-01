import { IStreams } from "./../interfaces/streams";
import { TwitchService } from "./../services/twitch.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-streams",
  templateUrl: "./streams.component.html",
  styleUrls: ["./streams.component.scss"],
})
export class StreamsComponent implements OnInit {
  streamData: IStreams = { live: [], offline: [] };
  constructor(private twitch: TwitchService) {}

  getStreamData() {
    this.twitch.getStreamData().subscribe((response) => {
      this.streamData = response;
    });
  }

  ngOnInit() {
    this.getStreamData();
  }
}
