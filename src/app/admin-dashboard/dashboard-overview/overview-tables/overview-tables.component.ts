import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview-tables',
  imports: [CommonModule],
  templateUrl: './overview-tables.component.html',
  styleUrl: './overview-tables.component.css'
})
export class OverviewTablesComponent {


  currentPage = 1;

  itemsPerPage = 5;

  openedMenu: number | null = null;

  bookings = [

    {
      id:'REG-BKG-10021',
      event:'Rooftop Jazz Night',
      organizer:'Le Bain NYC',
      talent:'Ava Monroe Trio',
      status:'Agreement Pending',
      statusClass:'pending',
      value:'$2,400'
    },

    {
      id:'REG-BKG-10022',
      event:'Luxury Hotel Lobby Set',
      organizer:'The Mercer',
      talent:'DJ Kareem',
      status:'Deposit Paid',
      statusClass:'paid',
      value:'$1,150'
    },

    {
      id:'REG-BKG-10023',
      event:'Brand Launch Reception',
      organizer:'SoHo House',
      talent:'Maya Lens Studio',
      status:'In Review',
      statusClass:'review',
      value:'$3,800'
    },

    {
      id:'REG-BKG-10024',
      event:'Wedding Afterparty',
      organizer:'Private Organizer',
      talent:'RAAM Band',
      status:'Confirmed',
      statusClass:'confirmed',
      value:'$4,500'
    },

    {
      id:'REG-BKG-10025',
      event:'Hospitality Weekend',
      organizer:'Pier 17',
      talent:'Lighting Crew X',
      status:'Technical Review',
      statusClass:'technical',
      value:'$6,200'
    },

    {
      id:'REG-BKG-10026',
      event:'VIP Gala Dinner',
      organizer:'Luxury Group',
      talent:'Violin Duo',
      status:'Confirmed',
      statusClass:'confirmed',
      value:'$5,400'
    },

    {
      id:'REG-BKG-10027',
      event:'Fashion Week Show',
      organizer:'Style House',
      talent:'DJ Selena',
      status:'Deposit Paid',
      statusClass:'paid',
      value:'$2,950'
    },

    {
      id:'REG-BKG-10028',
      event:'Corporate Meetup',
      organizer:'Vision Agency',
      talent:'Sound Crew',
      status:'Agreement Pending',
      statusClass:'pending',
      value:'$1,900'
    },

    {
      id:'REG-BKG-10029',
      event:'Beach Music Festival',
      organizer:'Sunset Events',
      talent:'The Waves Band',
      status:'Confirmed',
      statusClass:'confirmed',
      value:'$8,200'
    },

    {
      id:'REG-BKG-10030',
      event:'Luxury Wedding',
      organizer:'Elite Weddings',
      talent:'Golden Band',
      status:'Technical Review',
      statusClass:'technical',
      value:'$9,400'
    },

    {
      id:'REG-BKG-10031',
      event:'Business Seminar',
      organizer:'Future Minds',
      talent:'Speaker Team',
      status:'In Review',
      statusClass:'review',
      value:'$3,000'
    },

    {
      id:'REG-BKG-10032',
      event:'Night Rooftop Party',
      organizer:'Sky Lounge',
      talent:'DJ Flash',
      status:'Deposit Paid',
      statusClass:'paid',
      value:'$4,300'
    }

  ];

  /* ====================================== */
  /* ============ PAGINATION ============== */
  /* ====================================== */

  get totalPagesCount(): number {

    return Math.ceil(
      this.bookings.length / this.itemsPerPage
    );
  }

  get paginatedBookings() {

    const start =
      (this.currentPage - 1) * this.itemsPerPage;

    const end = start + this.itemsPerPage;

    return this.bookings.slice(start, end);
  }

  /* ====================================== */
  /* ===== SMART PAGINATION NUMBERS ====== */
  /* ====================================== */

  get visiblePages(): (number | string)[] {

    const total = this.totalPagesCount;

    const current = this.currentPage;

    /* لو الصفحات 5 او اقل */

    if (total <= 5) {

      return Array.from(
        { length: total },
        (_, i) => i + 1
      );
    }

    /* البداية */

    if (current <= 3) {

      return [1, 2, 3, '...', total - 1, total];
    }

    /* النهاية */

    if (current >= total - 2) {

      return [
        '...',
        total - 4,
        total - 3,
        total - 2,
        total - 1,
        total
      ];
    }

    /* النص */

    return [
      current - 1,
      current,
      current + 1,
      '...',
      total - 1,
      total
    ];
  }

  /* ====================================== */
  /* ============== CHANGE ================ */
  /* ====================================== */

  changePage(page: number) {

    this.currentPage = page;

    this.openedMenu = null;
  }

  nextPage() {

    if (this.currentPage < this.totalPagesCount) {

      this.currentPage++;
    }
  }

  prevPage() {

    if (this.currentPage > 1) {

      this.currentPage--;
    }
  }

  /* ====================================== */
  /* =============== MENU ================= */
  /* ====================================== */

  toggleMenu(index: number) {

    if (this.openedMenu === index) {

      this.openedMenu = null;

    } else {

      this.openedMenu = index;
    }
  }


}
