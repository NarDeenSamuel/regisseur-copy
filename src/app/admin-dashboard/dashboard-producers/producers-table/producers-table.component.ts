import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-producers-table',
  imports: [CommonModule,FormsModule],
  templateUrl: './producers-table.component.html',
  styleUrl: './producers-table.component.css'
})
export class ProducersTableComponent {
activeFilter = 'All';

currentPage = 1;

itemsPerPage = 5;

openedMenu:number | null = null;

showFilterMenu = false;

selectedCategory = '';

selectedStatus = '';

/* ====================================== */
/* FILTERS */
/* ====================================== */

filters = [

  'All',

  'Verified',

  'Active',

  'Inactive',

  'Pending Verification'
];

/* ====================================== */
/* CATEGORY OPTIONS */
/* ====================================== */

categoryOptions = [

  'Promoter',

  'Organizer'
];

/* ====================================== */
/* STATUS OPTIONS */
/* ====================================== */

statusOptions = [

  'Verified',

  'Pending',

  'Inactive'
];

/* ====================================== */
/* PRODUCERS DATA */
/* ====================================== */

producers = [

  {
    image:'https://upload.wikimedia.org/wikipedia/commons/8/89/Live_Nation_logo.svg',

    title:'Live Nation',

    subTitle:'Sarah Johnson',

    email:'sarah.johnson@livenation.com',

    phone:'+1 212-555-0189',

    location:'New York, USA',

    flag:'🇺🇸',

    type:'Promoter',

    categoryClass:'planning',

    projects:128,

    revenue:'$1.24M',

    rating:4.8,

    reviews:324,

    status:'Verified',

    joined:'Jan 12, 2021'
  },

  {
    image:'https://upload.wikimedia.org/wikipedia/commons/5/5e/AEG_logo.svg',

    title:'AEG Presents',

    subTitle:'Michael Chen',

    email:'michael.chen@aegpresents.com',

    phone:'+1 310-555-0123',

    location:'Los Angeles, USA',

    flag:'🇺🇸',

    type:'Promoter',

    categoryClass:'planning',

    projects:96,

    revenue:'$950K',

    rating:4.7,

    reviews:268,

    status:'Verified',

    joined:'Mar 5, 2021'
  },

  {
    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300',

    title:'Insomniac Events',

    subTitle:'David Lee',

    email:'david.lee@insomniac.com',

    phone:'+1 949-555-0198',

    location:'Irvine, USA',

    flag:'🇺🇸',

    type:'Promoter',

    categoryClass:'planning',

    projects:78,

    revenue:'$720K',

    rating:4.6,

    reviews:198,

    status:'Verified',

    joined:'Apr 18, 2021'
  },

  {
    image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=300',

    title:'Goldenvoice',

    subTitle:'Emily Rodriguez',

    email:'emily.rodriguez@goldenvoice.com',

    phone:'+1 323-555-0167',

    location:'Los Angeles, USA',

    flag:'🇺🇸',

    type:'Promoter',

    categoryClass:'planning',

    projects:65,

    revenue:'$610K',

    rating:4.5,

    reviews:176,

    status:'Verified',

    joined:'Jun 22, 2021'
  },

  {
    image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',

    title:'C3 Presents',

    subTitle:'James Walker',

    email:'james.walker@c3presents.com',

    phone:'+1 512-555-0112',

    location:'Austin, USA',

    flag:'🇺🇸',

    type:'Promoter',

    categoryClass:'planning',

    projects:54,

    revenue:'$480K',

    rating:4.4,

    reviews:142,

    status:'Verified',

    joined:'Jul 10, 2021'
  },

  {
    image:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',

    title:'Dream Team',

    subTitle:'Olivia Martin',

    email:'olivia@dreamteam.com',

    phone:'+1 786-555-0176',

    location:'Miami, USA',

    flag:'🇺🇸',

    type:'Organizer',

    categoryClass:'upcoming',

    projects:32,

    revenue:'$210K',

    rating:4.3,

    reviews:98,

    status:'Pending',

    joined:'Sep 2, 2021'
  },

  {
    image:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300',

    title:'Future Sound',

    subTitle:'Ryan Patel',

    email:'ryan@futuresound.com',

    phone:'+1 416-555-0144',

    location:'Toronto, Canada',

    flag:'🇨🇦',

    type:'Promoter',

    categoryClass:'planning',

    projects:47,

    revenue:'$350K',

    rating:4.6,

    reviews:121,

    status:'Verified',

    joined:'Oct 5, 2021'
  },

  {
    image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300',

    title:'Global Vibes',

    subTitle:'Sophia Brown',

    email:'sophia@globalvibes.com',

    phone:'+1 971-555-0153',

    location:'Portland, USA',

    flag:'🇺🇸',

    type:'Organizer',

    categoryClass:'upcoming',

    projects:19,

    revenue:'$120K',

    rating:4.2,

    reviews:64,

    status:'Inactive',

    joined:'Dec 11, 2021'
  }

];
getStatusClass(status:any){

  switch(status){

    case 'Verified':
      return 'live';

    case 'Pending':
      return 'hold';

    case 'Inactive':
      return 'cancelled';

    default:
      return 'planning';
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

  let data = [...this.producers];

  /* ====================================== */
  /* TOP FILTERS */
  /* ====================================== */

  if(this.activeFilter !== 'All'){

    data = data.filter(item => {

      if(this.activeFilter === 'Verified'){

        return item.status === 'Verified';
      }

      if(this.activeFilter === 'Active'){

        return item.status === 'Verified';
      }

      if(this.activeFilter === 'Inactive'){

        return item.status === 'Inactive';
      }

      if(
        this.activeFilter ===
        'Pending Verification'
      ){

        return item.status === 'Pending';
      }

      return true;
    });
  }

  /* ====================================== */
  /* CATEGORY FILTER */
  /* ====================================== */

  if(this.selectedCategory){

    data = data.filter(

      item =>

      item.type ===
      this.selectedCategory
    );
  }

  /* ====================================== */
  /* STATUS FILTER */
  /* ====================================== */

  if(this.selectedStatus){

    data = data.filter(

      item =>

      item.status ===
      this.selectedStatus
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
      'Producers Report',
      30,
      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[

        'Producer / Company',

        'Contact',

        'Location',

        'Type',

        'Active Projects',

        'Rating',

        'Status',

        'Joined'
      ]],

      body:this.filteredVendors.map(
        (item:any)=>([

          `${item.title}
${item.subTitle}`,

          `${item.email}
${item.phone}`,

          item.location,

          item.type,

          `${item.projects}
${item.revenue}`,

          `${item.rating} ⭐
(${item.reviews})`,

          item.status,

          item.joined
        ])
      ),

      styles:{

        fillColor:[10,10,10],

        textColor:[255,255,255],

        lineColor:[25,25,25],

        lineWidth:0.4,

        fontSize:9,

        cellPadding:8,

        valign:'middle',

        overflow:'linebreak'
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
      'producers-report.pdf'
    );
  };
}


// Charts
/* ========================================= */
/* TOTAL */
/* ========================================= */

totalProducers = this.producers.length;

/* ========================================= */
/* COUNTS */
/* ========================================= */

promoterCount =
this.producers.filter(
  x => x.type === 'Promoter'
).length;

organizerCount =
this.producers.filter(
  x => x.type === 'Organizer'
).length;

managerCount =
this.producers.filter(
  x => x.type === 'Manager'
).length;

agencyCount =
this.producers.filter(
  x => x.type === 'Agency'
).length;

/* ========================================= */
/* OTHER */
/* ========================================= */

otherCount =
this.producers.filter(
  x =>
    x.type !== 'Promoter' &&
    x.type !== 'Organizer' &&
    x.type !== 'Manager' &&
    x.type !== 'Agency'
).length;

/* ========================================= */
/* PERCENTAGES */
/* ========================================= */

promoterPercent =
(this.promoterCount / this.totalProducers) * 100;

organizerPercent =
(this.organizerCount / this.totalProducers) * 100;

managerPercent =
(this.managerCount / this.totalProducers) * 100;

agencyPercent =
(this.agencyCount / this.totalProducers) * 100;

otherPercent =
(this.otherCount / this.totalProducers) * 100;

// card 2


locationData:any = {};

allLocations:any[] = [];

topLocations:any[] = [];

constructor(){

  this.generateLocations();
}

/* ========================================= */
/* GENERATE LOCATIONS */
/* ========================================= */

generateLocations(){

  this.producers.forEach((item:any)=>{

    if(!this.locationData[item.location]){

      this.locationData[item.location] = {

        location:item.location,

        count:0,

        total:0
      };
    }

    this.locationData[item.location].count++;

    this.locationData[item.location].total += item.projects;
  });

  this.allLocations =
  Object.values(this.locationData)

  .sort(
    (a:any,b:any)=>
    b.total - a.total
  )

  .map((item:any)=>({

    ...item,

    percent:
    (
      item.total /

      Math.max(
        ...Object.values(
          this.locationData
        ).map(
          (x:any)=> Number(x.total)
        )
      )
    ) * 100
  }));

  this.topLocations =
  this.allLocations.slice(0,5);
}






/* ========================================= */
/* TOP REVENUE */
/* ========================================= */

allRevenueReports =
[...this.producers]

.sort(
  (a:any,b:any)=>
  this.getRevenueValue(b.revenue) -
  this.getRevenueValue(a.revenue)
);

topRevenueReports =
this.allRevenueReports.slice(0,5);

/* ========================================= */
/* REVENUE VALUE */
/* ========================================= */

getRevenueValue(value:string){

  if(value.includes('M')){

    return parseFloat(
      value.replace('$','')
      .replace('M','')
    ) * 1000000;
  }

  if(value.includes('K')){

    return parseFloat(
      value.replace('$','')
      .replace('K','')
    ) * 1000;
  }

  return Number(
    value.replace('$','')
  );
}



}
