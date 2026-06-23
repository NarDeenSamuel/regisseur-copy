import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Component({
  selector: 'app-agreements-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './agreements-table.component.html',
  styleUrl: './agreements-table.component.css'
})
export class AgreementsTableComponent {


activeFilter = 'All Agreements';

currentPage = 1;

itemsPerPage = 5;

openedMenu:number | null = null;

showFilterMenu = false;

selectedCategory = '';

selectedType = '';

selectedDate = '';

/* ====================================== */
/* FILTERS */
/* ====================================== */

filters = [

  'All Agreements',

  'Active',

  'Pending',

  'Executed',

  'Expired',

  'Cancelled'
];

/* ====================================== */
/* CATEGORY OPTIONS */
/* ====================================== */

categoryOptions = [

  'Artist',

  'Venue',

  'Vendor',

  'Management',

  'Service',

  'Insurance',

  'Sponsorship'
];

/* ====================================== */
/* TYPE OPTIONS */
/* ====================================== */

typeOptions = [

  'Artist Agreement',

  'Venue Agreement',

  'Vendor Agreement',

  'Insurance Agreement',

  'Sponsorship Agreement'
];

/* ====================================== */
/* AGREEMENTS DATA */
/* ====================================== */

events = [

  {
    image:'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',

    title:'Artist Performance Agreement',

    agreementId:'AGR-2024-0156',

    category:'Artist',

    type:'Artist Agreement',

    typeClass:'status-blue',

    partyA:'Ava Monroe',

    partyARole:'Artist',

    partyAImage:'https://randomuser.me/api/portraits/women/44.jpg',

    partyB:'Rooftop Jazz',

    partyBRole:'Production',

    partyBImage:'https://randomuser.me/api/portraits/men/32.jpg',

    relatedTo:'Rooftop Jazz Nights',

    project:'May Series',

    value:'$45,000',

    valueNumber:45000,

    startDate:'May 20, 2026',

    endDate:'May 20, 2026',

    status:'Active',

    statusClass:'live'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/854/854878.png',

    title:'Venue Rental Agreement',

    agreementId:'AGR-2024-0155',

    category:'Venue',

    type:'Venue Agreement',

    typeClass:'status-green',

    partyA:'The Mercer Ballroom',

    partyARole:'Venue',

    partyAImage:'https://randomuser.me/api/portraits/men/22.jpg',

    partyB:'Luxury Fashion Show',

    partyBRole:'Event',

    partyBImage:'https://randomuser.me/api/portraits/women/55.jpg',

    relatedTo:'Luxury Fashion Show',

    project:'Event',

    value:'$32,000',

    valueNumber:32000,

    startDate:'May 28, 2026',

    endDate:'May 28, 2026',

    status:'Executed',

    statusClass:'executed'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/3659/3659899.png',

    title:'Production Services Agreement',

    agreementId:'AGR-2026-0154',

    category:'Vendor',

    type:'Vendor Agreement',

    typeClass:'status-purple',

    partyA:'ProSound Solutions',

    partyARole:'Vendor',

    partyAImage:'https://randomuser.me/api/portraits/men/41.jpg',

    partyB:'Electronic Vibes',

    partyBRole:'Festival',

    partyBImage:'https://randomuser.me/api/portraits/men/51.jpg',

    relatedTo:'Electronic Vibes',

    project:'Project',

    value:'$88,500',

    valueNumber:88500,

    startDate:'May 30, 2026',

    endDate:'May 30, 2026',

    status:'Active',

    statusClass:'live'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/942/942748.png',

    title:'Talent Representation Agreement',

    agreementId:'AGR-2026-0153',

    category:'Management',

    type:'Management Agreement',

    typeClass:'status-orange',

    partyA:'Talent Core Agency',

    partyARole:'Management',

    partyAImage:'https://randomuser.me/api/portraits/men/66.jpg',

    partyB:'Santiago Vega',

    partyBRole:'Artist',

    partyBImage:'https://randomuser.me/api/portraits/men/36.jpg',

    relatedTo:'Santiago Live Tour',

    project:'Event',

    value:'$18,000',

    valueNumber:18000,

    startDate:'Jun 5, 2025',

    endDate:'Jun 5, 2025',

    status:'Pending',

    statusClass:'pending'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/891/891419.png',

    title:'Ticketing Service Agreement',

    agreementId:'AGR-2026-0152',

    category:'Service',

    type:'Service Agreement',

    typeClass:'status-red',

    partyA:'Goldenvoice',

    partyARole:'Organizer',

    partyAImage:'https://randomuser.me/api/portraits/men/20.jpg',

    partyB:'Broadway Nights',

    partyBRole:'Concerts',

    partyBImage:'https://randomuser.me/api/portraits/men/15.jpg',

    relatedTo:'Broadway Nights',

    project:'Event',

    value:'$15,000',

    valueNumber:15000,

    startDate:'Jun 1, 2026',

    endDate:'Dec 31, 2026',

    status:'Cancelled',

    statusClass:'cancelled'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',

    title:'Insurance Agreement',

    agreementId:'AGR-2026-0151',

    category:'Insurance',

    type:'Insurance Agreement',

    typeClass:'status-sky',

    partyA:'Secure Event',

    partyARole:'Insurance',

    partyAImage:'https://randomuser.me/api/portraits/women/24.jpg',

    partyB:'Beach Party 2026',

    partyBRole:'Event',

    partyBImage:'https://randomuser.me/api/portraits/men/77.jpg',

    relatedTo:'Beach Party 2026',

    project:'Event',

    value:'$7,850',

    valueNumber:7850,

    startDate:'Jun 8, 2026',

    endDate:'Jun 9, 2026',

    status:'Expired',

    statusClass:'expired'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/1042/1042339.png',

    title:'Photography Agreement',

    agreementId:'AGR-2026-0150',

    category:'Vendor',

    type:'Vendor Agreement',

    typeClass:'status-purple',

    partyA:'Lucas Bright',

    partyARole:'Photographer',

    partyAImage:'https://randomuser.me/api/portraits/men/61.jpg',

    partyB:'Elegance Wedding',

    partyBRole:'Event',

    partyBImage:'https://randomuser.me/api/portraits/women/30.jpg',

    relatedTo:'Elegance Wedding',

    project:'Event',

    value:'$12,000',

    valueNumber:12000,

    startDate:'Jun 2, 2026  ',

    endDate:'Jun 2, 2026',

    status:'Pending',

    statusClass:'pending'
  },

  {
    image:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',

    title:'Sponsorship Agreement',

    agreementId:'AGR-2026-0149',

    category:'Sponsorship',

    type:'Sponsorship Agreement',

    typeClass:'status-teal',

    partyA:'Global Solutions Inc.',

    partyARole:'Sponsor',

    partyAImage:'https://randomuser.me/api/portraits/men/12.jpg',

    partyB:'Private Corporate Gala',

    partyBRole:'Project',

    partyBImage:'https://randomuser.me/api/portraits/men/82.jpg',

    relatedTo:'Private Corporate Gala',

    project:'Project',

    value:'$250,000',

    valueNumber:250000,

    startDate:'Jun 15, 2026',

    endDate:'Dec 31, 2026',

    status:'Executed',

    statusClass:'executed'
  }

];
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
    /* ============== FILTERED ============== */
    /* ====================================== */

  get filteredEvents(){

  let data = [...this.events];

  /* STATUS */

  if(this.activeFilter !== 'All Agreements'){

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

    const selected =
      new Date(this.selectedDate);

    data = data.filter((item:any)=>{

      const start =
        new Date(item.startDate);

      const end =
        new Date(item.endDate);

      return(

        start.toDateString() ===
        selected.toDateString()

        ||

        end.toDateString() ===
        selected.toDateString()
      );
    });
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

  doc.setFillColor(5,5,5);

  doc.rect(
    0,
    0,
    doc.internal.pageSize.width,
    doc.internal.pageSize.height,
    'F'
  );

  const logo = 'assets/images/logo.png';

  const img = new Image();

  img.src = logo;

  img.onload = () => {

    const pdfWidth = 90;

    const ratio =
      img.height / img.width;

    const pdfHeight =
      pdfWidth * ratio;

    doc.addImage(
      logo,
      'PNG',
      30,
      20,
      pdfWidth,
      pdfHeight
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(22);

    const titleY =
      20 + pdfHeight + 25;

    doc.text(
      'Agreements Report',
      30,
      titleY
    );

    autoTable(doc,{

      startY: titleY + 20,

      head:[[

        'Agreement',

        'Type',

        'Party A',

        'Party B',

        'Related To',

        'Value',

        'Start Date',

        'End Date',

        'Status'
      ]],

      body:this.filteredEvents.map(
        (item:any)=>([

          `${item.title}
${item.agreementId}`,

          item.category,

          `${item.partyA}
${item.partyARole}`,

          `${item.partyB}
${item.partyBRole}`,

          `${item.relatedTo}
${item.project}`,

          item.value,

          item.startDate,

          item.endDate,

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
      'agreements-report.pdf'
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


  //  right side

/* ========================================= */
/* TOTAL */
/* ========================================= */

totalAgreements = this.events.length;

/* ========================================= */
/* COUNTS */
/* ========================================= */

activeCount =
this.events.filter(
  x => x.status === 'Active'
).length;

pendingCount =
this.events.filter(
  x => x.status === 'Pending'
).length;

executedCount =
this.events.filter(
  x => x.status === 'Executed'
).length;

expiredCount =
this.events.filter(
  x => x.status === 'Expired'
).length;

cancelledCount =
this.events.filter(
  x => x.status === 'Cancelled'
).length;

/* ========================================= */
/* PERCENTAGES */
/* ========================================= */

activePercent =
(this.activeCount / this.totalAgreements) * 100;

pendingPercent =
(this.pendingCount / this.totalAgreements) * 100;

executedPercent =
(this.executedCount / this.totalAgreements) * 100;

expiredPercent =
(this.expiredCount / this.totalAgreements) * 100;

cancelledPercent =
(this.cancelledCount / this.totalAgreements) * 100;




// card 2

/* ========================================= */
/* UPCOMING EXPIRATIONS */
/* ========================================= */

upcomingExpirations =
this.events
.filter(event => {

  const end =
    new Date(event.endDate);

  const today =
    new Date();

  return end >= today;
})
.map(event => {

  const end =
    new Date(event.endDate);

  const today =
    new Date();

  const diffTime =
    end.getTime() -
    today.getTime();

  const daysLeft =
    Math.ceil(
      diffTime /
      (1000 * 60 * 60 * 24)
    );

  return {

    ...event,

    daysLeft
  };
})
.sort(
  (a,b) =>
    a.daysLeft -
    b.daysLeft
);

/* ========================================= */
/* CARD ONLY */
/* ========================================= */

topUpcomingExpirations =
this.upcomingExpirations
.slice(0,4);


/* ========================================= */
/* AGREEMENTS BY TYPE */
/* ========================================= */

artistCount =
this.events.filter(
  x => x.category === 'Artist'
).length;

venueCount =
this.events.filter(
  x => x.category === 'Venue'
).length;

vendorCount =
this.events.filter(
  x => x.category === 'Vendor'
).length;

serviceCount =
this.events.filter(
  x => x.category === 'Service'
).length;

managementCount =
this.events.filter(
  x => x.category === 'Management'
).length;

othersTypeCount =
this.events.filter(
  x =>
    x.category !== 'Artist' &&
    x.category !== 'Venue' &&
    x.category !== 'Vendor' &&
    x.category !== 'Service' &&
    x.category !== 'Management'
).length;

/* ========================================= */
/* PERCENTAGES */
/* ========================================= */

artistPercent =
(this.artistCount / this.totalAgreements) * 100;

venuePercent =
(this.venueCount / this.totalAgreements) * 100;

vendorPercent =
(this.vendorCount / this.totalAgreements) * 100;

servicePercent =
(this.serviceCount / this.totalAgreements) * 100;

managementPercent =
(this.managementCount / this.totalAgreements) * 100;

othersTypePercent =
(this.othersTypeCount / this.totalAgreements) * 100;







}
