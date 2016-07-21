import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';


@Component({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  selectedItem: any;
  img_types: string[];
  book_titles: string[];
  icons: string[];
  items: Array<{title: string, note: string, icon: string, img_type: string,}>;

  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.img_types = ['https://d.gr-assets.com/books/1447303603l/2767052.jpg', 'https://d.gr-assets.com/books/1361975680l/2657.jpg', 'https://d.gr-assets.com/books/1320399351l/1885.jpg', 'https://d.gr-assets.com/books/1361039443l/41865.jpg', 'https://d.gr-assets.com/books/1449868701l/11127.jpg']; //, 'food', 'people', 'nature', 'transport', 'technics' ];
    this.book_titles = ['The Hunger Games ', 'To Kill a Mockingbird', 'Pride and Prejudice', 'Twilight', 'The chronicles of Narnia']; //, 'Animal farm', 'Gone with the wind', 'The book theif', 'The giving tree', 'The Da Vinci code' ];

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      var index = Math.floor(Math.random() * this.book_titles.length)
      this.items.push({
        title: this.book_titles[index],
        note: 'This is book #' + i,
        img_type: this.img_types[index],
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.nav.push(ItemDetailsPage, {
      item: item
    });
  }
}
