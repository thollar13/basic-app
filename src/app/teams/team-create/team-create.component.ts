import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { TeamsService } from '../teams.service';
import { Team } from '../team.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamsCreateComponent implements OnInit {

  enteredName = '';
  team: Team;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private teamId: string;

  constructor(public teamService: TeamsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      // 'content': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('teamId')) {
        this.mode = 'edit';
        this.teamId = paramMap.get('teamId');
        this.isLoading = true;
        this.teamService.getTeam(this.teamId).subscribe(teamData => {
          this.isLoading = false;
          this.team = {
            id: teamData._id,
            name: teamData.name,
            imagePath: teamData.imagePath,
            creator: teamData.creator
          };
          this.form.setValue({
            name: this.team.name,
            image: this.team.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.teamId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveTeam() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.teamService.addTeam(
        this.form.value.name,
        this.form.value.image);
    } else {
      this.teamService.updateTeam(
        this.teamId,
        this.form.value.name,
        this.form.value.image
      );
    }
    this.form.reset();
  }

}
