import { Component } from '@angular/core';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css'
})
export class ShareComponent {


  shareNews() {
    const shareUrl = "http://gramadevata.com/home";
    console.log('Share URL:', shareUrl);
    if (navigator.share) {
      navigator.share({
        url: shareUrl
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      console.log('Share API not supported');
    }
  }

}
