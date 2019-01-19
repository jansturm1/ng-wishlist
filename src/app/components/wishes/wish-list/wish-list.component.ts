import { WishService } from './../../../services/wish.service';
import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/models/wish.model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(private wishService: WishService) {}

  wishes: Wish[] = [];

  ngOnInit() {
    this.wishService.getWishesForUser('123').subscribe(wishes => {
      this.wishes = wishes;
    });
  }
}
