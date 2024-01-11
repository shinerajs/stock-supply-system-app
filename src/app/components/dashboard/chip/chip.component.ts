import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, NgFor, MatIconModule],
})
export class ChipsInputExample {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }
}