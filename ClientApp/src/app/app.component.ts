import { ThemeService } from "./services/theme/theme.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  header: boolean = true;

  ngOnInit() {}

  playVideo() {
    let audioPlayer = <HTMLVideoElement>document.getElementById("video");
    audioPlayer.muted = true;
    let promise = audioPlayer.play();
    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
        })
        .catch((error) => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.playVideo();
    }, 100);
  }

  constructor(private themeService: ThemeService) {}
}
