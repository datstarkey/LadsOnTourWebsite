import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor() {}

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
}
