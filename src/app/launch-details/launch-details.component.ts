import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
import { NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryImage } from "@kolkov/ngx-gallery";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imageList = []
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {
    this.galleryOptions = [
      {
        width: '90%',
        height: '650px',
        thumbnailsColumns: 3,
        thumbnails: true,
        imageSwipe: true,
        imageArrows: false,
        preview: true,
        previewZoom: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewDownload: true,
        previewZoomMin: 0.2,
        previewZoomMax: 2,
        thumbnailsArrows: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 10,
        thumbnailMargin: 10
      },
      {
        breakpoint: 1200,
        width: '90%',
        height: '600px'
      },
      {
        breakpoint: 800,
        width: '90%',
        height: '100%'
      },
      {
        breakpoint: 400,
        width: '90%',
        height: '100%'
      }
    ]
    this.launchDetails$.subscribe(res => {
      const image_url = res.links.flickr_images
      image_url.forEach(elem => {
        const image_url= {
          small: elem,
          medium: elem,
          big: elem
        }
        this.imageList.push(image_url)
      })
    })
    
  }
  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsService.fetch({ id })),
    map(res => res.data.launch)
  );
  backToList() {
    this.router.navigate(['/'])
  }
}
