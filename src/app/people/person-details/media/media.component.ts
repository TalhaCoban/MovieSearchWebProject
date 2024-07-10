import { Component, Input, OnInit } from '@angular/core';
import { CreditImagesResponse } from 'src/app/models/person-image.response.model';
import { CreditService } from 'src/app/services/person-details.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  @Input() personId: number;
  image_url: string = environment.image_url;
  credit_images: CreditImagesResponse | null = null;

  constructor(
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
    this.creditService.getCreditImages(this.personId).subscribe(images => {
      this.credit_images = images;
      console.log(this.credit_images)
    })
  }
}
