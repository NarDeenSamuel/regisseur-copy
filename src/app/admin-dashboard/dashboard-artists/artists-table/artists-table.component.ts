import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-artists-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './artists-table.component.html',
  styleUrl: './artists-table.component.css'
})
export class ArtistsTableComponent {

activeFilter = 'All Artists';

currentPage = 1;

itemsPerPage = 5;

openedMenu: number | null = null;

showFilterMenu = false;

selectedCategory = '';

selectedAvailability = '';

filters = [

  'All Artists',

  'Musicians',

  'DJs',

  'Singers',

  'Performers',

  'Technicians',

  'Photographers'
];

categoryOptions = [

  'DJ',

  'Musician',

  'Singer',

  'Photographer',

  'Performer',

  'Technician',

  'MC / Host'
];

availabilityOptions = [

  'Available',

  'Busy'
];

artists = [

  {

    image:'https://randomuser.me/api/portraits/women/65.jpg',

    title:'Ava Monroe',

    subTitle:'DJ / Producer',

    type:'DJ',

    categoryClass:'planning',

    location:'Miami, USA',

    rating:4.9,

    reviews:132,

    bookings:48,

    availability:'Jun 18 – Jun 25',

    availabilityStatus:'Available',

    status:'Active'
  },

  {

    image:'https://randomuser.me/api/portraits/men/32.jpg',

    title:'Jaxon Reid',

    subTitle:'Live Musician',

    type:'Musician',

    categoryClass:'cancelled',

    location:'Los Angeles, USA',

    rating:4.8,

    reviews:98,

    bookings:32,

    availability:'Jun 20 – Jun 30',

    availabilityStatus:'Available',

    status:'Active'
  },

  {

    image:'https://randomuser.me/api/portraits/women/44.jpg',

    title:'Luna Soul',

    subTitle:'Singer',

    type:'Singer',

    categoryClass:'hold',

    location:'New York, USA',

    rating:4.7,

    reviews:76,

    bookings:27,

    availability:'Jun 17 – Jun 23',

    availabilityStatus:'Busy',

    status:'Active'
  },

  {

    image:'https://randomuser.me/api/portraits/men/51.jpg',

    title:'Ethan Black',

    subTitle:'Photographer',

    type:'Photographer',

    categoryClass:'upcoming',

    location:'Chicago, USA',

    rating:4.6,

    reviews:64,

    bookings:21,

    availability:'Jun 16 – Jun 22',

    availabilityStatus:'Available',

    status:'Active'
  },

  {

    image:'https://randomuser.me/api/portraits/women/68.jpg',

    title:'Maya Velvet',

    subTitle:'Performer',

    type:'Performer',

    categoryClass:'orange',

    location:'London, UK',

    rating:4.8,

    reviews:89,

    bookings:34,

    availability:'Jun 21 – Jun 28',

    availabilityStatus:'Available',

    status:'Active'
  },

  {

    image:'https://randomuser.me/api/portraits/men/61.jpg',

    title:'Lucas Bright',

    subTitle:'Lighting Designer',

    type:'Technician',

    categoryClass:'completed',

    location:'Berlin, Germany',

    rating:4.7,

    reviews:52,

    bookings:19,

    availability:'Jun 19 – Jun 27',

    availabilityStatus:'Available',

    status:'Active'
  },

  {

    image:'https://randomuser.me/api/portraits/men/27.jpg',

    title:'The Beat Syndicate',

    subTitle:'DJ Group',

    type:'DJ',

    categoryClass:'planning',

    location:'Ibiza, Spain',

    rating:4.9,

    reviews:120,

    bookings:56,

    availability:'Jul 01 – Jul 15',

    availabilityStatus:'Busy',

    status:'On Tour'
  },

  {

    image:'https://randomuser.me/api/portraits/men/75.jpg',

    title:'Rico Flames',

    subTitle:'MC / Host',

    type:'MC / Host',

    categoryClass:'orange',

    location:'Dubai, UAE',

    rating:4.6,

    reviews:71,

    bookings:26,

    availability:'Jun 18 – Jun 24',

    availabilityStatus:'Available',

    status:'Active'
  }

];

getStatusClass(status:string):string{

  switch(status){

    case 'Active':
      return 'completed';

    case 'On Tour':
      return 'upcoming';

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

  let data = [...this.artists];

  if(this.activeFilter !== 'All Artists'){

    data = data.filter(item => {

      if(this.activeFilter === 'DJs'){

        return item.type === 'DJ';
      }

      if(this.activeFilter === 'Musicians'){

        return item.type === 'Musician';
      }

      if(this.activeFilter === 'Singers'){

        return item.type === 'Singer';
      }

      if(this.activeFilter === 'Performers'){

        return item.type === 'Performer';
      }

      if(this.activeFilter === 'Technicians'){

        return item.type === 'Technician';
      }

      if(this.activeFilter === 'Photographers'){

        return item.type === 'Photographer';
      }

      return true;
    });
  }

  if(this.selectedCategory){

    data = data.filter(

      item =>

      item.type === this.selectedCategory
    );
  }

  if(this.selectedAvailability){

    data = data.filter(

      item =>

      item.availabilityStatus
      === this.selectedAvailability
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
      'Artists Report',
      30,
      titleY
    );

    /* TABLE */

    autoTable(doc,{

      startY: titleY + 20,

      head:[[

        'Artist',

        'Category',

        'Location',

        'Rating',

        'Bookings',

        'Availability',

        'Status'
      ]],

      body:this.filteredVendors.map(
        (item:any)=>([

          `${item.title}
${item.subTitle}`,

          item.type,

          item.location,

          `${item.rating} ⭐
(${item.reviews} reviews)`,

          `${item.bookings}
This Month`,

          `${item.availability}
${item.availabilityStatus}`,

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
      'artists-report.pdf'
    );
  };
}




// Right Side

/* ========================================= */
/* TOTAL */
/* ========================================= */

totalArtists = this.artists.length;

/* ========================================= */
/* COUNTS */
/* ========================================= */

djCount =
this.artists.filter(
  x => x.type === 'DJ'
).length;

musicianCount =
this.artists.filter(
  x => x.type === 'Musician'
).length;

singerCount =
this.artists.filter(
  x => x.type === 'Singer'
).length;

performerCount =
this.artists.filter(
  x => x.type === 'Performer'
).length;

photographerCount =
this.artists.filter(
  x => x.type === 'Photographer'
).length;

technicianCount =
this.artists.filter(
  x => x.type === 'Technician'
).length;

/* ========================================= */
/* OTHERS */
/* ========================================= */

othersCount =
this.artists.filter(
  x =>
    x.type !== 'DJ' &&
    x.type !== 'Musician' &&
    x.type !== 'Singer' &&
    x.type !== 'Performer' &&
    x.type !== 'Photographer' &&
    x.type !== 'Technician'
).length;

/* ========================================= */
/* PERCENTAGES */
/* ========================================= */

djPercent =
(this.djCount / this.totalArtists) * 100;

musicianPercent =
(this.musicianCount / this.totalArtists) * 100;

singerPercent =
(this.singerCount / this.totalArtists) * 100;

performerPercent =
(this.performerCount / this.totalArtists) * 100;

photographerPercent =
(this.photographerCount / this.totalArtists) * 100;

technicianPercent =
(this.technicianCount / this.totalArtists) * 100;

othersPercent =
(this.othersCount / this.totalArtists) * 100;




// Card 2

/* ====================================== */
/* TOP 5 للكارد */
/* ====================================== */

topArtists = [...this.artists]

.sort(
  (a,b) => b.bookings - a.bookings
)

.slice(0,5);

/* ====================================== */
/* ALL ARTISTS للموديل */
/* ====================================== */

allArtists = [...this.artists]

.sort(
  (a,b) => b.bookings - a.bookings
);


// card 3




newArtists = [

  {
    image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',

    title:'Zara Nightshade',

    subTitle:'DJ / Producer',

    joinDate:'Jun 14, 2024'
  },

  {
    image:'https://randomuser.me/api/portraits/men/32.jpg',

    title:'Noah Carter',

    subTitle:'Live Musician',

    joinDate:'Jun 13, 2024'
  },

  {
    image:'https://randomuser.me/api/portraits/women/44.jpg',

    title:'Velvet Echo',

    subTitle:'Singer',

    joinDate:'Jun 12, 2024'
  },

  {
    image:'https://randomuser.me/api/portraits/men/61.jpg',

    title:'Lucas Bright',

    subTitle:'Lighting Designer',

    joinDate:'Jun 11, 2024'
  },

  {
    image:'https://randomuser.me/api/portraits/women/68.jpg',

    title:'Maya Velvet',

    subTitle:'Performer',

    joinDate:'Jun 10, 2024'
  },

  {
    image:'https://randomuser.me/api/portraits/men/27.jpg',

    title:'The Beat Syndicate',

    subTitle:'DJ Group',

    joinDate:'Jun 09, 2024'
  }

];

/* ===================================== */
/* CARD */
/* ===================================== */

topNewArtists =
this.newArtists.slice(0,3);

/* ===================================== */
/* MODAL */
/* ===================================== */

allNewArtists =
this.newArtists;






}






