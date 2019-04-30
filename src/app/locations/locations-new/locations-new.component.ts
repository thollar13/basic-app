import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { LocationsService } from '../locations.service';
import { Location } from '../locations.model';
// import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-locations-new',
  templateUrl: './locations-new.component.html',
  styleUrls: ['./locations-new.component.css']
})
export class LocationsNewComponent implements OnInit {

  enteredName = '';
  enteredAddress = '';
  enteredCity = '';
  enteredState = '';
  enteredmId = '';
  enteredAccessToken = '';
  location: Location;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private locationId: string;

  constructor(
  	public locationsService: LocationsService,
  	public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'mId': new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
      'accessToken': new FormControl(null, { validators: [Validators.required, Validators.minLength(10)] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('locationId')) {
        this.mode = 'edit';
        this.locationId = paramMap.get('locationId');
        this.isLoading = true;
        this.locationsService.getLocation(this.locationId).subscribe(locationData => {
          this.isLoading = false;
          this.location = {
            id: locationData._id,
            name: locationData.name,
            address: locationData.address,
            city: locationData.city,
            state: locationData.state,
            zip: locationData.zip,
            mId: locationData.mId,
            accessToken: locationData.accessToken,
            creator: locationData.creator
          };
          this.form.setValue({
            name: this.location.name,
          });
        });
      } else {
        this.mode = 'create';
        this.locationId = null;
      }
    });
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({image: file});
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onSavelocation() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.locationsService.addLocation(
        this.form.value.mId,
        this.form.value.accessToken,
      );
    } else {
      this.locationsService.updateLocation(
      	this.form.value.id,
        this.form.value.name,
        this.form.value.address,
        this.form.value.city,
        this.form.value.state,
        this.form.value.mId,
        this.form.value.accessToken,
      );
    }
    this.form.reset();
  }

}
