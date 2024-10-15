import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visionmission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visionmission.component.html',
  styleUrl: './visionmission.component.css'
})
export class VisionmissionComponent {

  ads:any;
  currentIndex:number=0;

  constructor( private sanitizer: DomSanitizer){
    this.ads = [
      { videoUrl: this.sanitizeUrl('../../../assets/gramadevata_aboutus.mp4'), isVideo: true },
    ];
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  togglePlay(video: HTMLVideoElement) {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

}
