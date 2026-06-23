import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.css'
})
export class EventTableComponent {



  /* ====================================== */
  /* ============== GENERAL =============== */
  /* ====================================== */

  activeFilter = 'All Events';

  currentPage = 1;

  itemsPerPage = 5;

  openedMenu: number | null = null;

  showFilterMenu = false;

  selectedCategory = '';

  selectedType = '';

  selectedDate = '';

  filters = [
    'All Events',
    'Upcoming',
    'Live',
    'Completed',
    'Cancelled'
  ];

  categoryOptions = [
    'Live Music',
    'Fashion Event',
    'DJ Night',
    'Comedy Show',
    'Private Event',
    'Day Party',
    'Theater Performance'
  ];

  typeOptions = [
    'Indoor',
    'Outdoor',
    'VIP',
    'Festival',
    'Corporate'
  ];

  /* ====================================== */
  /* ================ DATA ================ */
  /* ====================================== */

events = [

  {
    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
    title:'Rooftop Jazz Night',
    category:'Live Music',
    type:'Indoor',
    date:'May 4, 2026',
    fullDate:'2026-05-04',
    time:'8:00 PM',
    venue:'Le Bain NYC',
    location:'New York, USA',
    organizer:'Le Bain Events',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'34 / 50',
    bookingsCount:34,
    progress:68,
    progressClass:'progress-gray',
    revenue:'$12,450',
    revenueNumber:12450
  },

  {
    image:'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop',
    title:'Luxury Fashion Show',
    category:'Fashion Event',
    type:'VIP',
    date:'May 6, 2026',
    fullDate:'2026-05-06',
    time:'6:00 PM',
    venue:'The Mercer',
    location:'New York, USA',
    organizer:'The Mercer Team',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'120 / 150',
    bookingsCount:120,
    progress:80,
    progressClass:'progress-gray',
    revenue:'$45,000',
    revenueNumber:45000
  },

  {
    image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    title:'Electronic Vibes',
    category:'DJ Night',
    type:'Festival',
    date:'May 8, 2026',
    fullDate:'2026-05-08',
    time:'10:00 PM',
    venue:'Club Nebula',
    location:'Miami, USA',
    organizer:'Vibes Productions',
    status:'Live',
    statusClass:'live',
    bookings:'280 / 300',
    bookingsCount:280,
    progress:93,
    progressClass:'progress-green',
    revenue:'$28,750',
    revenueNumber:28750
  },

  {
    image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
    title:'Elegant Wedding',
    category:'Private Event',
    type:'VIP',
    date:'May 10, 2026',
    fullDate:'2026-05-10',
    time:'5:00 PM',
    venue:'Palm Court',
    location:'Beverly Hills, USA',
    organizer:'Dream Weddings',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'80 / 100',
    bookingsCount:80,
    progress:70,
    progressClass:'progress-gray',
    revenue:'$36,500',
    revenueNumber:36500
  },

  {
    image:'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1200&auto=format&fit=crop',
    title:'Stand Up Comedy Night',
    category:'Comedy Show',
    type:'Indoor',
    date:'May 12, 2026',
    fullDate:'2026-05-12',
    time:'9:00 PM',
    venue:'The Laugh House',
    location:'Chicago, USA',
    organizer:'Laugh Out Loud',
    status:'Completed',
    statusClass:'completed',
    bookings:'150 / 150',
    bookingsCount:150,
    progress:100,
    progressClass:'progress-green',
    revenue:'$15,200',
    revenueNumber:15200
  },

  {
    image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    title:'Beach Party 2026',
    category:'Day Party',
    type:'Outdoor',
    date:'May 14, 2026',
    fullDate:'2026-05-14',
    time:'2:00 PM',
    venue:'Ocean Drive',
    location:'Miami, USA',
    organizer:'Sunrise Events',
    status:'Completed',
    statusClass:'completed',
    bookings:'350 / 350',
    bookingsCount:350,
    progress:100,
    progressClass:'progress-green',
    revenue:'$22,890',
    revenueNumber:22890
  },

  {
    image:'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop',
    title:'Broadway Nights',
    category:'Theater Performance',
    type:'Indoor',
    date:'May 16, 2026',
    fullDate:'2026-05-16',
    time:'7:30 PM',
    venue:'City Theater',
    location:'New York, USA',
    organizer:'Stage Right',
    status:'Cancelled',
    statusClass:'cancelled',
    bookings:'0 / 120',
    bookingsCount:0,
    progress:0,
    progressClass:'progress-red',
    revenue:'$0',
    revenueNumber:0
  },

  {
    image:'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    title:'Summer Networking Gala',
    category:'Corporate',
    type:'Indoor',
    date:'May 18, 2026',
    fullDate:'2026-05-18',
    time:'7:00 PM',
    venue:'Skyline Hall',
    location:'Los Angeles, USA',
    organizer:'Elite Connect',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'210 / 300',
    bookingsCount:210,
    progress:72,
    progressClass:'progress-gray',
    revenue:'$41,600',
    revenueNumber:41600
  },

  {
    image:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    title:'Neon Festival',
    category:'DJ Night',
    type:'Festival',
    date:'May 20, 2026',
    fullDate:'2026-05-20',
    time:'11:00 PM',
    venue:'Electric Arena',
    location:'Las Vegas, USA',
    organizer:'NightWave',
    status:'Live',
    statusClass:'live',
    bookings:'470 / 500',
    bookingsCount:470,
    progress:95,
    progressClass:'progress-green',
    revenue:'$68,300',
    revenueNumber:68300
  },

  {
    image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
    title:'Acoustic Evening',
    category:'Live Music',
    type:'Indoor',
    date:'May 22, 2026',
    fullDate:'2026-05-22',
    time:'8:30 PM',
    venue:'Blue Lounge',
    location:'Boston, USA',
    organizer:'Harmony Group',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'65 / 90',
    bookingsCount:65,
    progress:74,
    progressClass:'progress-gray',
    revenue:'$9,700',
    revenueNumber:9700
  },

  {
    image:'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1200&auto=format&fit=crop',
    title:'Luxury Yacht Party',
    category:'Private Event',
    type:'VIP',
    date:'May 24, 2026',
    fullDate:'2026-05-24',
    time:'6:00 PM',
    venue:'Marina Bay',
    location:'Miami, USA',
    organizer:'Golden Nights',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'90 / 120',
    bookingsCount:90,
    progress:75,
    progressClass:'progress-gray',
    revenue:'$58,900',
    revenueNumber:58900
  },

  {
    image:'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop',
    title:'Food Truck Carnival',
    category:'Festival',
    type:'Outdoor',
    date:'May 26, 2026',
    fullDate:'2026-05-26',
    time:'1:00 PM',
    venue:'Central Park',
    location:'New York, USA',
    organizer:'Taste World',
    status:'Completed',
    statusClass:'completed',
    bookings:'500 / 500',
    bookingsCount:500,
    progress:100,
    progressClass:'progress-green',
    revenue:'$33,400',
    revenueNumber:33400
  },

  {
    image:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    title:'Startup Launch Summit',
    category:'Corporate',
    type:'Indoor',
    date:'May 28, 2026',
    fullDate:'2026-05-28',
    time:'10:00 AM',
    venue:'Innovation Hub',
    location:'San Francisco, USA',
    organizer:'Future Labs',
    status:'Upcoming',
    statusClass:'upcoming',
    bookings:'320 / 400',
    bookingsCount:320,
    progress:80,
    progressClass:'progress-green',
    revenue:'$72,500',
    revenueNumber:72500
  }

];
  /* ====================================== */
  /* ============ ITEMS COUNT ============= */
  /* ====================================== */

  changeItemsPerPage(){

    this.currentPage = 1;
  }

  /* ====================================== */
  /* ============== FILTER TAB ============ */
  /* ====================================== */

  setFilter(filter:string){

    this.activeFilter = filter;

    this.currentPage = 1;
  }

  /* ====================================== */
  /* ============== FILTER MENU =========== */
  /* ====================================== */

  toggleFilterMenu(){

    this.showFilterMenu =
    !this.showFilterMenu;
  }

  applyFilters(){

    this.currentPage = 1;
  }

  /* ====================================== */
  /* ============ SORT BOOKINGS =========== */
  /* ====================================== */

  sortByBookings(){

    this.events.sort(
      (a:any,b:any)=>
      b.bookingsCount - a.bookingsCount
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============ SORT REVENUE ============ */
  /* ====================================== */

  sortByRevenue(){

    this.events.sort(
      (a:any,b:any)=>
      b.revenueNumber - a.revenueNumber
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============== FILTERED ============== */
  /* ====================================== */

  get filteredEvents(){

    let data = [...this.events];

    /* STATUS */

    if(this.activeFilter !== 'All Events'){

      data = data.filter(
        item =>
        item.status === this.activeFilter
      );
    }

    /* CATEGORY */

    if(this.selectedCategory){

      data = data.filter(
        item =>
        item.category ===
        this.selectedCategory
      );
    }

    /* TYPE */

    if(this.selectedType){

      data = data.filter(
        item =>
        item.type ===
        this.selectedType
      );
    }

    /* DATE */

    if(this.selectedDate){

      data = data.filter(
        item =>
        item.fullDate ===
        this.selectedDate
      );
    }

    return data;
  }

  /* ====================================== */
  /* ============== PAGINATION ============ */
  /* ====================================== */

  get totalPagesCount(): number {

    return Math.ceil(
      this.filteredEvents.length /
      this.itemsPerPage
    );
  }

  get paginatedEvents(){

    const start =
      (this.currentPage - 1) *
      this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredEvents.slice(
      start,
      end
    );
  }

  /* ====================================== */
  /* ========= SMART PAGINATION =========== */
  /* ====================================== */

  get visiblePages(): (number | string)[] {

    const total = this.totalPagesCount;

    const current = this.currentPage;

    if(total <= 5){

      return Array.from(
        { length: total },
        (_, i) => i + 1
      );
    }

    if(current <= 3){

      return [
        1,
        2,
        3,
        '...',
        total - 1,
        total
      ];
    }

    if(current >= total - 2){

      return [
        '...',
        total - 4,
        total - 3,
        total - 2,
        total - 1,
        total
      ];
    }

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
  /* ============== CHANGE PAGE =========== */
  /* ====================================== */

  changePage(page:number){

    this.currentPage = page;

    this.openedMenu = null;
  }

  nextPage(){

    if(
      this.currentPage <
      this.totalPagesCount
    ){

      this.currentPage++;
    }
  }

  prevPage(){

    if(this.currentPage > 1){

      this.currentPage--;
    }
  }

  /* ====================================== */
  /* ================ MENU ================ */
  /* ====================================== */

  toggleMenu(index:number){

    if(this.openedMenu === index){

      this.openedMenu = null;

    } else {

      this.openedMenu = index;
    }
  }

  /* ====================================== */
  /* ============== EXPORT PDF ============ */
  /* ====================================== */

 exportPDF(){

  const doc = new jsPDF(
    'landscape',
    'px',
    'a4'
  );

  /* BACKGROUND */

  doc.setFillColor(5,5,5);

  doc.rect(
    0,
    0,
    doc.internal.pageSize.width,
    doc.internal.pageSize.height,
    'F'
  );

  /* LOGO */

  const logo = 'assets/images/logo.png';

  const img = new Image();

  img.src = logo;

  img.onload = () => {

    const pdfWidth = 90;

    const ratio =
      img.height / img.width;

    const pdfHeight =
      pdfWidth * ratio;

    /* ADD LOGO */

    doc.addImage(
      logo,
      'PNG',
      30,
      20,
      pdfWidth,
      pdfHeight
    );

    /* TITLE */

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(22);

    const titleY =
      20 + pdfHeight + 25;

    doc.text(
      'Events Report',
      30,
      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[
        'Event',
        'Date',
        'Venue',
        'Organizer',
        'Status',
        'Bookings',
        'Revenue'
      ]],

      body:this.filteredEvents.map(
        (item:any)=>[

          item.title,

          `${item.date} ${item.time}`,

          item.venue,

          item.organizer,

          item.status,

          item.bookings,

          item.revenue
        ]
      ),

      styles:{

        fillColor:[10,10,10],

        textColor:[255,255,255],

        lineColor:[30,30,30],

        lineWidth:0.5,

        fontSize:10
      },

      headStyles:{

        fillColor:[161,1,1],

        textColor:[255,255,255],

        fontStyle:'bold'
      },

      bodyStyles:{

        fillColor:[8,8,8]
      },

      alternateRowStyles:{

        fillColor:[14,14,14]
      },

      tableLineColor:[35,35,35],

      tableLineWidth:0.3
    });

    doc.save(
      'events-report.pdf'
    );
  };
}

openDatePicker(input: any){

  if (input.showPicker) {

    input.showPicker();

  } else {

    input.click();
  }
}


// calendar right side

/* ========================================= */
/* WEEK DAYS */
/* ========================================= */

weekDays:string[] = [

  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];

/* ========================================= */
/* CURRENT DATE */
/* ========================================= */

currentDate = new Date();

currentMonth:number =
this.currentDate.getMonth();

currentYear:number =
this.currentDate.getFullYear();

/* ========================================= */
/* CALENDAR */
/* ========================================= */

calendarWeeks:(number | null)[][] = [];

/* ========================================= */
/* SELECTED */
/* ========================================= */

selectedDate2:Date | null = null;

/* ========================================= */
/* INIT */
/* ========================================= */

ngOnInit(){

  this.generateCalendar();

  this.loadTopRevenueEvents();
}

/* ========================================= */
/* MONTH NAME */
/* ========================================= */

get currentMonthName():string{

  return new Date(

    this.currentYear,
    this.currentMonth

  ).toLocaleString(

    'default',
    { month:'long' }
  );
}

/* ========================================= */
/* GENERATE CALENDAR */
/* ========================================= */

generateCalendar(){

  this.calendarWeeks = [];

  const days:(number | null)[] = [];

  let firstDay = new Date(

    this.currentYear,
    this.currentMonth,
    1

  ).getDay();

  /* START FROM MONDAY */

  firstDay =
  firstDay === 0 ? 6 : firstDay - 1;

  const totalDays = new Date(

    this.currentYear,
    this.currentMonth + 1,
    0

  ).getDate();

  /* EMPTY CELLS */

  for(let i = 0; i < firstDay; i++){

    days.push(null);
  }

  /* REAL DAYS */

  for(let day = 1; day <= totalDays; day++){

    days.push(day);
  }

  /* COMPLETE LAST ROW */

  while(days.length % 7 !== 0){

    days.push(null);
  }

  /* SPLIT INTO WEEKS */

  for(let i = 0; i < days.length; i += 7){

    this.calendarWeeks.push(

      days.slice(i , i + 7)
    );
  }
}

/* ========================================= */
/* PREVIOUS MONTH */
/* ========================================= */

prevMonth(){

  this.currentMonth--;

  if(this.currentMonth < 0){

    this.currentMonth = 11;

    this.currentYear--;
  }

  this.generateCalendar();
}

/* ========================================= */
/* NEXT MONTH */
/* ========================================= */

nextMonth(){

  this.currentMonth++;

  if(this.currentMonth > 11){

    this.currentMonth = 0;

    this.currentYear++;
  }

  this.generateCalendar();
}

/* ========================================= */
/* SELECT DATE */
/* ========================================= */

selectDate(day:number | null){

  if(!day) return;

  this.selectedDate2 =

  new Date(

    this.currentYear,
    this.currentMonth,
    day
  );

  const year =
  this.selectedDate2.getFullYear();

  const month =
  String(

    this.selectedDate2.getMonth() + 1

  ).padStart(2,'0');

  const date =
  String(

    this.selectedDate2.getDate()

  ).padStart(2,'0');

  this.selectedDate =

  `${year}-${month}-${date}`;

  this.applyFilters();
}

/* ========================================= */
/* ACTIVE */
/* ========================================= */

isSelected(day:number | null):boolean{

  if(!day || !this.selectedDate2){

    return false;
  }

  return(

    this.selectedDate2.getDate() === day &&

    this.selectedDate2.getMonth() === this.currentMonth &&

    this.selectedDate2.getFullYear() === this.currentYear
  );
}



/* ========================================== */
/* TOP REVENUE EVENTS */
/* ========================================== */

topRevenueEvents:any[] = [];

filteredRevenueEvents:any[] = [];

selectedRevenueMonth:string = 'all';

/* ========================================== */
/* MONTHS */
/* ========================================== */

revenueMonths = [

  {
    label:'January',
    value:'01'
  },

  {
    label:'February',
    value:'02'
  },

  {
    label:'March',
    value:'03'
  },

  {
    label:'April',
    value:'04'
  },

  {
    label:'May',
    value:'05'
  },

  {
    label:'June',
    value:'06'
  },

  {
    label:'July',
    value:'07'
  },

  {
    label:'August',
    value:'08'
  },

  {
    label:'September',
    value:'09'
  },

  {
    label:'October',
    value:'10'
  },

  {
    label:'November',
    value:'11'
  },

  {
    label:'December',
    value:'12'
  }

];

/* ========================================== */
/* INIT */
/* ========================================== */



/* ========================================== */
/* LOAD TOP EVENTS */
/* ========================================== */

loadTopRevenueEvents(){

  const sorted = [...this.events]

  .sort(

    (a,b)=>

    b.revenueNumber -

    a.revenueNumber
  );

  /* TOP CARD */

  const highestRevenue =

  sorted[0]?.revenueNumber || 1;

  this.topRevenueEvents =

  sorted.slice(0,5)

  .map(item=>({

    ...item,

    revenuePercent:

    (item.revenueNumber / highestRevenue) * 100
  }));

  /* MODAL */

  this.filteredRevenueEvents = sorted;
}

/* ========================================== */
/* FILTER BY MONTH */
/* ========================================== */

filterRevenueByMonth(){

  this.filteredRevenueEvents =

  this.events.filter(item=>{

    const parts = item.fullDate.split('-');

    const year = parts[0];

    const month = parts[1];

    const monthMatch =

      this.selectedRevenueMonth === 'all'

      ||

      month === this.selectedRevenueMonth;

    const yearMatch =

      this.selectedRevenueYear === 'all'

      ||

      year === this.selectedRevenueYear;

    return monthMatch && yearMatch;

  })

  .sort(

    (a,b)=>

    b.revenueNumber -

    a.revenueNumber
  );
}
selectedRevenueYear:string = 'all';

revenueYears:string[] =

Array.from(

  {
    length:
    new Date().getFullYear() - 2024 + 1
  },

  (_,i)=>

  String(2024 + i)
);

}
