import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {

  Component,

  OnInit,

  AfterViewInit,

  ElementRef,

  ViewChild,
  inject

} from '@angular/core';

import {

  Chart,

  DoughnutController,

  ArcElement,

  Tooltip,

  Legend

} from 'chart.js';
import { LocationsService } from '../../../core/services/location/locations.service';
Chart.register(

  DoughnutController,

  ArcElement,

  Tooltip,

  Legend
);


@Component({
  selector: 'app-space-tables',
  imports: [CommonModule,FormsModule],
  templateUrl: './space-tables.component.html',
  styleUrl: './space-tables.component.css'
})
export class SpaceTablesComponent
implements OnInit, AfterViewInit {
@ViewChild('availabilityCanvas')
availabilityCanvas!: ElementRef;


  /* ====================================== */
  /* ============== GENERAL =============== */
  /* ====================================== */

  activeFilter = 'All space';

  currentPage = 1;

  itemsPerPage = 5;

  openedMenu: number | null = null;

  showFilterMenu = false;

  selectedCategory = '';

  selectedType = '';

  selectedDate = '';

selectedLocation = '';

showLocationMenu = false;

filters = [

  'All Spaces',
  'Venues',
  'Rooms',
  'Stages',
  'Outdoor Spaces'
];



typeOptions = [
'Draft',
'Pending',
'Active',
'Archived'
];

  /* ====================================== */
  /* ================ DATA ================ */
  /* ====================================== */
categoryOptions: string[] = [];

locationOptions: string[] = [];
space: any[] = [];
private locationService = inject(LocationsService);
getStatusClass(status: string): string {

  switch (status) {

    case 'Active':
      return 'completed';

    case 'Inactive':
      return 'cancelled';

    case 'Draft':
      return 'planning';

    default:
      return 'hold';

  }

}

getProgressClass(
  progress:number,
  status:string
):string{

  switch(status){

    case 'In Progress':
      return 'progress-blue';

    case 'Planning':
      return 'progress-purple';

    case 'On Hold':
      return 'progress-orange';

    case 'Completed':
      return 'progress-green';

    case 'Cancelled':
      return 'progress-red';

    default:
      return 'progress-blue';
  }
}
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

    this.space.sort(
      (a:any,b:any)=>
      b.bookingsCount - a.bookingsCount
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============ SORT REVENUE ============ */
  /* ====================================== */

  sortByRevenue(){

    this.space.sort(
      (a:any,b:any)=>
      b.revenueNumber - a.revenueNumber
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============== FILTERED ============== */
  /* ====================================== */

get filteredspace() {

  let data = [...this.space];

  /* TOP TABS */

  if (this.activeFilter === 'Venues') {

    data = data.filter(
      item => item.type?.toLowerCase().includes('venue')
    );

  }

  if (this.activeFilter === 'Rooms') {

    data = data.filter(
      item => item.type?.toLowerCase().includes('room')
    );

  }

  if (this.activeFilter === 'Stages') {

    data = data.filter(
      item => item.type?.toLowerCase().includes('stage')
    );

  }

  if (this.activeFilter === 'Outdoor Spaces') {

    data = data.filter(
      item => item.type?.toLowerCase().includes('outdoor')
    );

  }

  /* CATEGORY */

  if (this.selectedCategory) {

    data = data.filter(
      item => item.type === this.selectedCategory
    );

  }

  /* STATUS */

  if (this.selectedType) {

    data = data.filter(item => {

      switch (this.selectedType) {

        case 'Draft':
          return item.status === 0;

        case 'Pending':
          return item.status === 1;

        case 'Active':
          return item.status === 2;

        case 'Archived':
          return item.status === 3;

        default:
          return true;

      }

    });

  }

  /* LOCATION */

  if (this.selectedLocation) {

    data = data.filter(
    item => item.city === this.selectedLocation
  );

  }

  return data;

}
  /* ====================================== */
  /* ============== PAGINATION ============ */
  /* ====================================== */

  get totalPagesCount(): number {

    return Math.ceil(
      this.filteredspace.length /
      this.itemsPerPage
    );
  }

  get paginatedspace(){

    const start =
      (this.currentPage - 1) *
      this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredspace.slice(
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
toggleLocationMenu(){

  this.showLocationMenu =
  !this.showLocationMenu;
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

  const logo =
    'assets/images/logo.png';

  const img = new Image();

  img.src = logo;

  img.onload = () => {

    const pdfWidth = 90;

    const ratio =
      img.height / img.width;

    const pdfHeight =
      pdfWidth * ratio;

    /* LOGO */

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

      'Spaces Report',

      30,

      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[

        'Space',

        'Type',

        'Location',

        'Capacity',

        'Availability',

        'Utilization',

        'Status'
      ]],

      body:this.paginatedspace.map(

        (item:any)=>([

          `${item.title}
${item.subTitle}`,

          item.type,

          `${item.location}
${item.city}`,

          `${item.capacity}
${item.capacityType}`,

          `${item.availability}
${item.availableDates}`,

          `${item.progress}%`,

          item.status
        ])
      ),

      styles:{

        fillColor:[10,10,10],

        textColor:[255,255,255],

        lineColor:[25,25,25],

        lineWidth:0.4,

        fontSize:9,

        cellPadding:8,

        valign:'middle'
      },

      headStyles:{

        fillColor:[161,1,1],

        textColor:[255,255,255],

        fontStyle:'bold',

        fontSize:10
      },

      bodyStyles:{

        fillColor:[8,8,8]
      },

      alternateRowStyles:{

        fillColor:[14,14,14]
      },

      tableLineColor:[35,35,35],

      tableLineWidth:0.3,

      margin:{

        left:20,

        right:20
      }
    });

    doc.save(

      'spaces-report.pdf'
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

ngOnInit() {

  this.generateCalendar();

  this.loadLocations();

}
loadLocations() {

  this.locationService
      .getAllLocations()
      .subscribe({

        next: (res: any) => {

          this.space = res.items.map((item: any) => ({

            id: item.id,

            image:
              item.imageUrl ||
              `https://picsum.photos/80/80?random=${item.id}`,

            title: item.name,

            subTitle: item.locationCategoryName,

            type: item.locationCategoryName,

            typeClass: this.getTypeClass(item.locationCategoryName),

            location: item.state,

            city: item.city,

            capacity:
              item.physicalInfo?.totalCapacity ?? '-',

            capacityType: 'People',

            availability:
              item.workingHours?.length
                ? 'Available'
                : 'No Schedule',

            availableDates:
              `${item.sections?.length ?? 0} Sections`,

            progress: this.randomProgress(),

            status: item.locationStatus,

            approvalStatus: item.approvalStatus,

            createdAt: item.createdAt,


          }));
this.categoryOptions = [
  ...new Set<string>(
    res.items
      .map((x: any) => String(x.locationCategoryName))
  )
];

this.locationOptions = [
  ...new Set<string>(
    res.items
      .map((x: any) => String(x.city))
  )
];
        },

        error: err => console.log(err)

      });

}
getTypeClass(type: string): string {

  switch (type) {

    case 'Video Studio':
      return 'status-purple';

    case 'Restaurant':
      return 'status-orange';

    case 'Rooftop':
      return 'status-green';

    default:
      return 'status-red';

  }

}
randomProgress() {

  return Math.floor(Math.random() * 50) + 50;

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




// charts



/* ====================================== */
/* COUNTS */
/* ====================================== */

get availableCount(){

  return this.space.filter(
    item =>
    item.status === 'Available'
  ).length;
}

get bookedCount(){

  return this.space.filter(
    item =>
    item.status === 'Booked'
  ).length;
}

get maintenanceCount(){

  return this.space.filter(
    item =>
    item.status === 'Maintenance'
  ).length;
}

/* ====================================== */
/* PERCENTAGES */
/* ====================================== */

get availablePercent(){

  return (
    (
      this.availableCount /
      this.space.length
    ) * 100
  ).toFixed(1);
}

get bookedPercent(){

  return (
    (
      this.bookedCount /
      this.space.length
    ) * 100
  ).toFixed(1);
}

get maintenancePercent(){

  return (
    (
      this.maintenanceCount /
      this.space.length
    ) * 100
  ).toFixed(1);
}

/* ====================================== */
/* INIT */
/* ====================================== */

ngAfterViewInit(){

  this.loadAvailabilityChart();
}

/* ====================================== */
/* CHART */
/* ====================================== */

loadAvailabilityChart(){

  setTimeout(()=>{

    const canvas:any =

      this.availabilityCanvas
      ?.nativeElement;

    if(!canvas) return;

    const existingChart =
      Chart.getChart(canvas);

    if(existingChart){

      existingChart.destroy();
    }

    const ctx =
      canvas.getContext('2d');

    new Chart(ctx,{

      type:'doughnut',

      data:{

        datasets:[

          {

            data:[

              this.availableCount,

              this.bookedCount,

              this.maintenanceCount,

              0.1,

              0.1
            ],

            backgroundColor:[

              '#59d62f',

              '#2f6fff',

              '#f5a623',

              '#ff3b30',

              '#7a7a7a'
            ],

            borderWidth:0
          }
        ]
      },

      options:{

        responsive:true,

        maintainAspectRatio:false,

        cutout:'72%',

        plugins:{

          legend:{
            display:false
          },

          tooltip:{
            enabled:false
          }
        }
      }
    });

  },300);
}





// All Space
spacesByType = [

  {
    name:'Venues',
    count:86,
    percent:30.1
  },

  {
    name:'Rooms',
    count:112,
    percent:39.2
  },

  {
    name:'Stages',
    count:48,
    percent:16.8
  },

  {
    name:'Outdoor Spaces',
    count:32,
    percent:11.2
  },

  {
    name:'Studios',
    count:8,
    percent:2.8
  }

];
getSpaceIcon(type:string):string{

  switch(type){

    case 'Venues':
      return 'fa-regular fa-building';

    case 'Rooms':
      return 'fa-regular fa-rectangle-list';

    case 'Stages':
      return 'fa-solid fa-users-viewfinder';

    case 'Outdoor Spaces':
      return 'fa-solid fa-tree';

    case 'Studios':
      return 'fa-regular fa-window-maximize';

    default:
      return 'fa-regular fa-building';
  }
}

getSpaceClass(type:string):string{

  switch(type){

    case 'Venues':
      return 'spaces-red';

    case 'Rooms':
      return 'spaces-purple';

    case 'Stages':
      return 'spaces-orange';

    case 'Outdoor Spaces':
      return 'spaces-green';

    case 'Studios':
      return 'spaces-blue';

    default:
      return 'spaces-red';
  }
}



topLocations = [

  {
    location:'New York, USA',
    progress:72,
    totalSpaces:3
  },

  {
    location:'Miami, USA',
    progress:68,
    totalSpaces:1
  },

  {
    location:'Los Angeles, USA',
    progress:64,
    totalSpaces:1
  },

  {
    location:'Chicago, USA',
    progress:59,
    totalSpaces:1
  },

  {
    location:'Toronto, Canada',
    progress:48,
    totalSpaces:1
  }

];


submitLocation(id: number) {

  this.locationService
    .submitLocation(id)
    .subscribe({

      next: () => {

  alert('Location submitted successfully');

  this.loadLocations();

},

      error: (err) => {

  console.log(err);

  console.log(err.error);

  console.log(err.error.errors);

}

    });

}

rejectLocation(id: number) {

  this.locationService
    .rejectLocation(id)
    .subscribe({

      next: () => {

  alert('Location rejected successfully');

  this.loadLocations();

},

      error: err => {

        console.log(err);

      }

    });

}



}
