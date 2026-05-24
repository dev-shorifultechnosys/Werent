/* =========================================================
   Werent Static Marketplace Prototype
   Interactive demo data, filters, dashboard and admin actions
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const storageKey = 'werent-demo-listings-v1';
const savedKey = 'werent-saved-listings-v1';

const categoryInfo = {
  Residential: {
    color: 'Residential',
    desc: 'Houses, Units, Apartments & more',
    countLabel: '12,458+ listings',
    icon: houseIcon,
    popular: 'Houses for rent',
    types: ['House', 'Apartment / Unit', 'Townhouse', 'Studio', 'Room'],
    filters: {
      'Property type': ['House', 'Apartment / Unit', 'Townhouse', 'Studio', 'Room'],
      Bedrooms: ['1+', '2+', '3+', '4+', '5+'],
      Bathrooms: ['1+', '2+', '3+', '4+'],
      'Car spaces': ['1+', '2+', '3+', '4+'],
      'More filters': ['Pets allowed', 'Furnished']
    }
  },
  Commercial: {
    color: 'Commercial',
    desc: 'Offices, Medical, Showrooms & more',
    countLabel: '6,214+ listings',
    icon: buildingIcon,
    popular: 'Office space for lease',
    types: ['Office', 'Medical', 'Showroom', 'Consulting / Suite', 'Co-working'],
    filters: {
      'Property type': ['Office', 'Medical', 'Showroom', 'Consulting / Suite', 'Co-working'],
      Floor: ['Ground', 'Level 1', 'Level 2+', 'Whole building'],
      'Building features': ['Air conditioning', 'Lift', 'Parking', 'Disabled access']
    }
  },
  Industrial: {
    color: 'Industrial',
    desc: 'Warehouses, Logistics, Manufacturing & more',
    countLabel: '4,892+ listings',
    icon: warehouseIcon,
    popular: 'Warehouses for lease',
    types: ['Warehouse', 'Distribution', 'Manufacturing', 'Storage', 'Yard / Hardstand'],
    filters: {
      'Property type': ['Warehouse', 'Distribution', 'Manufacturing', 'Storage', 'Yard / Hardstand'],
      Access: ['Container access', 'Truck access', 'Drive-through'],
      'Clear height': ['6m+', '8m+', '10m+', '12m+']
    }
  },
  Retail: {
    color: 'Retail',
    desc: 'Shops, Centres, Kiosks & more',
    countLabel: '2,731+ listings',
    icon: shopIcon,
    popular: 'Retail space for lease',
    types: ['Shop / Retail Space', 'Kiosk', 'Food & Beverage', 'Large Format Retail', 'Pop-up / Short Term'],
    filters: {
      'Property type': ['Shop / Retail Space', 'Kiosk', 'Food & Beverage', 'Large Format Retail', 'Pop-up / Short Term'],
      'Centre type': ['Shopping centre', 'Street frontage', 'Food court', 'Neighbourhood strip'],
      Features: ['High foot traffic', 'Parking', 'Food court nearby', 'Outdoor area']
    }
  },
  Rural: {
    color: 'Rural',
    desc: 'Farms, Grazing, Viticulture, Orchards & more',
    countLabel: '1,246+ listings',
    icon: leafIcon,
    popular: 'Farms for lease',
    types: ['Cropping', 'Grazing', 'Mixed Farming', 'Horticulture / Orchard', 'Vineyard'],
    filters: {
      'Property type': ['Cropping', 'Grazing', 'Mixed Farming', 'Horticulture / Orchard', 'Vineyard'],
      'Water access': ['Water licence', 'Dam', 'Bore', 'Irrigation'],
      Features: ['Fencing', 'Dwelling included', 'Sheds / Infrastructure']
    }
  }
};

const seedListings = [
  {
    id: 'res-001', category: 'Residential', type: 'House', title: 'Elegant Family Residence with City Views',
    priceValue: 650, period: 'per week', location: '23 Example Street, Suburb VIC 3000', city: 'Melbourne', state: 'VIC',
    beds: 3, baths: 2, cars: 2, area: '245 m²', land: '420 m²', agent: 'Elite Residential', status: 'available', approved: true, featured: true,
    views: 1245, enquiries: 19, saves: 36, description: 'A light-filled family home with generous living zones, secure parking, a private garden and quick access to schools, parks and city transport.',
    features: ['Pets allowed', 'Furnished', 'Garden', 'Secure parking'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/elegant-family-residence'
  },
  {
    id: 'res-002', category: 'Residential', type: 'Apartment / Unit', title: 'Sleek Modern Inner-City Sanctuary',
    priceValue: 520, period: 'per week', location: '28B Fitzroy Lane, Carlton VIC 3053', city: 'Melbourne', state: 'VIC',
    beds: 2, baths: 1, cars: 1, area: '84 m²', land: '-', agent: 'Apex Real Estate', status: 'available', approved: true, featured: false,
    views: 843, enquiries: 12, saves: 29, description: 'A modern apartment with open-plan living, balcony, stone kitchen and excellent public transport links.',
    features: ['Unfurnished', 'Balcony', 'Secure entry'],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/inner-city-apartment'
  },
  {
    id: 'res-003', category: 'Residential', type: 'Studio', title: 'Compact Minimalist Single-Studio Loft',
    priceValue: 420, period: 'per week', location: 'Carlton, VIC', city: 'Melbourne', state: 'VIC',
    beds: 1, baths: 1, cars: 0, area: '52 m²', land: '-', agent: 'Urban Living', status: 'available', approved: true, featured: false,
    views: 512, enquiries: 9, saves: 14, description: 'A low-maintenance studio with a calm interior palette, ideal for students and professionals.',
    features: ['Furnished', 'Lift', 'Low maintenance'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/studio-loft'
  },
  {
    id: 'com-001', category: 'Commercial', type: 'Office', title: 'Executive High-Rise Corporate Office',
    priceValue: 36000, period: 'p.a. + Outgoings', location: 'Level 2, 123 Business Ave, Melbourne VIC 3000', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 4, area: '120 m²', land: '-', agent: 'Commercial Core', status: 'available', approved: true, featured: true,
    views: 865, enquiries: 21, saves: 18, description: 'Modern office suite with city outlook, meeting rooms, lift access and secure parking.',
    features: ['Office', 'Parking', 'Lift', 'Air conditioning'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/corporate-office'
  },
  {
    id: 'com-002', category: 'Commercial', type: 'Medical', title: 'Fitted Boutique Clinical & Medical Suite',
    priceValue: 28500, period: 'p.a. + Outgoings', location: '45 Example St, Melbourne VIC 3000', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 2, area: '85 m²', land: '-', agent: 'Care Properties', status: 'available', approved: true, featured: false,
    views: 426, enquiries: 7, saves: 10, description: 'Ready-to-use medical consulting rooms with reception, treatment areas and accessible entry.',
    features: ['Medical', 'Air conditioning', 'Disabled access'],
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/medical-suite'
  },
  {
    id: 'com-003', category: 'Commercial', type: 'Showroom', title: 'High Exposure Corner Showroom & Retail',
    priceValue: 42000, period: 'p.a. + Outgoings', location: 'Ground Floor, 88 Commercial Rd, Melbourne VIC', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 3, area: '150 m²', land: '-', agent: 'Prime Retail Core', status: 'available', approved: true, featured: false,
    views: 650, enquiries: 15, saves: 17, description: 'Prominent showroom with wide frontage, flexible interior and strong passing traffic.',
    features: ['Showroom', 'Parking', 'High foot traffic'],
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/showroom-retail'
  },
  {
    id: 'ind-001', category: 'Industrial', type: 'Warehouse', title: 'State-Of-The-Art Logistics & Freight Depot',
    priceValue: 120000, period: 'p.a. + Outgoings', location: '15 Industrial Drive, Truganina VIC 3029', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 12, area: '1,250 m² building', land: '2,500 m² land', agent: 'Logistics Realty', status: 'available', approved: true, featured: true,
    views: 643, enquiries: 18, saves: 24, description: 'Premium warehouse with container-height access, hardstand, high clearance and direct arterial connectivity.',
    features: ['Warehouse', 'Truck access', 'Container access', 'Clear height 10m'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/logistics-depot'
  },
  {
    id: 'ind-002', category: 'Industrial', type: 'Distribution', title: 'High Clearance Distribution Logistics Facility',
    priceValue: 95000, period: 'p.a. + Outgoings', location: '2 Logistics Court, Laverton North VIC 3026', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 10, area: '800 m² building', land: '1,500 m² land', agent: 'Industrial Elite', status: 'available', approved: true, featured: false,
    views: 495, enquiries: 14, saves: 20, description: 'Functional distribution warehouse with roller doors, office space and heavy vehicle movement.',
    features: ['Distribution', 'Truck access', 'Clear height 8m'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/distribution-facility'
  },
  {
    id: 'ind-003', category: 'Industrial', type: 'Storage', title: 'Industrial Work Storage Warehouse',
    priceValue: 75000, period: 'p.a. + Outgoings', location: '7 Example Road, Thomastown VIC 3074', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 8, area: '600 m²', land: '1,000 m² land', agent: 'Metro Industrial', status: 'available', approved: true, featured: false,
    views: 185, enquiries: 6, saves: 9, description: 'Secure storage and workshop facility with flexible open-plan warehouse layout.',
    features: ['Storage', 'Yard / Hardstand', 'Drive-through'],
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/storage-warehouse'
  },
  {
    id: 'ret-001', category: 'Retail', type: 'Shop / Retail Space', title: 'High-Traffic Westfield Food Mall Retail',
    priceValue: 85000, period: 'p.a. + Outgoings', location: 'Shop 12, Westfield Example, Doncaster VIC 3108', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 4, area: '120 m²', land: '-', agent: 'Retail Elite', status: 'available', approved: true, featured: true,
    views: 512, enquiries: 16, saves: 22, description: 'Prime retail placement inside a busy shopping centre with strong customer flow and food court exposure.',
    features: ['High foot traffic', 'Parking', 'Food court nearby'],
    image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/food-mall-retail'
  },
  {
    id: 'ret-002', category: 'Retail', type: 'Kiosk', title: 'Fitted Transit Hub Coffee Kiosk Location',
    priceValue: 45000, period: 'p.a. + Outgoings', location: 'Kiosk K3, Melbourne Central VIC 3000', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 0, area: '60 m²', land: '-', agent: 'Metro Retail', status: 'available', approved: true, featured: false,
    views: 318, enquiries: 11, saves: 12, description: 'Compact kiosk site with constant commuter foot traffic and fast service potential.',
    features: ['Kiosk', 'High foot traffic', 'Food court nearby'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/coffee-kiosk'
  },
  {
    id: 'ret-003', category: 'Retail', type: 'Food & Beverage', title: 'Corner Restaurant with Outdoor Dining Area',
    priceValue: 65000, period: 'p.a. + Outgoings', location: '123 Strip Road, Suburb VIC 3000', city: 'Melbourne', state: 'VIC',
    beds: 0, baths: 0, cars: 2, area: '95 m²', land: '-', agent: 'Prime Hospitality', status: 'available', approved: true, featured: false,
    views: 407, enquiries: 10, saves: 13, description: 'Corner food and beverage tenancy with alfresco area, kitchen infrastructure and visible frontage.',
    features: ['Food & Beverage', 'Outdoor area', 'High foot traffic'],
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/restaurant'
  },
  {
    id: 'rur-001', category: 'Rural', type: 'Grazing', title: 'Extensive Grazing Outpost & Paddock',
    priceValue: 240000, period: 'p.a.', location: 'Grazing Property, Example Rd, Deniliquin NSW 2710', city: 'Deniliquin', state: 'NSW',
    beds: 0, baths: 0, cars: 0, area: '1,200 ha', land: '1,200 ha land', agent: 'Ausrural Lands', status: 'available', approved: true, featured: true,
    views: 315, enquiries: 8, saves: 16, description: 'Large-scale grazing property with water licence, secure fencing and broad operating flexibility.',
    features: ['Grazing', 'Water licence', 'Fencing'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/grazing-outpost'
  },
  {
    id: 'rur-002', category: 'Rural', type: 'Cropping', title: 'Cropping Property with Sheds and Access',
    priceValue: 180000, period: 'p.a.', location: 'Cropping Property, Warren VIC 2824', city: 'Warren', state: 'VIC',
    beds: 0, baths: 0, cars: 0, area: '850 ha', land: '850 ha land', agent: 'Harvest Rural', status: 'available', approved: true, featured: false,
    views: 256, enquiries: 7, saves: 11, description: 'Productive cropping land with usable sheds, good access and existing infrastructure.',
    features: ['Cropping', 'Sheds / Infrastructure', 'Fencing'],
    image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/cropping-property'
  },
  {
    id: 'rur-003', category: 'Rural', type: 'Vineyard', title: 'Prime Barossa Valley Vineyard & Wine Estate',
    priceValue: 320000, period: 'p.a.', location: 'Vineyard Property, Barossa Valley SA 5552', city: 'Barossa Valley', state: 'SA',
    beds: 0, baths: 0, cars: 0, area: '200 ha', land: '200 ha land', agent: 'Fine Vines Estate', status: 'available', approved: true, featured: false,
    views: 520, enquiries: 13, saves: 21, description: 'A picturesque vineyard lease with water access, tourism potential and established vines.',
    features: ['Vineyard', 'Water access', 'Dwelling included'],
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=84',
    gallery: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=84',
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=84'
    ],
    virtualTour: 'https://example.com/virtual-tour/vineyard'
  }
];

let state = {
  route: 'home',
  currentCategory: 'Any Category',
  location: '',
  priceMax: 200000,
  checkedFilters: new Set(),
  sort: 'newest',
  layout: 'grid',
  dashTab: 'overview',
  adminFilter: 'all'
};

let listings = loadListings();
let saved = new Set(JSON.parse(localStorage.getItem(savedKey) || '[]'));
let enquiries = [
  { name: 'Mia Thompson', listing: 'Elegant Family Residence with City Views', message: 'Can I arrange a viewing this weekend?', email: 'mia@example.com' },
  { name: 'Daniel Brooks', listing: 'Executive High-Rise Corporate Office', message: 'Please send floor plans and outgoings details.', email: 'daniel@example.com' },
  { name: 'Sarah Nguyen', listing: 'High-Traffic Westfield Food Mall Retail', message: 'Is this tenancy suitable for a dessert concept?', email: 'sarah@example.com' }
];

function loadListings() {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return structuredCloneSafe(seedListings);
  try { return JSON.parse(stored); }
  catch { return structuredCloneSafe(seedListings); }
}
function saveListings() { localStorage.setItem(storageKey, JSON.stringify(listings)); }
function saveSaved() { localStorage.setItem(savedKey, JSON.stringify([...saved])); }
function structuredCloneSafe(data) { return JSON.parse(JSON.stringify(data)); }
function money(value) { return Number(value).toLocaleString('en-AU'); }
function priceText(item) { return `$${money(item.priceValue)} ${item.period}`; }
function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function init() {
  renderCategories();
  renderPopularChips();
  renderSectorPreview();
  renderSectorNav();
  updateHomeTypeOptions();
  bindEvents();
  routeFromHash();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', routeFromHash);

function bindEvents() {
  $('.menu-toggle').addEventListener('click', () => {
    const menu = $('#mobileMenu');
    menu.classList.toggle('open');
    $('.menu-toggle').setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  $$('[data-route]').forEach(el => el.addEventListener('click', event => {
    const route = el.dataset.route;
    if (route) navigate(route);
    $('#mobileMenu')?.classList.remove('open');
  }));

  $$('[data-category-link]').forEach(el => el.addEventListener('click', event => {
    event.preventDefault();
    state.currentCategory = el.dataset.categoryLink;
    $('#listingCategory').value = state.currentCategory;
    navigate('listings');
    renderAll();
    $('#mobileMenu')?.classList.remove('open');
  }));

  $$('.tab').forEach(tab => tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  }));

  $('#homeCategory').addEventListener('change', updateHomeTypeOptions);
  $('#homeSearchForm').addEventListener('submit', event => {
    event.preventDefault();
    state.currentCategory = $('#homeCategory').value;
    state.location = $('#homeLocation').value.trim();
    state.priceMax = Number($('#homeMaxPrice').value || 999999);
    $('#listingCategory').value = state.currentCategory;
    $('#listingLocation').value = state.location;
    $('#priceRange').value = Math.min(state.priceMax, Number($('#priceRange').max));
    navigate('listings');
    renderAll();
  });

  $('#listingTopSearch').addEventListener('submit', event => {
    event.preventDefault();
    state.currentCategory = $('#listingCategory').value;
    state.location = $('#listingLocation').value.trim();
    state.checkedFilters.clear();
    renderAll();
  });

  $('#listingCategory').addEventListener('change', event => {
    state.currentCategory = event.target.value;
    state.checkedFilters.clear();
    renderAll();
  });
  $('#listingLocation').addEventListener('input', event => {
    state.location = event.target.value.trim();
    renderListings();
  });
  $('#priceRange').addEventListener('input', event => {
    state.priceMax = Number(event.target.value);
    renderListings();
    updatePriceLabel();
  });
  $('#sortSelect').addEventListener('change', event => {
    state.sort = event.target.value;
    renderListings();
  });
  $('#clearFilters').addEventListener('click', clearAllFilters);
  $('#emptyClear').addEventListener('click', clearAllFilters);

  $('#mockMap').addEventListener('click', event => {
    const city = event.target.dataset.city;
    if (!city) return;
    state.location = city;
    $('#listingLocation').value = city;
    renderListings();
  });

  $$('.view-toggle button').forEach(button => button.addEventListener('click', () => {
    $$('.view-toggle button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    state.layout = button.dataset.layout;
    renderListings();
  }));

  $('#listingGrid').addEventListener('click', handleListingGridClick);
  $('[data-close-drawer]').addEventListener('click', closeDrawer);
  $$('.detail-drawer [data-close-drawer]').forEach(btn => btn.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDrawer(); });

  $$('.dash-link').forEach(button => button.addEventListener('click', () => {
    state.dashTab = button.dataset.dashTab;
    renderDashboardTabs();
  }));
  $('#addListingForm').addEventListener('submit', handleAddListing);
  $('#agentListingsTable').addEventListener('click', handleAgentAction);
  $('#adminListingsTable').addEventListener('click', handleAdminAction);
  $('#adminFilter').addEventListener('change', event => { state.adminFilter = event.target.value; renderAdmin(); });
  $('#resetDemo').addEventListener('click', () => {
    if (!confirm('Reset all demo listings and saved items?')) return;
    listings = structuredCloneSafe(seedListings);
    saved.clear();
    saveListings();
    saveSaved();
    renderAll();
  });
}

function routeFromHash() {
  const route = (location.hash || '#home').replace('#', '').split('?')[0];
  if (['home', 'listings', 'agent', 'admin'].includes(route)) navigate(route, false);
}

function navigate(route, updateHash = true) {
  state.route = route;
  $$('.view').forEach(view => view.classList.toggle('active', view.dataset.view === route));
  if (updateHash) history.pushState(null, '', `#${route}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAll() {
  updatePriceLabel();
  renderDynamicFilters();
  renderListings();
  renderDashboard();
  renderAdmin();
}

function renderCategories() {
  $('#categoryGrid').innerHTML = Object.entries(categoryInfo).map(([name, info]) => `
    <button class="category-card category-${info.color}" type="button" data-category-link="${name}">
      <span class="category-icon">${info.icon()}</span>
      <span>
        <h3>${name}</h3>
        <p>${info.desc}</p>
        <small>${info.countLabel}</small>
      </span>
      <span class="category-arrow">→</span>
    </button>
  `).join('');
  $$('#categoryGrid [data-category-link]').forEach(btn => btn.addEventListener('click', () => {
    state.currentCategory = btn.dataset.categoryLink;
    $('#listingCategory').value = state.currentCategory;
    navigate('listings');
    renderAll();
  }));
}

function renderPopularChips() {
  const chips = [
    ['Houses for rent', 'Residential'], ['Apartments for rent', 'Residential'], ['Office space for lease', 'Commercial'],
    ['Warehouses for lease', 'Industrial'], ['Retail space for lease', 'Retail'], ['Farms for lease', 'Rural']
  ];
  $('#popularChips').innerHTML = chips.map(([label, category]) => `
    <button class="chip" type="button" data-category-link="${category}">${categoryInfo[category].icon()} ${label}</button>
  `).join('');
  $$('#popularChips [data-category-link]').forEach(chip => chip.addEventListener('click', () => {
    state.currentCategory = chip.dataset.categoryLink;
    $('#listingCategory').value = state.currentCategory;
    navigate('listings');
    renderAll();
  }));
}

function renderSectorPreview() {
  const previewCategories = ['Residential', 'Commercial', 'Industrial', 'Retail', 'Rural'];
  $('#sectorPreviewGrid').innerHTML = previewCategories.map(category => {
    const info = categoryInfo[category];
    const rows = listings.filter(item => item.category === category && item.approved).slice(0, 3);
    const filters = Object.entries(info.filters).slice(0, 2).map(([group, values]) => `
      <strong>${group}</strong>
      ${values.slice(0, 4).map(value => `<label><input type="checkbox" disabled /> ${value}</label>`).join('')}
    `).join('');
    return `
      <article class="preview-card">
        <div class="preview-head">
          <div class="preview-title"><span class="mini-icon">${info.icon()}</span><div><h3>${category}</h3><p>${info.desc}</p></div></div>
          <button type="button" data-category-link="${category}">Clear all</button>
        </div>
        <div class="preview-body">
          <div class="preview-filters">${filters}</div>
          <div class="preview-list">
            ${rows.map(item => `
              <div class="mini-listing">
                <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy" />
                <div><small>${priceText(item)}</small><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.location)}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </article>
    `;
  }).join('');
  $$('#sectorPreviewGrid [data-category-link]').forEach(btn => btn.addEventListener('click', () => {
    state.currentCategory = btn.dataset.categoryLink;
    $('#listingCategory').value = state.currentCategory;
    navigate('listings');
    renderAll();
  }));
}

function renderSectorNav() {
  $('#sectorNav').innerHTML = ['Any Category', ...Object.keys(categoryInfo)].map(name => {
    const label = name === 'Any Category' ? 'All sectors' : name;
    const sub = name === 'Any Category' ? 'Residential to rural' : categoryInfo[name].desc;
    return `<button class="sector-pill ${state.currentCategory === name ? 'active' : ''}" type="button" data-sector="${name}"><strong>${label}</strong><small>${sub}</small></button>`;
  }).join('');
  $$('#sectorNav [data-sector]').forEach(btn => btn.addEventListener('click', () => {
    state.currentCategory = btn.dataset.sector;
    $('#listingCategory').value = state.currentCategory;
    state.checkedFilters.clear();
    renderAll();
  }));
}

function updateHomeTypeOptions() {
  const category = $('#homeCategory').value;
  const select = $('#homeType');
  select.innerHTML = `<option>Any</option>${categoryInfo[category].types.map(type => `<option>${type}</option>`).join('')}`;
}

function renderDynamicFilters() {
  renderSectorNav();
  const wrapper = $('#dynamicFilters');
  const category = state.currentCategory === 'Any Category' ? 'Residential' : state.currentCategory;
  const info = categoryInfo[category];
  wrapper.innerHTML = Object.entries(info.filters).map(([group, values]) => `
    <div class="checkbox-group">
      <strong>${group}</strong>
      ${values.map(value => {
        const checked = state.checkedFilters.has(value) ? 'checked' : '';
        return `<label><input type="checkbox" value="${escapeHTML(value)}" ${checked} /> ${escapeHTML(value)}</label>`;
      }).join('')}
    </div>
  `).join('');
  $$('#dynamicFilters input[type="checkbox"]').forEach(input => input.addEventListener('change', () => {
    if (input.checked) state.checkedFilters.add(input.value);
    else state.checkedFilters.delete(input.value);
    renderListings();
  }));
}

function getFilteredListings() {
  let result = listings.filter(item => item.approved && item.status !== 'removed');
  if (state.currentCategory !== 'Any Category') {
    result = result.filter(item => item.category === state.currentCategory);
  }
  const location = state.location.toLowerCase();
  if (location) {
    result = result.filter(item => [item.location, item.city, item.state].join(' ').toLowerCase().includes(location));
  }
  if (state.priceMax < 200000) {
    result = result.filter(item => item.priceValue <= state.priceMax);
  }
  if (state.checkedFilters.size) {
    const selected = [...state.checkedFilters];
    result = result.filter(item => selected.some(filter => {
      const hay = [item.type, item.category, ...(item.features || [])].join(' ').toLowerCase();
      return hay.includes(filter.toLowerCase().replace('+', '').trim()) || filter.includes('+');
    }));
  }
  result = result.slice();
  if (state.sort === 'priceLow') result.sort((a, b) => a.priceValue - b.priceValue);
  else if (state.sort === 'priceHigh') result.sort((a, b) => b.priceValue - a.priceValue);
  else if (state.sort === 'popular') result.sort((a, b) => b.views - a.views);
  else result.sort((a, b) => Number(b.featured) - Number(a.featured));
  return result;
}

function renderListings() {
  updatePriceLabel();
  const result = getFilteredListings();
  $('#resultCount').textContent = `${result.length} ${result.length === 1 ? 'property' : 'properties'} found`;
  $('#resultEyebrow').textContent = state.currentCategory === 'Any Category' ? 'All sectors' : `${state.currentCategory} listings`;
  const grid = $('#listingGrid');
  grid.className = `listing-grid ${state.layout === 'list' ? 'list-layout' : ''}`;
  grid.innerHTML = result.map(renderListingCard).join('');
  $('#emptyState').hidden = result.length !== 0;
}

function renderListingCard(item) {
  const isSaved = saved.has(item.id);
  const meta = getMeta(item);
  return `
    <article class="listing-card" data-id="${item.id}" itemscope itemtype="https://schema.org/RealEstateListing">
      <div class="card-image">
        <img src="${item.image}" srcset="${item.image.replace('w=1200', 'w=800')} 800w, ${item.image.replace('w=1200', 'w=1400')} 1400w" sizes="(max-width: 700px) 100vw, (max-width: 1240px) 50vw, 33vw" alt="${escapeHTML(item.title)}" loading="lazy" itemprop="image" />
        <div class="badge-row">
          <div class="badges">
            <span class="badge">${item.status === 'pending' ? 'Pending' : 'Available'}</span>
            ${item.featured ? '<span class="badge featured">Featured</span>' : ''}
            <span class="badge">${escapeHTML(item.type)}</span>
          </div>
          <button class="save-btn ${isSaved ? 'saved' : ''}" type="button" data-save="${item.id}" aria-label="Save listing">♡</button>
        </div>
      </div>
      <div class="card-body">
        <p class="price" itemprop="price">${priceText(item)}</p>
        <h3 itemprop="name">${escapeHTML(item.title)}</h3>
        <p class="location" itemprop="address">${escapeHTML(item.location)}</p>
        <div class="meta-row">${meta.map(m => `<span>${m}</span>`).join('')}</div>
        <div class="card-footer">
          <small>${escapeHTML(item.agent)}</small>
          <button class="view-details" type="button" data-details="${item.id}">View details →</button>
        </div>
      </div>
    </article>
  `;
}

function getMeta(item) {
  if (item.category === 'Residential') {
    return [`${item.beds} Bed`, `${item.baths} Bath`, `${item.cars} Car`].filter(Boolean);
  }
  if (item.category === 'Rural') return [item.area, item.type, ...(item.features || []).slice(0, 1)];
  return [item.area, ...(item.features || []).slice(0, 2)];
}

function updatePriceLabel() {
  const value = Number($('#priceRange')?.value || state.priceMax);
  $('#priceRangeLabel').textContent = value >= 200000 ? 'Any' : `$${money(value)}`;
}

function clearAllFilters() {
  state.currentCategory = 'Any Category';
  state.location = '';
  state.priceMax = 200000;
  state.checkedFilters.clear();
  $('#listingCategory').value = 'Any Category';
  $('#listingLocation').value = '';
  $('#priceRange').value = 200000;
  renderAll();
}

function handleListingGridClick(event) {
  const saveBtn = event.target.closest('[data-save]');
  if (saveBtn) {
    const id = saveBtn.dataset.save;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    const listing = listings.find(item => item.id === id);
    if (listing) listing.saves = Math.max(0, (listing.saves || 0) + (saved.has(id) ? 1 : -1));
    saveSaved(); saveListings(); renderListings(); renderDashboard(); renderAdmin();
    return;
  }
  const detailsBtn = event.target.closest('[data-details]');
  if (detailsBtn) openDetails(detailsBtn.dataset.details);
}

function openDetails(id) {
  const item = listings.find(listing => listing.id === id);
  if (!item) return;
  item.views = (item.views || 0) + 1;
  saveListings();
  const meta = getMeta(item);
  $('#drawerContent').innerHTML = `
    <div class="detail-hero"><img src="${item.image}" alt="${escapeHTML(item.title)}" /></div>
    <div class="detail-content">
      <p class="eyebrow blue">${escapeHTML(item.category)} / ${escapeHTML(item.type)}</p>
      <h2>${escapeHTML(item.title)}</h2>
      <p class="price">${priceText(item)}</p>
      <p class="location">${escapeHTML(item.location)}</p>
      <div class="meta-row">${meta.map(m => `<span>${m}</span>`).join('')}</div>
      <div class="gallery-strip">${(item.gallery || [item.image]).slice(0, 4).map(src => `<img src="${src}" alt="${escapeHTML(item.title)} gallery image" />`).join('')}</div>
      <p>${escapeHTML(item.description)}</p>
      <div class="detail-grid">
        <div class="detail-box"><span>Agency</span><strong>${escapeHTML(item.agent)}</strong></div>
        <div class="detail-box"><span>Views</span><strong>${money(item.views || 0)}</strong></div>
        <div class="detail-box"><span>Virtual tour</span><strong>${escapeHTML(item.virtualTour || 'Available on request')}</strong></div>
        <div class="detail-box"><span>Floor plan</span><strong>Printable layout ready</strong></div>
      </div>
      <h3>Key features</h3>
      <div class="meta-row">${(item.features || []).map(feature => `<span>${escapeHTML(feature)}</span>`).join('')}</div>
      <div class="detail-actions">
        <button class="btn btn-primary" type="button" onclick="window.print()">Print floor plan</button>
        <button class="btn btn-soft" type="button" onclick="window.open('${escapeHTML(item.virtualTour || '#')}', '_blank')">Open virtual tour</button>
        <button class="btn btn-dark" type="button" data-save-from-details="${item.id}">Save listing</button>
      </div>
      <form class="enquiry-form" data-enquiry-form="${item.id}">
        <h3>Send enquiry to ${escapeHTML(item.agent)}</h3>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Email address" required />
        <textarea name="message" placeholder="I would like to arrange a viewing..." required></textarea>
        <button class="btn btn-primary" type="submit">Send enquiry</button>
      </form>
    </div>
  `;
  $('#drawerContent [data-save-from-details]').addEventListener('click', () => {
    if (saved.has(item.id)) saved.delete(item.id); else saved.add(item.id);
    saveSaved();
    renderListings(); renderDashboard();
  });
  $('#drawerContent [data-enquiry-form]').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    item.enquiries = (item.enquiries || 0) + 1;
    enquiries.unshift({ name: data.get('name'), email: data.get('email'), listing: item.title, message: data.get('message') });
    saveListings();
    form.innerHTML = '<h3>Thank you. Your enquiry has been saved in this demo.</h3><p class="location">Connect a backend email/API service for production enquiries.</p>';
    renderDashboard(); renderAdmin();
  });
  $('#detailDrawer').classList.add('open');
  $('#detailDrawer').setAttribute('aria-hidden', 'false');
  renderListings(); renderDashboard(); renderAdmin();
}

function closeDrawer() {
  $('#detailDrawer').classList.remove('open');
  $('#detailDrawer').setAttribute('aria-hidden', 'true');
}

function renderDashboardTabs() {
  $$('.dash-link').forEach(btn => btn.classList.toggle('active', btn.dataset.dashTab === state.dashTab));
  $$('.dash-tab').forEach(tab => tab.classList.toggle('active', tab.id === `dash-${state.dashTab}`));
}

function renderDashboard() {
  renderDashboardTabs();
  const active = listings.filter(i => i.approved && i.status !== 'removed').length;
  const pending = listings.filter(i => !i.approved && i.status !== 'removed').length;
  $('#metricActive').textContent = active;
  $('#metricPending').textContent = pending;
  $('#metricEnquiries').textContent = listings.reduce((sum, i) => sum + (i.enquiries || 0), 0);
  $('#metricSaved').textContent = listings.reduce((sum, i) => sum + (i.saves || 0), 0);
  $('#agentTotalViews').textContent = money(listings.reduce((sum, i) => sum + (i.views || 0), 0));
  renderAgentTable();
  renderEnquiries();
  renderAgentChart();
}

function renderAgentTable() {
  $('#agentListingsTable').innerHTML = `
    <thead><tr><th>Listing</th><th>Category</th><th>Price</th><th>Status</th><th>Views</th><th>Actions</th></tr></thead>
    <tbody>${listings.filter(i => i.status !== 'removed').map(item => `
      <tr>
        <td><strong>${escapeHTML(item.title)}</strong><br><small>${escapeHTML(item.location)}</small></td>
        <td>${item.category}</td>
        <td>${priceText(item)}</td>
        <td>${item.approved ? (item.featured ? 'Featured' : 'Active') : 'Pending'}</td>
        <td>${money(item.views || 0)}</td>
        <td><div class="table-actions"><button class="tiny-btn blue" data-agent-view="${item.id}">View</button><button class="tiny-btn danger" data-agent-delete="${item.id}">Delete</button></div></td>
      </tr>
    `).join('')}</tbody>`;
}

function renderEnquiries() {
  $('#enquiryList').innerHTML = enquiries.map(item => `
    <article class="enquiry-item"><h3>${escapeHTML(item.name)} · ${escapeHTML(item.listing)}</h3><p>${escapeHTML(item.message)}</p><p><small>${escapeHTML(item.email)}</small></p></article>
  `).join('');
}

function renderAgentChart() {
  const max = Math.max(...listings.map(i => i.views || 0), 1);
  $('#agentChart').innerHTML = listings.filter(i => i.status !== 'removed').slice().sort((a,b) => (b.views || 0) - (a.views || 0)).slice(0, 6).map(item => `
    <div class="bar-row">
      <div class="bar-label">${escapeHTML(item.title)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, (item.views / max) * 100)}%"></div></div>
      <strong>${money(item.views || 0)}</strong>
    </div>
  `).join('');
}

function handleAddListing(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const category = data.category;
  const id = `${category.slice(0, 3).toLowerCase()}-${Date.now()}`;
  const featureList = (data.features || '').split(',').map(v => v.trim()).filter(Boolean);
  const newListing = {
    id,
    category,
    type: data.type,
    title: data.title,
    priceValue: Number(data.priceValue),
    period: data.period,
    location: data.location,
    city: data.location.split(',').slice(-1)[0]?.trim() || 'Australia',
    state: 'AU',
    beds: category === 'Residential' ? 2 : 0,
    baths: category === 'Residential' ? 1 : 0,
    cars: 1,
    area: data.area || 'Area on request',
    land: '-',
    agent: 'Agent Name',
    status: 'pending',
    approved: false,
    featured: false,
    views: 0,
    enquiries: 0,
    saves: 0,
    description: data.description,
    features: featureList.length ? featureList : [data.type],
    image: getFallbackImage(category),
    gallery: [getFallbackImage(category), getFallbackImage(category), getFallbackImage(category), getFallbackImage(category)],
    virtualTour: data.virtualTour || 'https://example.com/virtual-tour'
  };
  listings.unshift(newListing);
  saveListings();
  form.reset();
  alert('Listing submitted. It is now pending admin approval.');
  state.dashTab = 'my-listings';
  renderAll();
}

function getFallbackImage(category) {
  const images = {
    Residential: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=84',
    Commercial: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=84',
    Industrial: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=84',
    Retail: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=84',
    Rural: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84'
  };
  return images[category] || images.Residential;
}

function handleAgentAction(event) {
  const view = event.target.closest('[data-agent-view]');
  const del = event.target.closest('[data-agent-delete]');
  if (view) openDetails(view.dataset.agentView);
  if (del) {
    const item = listings.find(i => i.id === del.dataset.agentDelete);
    if (item && confirm('Delete this demo listing?')) {
      item.status = 'removed';
      saveListings(); renderAll();
    }
  }
}

function renderAdmin() {
  const visible = listings.filter(i => i.status !== 'removed');
  $('#adminTotal').textContent = visible.length;
  $('#adminPending').textContent = visible.filter(i => !i.approved).length;
  $('#adminFeatured').textContent = visible.filter(i => i.featured).length;
  $('#adminViews').textContent = money(visible.reduce((sum, i) => sum + (i.views || 0), 0));

  let rows = visible;
  if (state.adminFilter === 'pending') rows = rows.filter(i => !i.approved);
  if (state.adminFilter === 'featured') rows = rows.filter(i => i.featured);
  $('#adminListingsTable').innerHTML = `
    <thead><tr><th>Listing</th><th>Sector</th><th>Price</th><th>Status</th><th>Performance</th><th>Actions</th></tr></thead>
    <tbody>${rows.map(item => `
      <tr>
        <td><strong>${escapeHTML(item.title)}</strong><br><small>${escapeHTML(item.location)}</small></td>
        <td>${item.category}</td>
        <td>${priceText(item)}</td>
        <td>${item.approved ? (item.featured ? 'Featured' : 'Approved') : 'Pending'}</td>
        <td>${money(item.views || 0)} views · ${money(item.enquiries || 0)} enquiries</td>
        <td><div class="table-actions">
          <button class="tiny-btn blue" data-admin-approve="${item.id}">${item.approved ? 'Approved' : 'Approve'}</button>
          <button class="tiny-btn" data-admin-feature="${item.id}">${item.featured ? 'Unfeature' : 'Feature'}</button>
          <button class="tiny-btn danger" data-admin-remove="${item.id}">Remove</button>
        </div></td>
      </tr>
    `).join('')}</tbody>`;
}

function handleAdminAction(event) {
  const approve = event.target.closest('[data-admin-approve]');
  const feature = event.target.closest('[data-admin-feature]');
  const remove = event.target.closest('[data-admin-remove]');
  const id = approve?.dataset.adminApprove || feature?.dataset.adminFeature || remove?.dataset.adminRemove;
  const item = listings.find(i => i.id === id);
  if (!item) return;
  if (approve) { item.approved = true; item.status = 'available'; }
  if (feature) { item.featured = !item.featured; item.approved = true; item.status = 'available'; }
  if (remove && confirm('Remove this listing from the marketplace?')) { item.status = 'removed'; }
  saveListings(); renderAll();
}

function houseIcon() { return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M7 24 24 9l17 15"/><path d="M12 22v18h24V22"/><path d="M20 40V28h8v12"/></svg>`; }
function buildingIcon() { return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M10 40V16h12v24"/><path d="M26 40V8h12v32"/><path d="M6 40h36"/><path d="M14 22h4M14 29h4M30 15h4M30 22h4M30 29h4"/></svg>`; }
function warehouseIcon() { return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M7 40h34V22L24 10 7 22v18Z"/><path d="M17 40V27h14v13"/><path d="M21 19h6"/></svg>`; }
function shopIcon() { return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M13 18h22l3 22H10l3-22Z"/><path d="M18 18v-3a6 6 0 0 1 12 0v3"/></svg>`; }
function leafIcon() { return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3"><path d="M39 9C23 10 10 20 11 36c16 1 27-8 28-27Z"/><path d="M13 35c7-8 14-13 25-19"/></svg>`; }

init;
