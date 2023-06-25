import { Component, computed, signal } from '@angular/core';

const users = [
  { id: 1, name: 'Spiderman' },
  { id: 2, name: 'Hulk' },
  { id: 3, name: 'Wolverine' },
  { id: 4, name: 'Cyclops' },
  { id: 5, name: 'Venom' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly firstPage = 1;

  itemsPerPage = 2;

  searchInput = signal('');
  currentPage = signal(this.firstPage);

  paginatedAndFilteredUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return users
      .filter((user) =>
        user.name.toLowerCase().includes(this.searchInput().toLowerCase())
      )
      .slice(startIndex, endIndex);
  });

  searchUser(searchText: string): void {
    this.searchInput.set(searchText);
    if (this.currentPage() > this.firstPage) {
      this.currentPage.set(this.firstPage);
    }
  }

  goToPrevPage(): void {
    this.currentPage.update((currentPage: number) => Math.max(currentPage - 1, 1));
  }

  goToNextPage(): void {
    this.currentPage.update((currentPage: number) =>
      Math.min(currentPage + 1, this.itemsPerPage + 1)
    );
  }
}
