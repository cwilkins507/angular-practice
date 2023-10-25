import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: '/star.component.html',
  styleUrls: ['star.component.css']
})

export class StarComponent implements OnChanges {
  // product lists template passes star rating due to the @Input decorator
  // default is set to zero ; bound in html using []
  //@output decorator sends data back to its container, property must be an event
  // and use the generic argument to define the event data type, new keyword to create an instance
  @Input() rating: number = 0;
  cropWidth: number = 75;
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  // when the rating is clicked it will be sent to the product list component to change the
  // title with this message
  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
