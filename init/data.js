const sampleListings = [
    {
    title: "Ocean Breeze Villa",
    description: "A peaceful villa with a sea view.",
    price: 1500,
    location: "Calangute, Goa",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/1778738751/photo/summer-is-over-in-the-garden.jpg?s=2048x2048&w=is&k=20&c=wBTIo_R9VEfKJzlRj7xnCVF2e8Tj_oIDNo5hpzveu3o=",
    },
    country: "India"
  },
  {
    title: "Mountain Escape",
    description: "Cozy retreat in the Himalayas.",
    price: 2200,
    location: "Manali, Himachal Pradesh",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/1447708518/photo/modern-villa-exterior-in-summer.jpg?s=612x612&w=0&k=20&c=eKBWYI-6MVGRnA_asTSbirigMLsdBSziGPMSqFPEp_E=",
    }, 
    country: "India"
  },
  {
    title: "Palm Paradise",
    description: "Tropical villa surrounded by coconut trees.",
    price: 1800,
    location: "Varkala, Kerala",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/1754179560/photo/tiny-house-with-empty-green-lawn-for-copy-space-3d-render.jpg?s=612x612&w=0&k=20&c=PNm1Yj2qv1YjzIy9uDlVoU31VAXD22AHasEvyhrp2yI=",
    },
    country: "India"
  },
  {
    title: "Sunset Haven",
    description: "Modern villa with rooftop sunset view.",
    price: 2500,
    location: "Pondicherry",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/1442148484/photo/3d-rendering-of-modern-suburban-house-in-the-garden.jpg?s=612x612&w=0&k=20&c=8Iu_h5cFOEnlPz4_n2nfSUtOyfM_a-hHx9rmlxMF2rI=",
    },
    country: "India"
  },
  {
    title: "The Mango Grove",
    description: "Peaceful countryside villa with garden view.",
    price: 1300,
    location: "Nashik, Maharashtra",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/639414496/photo/beautiful-home-with-green-grass-yard.jpg?s=612x612&w=0&k=20&c=xaxs_znYwJwGimj1gLiWRl8p_n_TJMROeBjwurC3hc8=",
    },
    country: "India"
  },
  {
    title: "Blue Lagoon Villa",
    description: "Luxury villa with private pool.",
    price: 3000,
    location: "Anjuna, Goa",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/95732671/photo/traditional-french-farmhouse.jpg?s=612x612&w=0&k=20&c=k2Pl-KkfLhT7etc7lVBEFqafxOWsJlWK3PTSr3rNeig=",
    },
    country: "India"
  },
  {
    title: "Serenity Sands",
    description: "Elegant beachfront stay for families.",
    price: 2700,
    location: "Alibaug, Maharashtra",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/1096126904/photo/country-house-with-green-back-yard-in-sunny-summer-day.jpg?s=612x612&w=0&k=20&c=erjQPkC8VMZR8oxLk27mlZtk7EDu8fR4r9Eg2V_wu6E=",
    },
    country: "India"
  },
  {
    title: "Hillside Haven",
    description: "A cozy villa on a green hilltop.",
    price: 1900,
    location: "Coonoor, Tamil Nadu",
    image:{
      filename:"listingimage",
      url:"https://media.istockphoto.com/id/1124503111/photo/big-family-garden-party-celebration-gathered-together-at-the-table-family-friends-and.jpg?s=612x612&w=0&k=20&c=nUuI2CpNoPKnu-ZwrPhzfQoTT1EC7Z28qKbv37EkrOU=",
    },
    country: "India"
  },
  {
    title: "Lotus Retreat",
    description: "Tranquil villa near a beautiful lake.",
    price: 2100,
    location: "Udaipur, Rajasthan",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,lakehttps://media.istockphoto.com/id/513755334/photo/private-house-with-a-garden-in-rural-area.jpg?s=612x612&w=0&k=20&c=2vt8e8CUpsyR20nc2MKzZicMdlVV2TtJ7dXbadxPamY=",
    },
    country: "India"
  },
  {
    title: "Coral Reef Villa",
    description: "Seaside villa with coral reef access.",
    price: 3200,
    location: "Andaman Islands",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,sea",
    },
    country: "India"
  },
  {
    title: "The Banyan House",
    description: "Rustic-style villa under a 100-year-old banyan tree.",
    price: 1400,
    location: "Coorg, Karnataka",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,forest",
    },
    country: "India"
  },
  {
    title: "Casa Verde",
    description: "Eco-friendly villa surrounded by greenery.",
    price: 1600,
    location: "Wayanad, Kerala",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,nature",
    },
    country: "India"
  },
  {
    title: "Golden Dunes Villa",
    description: "Luxurious villa amidst desert dunes.",
    price: 2800,
    location: "Jaisalmer, Rajasthan",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,desert",
    },
    country: "India"
  },
  {
    title: "Amber Nest",
    description: "Beautiful villa with ancient Rajasthani design.",
    price: 2000,
    location: "Jaipur, Rajasthan",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,palace",
    },
    country: "India"
  },
  {
    title: "Whispering Pines",
    description: "Cozy mountain villa surrounded by pine trees.",
    price: 2300,
    location: "Mussoorie, Uttarakhand",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,pines",
    },
    country: "India"
  },
  {
    title: "Coconut Bay Villa",
    description: "Modern beach villa ideal for relaxation.",
    price: 2600,
    location: "Kovalam, Kerala",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,coast",
    },
    country: "India"
  },
  {
    title: "Jasmine Cottage",
    description: "Charming villa with flower gardens.",
    price: 1200,
    location: "Ooty, Tamil Nadu",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,flowers", 
    },
    country: "India"
  },
  {
    title: "Skyline Villa",
    description: "Luxury stay with panoramic city view.",
    price: 3100,
    location: "Mumbai, Maharashtra",
    image:{
      filename:"listingimage",
      url:"https://source.unsplash.com/800x600/?villa,city",
    },
    country: "India"
  },
];

module.exports = {data: sampleListings};

