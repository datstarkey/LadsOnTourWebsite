import { HttpHeaders } from "@angular/common/http";
import { Subscription } from "rxjs";
import { IStreams } from "../../interfaces/streams";
import { TwitchService } from "../../services/twitch.service";
import { Component, OnInit } from "@angular/core";

declare const Twitch: any;
@Component({
  selector: "app-streams",
  templateUrl: "./streams.component.html",
  styleUrls: ["./streams.component.scss"],
})
export class StreamsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  streamData: IStreams = { live: [], offline: [] };
  currentStreamer: string;
  player: any;

  constructor(private twitch: TwitchService) {}

  setStream(user: string) {
    this.currentStreamer = user;
    this.player.setChannel(user);
  }

  setTwitch() {
    var width = window.innerWidth;

    if (width > 1360) {
      width *= 0.65;
    } else {
      width *= 0.9;
    }

    var height = width / 1.7;

    var options = {
      height: height,
      width: width,
      channel: this.currentStreamer,
    };
    this.player = new Twitch.Embed("twitch-embed", options);
  }

  ngOnInit() {
    this.subscription.add(
      this.twitch.getStreamData().subscribe((response) => {
        this.streamData = response;
        if (response.live.length > 0) {
          this.currentStreamer = response.live[0];
        } else {
          this.currentStreamer = response.offline[0];
        }
        this.setTwitch();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
