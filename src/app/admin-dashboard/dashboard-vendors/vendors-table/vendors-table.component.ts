import { CommonModule } from '@angular/common';
import { Component ,  AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import {ChartConfiguration,ChartOptions} from 'chart.js';
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
  selector: 'app-vendors-table',
  imports: [CommonModule, FormsModule,],
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.css'
})
export class VendorsTableComponent {

  activeFilter = 'All Vendors';

  currentPage = 1;

  itemsPerPage = 5;

  openedMenu: number | null = null;

  showFilterMenu = false;

  selectedCategory = '';

  filters = [
    'All Vendors',
    'Approved',
    'Pending',
    'Inactive',
    'Blacklisted'
  ];

  categoryOptions = [
    'Audio',
    'Lighting',
    'Production',
    'Catering',
    'AV & Visual',
    'Staffing',
    'Transportation'
  ];

 vendors = [

  {
    image:'https://randomuser.me/api/portraits/men/32.jpg',

    title:'ProSound Solutions',

    email:'contact@prosound.com',

    phone:'+1 212-555-0101',

    type:'Audio',

    categoryClass:'planning',

    services:'Sound Engineering',

    subServices:'Equipment Rental, Audio Technicians',

    location:'New York, USA',

    status:'Approved',

    rating:4.8,

    reviews:124,

    activeBookings:18,

    totalBookings:96
  },

  {
    image:'https://randomuser.me/api/portraits/men/45.jpg',

    title:'LightX Lighting',

    email:'info@lightx.com',

    phone:'+1 310-555-0202',

    type:'Lighting',

    categoryClass:'upcoming',

    services:'Lighting Design',

    subServices:'Equipment Rental, Lighting Crew',

    location:'Los Angeles, USA',

    status:'Approved',

    rating:4.7,

    reviews:98,

    activeBookings:22,

    totalBookings:120
  },

  {
    image:'https://randomuser.me/api/portraits/men/51.jpg',

    title:'Stage Right Productions',

    email:'hello@stageright.com',

    phone:'+1 646-555-0303',

    type:'Production',

    categoryClass:'cancelled',

    services:'Stage Production',

    subServices:'Set Design, Technical Direction',

    location:'Miami, USA',

    status:'Approved',

    rating:4.9,

    reviews:156,

    activeBookings:31,

    totalBookings:210
  },

  {
    image:'https://randomuser.me/api/portraits/women/44.jpg',

    title:'Elite Catering Co.',

    email:'events@elitecatering.com',

    phone:'+1 786-555-0404',

    type:'Catering',

    categoryClass:'planning',

    services:'Catering',

    subServices:'Bar Services, Hospitality Staff',

    location:'Miami, USA',

    status:'Approved',

    rating:4.6,

    reviews:77,

    activeBookings:16,

    totalBookings:85
  },

  {
    image:'https://randomuser.me/api/portraits/women/68.jpg',

    title:'Vista Visuals',

    email:'hello@vistavisuals.com',

    phone:'+1 213-555-0505',

    type:'AV & Visual',

    categoryClass:'upcoming',

    services:'LED Screens',

    subServices:'Video Production, Projection Mapping',

    location:'New York, USA',

    status:'Pending',

    rating:4.4,

    reviews:31,

    activeBookings:6,

    totalBookings:18
  },

  {
    image:'https://randomuser.me/api/portraits/men/61.jpg',

    title:'Talent Crew Agency',

    email:'bookings@talentcrew.com',

    phone:'+1 416-555-0606',

    type:'Staffing',

    categoryClass:'planning',

    services:'Stage Crew',

    subServices:'Event Staff, Logistics',

    location:'Toronto, Canada',

    status:'Approved',

    rating:4.5,

    reviews:64,

    activeBookings:27,

    totalBookings:143
  },

  {
    image:'https://randomuser.me/api/portraits/men/27.jpg',

    title:'Beat Express',

    email:'info@beatexpress.com',

    phone:'+1 323-555-0707',

    type:'Transportation',

    categoryClass:'cancelled',

    services:'Artist Transportation',

    subServices:'Logistics, Equipment Transport',

    location:'Atlanta, USA',

    status:'Inactive',

    rating:4.2,

    reviews:22,

    activeBookings:0,

    totalBookings:34
  }

];

  getStatusClass(status:string):string{

    switch(status){

      case 'Approved':
        return 'completed';

      case 'Pending':
        return 'planning';

      case 'Inactive':
        return 'cancelled';

      case 'Blacklisted':
        return 'hold';

      default:
        return 'completed';
    }
  }

  changeItemsPerPage(){

    this.currentPage = 1;
  }

  setFilter(filter:string){

    this.activeFilter = filter;

    this.currentPage = 1;
  }

  toggleFilterMenu(){

    this.showFilterMenu =
    !this.showFilterMenu;
  }

  applyFilters(){

    this.currentPage = 1;
  }

  get filteredVendors(){

    let data = [...this.vendors];

    if(this.activeFilter !== 'All Vendors'){

      data = data.filter(

        item =>

        item.status === this.activeFilter
      );
    }

    if(this.selectedCategory){

      data = data.filter(

        item =>

        item.type === this.selectedCategory
      );
    }

    return data;
  }

  get totalPagesCount(): number {

    return Math.ceil(
      this.filteredVendors.length /
      this.itemsPerPage
    );
  }

  get paginatedVendors(){

    const start =
      (this.currentPage - 1) *
      this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredVendors.slice(
      start,
      end
    );
  }

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

  toggleMenu(index:number){

    if(this.openedMenu === index){

      this.openedMenu = null;

    } else {

      this.openedMenu = index;
    }
  }

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
      'Vendors Report',
      30,
      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[
        'Vendor',
        'Category',
        'Services',
        'Location',
        'Status',
        'Rating',
        'Active Bookings',
        'Total Bookings'
      ]],

      body:this.filteredVendors.map(
        (item:any)=>([

          `${item.title}
${item.email}
${item.phone}`,

          item.type,

          `${item.services}
${item.subServices}`,

          item.location,

          item.status,

          `${item.rating} ⭐
(${item.reviews})`,

          item.activeBookings,

          item.totalBookings
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
      'vendors-report.pdf'
    );
  };
}






// charts


/* ====================================== */
/* COUNTS */
/* ====================================== */

audioCount = 156;

lightingCount = 132;

productionCount = 118;

cateringCount = 96;

avCount = 72;

staffingCount = 42;

transportCount = 32;

/* ====================================== */
/* TOTAL */
/* ====================================== */

totalVendors =
  this.audioCount +
  this.lightingCount +
  this.productionCount +
  this.cateringCount +
  this.avCount +
  this.staffingCount +
  this.transportCount;

/* ====================================== */
/* PERCENTAGES */
/* ====================================== */

audioPercent =
  (this.audioCount / this.totalVendors) * 100;

lightingPercent =
  (this.lightingCount / this.totalVendors) * 100;

productionPercent =
  (this.productionCount / this.totalVendors) * 100;

cateringPercent =
  (this.cateringCount / this.totalVendors) * 100;

avPercent =
  (this.avCount / this.totalVendors) * 100;

staffingPercent =
  (this.staffingCount / this.totalVendors) * 100;

transportPercent =
  (this.transportCount / this.totalVendors) * 100;


showVendorsModal = false;

/* ====================================== */
/* ============ TOP VENDORS ============= */
/* ====================================== */

get topVendors(){

  return [...this.vendors]

  .sort(
    (a,b)=>
    b.totalBookings - a.totalBookings
  )

  .slice(0,5);
}

/* ====================================== */
/* ============ OPEN MODAL ============== */
/* ====================================== */

openVendorsModal(){

  this.showVendorsModal = true;
}

/* ====================================== */
/* ============ CLOSE MODAL ============= */
/* ====================================== */

closeVendorsModal(){

  this.showVendorsModal = false;
}


showYearDropdown = false;

showMonthDropdown = false;

selectedYear = '';

selectedMonth = '';

currentYear = new Date().getFullYear();

/* ====================================== */
/* =============== YEARS ================ */
/* ====================================== */

years:number[] = [];

generateYears(){

  for(
    let year = 2024;
    year <= this.currentYear;
    year++
  ){

    this.years.push(year);
  }
}

/* ====================================== */
/* =============== MONTHS =============== */
/* ====================================== */

months:string[] = [

  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/* ====================================== */
/* ============== DROPDOWN ============== */
/* ====================================== */

toggleYearDropdown(){

  this.showYearDropdown =
  !this.showYearDropdown;

  this.showMonthDropdown = false;
}

toggleMonthDropdown(){

  this.showMonthDropdown =
  !this.showMonthDropdown;

  this.showYearDropdown = false;
}

selectYear(year:any){

  this.selectedYear = year;

  this.showYearDropdown = false;
}

selectMonth(month:any){

  this.selectedMonth = month;

  this.showMonthDropdown = false;
}

/* ====================================== */
/* ================ INIT ================ */
/* ====================================== */

ngOnInit(){

  this.generateYears();
}

/* ====================================== */
/* SORTED VENDORS */
/* ====================================== */

get sortedVendors(){

  return [...this.filteredVendors]

  .sort(
    (a,b)=>
    b.totalBookings - a.totalBookings
  );
}






/* ====================================== */
/* CHART DATA */
/* ====================================== */

vendorActivityChartData:
ChartConfiguration<'line'>['data'] = {

  labels:[

    'May 16',
    '',
    '',
    '',
    '',
    'May 26',
    '',
    '',
    '',
    '',
    'Jun 5',
    '',
    '',
    '',
    '',
    'Jun 16'
  ],

  datasets:[

    {
      label:'New Vendors',

      data:this.vendors.map(
        item => item.totalBookings
      ),

      borderColor:'#ff2b45',

      backgroundColor:'rgba(255,43,69,.18)',

      fill:true,

      tension:.45,

      borderWidth:2,

      pointRadius:3,

      pointHoverRadius:5,

      pointBackgroundColor:'#0b0b0b',

      pointBorderColor:'#ff2b45',

      pointBorderWidth:2
    }
  ]
};

/* ====================================== */
/* CHART OPTIONS */
/* ====================================== */


ngAfterViewInit(){

  this.loadVendorsTimelineChart();
}

loadVendorsTimelineChart(){

  const canvas:any =
    document.getElementById(
      'vendorsTimelineChart'
    );

  if(!canvas) return;

  const ctx =
    canvas.getContext('2d');

  const gradient =

    ctx.createLinearGradient(
      0,
      0,
      0,
      260
    );

  gradient.addColorStop(
    0,
    'rgba(255,45,45,.45)'
  );

  gradient.addColorStop(
    1,
    'rgba(255,45,45,0)'
  );

  const chartData =

    this.vendors.map(
      item => item.totalBookings
    );

  new Chart(ctx,{

    type:'line',

    data:{

      labels:[

        'May 16',
        '',
        'May 20',
        '',
        'May 26',
        '',
        'Jun 5'
      ],

      datasets:[

        {
          data:chartData,

          borderColor:'#ff2d2d',

          backgroundColor:
          gradient,

          fill:true,

          tension:.45,

          borderWidth:2.5,

          pointRadius:4,

          pointHoverRadius:4,

          pointBackgroundColor:
          '#0b0b0b',

          pointBorderColor:
          '#ff2d2d',

          pointBorderWidth:2.5
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

      layout:{

        padding:{
          top:10
        }
      },

      scales:{

        x:{

          ticks:{

            color:'#8b8b8b',

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

          max:220,

          ticks:{

            stepSize:50,

            color:'#8b8b8b',

            font:{
              size:11
            }
          },

          grid:{

            color:
            'rgba(255,255,255,.05)'
          },

          border:{
            display:false
          }
        }
      }
    }
  });
}
}
