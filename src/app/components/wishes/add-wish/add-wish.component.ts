import { WishService } from './../../../services/wish.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-wish',
  templateUrl: './add-wish.component.html',
  styleUrls: ['./add-wish.component.css'],
})
export class AddWishComponent implements OnInit {
  wishForm: FormGroup;

  constructor(private fb: FormBuilder, private wishService: WishService) {}

  ngOnInit() {
    this.wishForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.wishService.saveWishForUser('123', { name: value.name, created: new Date() });
  }
}
