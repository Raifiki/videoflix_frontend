import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// import custom interfaces and models
import { Librarycategory } from '../../../shared/definitions/interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() category!: Librarycategory;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isScrollable: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => this.checkScrollability());
  }

  checkScrollability() {
    const scrollWidth = this.scrollContainer.nativeElement.scrollWidth;
    const clientWidth = this.scrollContainer.nativeElement.clientWidth;
    this.isScrollable = scrollWidth > clientWidth;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
  }
}
