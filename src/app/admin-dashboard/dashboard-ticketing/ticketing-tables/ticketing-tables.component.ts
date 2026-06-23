import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ticketing-tables',
  imports: [CommonModule,FormsModule],
  templateUrl: './ticketing-tables.component.html',
  styleUrl: './ticketing-tables.component.css'
})
export class TicketingTablesComponent {



  /* ====================================== */
  /* ============== GENERAL =============== */
  /* ====================================== */

  activeFilter = 'Orders';

  currentPage = 1;

  itemsPerPage = 5;

  openedMenu: number | null = null;

  showFilterMenu = false;

  selectedCategory = '';

  selectedType = '';

  selectedDate = '';

   filters = [
    'Orders',
    'Ticket Tiers',
    'Check-In',
    'Refunds',
    'Deposits'
  ];

 categoryOptions = [
  'Confirmed',
  'Checked In',
  'Cancelled'
];

typeOptions = [
  'Paid',
  'Deposit Paid',
  'Refunded'
];
  /* ====================================== */
  /* ================ DATA ================ */
  /* ====================================== */
tickets = [

  {
    orderId:'ORD-100245',

    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',

    title:'Rooftop Jazz Night',

    date:'May 25, 2024',

    fullDate:'2024-05-15',

    time:'8:00 PM',

    venue:'James Carter',

    location:'james.carter@email.com',

    organizer:'Row A - 12-13',

    bookings:'2 × VIP',

    bookingsCount:2,

    revenue:'$480.00',

    revenueNumber:480,

    status:'Confirmed',

    statusClass:'completed',

    type:'Paid',

    progress:100,

    progressClass:'progress-green'
  },

  {
    orderId:'ORD-100244',

    image:'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop',

    title:'Luxury Fashion Show',

    date:'May 28, 2024',

    fullDate:'2024-05-14',

    time:'6:00 PM',

    venue:'Sophie Williams',

    location:'sophie.w@email.com',

    organizer:'GA',

    bookings:'4 × General',

    bookingsCount:4,

    revenue:'$320.00',

    revenueNumber:320,

    status:'Confirmed',

    statusClass:'completed',

    type:'Paid',

    progress:100,

    progressClass:'progress-green'
  },

  {
    orderId:'ORD-100243',

    image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',

    title:'Electronic Vibes',

    date:'May 30, 2024',

    fullDate:'2024-05-14',

    time:'10:00 PM',

    venue:'Michael Brown',

    location:'michael@email.com',

    organizer:'Row B - 7-9',

    bookings:'3 × VIP',

    bookingsCount:3,

    revenue:'$810.00',

    revenueNumber:810,

    status:'Checked In',

    statusClass:'upcoming',

    type:'Paid',

    progress:100,

    progressClass:'progress-green'
  },

  {
    orderId:'ORD-100242',

    image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',

    title:'Elegant Wedding',

    date:'Jun 2, 2024',

    fullDate:'2024-05-13',

    time:'5:00 PM',

    venue:'Olivia Martinez',

    location:'olivia.m@email.com',

    organizer:'Table 5',

    bookings:'2 × Premium',

    bookingsCount:2,

    revenue:'$1,200.00',

    revenueNumber:1200,

    status:'Confirmed',

    statusClass:'completed',

    type:'Deposit Paid',

    progress:80,

    progressClass:'progress-gray'
  },

  {
    orderId:'ORD-100241',

    image:'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1200&auto=format&fit=crop',

    title:'Stand Up Comedy Night',

    date:'Jun 5, 2024',

    fullDate:'2024-05-12',

    time:'9:00 PM',

    venue:'Daniel Wilson',

    location:'daniel@email.com',

    organizer:'GA',

    bookings:'1 × General',

    bookingsCount:1,

    revenue:'$80.00',

    revenueNumber:80,

    status:'Confirmed',

    statusClass:'completed',

    type:'Paid',

    progress:100,

    progressClass:'progress-green'
  },

  {
    orderId:'ORD-100238',

    image:'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',

    title:'Private Corporate Gala',

    date:'Jun 15, 2024',

    fullDate:'2024-05-10',

    time:'8:00 PM',

    venue:'Corporate Client',

    location:'events@globex.com',

    organizer:'Table 2',

    bookings:'10 × Premium',

    bookingsCount:10,

    revenue:'$5,000.00',

    revenueNumber:5000,

    status:'Confirmed',

    statusClass:'completed',

    type:'Paid',

    progress:100,

    progressClass:'progress-green'
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

    this.tickets.sort(
      (a:any,b:any)=>
      b.bookingsCount - a.bookingsCount
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============ SORT REVENUE ============ */
  /* ====================================== */

  sortByRevenue(){

    this.tickets.sort(
      (a:any,b:any)=>
      b.revenueNumber - a.revenueNumber
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============== FILTERED ============== */
  /* ====================================== */

 get filteredTickets(){

  let data = [...this.tickets];

  /* FILTER TABS */

  if(this.activeFilter === 'Check-In'){

    data = data.filter(
      item => item.status === 'Checked In'
    );
  }

  if(this.activeFilter === 'Refunds'){

    data = data.filter(
      item => item.type === 'Refunded'
    );
  }

  if(this.activeFilter === 'Deposits'){

    data = data.filter(
      item => item.type === 'Deposit Paid'
    );
  }

  /* STATUS */

  if(this.selectedCategory){

    data = data.filter(
      item =>
      item.status === this.selectedCategory
    );
  }

  /* PAYMENT */

  if(this.selectedType){

    data = data.filter(
      item =>
      item.type === this.selectedType
    );
  }

  /* DATE */

  if(this.selectedDate){

    data = data.filter(
      item =>
      item.fullDate === this.selectedDate
    );
  }

  return data;
}

  /* ====================================== */
  /* ============== PAGINATION ============ */
  /* ====================================== */

  get totalPagesCount(): number {

    return Math.ceil(
      this.filteredTickets.length /
      this.itemsPerPage
    );
  }

  get paginatedTickets(){

    const start =
      (this.currentPage - 1) *
      this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredTickets.slice(
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
      'Ticket Report',
      30,
      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[
        'Order ID',
        'Event',
        'Buyer',
        'Tickets',
        'Amount',
        'Status',
        'Payment Status',
        'Order Date'
      ]],

      body:this.filteredTickets.map(
        (item:any)=>([

          item.orderId,

          `${item.title}
${item.date} • ${item.time}`,

          `${item.venue}
${item.location}`,

          `${item.bookings}
${item.organizer}`,

          `${item.revenue}
Incl. fees`,

          item.status,

          item.type,

          `${item.fullDate}
${item.time}`
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
      'ticket-report.pdf'
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
    this.generateRevenueChart();

  this.loadTicketTierStats();
    this.loadTopSalesEvents();


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


// Charts
selectedDays:string = '30';

totalRevenue:number = 0;

chartLinePath:string = '';

chartAreaPath:string = '';

generateRevenueChart(){

  /* TOTAL */

  this.totalRevenue = this.tickets.reduce(

    (total,item)=>

    total + item.revenueNumber,

    0
  );

  /* DATA FROM TICKETS */

  const revenues = this.tickets.map(

    item => item.revenueNumber
  );

  /* MAKE CURVE */

  const max = Math.max(...revenues);

  const width = 600;

  const height = 190;

  const stepX = width / (revenues.length - 1);

  let line = '';

  let area = '';

  revenues.forEach((value,index)=>{

    const x = index * stepX;

    const y = height -

    ((value / max) * 150);

    if(index === 0){

      line += `M ${x} ${y}`;

      area += `M ${x} ${height} L ${x} ${y}`;

    } else {

      const prevX =

      (index - 1) * stepX;

      const curveX =

      (prevX + x) / 2;

      line += ` Q ${curveX} ${y} ${x} ${y}`;

      area += ` Q ${curveX} ${y} ${x} ${y}`;
    }
  });

  area += ` L ${width} ${height} Z`;

  this.chartLinePath = line;

  this.chartAreaPath = area;
}

// ticket-tier


/* ====================================== */
/* TICKET TIERS */
/* ====================================== */

vipCount:number = 0;

premiumCount:number = 0;

generalCount:number = 0;

earlyBirdCount:number = 0;

totalSold:number = 0;

/* ====================================== */
/* PERCENTAGES */
/* ====================================== */

vipPercent:number = 0;

premiumPercent:number = 0;

generalPercent:number = 0;

earlyBirdPercent:number = 0;

/* ====================================== */
/* INIT */
/* ====================================== */



/* ====================================== */
/* LOAD TICKET TIERS */
/* ====================================== */

loadTicketTierStats(){

  this.vipCount = 0;

  this.premiumCount = 0;

  this.generalCount = 0;

  this.earlyBirdCount = 0;

  this.tickets.forEach((item:any)=>{

    const count = item.bookingsCount;

    if(item.bookings.includes('VIP')){

      this.vipCount += count;
    }

    else if(item.bookings.includes('Premium')){

      this.premiumCount += count;
    }

    else if(item.bookings.includes('General')){

      this.generalCount += count;
    }

    else{

      this.earlyBirdCount += count;
    }

  });

  this.totalSold =

    this.vipCount +

    this.premiumCount +

    this.generalCount +

    this.earlyBirdCount;

  /* PERCENT */

  this.vipPercent =

    (this.vipCount / this.totalSold) * 100;

  this.premiumPercent =

    (this.premiumCount / this.totalSold) * 100;

  this.generalPercent =

    (this.generalCount / this.totalSold) * 100;

  this.earlyBirdPercent =

    (this.earlyBirdCount / this.totalSold) * 100;
}


//  TOP EVENTS BY SALES
/* ======================================= */
/* TOP SALES */
/* ======================================= */

topSalesEvents:any[] = [];

filteredSalesEvents:any[] = [];

/* ======================================= */
/* FILTERS */
/* ======================================= */

selectedSalesMonth:string = 'all';

selectedSalesYear:string = 'all';

/* ======================================= */
/* MONTHS */
/* ======================================= */

salesMonths = [

  { label:'January', value:'01' },
  { label:'February', value:'02' },
  { label:'March', value:'03' },
  { label:'April', value:'04' },
  { label:'May', value:'05' },
  { label:'June', value:'06' },
  { label:'July', value:'07' },
  { label:'August', value:'08' },
  { label:'September', value:'09' },
  { label:'October', value:'10' },
  { label:'November', value:'11' },
  { label:'December', value:'12' }

];

/* ======================================= */
/* YEARS */
/* ======================================= */

salesYears:string[] =

Array.from(

  {
    length:
    new Date().getFullYear() - 2024 + 1
  },

  (_,i)=>

  String(2024 + i)
);

/* ======================================= */
/* INIT */
/* ======================================= */



/* ======================================= */
/* LOAD TOP SALES */
/* ======================================= */

loadTopSalesEvents(){

  const grouped:any = {};

  this.tickets.forEach((item:any)=>{

    if(!grouped[item.title]){

      grouped[item.title] = {

        title:item.title,

        image:item.image,

        totalRevenue:0,

        totalTickets:0,

        fullDate:item.fullDate
      };
    }

    grouped[item.title].totalRevenue +=

      item.revenueNumber;

    grouped[item.title].totalTickets +=

      item.bookingsCount;
  });

  const result = Object.values(grouped)

  .map((item:any)=>({

    ...item,

    totalRevenue:

    '$' +

    item.totalRevenue.toLocaleString()
  }))

  .sort(

    (a:any,b:any)=>

    parseInt(

      b.totalRevenue.replace(/[$,]/g,'')

    )

    -

    parseInt(

      a.totalRevenue.replace(/[$,]/g,'')

    )
  );

  this.topSalesEvents = result.slice(0,5);

  this.filteredSalesEvents = result;
}

/* ======================================= */
/* FILTER REPORTS */
/* ======================================= */

filterSalesReports(){

  const grouped:any = {};

  this.tickets.forEach((item:any)=>{

    const parts = item.fullDate.split('-');

    const year = parts[0];

    const month = parts[1];

    const monthMatch =

      this.selectedSalesMonth === 'all'

      ||

      month === this.selectedSalesMonth;

    const yearMatch =

      this.selectedSalesYear === 'all'

      ||

      year === this.selectedSalesYear;

    if(monthMatch && yearMatch){

      if(!grouped[item.title]){

        grouped[item.title] = {

          title:item.title,

          image:item.image,

          totalRevenue:0,

          totalTickets:0
        };
      }

      grouped[item.title].totalRevenue +=

        item.revenueNumber;

      grouped[item.title].totalTickets +=

        item.bookingsCount;
    }

  });

  this.filteredSalesEvents =

  Object.values(grouped)

  .map((item:any)=>({

    ...item,

    totalRevenue:

    '$' +

    item.totalRevenue.toLocaleString()
  }))

  .sort(

    (a:any,b:any)=>

    parseInt(

      b.totalRevenue.replace(/[$,]/g,'')

    )

    -

    parseInt(

      a.totalRevenue.replace(/[$,]/g,'')

    )
  );
}













}
