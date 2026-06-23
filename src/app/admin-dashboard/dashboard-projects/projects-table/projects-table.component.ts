import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Chart,LineController,LineElement,PointElement,LinearScale,CategoryScale,Filler,Tooltip,Legend} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);


@Component({
  selector: 'app-projects-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {




  /* ====================================== */
  /* ============== GENERAL =============== */
  /* ====================================== */

  activeFilter = 'All Projects';

  currentPage = 1;

  itemsPerPage = 5;

  openedMenu: number | null = null;

  showFilterMenu = false;

  selectedCategory = '';

  selectedType = '';

  selectedDate = '';

filters = [
  'All Projects',
  'Planning',
  'In Progress',
  'On Hold',
  'Completed',
  'Cancelled'
];
categoryOptions = [
  'Live Music',
  'Fashion Event',
  'DJ Night',
  'Private Event',
  'Comedy Show',
  'Day Party',
  'Corporate Event'
];
typeOptions = [
  'Planning',
  'In Progress',
  'On Hold',
  'Completed',
  'Cancelled'
];
  /* ====================================== */
  /* ================ DATA ================ */
  /* ====================================== */

projects = [

  {
    orderId:'PRJ-100245',

    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',

    title:'Rooftop Jazz Night',

    type:'Live Music',

    date:'May 25, 2024',

    fullDate:'2024-05-25',

    time:'8:00 PM',

    venue:'Le Bain NYC',

    location:'New York, USA',

    organizer:'Daniel Carter',

    organizerImage:'https://randomuser.me/api/portraits/men/32.jpg',

    bookings:'65%',

    bookingsCount:65,

    revenue:'$125,000',

    revenueNumber:125000,

    spent:'$81,250 spent',

    status:'In Progress',

    statusClass:'upcoming',

    progress:65,

    progressClass:'progress-blue'
  },

  {
    orderId:'PRJ-100244',

    image:'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop',

    title:'Luxury Fashion Show',

    type:'Fashion Event',

    date:'May 28, 2024',

    fullDate:'2024-05-28',

    time:'6:00 PM',

    venue:'The Mercer',

    location:'Los Angeles, USA',

    organizer:'Sophia Williams',

    organizerImage:'https://randomuser.me/api/portraits/women/44.jpg',

    bookings:'25%',

    bookingsCount:25,

    revenue:'$215,000',

    revenueNumber:215000,

    spent:'$32,540 spent',

    status:'Planning',

    statusClass:'planning',

    progress:25,

    progressClass:'progress-purple'
  },

  {
    orderId:'PRJ-100243',

    image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',

    title:'Electronic Vibes',

    type:'DJ Night',

    date:'May 30, 2024',

    fullDate:'2024-05-30',

    time:'10:00 PM',

    venue:'Club Nebula',

    location:'Miami, USA',

    organizer:'Michael Brown',

    organizerImage:'https://randomuser.me/api/portraits/men/51.jpg',

    bookings:'80%',

    bookingsCount:80,

    revenue:'$98,500',

    revenueNumber:98500,

    spent:'$78,800 spent',

    status:'In Progress',

    statusClass:'upcoming',

    progress:80,

    progressClass:'progress-blue'
  },

  {
    orderId:'PRJ-100242',

    image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',

    title:'Elegant Wedding',

    type:'Private Event',

    date:'Jun 2, 2024',

    fullDate:'2024-06-02',

    time:'5:00 PM',

    venue:'Palm Court',

    location:'Beverly Hills, USA',

    organizer:'Olivia Martinez',

    organizerImage:'https://randomuser.me/api/portraits/women/68.jpg',

    bookings:'40%',

    bookingsCount:40,

    revenue:'$67,000',

    revenueNumber:67000,

    spent:'$26,800 spent',

    status:'Planning',

    statusClass:'planning',

    progress:40,

    progressClass:'progress-purple'
  },

  {
    orderId:'PRJ-100241',

    image:'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1200&auto=format&fit=crop',

    title:'Stand Up Comedy Night',

    type:'Comedy Show',

    date:'Jun 5, 2024',

    fullDate:'2024-06-05',

    time:'9:00 PM',

    venue:'The Laugh House',

    location:'Chicago, USA',

    organizer:'James Wilson',

    organizerImage:'https://randomuser.me/api/portraits/men/27.jpg',

    bookings:'70%',

    bookingsCount:70,

    revenue:'$32,000',

    revenueNumber:32000,

    spent:'$22,400 spent',

    status:'In Progress',

    statusClass:'upcoming',

    progress:70,

    progressClass:'progress-blue'
  },

  {
    orderId:'PRJ-100240',

    image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',

    title:'Beach Party 2024',

    type:'Day Party',

    date:'Jun 8, 2024',

    fullDate:'2024-06-08',

    time:'2:00 PM',

    venue:'Ocean Drive',

    location:'Miami, USA',

    organizer:'Emily Johnson',

    organizerImage:'https://randomuser.me/api/portraits/women/22.jpg',

    bookings:'55%',

    bookingsCount:55,

    revenue:'$110,000',

    revenueNumber:110000,

    spent:'$60,500 spent',

    status:'In Progress',

    statusClass:'upcoming',

    progress:55,

    progressClass:'progress-blue'
  },

  {
    orderId:'PRJ-100239',

    image:'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop',

    title:'Broadway Nights',

    type:'Theater Performance',

    date:'Jun 12, 2024',

    fullDate:'2024-06-12',

    time:'7:30 PM',

    venue:'City Theater',

    location:'New York, USA',

    organizer:'Liam Anderson',

    organizerImage:'https://randomuser.me/api/portraits/men/61.jpg',

    bookings:'20%',

    bookingsCount:20,

    revenue:'$75,000',

    revenueNumber:75000,

    spent:'$15,000 spent',

    status:'On Hold',

    statusClass:'cancelled',

    progress:20,

    progressClass:'progress-orange'
  },

  {
    orderId:'PRJ-100238',

    image:'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',

    title:'Private Corporate Gala',

    type:'Corporate Event',

    date:'Jun 15, 2024',

    fullDate:'2024-06-15',

    time:'8:00 PM',

    venue:'Global Solutions Inc.',

    location:'San Francisco, USA',

    organizer:'Ava Thompson',

    organizerImage:'https://randomuser.me/api/portraits/women/31.jpg',

    bookings:'10%',

    bookingsCount:10,

    revenue:'$1,250,000',

    revenueNumber:1250000,

    spent:'$12,500 spent',

    status:'Planning',

    statusClass:'planning',

    progress:10,

    progressClass:'progress-purple'
  }

];


getStatusClass(status:string):string{

  switch(status){

    case 'In Progress':
      return 'upcoming';

    case 'Planning':
      return 'planning';

    case 'On Hold':
      return 'hold';

    case 'Completed':
      return 'completed';

    case 'Cancelled':
      return 'cancelled';

    default:
      return 'upcoming';
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

    this.projects.sort(
      (a:any,b:any)=>
      b.bookingsCount - a.bookingsCount
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============ SORT REVENUE ============ */
  /* ====================================== */

  sortByRevenue(){

    this.projects.sort(
      (a:any,b:any)=>
      b.revenueNumber - a.revenueNumber
    );

    this.showFilterMenu = false;
  }

  /* ====================================== */
  /* ============== FILTERED ============== */
  /* ====================================== */

get filteredProjects(){

  let data = [...this.projects];

  /* ====================================== */
  /* FILTER TABS */
  /* ====================================== */

  if(this.activeFilter !== 'All Projects'){

    data = data.filter(

      item =>

      item.status === this.activeFilter
    );
  }

  /* ====================================== */
  /* CATEGORY FILTER */
  /* ====================================== */

  if(this.selectedCategory){

    data = data.filter(

      item =>

      item.type === this.selectedCategory
    );
  }

  /* ====================================== */
  /* STATUS FILTER */
  /* ====================================== */

  if(this.selectedType){

    data = data.filter(

      item =>

      item.status === this.selectedType
    );
  }

  /* ====================================== */
  /* DATE FILTER */
  /* ====================================== */

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
      this.filteredProjects.length /
      this.itemsPerPage
    );
  }

  get paginatedProjects(){

    const start =
      (this.currentPage - 1) *
      this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredProjects.slice(
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
      'Projects Report',
      30,
      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[

        'Project',

        'Event / Client',

        'Project Manager',

        'Status',

        'Progress',

        'Budget',

        'End Date'
      ]],

      body:this.filteredProjects.map(
        (item:any)=>([

          `${item.title}
${item.type}`,

          `${item.venue}
${item.date}`,

          item.organizer,

          item.status,

          `${item.progress}%`,

          `${item.revenue}
${item.spent}`,

          `${item.date}
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
      'projects-report.pdf'
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


  this.loadTasksOverview();
this.generateMilestoneYears();

  this.filteredMilestones = [
    ...this.upcomingMilestones
  ];

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

// charts



ngAfterViewInit(){

  this.loadTimelineChart();
}

/* ===================================== */
/* TIMELINE CHART */
/* ===================================== */

loadTimelineChart(){

  const labels = this.projects.map(
    item => item.date.split(',')[0]
  );

  const startedData = this.projects.map(
    item => item.progress - 15
  );

  const completedData = this.projects.map(
    item => item.progress
  );

  const overdueData = this.projects.map(
    item =>
      item.status === 'On Hold'
      ? item.progress + 10
      : item.progress - 30
  );

  new Chart('timelineChart',{

    type:'line',

    data:{

      labels,

      datasets:[

        {
          label:'Started',

          data:startedData,

          borderColor:'#1e90ff',

          backgroundColor:'transparent',

          tension:.45,

          borderWidth:3,

          pointRadius:0
        },

        {
          label:'Completed',

          data:completedData,

          borderColor:'#39d353',

          backgroundColor:'transparent',

          tension:.45,

          borderWidth:3,

          pointRadius:0
        },

        {
          label:'Overdue',

          data:overdueData,

          borderColor:'#ff2d2d',

          backgroundColor:'transparent',

          tension:.45,

          borderWidth:3,

          pointRadius:0
        }
      ]
    },

    options:{

      responsive:true,

      maintainAspectRatio:false,

      plugins:{

        legend:{
          display:false
        }
      },

      scales:{

        x:{

          ticks:{
            color:'#8d8d8d',
            font:{
              size:11
            }
          },

          grid:{
            display:false
          },

          border:{
            display:false
          }
        },

        y:{

  min:0,

  max:100,

  ticks:{

    stepSize:20,

    color:'#8d8d8d',

    font:{
      size:11
    }
  },

  grid:{
    color:'rgba(255,255,255,.06)'
  },

  border:{
    display:false
  }
}
      }
    }
  });
}



// ======================================
// TASKS STATS
// ======================================

completedTasks = 0;

progressTasks = 0;

pendingTasks = 0;

overdueTasks = 0;

totalTasks = 0;

completedPercent = 0;

progressPercent = 0;

pendingPercent = 0;

overduePercent = 0;

// ======================================
// INIT
// ======================================
// ======================================
// TASKS OVERVIEW
// ======================================


loadTasksOverview(){

  this.completedTasks =
    this.projects.filter(
      item => item.status === 'Completed'
    ).length;

  this.progressTasks =
    this.projects.filter(
      item => item.status === 'In Progress'
    ).length;

  this.pendingTasks =
    this.projects.filter(
      item => item.status === 'Planning'
    ).length;

  this.overdueTasks =
    this.projects.filter(
      item => item.status === 'On Hold'
    ).length;

  this.totalTasks =

    this.completedTasks +

    this.progressTasks +

    this.pendingTasks +

    this.overdueTasks;

  this.completedPercent = Math.round(
    (this.completedTasks / this.totalTasks) * 100
  );

  this.progressPercent = Math.round(
    (this.progressTasks / this.totalTasks) * 100
  );

  this.pendingPercent = Math.round(
    (this.pendingTasks / this.totalTasks) * 100
  );

  this.overduePercent = Math.round(
    (this.overdueTasks / this.totalTasks) * 100
  );
}




upcomingMilestones = [

  {
    milestone:'Production Meeting',

    title:'Rooftop Jazz Night',

    date:'May 20, 2024',

    image:this.projects[0].image
  },

  {
    milestone:'Technical Rehearsal',

    title:'Luxury Fashion Show',

    date:'May 24, 2024',

    image:this.projects[1].image
  },

  {
    milestone:'Load-In',

    title:'Electronic Vibes',

    date:'May 29, 2024',

    image:this.projects[2].image
  },

  {
    milestone:'Venue Inspection',

    title:'Elegant Wedding',

    date:'Jun 1, 2024',

    image:this.projects[3].image
  },

  {
    milestone:'Sound Check',

    title:'Stand Up Comedy Night',

    date:'Jun 4, 2024',

    image:this.projects[4].image
  },

  {
    milestone:'Final Setup',

    title:'Beach Party 2024',

    date:'Jun 7, 2024',

    image:this.projects[5].image
  }

];

/* ====================================== */
/* YEARS */
/* ====================================== */

milestoneYears:string[] = [];



/* ====================================== */
/* GENERATE YEARS */
/* ====================================== */

generateMilestoneYears(){

  const currentYear =
    new Date().getFullYear();

  this.milestoneYears = Array.from(

    {
      length:
        currentYear - 2024 + 1
    },

    (_,i)=>
      (2024 + i).toString()
  );
}

/* ====================================== */
/* MONTHS */
/* ====================================== */

milestoneMonths = [

  {
    value:'01',
    label:'January'
  },

  {
    value:'02',
    label:'February'
  },

  {
    value:'03',
    label:'March'
  },

  {
    value:'04',
    label:'April'
  },

  {
    value:'05',
    label:'May'
  },

  {
    value:'06',
    label:'June'
  },

  {
    value:'07',
    label:'July'
  },

  {
    value:'08',
    label:'August'
  },

  {
    value:'09',
    label:'September'
  },

  {
    value:'10',
    label:'October'
  },

  {
    value:'11',
    label:'November'
  },

  {
    value:'12',
    label:'December'
  }
];

/* ====================================== */
/* SELECTED */
/* ====================================== */

selectedMilestoneYear = 'all';

selectedMilestoneMonth = 'all';

/* ====================================== */
/* DATA */
/* ====================================== */

// upcomingMilestones = [

//   {
//     milestone:'Production Meeting',

//     title:'Rooftop Jazz Night',

//     date:'May 20, 2024',

//     fullDate:'2024-05-20'
//   },

//   {
//     milestone:'Technical Rehearsal',

//     title:'Luxury Fashion Show',

//     date:'May 24, 2024',

//     fullDate:'2024-05-24'
//   },

//   {
//     milestone:'Load-In',

//     title:'Electronic Vibes',

//     date:'May 29, 2024',

//     fullDate:'2024-05-29'
//   },

//   {
//     milestone:'Venue Inspection',

//     title:'Elegant Wedding',

//     date:'Jun 1, 2024',

//     fullDate:'2024-06-01'
//   },

//   {
//     milestone:'Sound Check',

//     title:'Stand Up Comedy Night',

//     date:'Jun 4, 2024',

//     fullDate:'2024-06-04'
//   }
// ];

/* ====================================== */
/* FILTERED */
/* ====================================== */

filteredMilestones:any[] = [];

/* ====================================== */
/* FILTER */
/* ====================================== */

filterMilestones(){

  this.filteredMilestones =

    this.upcomingMilestones.filter(
      (item:any)=>{

        const date =
          new Date(item.fullDate);

        const year =
          date.getFullYear().toString();

        const month =
          String(
            date.getMonth() + 1
          ).padStart(2,'0');

        const yearMatch =

          this.selectedMilestoneYear ===
          'all'

          ||

          year ===
          this.selectedMilestoneYear;

        const monthMatch =

          this.selectedMilestoneMonth ===
          'all'

          ||

          month ===
          this.selectedMilestoneMonth;

        return (
          yearMatch &&
          monthMatch
        );
      }
    );
}

}
