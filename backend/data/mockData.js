const mockCategories = [
  {
    "_id": "cat-floor",
    "name": "Floor Marble & Granite",
    "slug": "floor-marble-granite",
    "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    "isActive": true,
    "sortOrder": 1
  },
  {
    "_id": "cat-kitchen",
    "name": "Kitchen Marble & Granite",
    "slug": "kitchen-marble-granite",
    "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
    "isActive": true,
    "sortOrder": 2
  },
  {
    "_id": "cat-stairs",
    "name": "Stairs Marble & Granite",
    "slug": "stairs-marble-granite",
    "description": "Heavy-duty marble and granite treads with full bullnose, half-bullnose, anti-slip grooving, and matching vertical riser panels.",
    "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    "isActive": true,
    "sortOrder": 3
  },
  {
    "_id": "cat-wall",
    "name": "Wall Marble & Granite",
    "slug": "wall-marble-granite",
    "description": "Exquisite bookmatched slabs, architectural feature walls, fireplace claddings, and exterior ventilated facade panels.",
    "image": "/images/black-gold.jpg",
    "isActive": true,
    "sortOrder": 4
  },
  {
    "_id": "cat-bathroom",
    "name": "Bathroom Marble & Granite",
    "slug": "bathroom-marble-granite",
    "description": "Luminous waterproof marble slabs, carved vanity tops, walk-in shower claddings, and spa wet-room floorings.",
    "image": "/images/calacatta-gold.jpg",
    "isActive": true,
    "sortOrder": 5
  },
  {
    "_id": "cat-outdoor",
    "name": "Outdoor Marble & Granite",
    "slug": "outdoor-marble-granite",
    "description": "Flamed, brushed, and sandblasted non-slip natural stones for patio pavers, swimming pool coping, garden walkways, and outdoor kitchens.",
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    "isActive": true,
    "sortOrder": 6
  },
  {
    "_id": "cat-other",
    "name": "Other Applications",
    "slug": "other-applications",
    "description": "Translucent backlit Onyx, custom dining tables, executive boardroom tops, fireplace hearths, and bespoke mosaic inlays.",
    "image": "/images/green-onyx.jpg",
    "isActive": true,
    "sortOrder": 7
  }
];

const mockProducts = [
  {
    "_id": "prod-tropical-granite",
    "name": "Tropical Granite",
    "slug": "tropical-granite",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "materialType": "Granite",
    "marbleType": "Exotic Natural Magmatic Granite",
    "color": "Warm Gold, Ochre, Amber & Burgundy Veins",
    "texturePattern": "Dynamic Flowing Magmatic Waves with Sparkling Garnet Crystals",
    "recommendedUses": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Stairs",
      "Flooring",
      "Wall Cladding"
    ],
    "stairSuitability": "Highly Suitable — High traction, high abrasion resistance for interior & exterior steps.",
    "kitchenSuitability": "100% Ideal & Scratch-Proof — High density, heat resistant, zero acid etching.",
    "flooringSuitability": "Excellent for high-traffic villa foyers and luxury commercial entrances.",
    "indoorOutdoorSuitability": "Suitable for both Indoor & Heavy Outdoor applications.",
    "description": "Tropical Granite is an exotic natural stone celebrated for its dramatic golden waves, warm ochre swirls, and deep burgundy crystal clusters. Quarried from deep igneous formations, it provides exceptional heat, scratch, and chemical resistance—making it the quintessential choice for luxury kitchen waterfall islands, culinary countertops, and grand bullnosed staircases.",
    "images": [
      "/images/tropical-granite.jpg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1201&q=80&stone=tropical-granite&view=2",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1202&q=80&stone=tropical-granite&view=3",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1203&q=80&stone=tropical-granite&view=4",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1204&q=80&stone=tropical-granite&view=5",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1205&q=80&stone=tropical-granite&view=6",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1206&q=80&stone=tropical-granite&view=7",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1207&q=80&stone=tropical-granite&view=8",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1208&q=80&stone=tropical-granite&view=9",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1209&q=80&stone=tropical-granite&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Tropical Granite Slab Display",
      "2. Macro Texture of Golden Waves & Burgundy Mineral Inclusions",
      "3. Luxury Kitchen Countertop Installation with Undermount Sink",
      "4. Waterfall Island Edge Profile in Contemporary Kitchen",
      "5. Grand Staircase Treads with Double Bullnose Edge",
      "6. Open Concept Living & Dining Room Stone Integration",
      "7. Island Prep Counter Under Architectural Pendant Lighting",
      "8. High-Gloss Polished Surface Luster Under Natural Daylight",
      "9. Evening Ambient Warm Illumination on Granite Surface",
      "10. Completed Architectural Villa Kitchen Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Leathered",
      "Flamed"
    ],
    "size": [
      "Custom Slabs up to 10ft",
      "Countertops 26\"x96\"",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Stairs",
      "Flooring",
      "Wall Cladding"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 1
  },
  {
    "_id": "prod-black-granite",
    "name": "Black Granite",
    "slug": "black-granite",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "materialType": "Granite",
    "marbleType": "Premium Absolute Black Granite",
    "color": "Deep Midnight Jet Black",
    "texturePattern": "Ultra-Fine Dense Crystalline Grain with Mirror-Like Reflectivity",
    "recommendedUses": [
      "Kitchen Countertops",
      "Stairs",
      "Kitchen Islands",
      "Flooring",
      "Outdoor Patios"
    ],
    "stairSuitability": "100% Supreme Stair Choice — Extremely resilient against heavy foot traffic, non-slip when flamed/grooved.",
    "kitchenSuitability": "100% Supreme Kitchen Top — Knife, oil, and extreme thermal heat resistant.",
    "flooringSuitability": "High-traffic commercial lobbies, luxury hotel entries, and border inlays.",
    "indoorOutdoorSuitability": "Weatherproof for both Heavy Outdoor & Indoor architectural spaces.",
    "description": "Black Granite is the world’s gold standard for durability and sleek contemporary aesthetics. Featuring a uniform midnight black field and intense diamond-polish reflectivity, this stone resists knives, scalding pots, and staining. Fabricated to exact tolerances in Fort Abbas with custom bullnose and 45-degree mitered edges.",
    "images": [
      "/images/black-galaxy.jpg",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1208&q=80&stone=black-granite&view=2",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1209&q=80&stone=black-granite&view=3",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1210&q=80&stone=black-granite&view=4",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1211&q=80&stone=black-granite&view=5",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1212&q=80&stone=black-granite&view=6",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1213&q=80&stone=black-granite&view=7",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1214&q=80&stone=black-granite&view=8",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1215&q=80&stone=black-granite&view=9",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1216&q=80&stone=black-granite&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Black Granite Slab View",
      "2. Fine Crystalline Grain & Mirror Polish Close-Up",
      "3. Minimalist Jet Black Kitchen Countertop with Cooktop Cutout",
      "4. Continuous Waterfall Island with Seamless Mitered Joints",
      "5. Floating Cantilevered Stair Treads with Anti-Slip Grooves",
      "6. Modern Powder Room Black Granite Vanity Top",
      "7. High-Contrast Flooring Border Inlay with White Marble",
      "8. Natural Daylight Glare Resistance & Mirror Finish",
      "9. Outdoor Weather-Resistant Terrace Step Application",
      "10. Finished Executive Residence Kitchen & Stair Hall"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Flamed",
      "Leathered",
      "Bush-Hammered"
    ],
    "size": [
      "Jumbo Slabs up to 11ft",
      "Countertops 26\"x108\"",
      "Stair Treads 13\"x48\"",
      "12\"x24\"",
      "24\"x24\""
    ],
    "application": [
      "Kitchen Countertops",
      "Stairs",
      "Kitchen Islands",
      "Flooring",
      "Outdoor Patios"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 2
  },
  {
    "_id": "prod-indian-galaxy-granite",
    "name": "Indian Galaxy Granite",
    "slug": "indian-galaxy-granite",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "materialType": "Granite",
    "marbleType": "Star Galaxy Natural Igneous Granite",
    "color": "Deep Midnight Black with Golden/Bronze Star Flecks",
    "texturePattern": "Glittering Bronzite Mineral Crystals Suspended in Black Basalt Matrix",
    "recommendedUses": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Stairs",
      "Flooring",
      "Executive Desks"
    ],
    "stairSuitability": "Highly Recommended — Sparkling light reflections on staircase treads and risers.",
    "kitchenSuitability": "100% Supreme Island Choice — Zero porosity, impenetrable to cooking oils and spices.",
    "flooringSuitability": "Creates a glittering star-field effect in grand entrance halls.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor installations.",
    "description": "Indian Galaxy Granite (Star Galaxy) is an illustrious natural stone characterized by metallic copper and golden bronzite specks embedded across a jet-black background. When illuminated by ambient downlighting, the surface twinkles like a night sky. An unforgettable stone for kitchen countertops, island bars, and opulent staircases.",
    "images": [
      "/images/black-galaxy.jpg",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1215&q=80&stone=indian-galaxy-granite&view=2",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1216&q=80&stone=indian-galaxy-granite&view=3",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1217&q=80&stone=indian-galaxy-granite&view=4",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1218&q=80&stone=indian-galaxy-granite&view=5",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1219&q=80&stone=indian-galaxy-granite&view=6",
      "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?auto=format&fit=crop&w=1220&q=80&stone=indian-galaxy-granite&view=7",
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1221&q=80&stone=indian-galaxy-granite&view=8",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1222&q=80&stone=indian-galaxy-granite&view=9",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1223&q=80&stone=indian-galaxy-granite&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Star Galaxy Granite View",
      "2. Macro Bronzite Golden Flake Cluster Close-Up",
      "3. Polished Island Countertop in Contemporary Kitchen",
      "4. Matching Star Galaxy Kitchen Breakfast Bar",
      "5. Bullnosed Staircase Flight with Integrated LED Lighting",
      "6. Luxury Villa Foyer Floor Tiling",
      "7. Edge Detailing with Ogee Profile Routing",
      "8. Surface Reflection Under Direct Ceiling Downlights",
      "9. Side Angle View of Natural Crystal Texture",
      "10. Completed Architectural Installation"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Leathered"
    ],
    "size": [
      "Custom Slabs",
      "24\"x24\"",
      "12\"x24\"",
      "Countertop Slabs 26\"x108\""
    ],
    "application": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Stairs",
      "Flooring",
      "Executive Desks"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 3
  },
  {
    "_id": "prod-snow-white-marble",
    "name": "Snow White Marble",
    "slug": "snow-white-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pure Calcite Crystalline Marble",
    "color": "Ultra-Pure Snow White with Subtle Silver Streaks",
    "texturePattern": "Dense Fine-Grained Pure White Calcite Matrix",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Bathroom",
      "Feature Niches"
    ],
    "stairSuitability": "Highly Recommended — Brightens stairwells and creates stunning floating steps.",
    "kitchenSuitability": "Ideal for Backsplash, Island Vertical Cladding, and Low-Acid Accent Areas.",
    "flooringSuitability": "100% Supreme Flooring Choice — Reflects ambient light, visually expands rooms.",
    "indoorOutdoorSuitability": "Recommended for Indoor Luxury Flooring & Wall paneling.",
    "description": "Snow White Marble is celebrated for its pristine, radiant white appearance that maximizes natural light throughout grand residential and commercial spaces. Cut with diamond wire gang-saws at our Fort Abbas factory to ensure perfectly flat, mirror-calibrated tiles and slabs.",
    "images": [
      "/images/ziarat-white.jpg",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1222&q=80&stone=snow-white-marble&view=2",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1223&q=80&stone=snow-white-marble&view=3",
      "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1224&q=80&stone=snow-white-marble&view=4",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1225&q=80&stone=snow-white-marble&view=5",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1226&q=80&stone=snow-white-marble&view=6",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1227&q=80&stone=snow-white-marble&view=7",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1228&q=80&stone=snow-white-marble&view=8",
      "https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=1229&q=80&stone=snow-white-marble&view=9",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1230&q=80&stone=snow-white-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Pure Snow White Marble Display",
      "2. Macro Calcite Texture Close-Up with Silver Vein Detail",
      "3. Seamless Drawing Room Snow White Floor Installation",
      "4. Elegant Curved White Marble Staircase with Glass Railing",
      "5. Luxury Master Bathroom Full Wall & Floor Cladding",
      "6. Grand Reception Hall with Mirror Polish Reflection",
      "7. Kitchen Backsplash & Island Front Panel",
      "8. Natural Daylight Illumination on Floor Tiles",
      "9. Stair Tread Bullnosing & Riser Joint Precision",
      "10. Completed Luxury Residence Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "36\"x36\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Bathroom",
      "Feature Niches"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 4
  },
  {
    "_id": "prod-ice-white-marble",
    "name": "Ice White Marble",
    "slug": "ice-white-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Glacial Patterned Marble",
    "color": "Frosty White with Glacial Ice-Grey Striations",
    "texturePattern": "Crystalline Frost Waves with Cool Silver Under-tones",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Bathroom Vanity",
      "Hallways"
    ],
    "stairSuitability": "Highly Recommended — Contemporary clean aesthetic for modern staircases.",
    "kitchenSuitability": "Suitable for Island bases, vertical cladding, and dining tabletops.",
    "flooringSuitability": "Excellent for high-end residential living rooms and hotel suites.",
    "indoorOutdoorSuitability": "Indoor Luxury Applications.",
    "description": "Ice White Marble exhibits an invigorating crystalline background interlaced with glacial silver-grey veining. It remains cool to the touch and brings a refreshing, contemporary luxury ambience to villas, master suites, and stair foyers.",
    "images": [
      "/images/supreme-white.jpg",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1229&q=80&stone=ice-white-marble&view=2",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1230&q=80&stone=ice-white-marble&view=3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1231&q=80&stone=ice-white-marble&view=4",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1232&q=80&stone=ice-white-marble&view=5",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1233&q=80&stone=ice-white-marble&view=6",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1234&q=80&stone=ice-white-marble&view=7",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1235&q=80&stone=ice-white-marble&view=8",
      "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&w=1236&q=80&stone=ice-white-marble&view=9",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1237&q=80&stone=ice-white-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Ice White Marble Slab",
      "2. Glacial Silver Striation & Crystalline Texture Close-Up",
      "3. Grand Foyer Floor Layout with Seamless Vein Flow",
      "4. Contemporary Cantilevered Staircase with Glass Balustrades",
      "5. Master Bathroom Walk-In Shower Cladding",
      "6. Luxury Open-Plan Living & Dining Floor Area",
      "7. Polished Surface Reflection in Daylight",
      "8. Kitchen Island Base Cladding with Ice White Accents",
      "9. Precision Chamfer Edge Detail on Stair Steps",
      "10. Finished Penthouse Interior Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "36\"x36\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Bathroom Vanity",
      "Hallways"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": false,
    "isActive": true,
    "sortOrder": 5
  },
  {
    "_id": "prod-jabrana-marble",
    "name": "Jabrana Marble",
    "slug": "jabrana-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "High-Density Pakistani Marble",
    "color": "Warm Golden-Beige, Cream & Honey Cloud Swirls",
    "texturePattern": "Dense Golden-Honey Cloud Patterns with High Compressive Strength",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Hallways",
      "Courtyards",
      "Living Rooms"
    ],
    "stairSuitability": "100% Traditional Favorite — High abrasion resistance, long-term durability.",
    "kitchenSuitability": "Suitable for Kitchen Floor Tiling & Breakfast Table Tops.",
    "flooringSuitability": "100% Ideal for high-traffic homes, schools, and commercial plazas.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor applications.",
    "description": "Jabrana Marble is a time-tested Pakistani marble renowned for its warm golden-beige tones and robust density. It is highly resistant to daily wear and tear, making it a budget-friendly yet enduring stone for extensive flooring and heavy-duty staircase steps.",
    "images": [
      "/images/jabrana-marble.jpg",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1236&q=80&stone=jabrana-marble&view=2",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1237&q=80&stone=jabrana-marble&view=3",
      "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?auto=format&fit=crop&w=1238&q=80&stone=jabrana-marble&view=4",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1239&q=80&stone=jabrana-marble&view=5",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1240&q=80&stone=jabrana-marble&view=6",
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1241&q=80&stone=jabrana-marble&view=7",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1242&q=80&stone=jabrana-marble&view=8",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1243&q=80&stone=jabrana-marble&view=9",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1244&q=80&stone=jabrana-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Jabrana Golden-Beige Marble View",
      "2. Honey Cloud Movement & Mineral Grain Texture",
      "3. High-Traffic Residential Floor Installation",
      "4. Solid Jabrana Stair Treads with Rounded Bullnose",
      "5. Traditional Foyer Stone Inlay Pattern",
      "6. Spacious Drawing Room Floor with Mirror Polish",
      "7. Corridor & Hallway Continuous Tile Alignment",
      "8. Warm Natural Daylight Illumination on Golden Matrix",
      "9. Precision Cut Tile Edges Ready for Installation",
      "10. Finished Pakistani Villa Showcase"
    ],
    "finish": [
      "Polished",
      "Honed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Hallways",
      "Courtyards",
      "Living Rooms"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": false,
    "isActive": true,
    "sortOrder": 6
  },
  {
    "_id": "prod-royal-botticino",
    "name": "Royal Botticino Marble",
    "slug": "royal-botticino",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Imported & Heritage Botticino Marble",
    "color": "Warm Ivory Cream with Fine Hazelnut Veins",
    "texturePattern": "Delicate Spider-Web Veins on Warm Alabaster Base",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Drawing Rooms",
      "Lobbies"
    ],
    "stairSuitability": "Highly Recommended — Adds royal warmth and timeless grandeur to entry staircases.",
    "kitchenSuitability": "Suitable for Breakfast Island Bases and Accent Tops.",
    "flooringSuitability": "100% Supreme Choice for opulent drawing rooms and palace halls.",
    "indoorOutdoorSuitability": "Indoor Luxury Installations.",
    "description": "Royal Botticino Marble features a rich, soothing cream foundation accented with refined hazelnut and golden spider-web veining. Its subtle classical elegance effortlessly complements both traditional and modern architectural themes.",
    "images": [
      "/images/tavera-marble.jpg",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1243&q=80&stone=royal-botticino&view=2",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1244&q=80&stone=royal-botticino&view=3",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1245&q=80&stone=royal-botticino&view=4",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1246&q=80&stone=royal-botticino&view=5",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1247&q=80&stone=royal-botticino&view=6",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1248&q=80&stone=royal-botticino&view=7",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1249&q=80&stone=royal-botticino&view=8",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1250&q=80&stone=royal-botticino&view=9",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1251&q=80&stone=royal-botticino&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Royal Botticino Marble Slab",
      "2. Fine Hazelnut Spider-Web Veins & Creamy Base Close-Up",
      "3. Luxurious Drawing Room Flooring Installation",
      "4. Grand Curved Staircase Flight with Polished Treads",
      "5. Hotel Lobby Reception Hall Floor with Inlaid Borders",
      "6. Living Area Ambient Lighting Reflection",
      "7. Polished Finish Detail & High Reflectivity",
      "8. Fireplace Feature Wall Cladding",
      "9. Stair Riser & Tread Precision Fitment",
      "10. Completed Penthouse Interior Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "36\"x36\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Drawing Rooms",
      "Lobbies"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 7
  },
  {
    "_id": "prod-tan-brown-granite",
    "name": "Tan Brown Granite",
    "slug": "tan-brown-granite",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "materialType": "Granite",
    "marbleType": "Heavy-Duty Natural Igneous Granite",
    "color": "Dark Chocolate Brown, Black & Burnt-Orange Clusters",
    "texturePattern": "Dense Interlocking Feldspar Crystals with Copper Flowers",
    "recommendedUses": [
      "Kitchen Countertops",
      "Stairs",
      "Outdoor Steps",
      "Flooring",
      "Commercial Spaces"
    ],
    "stairSuitability": "100% Extreme Duty — Ideal for high-wear outdoor & indoor staircases.",
    "kitchenSuitability": "100% Heavy Duty Kitchen Top — Extreme heat, scratch, and impact durability.",
    "flooringSuitability": "High-traffic commercial entrances, banks, and villa corridors.",
    "indoorOutdoorSuitability": "All-Weather Indoor & Outdoor Resilience.",
    "description": "Tan Brown Granite is recognized globally for its rich chocolate background punctuated by dark red and burnt-orange feldspar mineral clusters. Highly dense and non-porous, it is virtually indestructible against kitchen spills, knives, hot cookware, and heavy footfall.",
    "images": [
      "/images/tropical-granite.jpg",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1250&q=80&stone=tan-brown-granite&view=2",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1251&q=80&stone=tan-brown-granite&view=3",
      "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1252&q=80&stone=tan-brown-granite&view=4",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1253&q=80&stone=tan-brown-granite&view=5",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1254&q=80&stone=tan-brown-granite&view=6",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1255&q=80&stone=tan-brown-granite&view=7",
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1256&q=80&stone=tan-brown-granite&view=8",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1257&q=80&stone=tan-brown-granite&view=9",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1258&q=80&stone=tan-brown-granite&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Tan Brown Granite Display",
      "2. Macro Copper-Feldspar Flower Crystals Close-Up",
      "3. Heavy-Duty Kitchen Countertop with Bullnose Edge",
      "4. Outdoor Entrance Steps with Anti-Slip Grooved Treads",
      "5. Kitchen Island Counter with Dual Prep Cutouts",
      "6. High-Traffic Commercial Building Floor Tiling",
      "7. Polished Edge Detailing & Seamless Seams",
      "8. Natural Daylight Outdoor Durability View",
      "9. Commercial Plaza Stairway Installation",
      "10. Completed Architectural Kitchen & Stair Project"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Flamed"
    ],
    "size": [
      "Jumbo Slabs",
      "24\"x24\"",
      "12\"x24\"",
      "Countertops 26\"x108\""
    ],
    "application": [
      "Kitchen Countertops",
      "Stairs",
      "Outdoor Steps",
      "Flooring",
      "Commercial Spaces"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": false,
    "isActive": true,
    "sortOrder": 8
  },
  {
    "_id": "prod-alaska-white-granite",
    "name": "Alaska White Granite",
    "slug": "alaska-white-granite",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "materialType": "Granite",
    "marbleType": "Exotic Light-Toned Granite",
    "color": "Frosty White Quartz with Charcoal & Silver Movement",
    "texturePattern": "Contrasting Quartz Feldspar Crystals with Dramatic Charcoal Waves",
    "recommendedUses": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Stairs",
      "Flooring",
      "Wall Cladding"
    ],
    "stairSuitability": "Highly Recommended — Bright, modern aesthetic for indoor stairwells.",
    "kitchenSuitability": "100% Top Designer Choice — Outstanding stain & heat resistance for islands.",
    "flooringSuitability": "Stunning bright granite floor with natural crystal movement.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor installations.",
    "description": "Alaska White Granite offers the clean, luminous elegance of marble coupled with the supreme hardness and zero porosity of granite. Its frosty quartz matrix features captivating charcoal and shimmering mica swirls that elevate contemporary kitchen islands and modern stair flights.",
    "images": [
      "/images/supreme-white.jpg",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1257&q=80&stone=alaska-white-granite&view=2",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1258&q=80&stone=alaska-white-granite&view=3",
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1259&q=80&stone=alaska-white-granite&view=4",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1260&q=80&stone=alaska-white-granite&view=5",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1261&q=80&stone=alaska-white-granite&view=6",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1262&q=80&stone=alaska-white-granite&view=7",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1263&q=80&stone=alaska-white-granite&view=8",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1264&q=80&stone=alaska-white-granite&view=9",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1265&q=80&stone=alaska-white-granite&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Alaska White Granite Display",
      "2. Quartz Feldspar & Charcoal Crystal Flow Close-Up",
      "3. Modern Kitchen Waterfall Island with 45° Miter Edge",
      "4. Contemporary Granite Countertop with Integrated Cooktop",
      "5. Bright Open-Concept Living & Kitchen Floor Area",
      "6. Floating Staircase Flight with Alaska White Treads",
      "7. Polished Surface Gloss under Pendant Fixtures",
      "8. Kitchen Prep Zone with High Chemical Resistance",
      "9. Edge Profile Routing Precision Showcase",
      "10. Completed Contemporary Architectural Villa"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Leathered"
    ],
    "size": [
      "Custom Slabs",
      "24\"x24\"",
      "12\"x24\"",
      "Countertop Slabs 26\"x108\""
    ],
    "application": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Stairs",
      "Flooring",
      "Wall Cladding"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 9
  },
  {
    "_id": "prod-tavera-marble",
    "name": "Tavera Marble",
    "slug": "tavera-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Natural Marble",
    "color": "Warm Beige & Cream Crystalline Base",
    "texturePattern": "Fine Crystalline Structure with Subtle Warm Veining",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Indoor Rooms",
      "Corridors"
    ],
    "stairSuitability": "100% Ideal — Exceptional density and smooth bullnosed edges for stair steps.",
    "kitchenSuitability": "Suitable for Backsplash and Low-Traffic Countertops.",
    "flooringSuitability": "100% Supreme Flooring Choice — Most popular Pakistani flooring marble.",
    "indoorOutdoorSuitability": "Indoor Flooring & Wall Paneling.",
    "description": "Tavera Marble is Pakistan’s most celebrated residential flooring marble. Quarried in Balochistan, it offers a warm, neutral beige and cream palette that harmonizes with any interior decor while providing high abrasion durability and mirror polish reflectivity.",
    "images": [
      "/images/tavera-marble.jpg",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1264&q=80&stone=tavera-marble&view=2",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1265&q=80&stone=tavera-marble&view=3",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1266&q=80&stone=tavera-marble&view=4",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1267&q=80&stone=tavera-marble&view=5",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1268&q=80&stone=tavera-marble&view=6",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1269&q=80&stone=tavera-marble&view=7",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1270&q=80&stone=tavera-marble&view=8",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1271&q=80&stone=tavera-marble&view=9",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1272&q=80&stone=tavera-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Tavera Marble Slab",
      "2. Macro Texture of Warm Beige Crystalline Matrix",
      "3. Expansive Villa Living Room Tavera Flooring",
      "4. Tavera Marble Staircase Flight with Matching Risers",
      "5. High-Gloss Foyer Floor with Polished Luster",
      "6. Open Dining Hall Flooring with Seamless Grouting",
      "7. Corridor & Hallway Tile Alignment Under Daylight",
      "8. Master Bedroom Floor with Natural Warm Reflections",
      "9. Double Bullnosed Stair Tread Edge Detail",
      "10. Completed Luxury Pakistani Home Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Indoor Rooms",
      "Corridors"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 10
  },
  {
    "_id": "prod-verona-marble",
    "name": "Verona Marble",
    "slug": "verona-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Natural Marble",
    "color": "Warm Beige with Rosy-Brown & Fawn Veining",
    "texturePattern": "Flowing Earthy Veins with Crystalline Warmth",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Drawing Rooms",
      "Lobbies"
    ],
    "stairSuitability": "100% Ideal — Elegant warm tones for grand curved and straight staircases.",
    "kitchenSuitability": "Suitable for Backsplash and Table Surfaces.",
    "flooringSuitability": "100% Supreme Flooring Choice — Rich warm ambience for expansive rooms.",
    "indoorOutdoorSuitability": "Indoor Luxury Flooring & Walls.",
    "description": "Verona Marble is an opulent Pakistani marble characterized by its warm beige background intertwined with delicate fawn, amber, and rosy-brown veining. Widely preferred for luxury home flooring and grand stairways.",
    "images": [
      "/images/verona-marble.jpg",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1271&q=80&stone=verona-marble&view=2",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1272&q=80&stone=verona-marble&view=3",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1273&q=80&stone=verona-marble&view=4",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1274&q=80&stone=verona-marble&view=5",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1275&q=80&stone=verona-marble&view=6",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1276&q=80&stone=verona-marble&view=7",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1277&q=80&stone=verona-marble&view=8",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1278&q=80&stone=verona-marble&view=9",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1279&q=80&stone=verona-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Verona Marble View",
      "2. Rosy-Brown Veining & Fawn Pattern Close-Up",
      "3. Grand Foyer Floor with Polished Verona Marble",
      "4. Curved Staircase Flight with Verona Treads",
      "5. Drawing Room Floor with High-Gloss Luster",
      "6. Hallway Tile Alignment Under Natural Daylight",
      "7. Surface Reflection Under Warm Ceiling Downlights",
      "8. TV Feature Wall Accented with Verona Stone",
      "9. Precision Stair Riser & Tread Profile",
      "10. Finished Luxury Pakistani Villa Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Drawing Rooms",
      "Lobbies"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 11
  },
  {
    "_id": "prod-sunny-gray-marble",
    "name": "Sunny Gray Marble",
    "slug": "sunny-gray-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Natural Marble",
    "color": "Silver Grey & Soft Ash Tones",
    "texturePattern": "Homogeneous Fine-Grained Grey Matrix with Subtle Mineral Highlights",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Commercial Spaces",
      "Offices",
      "Corridors"
    ],
    "stairSuitability": "100% Ideal — Clean modern gray stairs with high abrasion durability.",
    "kitchenSuitability": "Suitable for Backsplash & Low-Wear Counters.",
    "flooringSuitability": "100% Supreme Flooring Choice for contemporary homes & offices.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor Areas.",
    "description": "Sunny Gray Marble is an ultra-durable grey stone featuring an even, understated silver-grey background. It is highly valued for commercial halls, offices, and modern minimalist homes.",
    "images": [
      "/images/sunny-gray.jpg",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1278&q=80&stone=sunny-gray-marble&view=2",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1279&q=80&stone=sunny-gray-marble&view=3",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1280&q=80&stone=sunny-gray-marble&view=4",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1281&q=80&stone=sunny-gray-marble&view=5",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1282&q=80&stone=sunny-gray-marble&view=6",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1283&q=80&stone=sunny-gray-marble&view=7",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1284&q=80&stone=sunny-gray-marble&view=8",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1285&q=80&stone=sunny-gray-marble&view=9",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1286&q=80&stone=sunny-gray-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Sunny Gray Slab",
      "2. Fine Silver-Grey Matrix Texture Close-Up",
      "3. Commercial Office Hall Floor Installation",
      "4. Contemporary Grey Marble Staircase Flight",
      "5. Modern Minimalist Living Room Floor",
      "6. Elevator Lobby Floor & Wall Border",
      "7. Matte Honed Finish Option for Non-Slip Walkways",
      "8. High-Gloss Polished Reflection Under Daylight",
      "9. Stair Step Bullnosing Precision Detail",
      "10. Completed Commercial Plaza Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Sandblasted"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Commercial Spaces",
      "Offices",
      "Corridors"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": false,
    "isActive": true,
    "sortOrder": 12
  },
  {
    "_id": "prod-zyra-gray-marble",
    "name": "Zyra Gray Marble",
    "slug": "zyra-gray-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Natural Marble",
    "color": "Charcoal Grey with Crisp White Calcite Veins",
    "texturePattern": "Linear & Swirling White Lightning Veins on Deep Grey Bed",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Feature Walls",
      "Bathroom",
      "Fireplaces"
    ],
    "stairSuitability": "100% Ideal — Striking white vein contrasts on deep grey stair steps.",
    "kitchenSuitability": "Suitable for Backsplash & Feature Islands.",
    "flooringSuitability": "100% Supreme Choice for modern luxury drawing rooms.",
    "indoorOutdoorSuitability": "Indoor Luxury Spaces.",
    "description": "Zyra Gray Marble makes a bold architectural statement with its deep charcoal grey background traversed by vivid white calcite veins. Cut and calibrated at our Fort Abbas factory for flawless bookmatched layouts.",
    "images": [
      "/images/sunny-gray.jpg",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1285&q=80&stone=zyra-gray-marble&view=2",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1286&q=80&stone=zyra-gray-marble&view=3",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1287&q=80&stone=zyra-gray-marble&view=4",
      "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?auto=format&fit=crop&w=1288&q=80&stone=zyra-gray-marble&view=5",
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1289&q=80&stone=zyra-gray-marble&view=6",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1290&q=80&stone=zyra-gray-marble&view=7",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1291&q=80&stone=zyra-gray-marble&view=8",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1292&q=80&stone=zyra-gray-marble&view=9",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1293&q=80&stone=zyra-gray-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Zyra Gray Marble Display",
      "2. Charcoal Matrix & White Lightning Veining Close-Up",
      "3. High-Contrast Luxury Drawing Room Floor",
      "4. Contemporary Floating Staircase with Zyra Gray Treads",
      "5. Bookmatched Feature Wall Behind Living Area",
      "6. Polished Master Bathroom Vanity & Wall Cladding",
      "7. Mirror Polish Reflectivity Under Ambient Lights",
      "8. Fireplace Hearth & Surrounding Wall Accents",
      "9. Precision Mitered Corner Edge Detail",
      "10. Completed Modern Villa Showcase"
    ],
    "finish": [
      "Polished",
      "Honed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Feature Walls",
      "Bathroom",
      "Fireplaces"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 13
  },
  {
    "_id": "prod-white-gray-marble",
    "name": "White Gray Marble",
    "slug": "white-gray-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Natural Marble",
    "color": "Misty White with Soft Cloudy Grey Textures",
    "texturePattern": "Gentle Grey Waves and Cloud Movements on Off-White Canvas",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Bedrooms",
      "Lobbies"
    ],
    "stairSuitability": "100% Ideal — Soft neutral hues illuminate stairwells.",
    "kitchenSuitability": "Suitable for Backsplash & Wall Niches.",
    "flooringSuitability": "100% Supreme Flooring Choice — Bright, airy room expansion.",
    "indoorOutdoorSuitability": "Indoor Residential Flooring.",
    "description": "White Gray Marble blends ethereal white backgrounds with cloudy grey currents. An exceptionally versatile stone that delivers high aesthetic appeal and lasting durability at factory-direct rates.",
    "images": [
      "/images/sunny-gray.jpg",
      "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1292&q=80&stone=white-gray-marble&view=2",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1293&q=80&stone=white-gray-marble&view=3",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1294&q=80&stone=white-gray-marble&view=4",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1295&q=80&stone=white-gray-marble&view=5",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1296&q=80&stone=white-gray-marble&view=6",
      "https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=1297&q=80&stone=white-gray-marble&view=7",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1298&q=80&stone=white-gray-marble&view=8",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1299&q=80&stone=white-gray-marble&view=9",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1300&q=80&stone=white-gray-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated White Gray Marble Slab",
      "2. Cloudy Grey Movements on White Canvas Close-Up",
      "3. Open-Plan Living & Dining Floor Installation",
      "4. White Gray Stair Treads with Clean Chamfer Edging",
      "5. Master Bedroom Floor with Soft Ambient Sheen",
      "6. Lobby Corridor Tile Alignment Under Daylight",
      "7. Polished Surface Gloss & Scratch Resistance",
      "8. TV Lounge Feature Accent Wall",
      "9. Bullnose Stair Edge Finish Detail",
      "10. Completed Pakistani Residential Home"
    ],
    "finish": [
      "Polished",
      "Honed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Bedrooms",
      "Lobbies"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": false,
    "isActive": true,
    "sortOrder": 14
  },
  {
    "_id": "prod-supreme-white-marble",
    "name": "Supreme White Marble",
    "slug": "supreme-white-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Super White Marble",
    "color": "Radiant Pure White with Minimal Soft Veining",
    "texturePattern": "Ultra-Fine Calcite Crystal Foundation",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Palaces",
      "Drawing Rooms"
    ],
    "stairSuitability": "100% Supreme Choice — Luminous, floating stair steps with crystal reflection.",
    "kitchenSuitability": "Suitable for Backsplash & Island Fronts.",
    "flooringSuitability": "100% Supreme Flooring Choice — Maximum light reflection and pure luxury.",
    "indoorOutdoorSuitability": "Indoor Luxury Applications.",
    "description": "Supreme White Marble represents the pinnacle of purity in Pakistani white marbles. Its crystalline calcite matrix radiates pure light, creating an atmosphere of grandeur and cleanliness in expansive luxury estates.",
    "images": [
      "/images/supreme-white.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1299&q=80&stone=supreme-white-marble&view=2",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1300&q=80&stone=supreme-white-marble&view=3",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1301&q=80&stone=supreme-white-marble&view=4",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1302&q=80&stone=supreme-white-marble&view=5",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1303&q=80&stone=supreme-white-marble&view=6",
      "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&w=1304&q=80&stone=supreme-white-marble&view=7",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1305&q=80&stone=supreme-white-marble&view=8",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1306&q=80&stone=supreme-white-marble&view=9",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1307&q=80&stone=supreme-white-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Supreme White Marble View",
      "2. Flawless Calcite Crystal Matrix Close-Up",
      "3. Palatial Drawing Room Supreme White Floor",
      "4. Floating Cantilevered Stair Flight with Glass Railing",
      "5. High-Gloss Foyer Reflection Under Crystal Chandelier",
      "6. Master Suite Open Floor Plan",
      "7. Surface Reflectivity and Mirror Gloss in Daylight",
      "8. Wall Cladding with Zero Visible Seams",
      "9. Double Bullnosed Stair Treads Showcase",
      "10. Completed Luxury Estate Interior"
    ],
    "finish": [
      "Polished",
      "Honed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "36\"x36\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Palaces",
      "Drawing Rooms"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 15
  },
  {
    "_id": "prod-cheetah-white-marble",
    "name": "Cheetah White Marble",
    "slug": "cheetah-white-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Patterned Marble",
    "color": "Crisp White with Dappled Charcoal & Grey Spots",
    "texturePattern": "Organic Dappled Leopard/Cheetah Fleck Patterns",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Feature Walls",
      "Balconies",
      "Courtyards"
    ],
    "stairSuitability": "100% Ideal — Distinctive non-repetitive organic patterns on steps.",
    "kitchenSuitability": "Suitable for Backsplash & Wall Feature Inlays.",
    "flooringSuitability": "100% Supreme Flooring Choice — Camouflages dust, visually dynamic.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor Areas.",
    "description": "Cheetah White Marble features a lively white ground peppered with organic grey and charcoal dapples reminiscent of cheetah rosettes. Its high density and dynamic pattern make it both forgiving for everyday maintenance and striking in large floor halls.",
    "images": [
      "/images/ziarat-white.jpg",
      "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?auto=format&fit=crop&w=1306&q=80&stone=cheetah-white-marble&view=2",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1307&q=80&stone=cheetah-white-marble&view=3",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1308&q=80&stone=cheetah-white-marble&view=4",
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1309&q=80&stone=cheetah-white-marble&view=5",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1310&q=80&stone=cheetah-white-marble&view=6",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1311&q=80&stone=cheetah-white-marble&view=7",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1312&q=80&stone=cheetah-white-marble&view=8",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1313&q=80&stone=cheetah-white-marble&view=9",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1314&q=80&stone=cheetah-white-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Cheetah White Marble Slab",
      "2. Distinct Dappled Charcoal Fleck Pattern Close-Up",
      "3. Dynamic Living Hall Cheetah White Floor Layout",
      "4. Staircase Flight with Cheetah White Treads",
      "5. High-Traffic Veranda & Corridor Floor",
      "6. Lobby Floor Inlay with Dark Borders",
      "7. Polished Finish Durability in Sunlight",
      "8. Feature Wall Accent Behind Reception",
      "9. Bullnose Edge Precision Routing",
      "10. Completed Residence Architectural Showcase"
    ],
    "finish": [
      "Polished",
      "Honed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Feature Walls",
      "Balconies",
      "Courtyards"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": false,
    "isActive": true,
    "sortOrder": 16
  },
  {
    "_id": "prod-carrara-white-marble",
    "name": "Carrara White Marble",
    "slug": "carrara-white-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Imported Italian Luxury Marble",
    "color": "Pure White Canvas with Feather-Soft Grey Veins",
    "texturePattern": "Iconic Italian Feather Veining & Silken Crystalline Texture",
    "recommendedUses": [
      "Flooring",
      "Kitchen Islands",
      "Stairs",
      "Bathroom",
      "Wall Cladding"
    ],
    "stairSuitability": "Highly Recommended — Timeless Tuscan grandeur for curved and floating staircases.",
    "kitchenSuitability": "100% Designer Choice for waterfall islands, baker stations, and backsplashes.",
    "flooringSuitability": "100% Supreme Flooring Choice for master suites and luxury penthouses.",
    "indoorOutdoorSuitability": "Indoor Luxury Spaces.",
    "description": "Carrara White Marble is the world’s most iconic architectural stone. Sourced directly from Tuscan quarries in Italy and diamond-finished in Fort Abbas, it provides soft smoky grey veins traversing an alabaster white ground for unparalleled luxury.",
    "images": [
      "/images/calacatta-gold.jpg",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1313&q=80&stone=carrara-white-marble&view=2",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1314&q=80&stone=carrara-white-marble&view=3",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1315&q=80&stone=carrara-white-marble&view=4",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1316&q=80&stone=carrara-white-marble&view=5",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1317&q=80&stone=carrara-white-marble&view=6",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1318&q=80&stone=carrara-white-marble&view=7",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1319&q=80&stone=carrara-white-marble&view=8",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1320&q=80&stone=carrara-white-marble&view=9",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1321&q=80&stone=carrara-white-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Imported Carrara White Marble View",
      "2. Iconic Smoky Feather Veining Texture Close-Up",
      "3. Master Suite Flooring with Chevron Layout",
      "4. Waterfall Kitchen Island with Mitered 45° Apron",
      "5. Floating Staircase Flight with Backlit Glass Railing",
      "6. Full Master Bathroom Wall & Vanity Countertop",
      "7. Silken Honed Finish for Modern Interiors",
      "8. Bookmatched Fireplace Feature Wall",
      "9. Bullnosed Edge Detailing on Stair Steps",
      "10. Completed Italian Architectural Penthouse"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Jumbo Slabs up to 10ft",
      "24\"x24\"",
      "36\"x36\"",
      "Countertops 26\"x108\""
    ],
    "application": [
      "Flooring",
      "Kitchen Islands",
      "Stairs",
      "Bathroom",
      "Wall Cladding"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 17
  },
  {
    "_id": "prod-ziarat-white",
    "name": "Ziarat White Super Prime",
    "slug": "ziarat-white-classic",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Pure Crystalline Marble",
    "color": "Pure Snow White with Delicate Gold & Grey Veining",
    "texturePattern": "Dense Crystalline Calcite Matrix with High Thermal Mass",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Mosques",
      "Luxury Villas"
    ],
    "stairSuitability": "100% Supreme Choice — The national pride marble for grand staircase flights.",
    "kitchenSuitability": "Suitable for Backsplash and Feature Island Bases.",
    "flooringSuitability": "100% Supreme Flooring Choice — Cool, luminous, ultra-durable.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor Monuments & Villas.",
    "description": "Ziarat White Super Prime is Pakistan’s most prestigious natural stone. Extracted from the high-altitude quarries of Balochistan and precision-cut at our Fort Abbas factory, its crystalline white foundation stays cool underfoot and polishes to a blinding glass luster.",
    "images": [
      "/images/ziarat-white.jpg",
      "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1320&q=80&stone=ziarat-white-classic&view=2",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1321&q=80&stone=ziarat-white-classic&view=3",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1322&q=80&stone=ziarat-white-classic&view=4",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1323&q=80&stone=ziarat-white-classic&view=5",
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1324&q=80&stone=ziarat-white-classic&view=6",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1325&q=80&stone=ziarat-white-classic&view=7",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1326&q=80&stone=ziarat-white-classic&view=8",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1327&q=80&stone=ziarat-white-classic&view=9",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1328&q=80&stone=ziarat-white-classic&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Ziarat White Super Prime Slab",
      "2. Pure Calcite Crystalline Macro Close-Up",
      "3. Grand Mosque & Palatial Foyer Floor Installation",
      "4. Sweeping Curved Staircase with Double Bullnosed Treads",
      "5. Expansive Living Hall Floor with Mirror Polish",
      "6. Bookmatched Drawing Room Feature Wall",
      "7. Direct Sunlight Refraction on White Marble",
      "8. Master Suite Flooring with Dark Border Inlay",
      "9. Edge Profile Precision at Fort Abbas Factory",
      "10. Completed Landmark Architectural Villa"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "36\"x36\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Mosques",
      "Luxury Villas"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 18
  },
  {
    "_id": "prod-calacatta-gold",
    "name": "Calacatta Gold Luxury",
    "slug": "calacatta-gold-luxury",
    "category": {
      "_id": "cat-wall",
      "name": "Wall Marble & Granite",
      "slug": "wall-marble-granite",
      "description": "Exquisite bookmatched slabs, architectural feature walls, fireplace claddings, and exterior ventilated facade panels.",
      "image": "/images/black-gold.jpg",
      "isActive": true,
      "sortOrder": 4
    },
    "materialType": "Marble",
    "marbleType": "Imported Italian Calacatta Marble",
    "color": "Warm Milky White Ground with Bold Honey-Gold & Taupe Ribbons",
    "texturePattern": "Dramatic Broad Golden Veins with Soft Feathered Grey Halos",
    "recommendedUses": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Wall Cladding",
      "Stairs",
      "Master Baths"
    ],
    "stairSuitability": "Highly Recommended — Architectural showstopper for floating cantilevered stairs.",
    "kitchenSuitability": "100% Ultra-Luxury Choice for waterfall kitchen islands and bookmatched splashbacks.",
    "flooringSuitability": "Supreme choice for master bedroom suites and executive drawing rooms.",
    "indoorOutdoorSuitability": "Indoor Ultra-Luxury Applications.",
    "description": "Calacatta Gold Luxury is among the rarest natural stones on earth. Directly imported from the mountains of Carrara and calibrated at our Fort Abbas yard, its bold honey-gold and charcoal-taupe veins flow effortlessly across an alabaster base.",
    "images": [
      "/images/calacatta-gold.jpg",
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1327&q=80&stone=calacatta-gold-luxury&view=2",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1328&q=80&stone=calacatta-gold-luxury&view=3",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1329&q=80&stone=calacatta-gold-luxury&view=4",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1330&q=80&stone=calacatta-gold-luxury&view=5",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1331&q=80&stone=calacatta-gold-luxury&view=6",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1332&q=80&stone=calacatta-gold-luxury&view=7",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1333&q=80&stone=calacatta-gold-luxury&view=8",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1334&q=80&stone=calacatta-gold-luxury&view=9",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1335&q=80&stone=calacatta-gold-luxury&view=10"
    ],
    "imageCaptions": [
      "1. Full Calibrated Calacatta Gold Marble Slab",
      "2. Bold Honey-Gold & Taupe Vein Macro Close-Up",
      "3. Bookmatched Waterfall Kitchen Island Feature",
      "4. Master Bathroom Full Wall & Vanity Installation",
      "5. Floating Cantilevered Stair Flight with Calacatta Treads",
      "6. Luxury Living Room Bookmatched TV Feature Wall",
      "7. Silken Satin Honed Surface Finish Option",
      "8. High-Gloss Polished Luster Under Chandelier",
      "9. Precision Mitered Waterfall Edge Detail",
      "10. Completed Italian Masterpiece Penthouse"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Silk Satin"
    ],
    "size": [
      "Jumbo Slabs up to 10.5ft",
      "Custom Countertops",
      "24\"x24\"",
      "36\"x36\""
    ],
    "application": [
      "Kitchen Countertops",
      "Kitchen Islands",
      "Wall Cladding",
      "Stairs",
      "Master Baths"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 19
  },
  {
    "_id": "prod-black-galaxy",
    "name": "Black Galaxy Granite (Star Gold)",
    "slug": "black-galaxy-granite",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "materialType": "Granite",
    "marbleType": "Premium Heavy-Duty Granite",
    "color": "Midnight Obsidian Black with Glittering Gold/Bronze Bronzite Flecks",
    "texturePattern": "Dense Natural Igneous Granite with High Metallic Mineral Luster",
    "recommendedUses": [
      "Kitchen Countertops",
      "Stairs",
      "Kitchen Islands",
      "Flooring",
      "Executive Desks"
    ],
    "stairSuitability": "100% Supreme Choice — Glitters under spotlights and withstands lifetime traffic.",
    "kitchenSuitability": "100% Supreme Kitchen Top — Scratch, heat, stain, and acid proof.",
    "flooringSuitability": "High-traffic commercial lobbies and luxury residential borders.",
    "indoorOutdoorSuitability": "Extreme Outdoor & Indoor Weather Durability.",
    "description": "Black Galaxy Granite is a world-renowned natural stone renowned for its glittering gold and bronze bronzite flecks sparkling within deep midnight obsidian black granite. Zero maintenance, scratch-proof, and non-porous.",
    "images": [
      "/images/black-galaxy.jpg",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1334&q=80&stone=black-galaxy-granite&view=2",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1335&q=80&stone=black-galaxy-granite&view=3",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1336&q=80&stone=black-galaxy-granite&view=4",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1337&q=80&stone=black-galaxy-granite&view=5",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1338&q=80&stone=black-galaxy-granite&view=6",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1339&q=80&stone=black-galaxy-granite&view=7",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1340&q=80&stone=black-galaxy-granite&view=8",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1341&q=80&stone=black-galaxy-granite&view=9",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1342&q=80&stone=black-galaxy-granite&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Black Galaxy Star Gold Display",
      "2. Macro Glittering Golden Bronzite Crystals Close-Up",
      "3. Kitchen Countertop with Integrated Cooktop & Undermount Sink",
      "4. Waterfall Island Edge Profile with Gold Flake Luster",
      "5. High-Traction Stair Treads with Anti-Slip Safety Grooves",
      "6. Commercial Lobby Floor with Star-Field Effect",
      "7. Outdoor BBQ & Bar Countertop Installation",
      "8. High-Gloss Polished Reflection Under Daylight",
      "9. Ogee & Double Bullnose Edge Routing Detail",
      "10. Completed Luxury Residence Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Flamed"
    ],
    "size": [
      "Custom Slabs up to 10.5ft",
      "24\"x24\"",
      "12\"x24\"",
      "Countertops 26\"x108\""
    ],
    "application": [
      "Kitchen Countertops",
      "Stairs",
      "Kitchen Islands",
      "Flooring",
      "Executive Desks"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 20
  },
  {
    "_id": "prod-black-gold",
    "name": "Pakistani Black & Gold (Michaelangelo)",
    "slug": "pakistani-black-and-gold",
    "category": {
      "_id": "cat-wall",
      "name": "Wall Marble & Granite",
      "slug": "wall-marble-granite",
      "description": "Exquisite bookmatched slabs, architectural feature walls, fireplace claddings, and exterior ventilated facade panels.",
      "image": "/images/black-gold.jpg",
      "isActive": true,
      "sortOrder": 4
    },
    "materialType": "Marble",
    "marbleType": "Pakistani Heritage Marble",
    "color": "Deep Jet Black Base with Electric Gold & White Lightning Veining",
    "texturePattern": "Dynamic Lightning Veins Charging across Dense Black Marble Matrix",
    "recommendedUses": [
      "Wall Cladding",
      "Feature Walls",
      "Flooring Borders",
      "Stairs",
      "Fireplaces"
    ],
    "stairSuitability": "100% Ideal — Dramatic high-contrast luxury stair treads.",
    "kitchenSuitability": "Suitable for Backsplash & Island Front Panels.",
    "flooringSuitability": "Luxury drawing room borders, focal medallions, and executive suites.",
    "indoorOutdoorSuitability": "Indoor Luxury Spaces.",
    "description": "Pakistani Black & Gold (Michaelangelo) is one of the most dramatic marbles in the world. Sourced from Balochistan and calibrated at our Fort Abbas facility, its ebony black background is charged with brilliant golden and white lightning veins.",
    "images": [
      "/images/black-gold.jpg",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1341&q=80&stone=pakistani-black-and-gold&view=2",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1342&q=80&stone=pakistani-black-and-gold&view=3",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1343&q=80&stone=pakistani-black-and-gold&view=4",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1344&q=80&stone=pakistani-black-and-gold&view=5",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1345&q=80&stone=pakistani-black-and-gold&view=6",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1346&q=80&stone=pakistani-black-and-gold&view=7",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1347&q=80&stone=pakistani-black-and-gold&view=8",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1348&q=80&stone=pakistani-black-and-gold&view=9",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1349&q=80&stone=pakistani-black-and-gold&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Pakistani Black & Gold Michaelangelo View",
      "2. Golden Lightning Vein Macro Close-Up",
      "3. Bookmatched TV Feature Wall in Luxury Drawing Room",
      "4. High-Contrast Black & Gold Staircase Flight",
      "5. Powder Room Vanity & Full Wall Panel Installation",
      "6. Executive Drawing Room Floor Border Inlay",
      "7. Polished Gloss & Vein Movement Under Ambient Light",
      "8. Fireplace Mantel Surround with Black & Gold Stone",
      "9. Precision Miter Joint Routing Detail",
      "10. Completed Pakistani Masterpiece Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Antique Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Bookmatched Slabs"
    ],
    "application": [
      "Wall Cladding",
      "Feature Walls",
      "Flooring Borders",
      "Stairs",
      "Fireplaces"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 21
  },
  {
    "_id": "prod-green-onyx",
    "name": "Translucent Emerald Green Onyx",
    "slug": "translucent-emerald-green-onyx",
    "category": {
      "_id": "cat-other",
      "name": "Other Applications",
      "slug": "other-applications",
      "description": "Translucent backlit Onyx, custom dining tables, executive boardroom tops, fireplace hearths, and bespoke mosaic inlays.",
      "image": "/images/green-onyx.jpg",
      "isActive": true,
      "sortOrder": 7
    },
    "materialType": "Marble",
    "marbleType": "Exotic Translucent Natural Onyx",
    "color": "Luminous Emerald Green, Jade, Honey Amber & Rust Veins",
    "texturePattern": "Semi-Precious Gemstone Texture with Remarkable Backlit Light Transmission",
    "recommendedUses": [
      "Backlit Feature Walls",
      "Luxury Bars",
      "Vanity Tops",
      "Stair Risers",
      "Accent Columns"
    ],
    "stairSuitability": "Highly Recommended for ambient illuminated backlit stair risers and railings.",
    "kitchenSuitability": "Supreme choice for luxury illuminated bar tops and feature backsplash.",
    "flooringSuitability": "Accent border inlays and illuminated glass-covered medallions.",
    "indoorOutdoorSuitability": "Indoor Luxury Feature Spaces.",
    "description": "Translucent Emerald Green Onyx is an exotic, semi-precious stone quarried in Balochistan. When back-illuminated with warm LED lighting, its jade and amber crystals glow with radiant depth. Calibrated to translucent tolerances in Fort Abbas.",
    "images": [
      "/images/green-onyx.jpg",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1348&q=80&stone=translucent-emerald-green-onyx&view=2",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1349&q=80&stone=translucent-emerald-green-onyx&view=3",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80&stone=translucent-emerald-green-onyx&view=4",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1351&q=80&stone=translucent-emerald-green-onyx&view=5",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1352&q=80&stone=translucent-emerald-green-onyx&view=6",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1353&q=80&stone=translucent-emerald-green-onyx&view=7",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1354&q=80&stone=translucent-emerald-green-onyx&view=8",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1355&q=80&stone=translucent-emerald-green-onyx&view=9",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1356&q=80&stone=translucent-emerald-green-onyx&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Translucent Green Onyx Display",
      "2. Gemstone Jade & Honey Amber Crystal Matrix Close-Up",
      "3. Backlit Ambient LED Feature Wall in Reception Foyer",
      "4. Illuminated Luxury Onyx Bar Countertop",
      "5. Backlit Staircase Risers with Glowing Emerald Luster",
      "6. Spa Powder Room Translucent Onyx Vanity Top",
      "7. Daylighting Natural Translucency View",
      "8. Polished Gemstone Surface Gloss Under Ambient Lights",
      "9. Edge Profile Precision & Translucent Thickness",
      "10. Completed Exotic Stone Architectural Masterpiece"
    ],
    "finish": [
      "Polished (Translucent Calibrated)"
    ],
    "size": [
      "Custom Slabs",
      "Backlit Slabs up to 9ft",
      "Bookmatched Pairs"
    ],
    "application": [
      "Backlit Feature Walls",
      "Luxury Bars",
      "Vanity Tops",
      "Stair Risers",
      "Accent Columns"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 22
  },
  {
    "_id": "prod-badal-grey",
    "name": "Badal Grey Cloud Marble",
    "slug": "badal-grey-cloud-marble",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "materialType": "Marble",
    "marbleType": "Pakistani High-Density Marble",
    "color": "Silver Grey with Undulating Dark Charcoal Storm Clouds",
    "texturePattern": "Flowing Wave-like Cloud Bands with High Abrasion Resistance",
    "recommendedUses": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Courtyards",
      "Living Rooms"
    ],
    "stairSuitability": "100% Ideal — High compressive strength and distinct stormy cloud pattern.",
    "kitchenSuitability": "Suitable for Backsplash & Dining Tables.",
    "flooringSuitability": "100% Supreme Flooring Choice — Cool, durable, forgiving of dust.",
    "indoorOutdoorSuitability": "Indoor & Covered Outdoor applications.",
    "description": "Badal Grey Cloud Marble is renowned for its undulating storm-cloud patterns and exceptional natural hardness. Quarried in Pakistan and fabricated at our Fort Abbas plant, it provides natural thermal cooling and high resistance to daily wear.",
    "images": [
      "/images/badal-grey.jpg",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1355&q=80&stone=badal-grey-cloud-marble&view=2",
      "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?auto=format&fit=crop&w=1356&q=80&stone=badal-grey-cloud-marble&view=3",
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1357&q=80&stone=badal-grey-cloud-marble&view=4",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1358&q=80&stone=badal-grey-cloud-marble&view=5",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1359&q=80&stone=badal-grey-cloud-marble&view=6",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1360&q=80&stone=badal-grey-cloud-marble&view=7",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1361&q=80&stone=badal-grey-cloud-marble&view=8",
      "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1362&q=80&stone=badal-grey-cloud-marble&view=9",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1363&q=80&stone=badal-grey-cloud-marble&view=10"
    ],
    "imageCaptions": [
      "1. Full Slab Badal Grey Cloud Marble Display",
      "2. Undulating Charcoal Storm Cloud Waves Close-Up",
      "3. High-Traffic Residential Floor Installation",
      "4. Badal Grey Marble Staircase Flight with Bullnose Steps",
      "5. Living Room Floor with Natural Polished Luster",
      "6. Veranda & Covered Patio Continuous Flooring",
      "7. Polished Finish Resistance to Wear and Scuffs",
      "8. TV Lounge Wall Cladding with Cloudy Movement",
      "9. Precision Stair Tread Chamfer Edge Detail",
      "10. Completed Pakistani Home Showcase"
    ],
    "finish": [
      "Polished",
      "Honed",
      "Brushed"
    ],
    "size": [
      "Custom Slabs",
      "12\"x24\"",
      "24\"x24\"",
      "Stair Treads 12\"x48\""
    ],
    "application": [
      "Flooring",
      "Stairs",
      "Wall Cladding",
      "Courtyards",
      "Living Rooms"
    ],
    "availability": "In Stock (Direct Yard Slabs)",
    "isFeatured": true,
    "isActive": true,
    "sortOrder": 23
  }
];

const mockGallery = [
  {
    "_id": "gal-1",
    "title": "Luxury Villa Marble & Granite Floor Installation",
    "imagePath": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "category": {
      "_id": "cat-floor",
      "name": "Floor Marble & Granite",
      "slug": "floor-marble-granite",
      "description": "High-density, diamond-calibrated natural marble & granite slabs and tiles engineered for high-traffic residential, commercial, and palatial floorings.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 1
    },
    "description": "Precision cut Tavera & Ziarat White floor tiles in Fort Abbas residential villa.",
    "tags": [
      "Flooring",
      "Tavera",
      "Ziarat White"
    ]
  },
  {
    "_id": "gal-2",
    "title": "Waterfall Tropical Granite Island Kitchen",
    "imagePath": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    "category": {
      "_id": "cat-kitchen",
      "name": "Kitchen Marble & Granite",
      "slug": "kitchen-marble-granite",
      "description": "Heat, stain, and scratch-proof granite and high-density marble tailored for kitchen countertops, waterfall islands, backsplashes, and breakfast bars.",
      "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 2
    },
    "description": "Exotic Tropical Granite countertop with 45-degree mitered waterfall edge.",
    "tags": [
      "Kitchen",
      "Tropical Granite",
      "Waterfall Island"
    ]
  },
  {
    "_id": "gal-3",
    "title": "Grand Bullnosed Marble Staircase Flight",
    "imagePath": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    "category": {
      "_id": "cat-stairs",
      "name": "Stairs Marble & Granite",
      "slug": "stairs-marble-granite",
      "description": "Heavy-duty marble and granite treads with full bullnose, half-bullnose, anti-slip grooving, and matching vertical riser panels.",
      "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      "isActive": true,
      "sortOrder": 3
    },
    "description": "Full bullnosed marble steps with matching vertical risers and glass railing.",
    "tags": [
      "Stairs",
      "Bullnose",
      "Marble Steps"
    ]
  },
  {
    "_id": "gal-4",
    "title": "Bookmatched Pakistani Black & Gold Feature Wall",
    "imagePath": "/images/black-gold.jpg",
    "category": {
      "_id": "cat-wall",
      "name": "Wall Marble & Granite",
      "slug": "wall-marble-granite",
      "description": "Exquisite bookmatched slabs, architectural feature walls, fireplace claddings, and exterior ventilated facade panels.",
      "image": "/images/black-gold.jpg",
      "isActive": true,
      "sortOrder": 4
    },
    "description": "Michaelangelo black marble with electric golden veins in drawing room feature wall.",
    "tags": [
      "Wall Cladding",
      "Bookmatched",
      "Black & Gold"
    ]
  },
  {
    "_id": "gal-5",
    "title": "Italian Calacatta Luxury Master Bathroom",
    "imagePath": "/images/calacatta-gold.jpg",
    "category": {
      "_id": "cat-bathroom",
      "name": "Bathroom Marble & Granite",
      "slug": "bathroom-marble-granite",
      "description": "Luminous waterproof marble slabs, carved vanity tops, walk-in shower claddings, and spa wet-room floorings.",
      "image": "/images/calacatta-gold.jpg",
      "isActive": true,
      "sortOrder": 5
    },
    "description": "Luminous Calacatta Gold vanity and walk-in shower wall paneling.",
    "tags": [
      "Bathroom",
      "Calacatta",
      "Luxury Vanity"
    ]
  },
  {
    "_id": "gal-6",
    "title": "Backlit Emerald Green Onyx illuminated Wall",
    "imagePath": "/images/green-onyx.jpg",
    "category": {
      "_id": "cat-other",
      "name": "Other Applications",
      "slug": "other-applications",
      "description": "Translucent backlit Onyx, custom dining tables, executive boardroom tops, fireplace hearths, and bespoke mosaic inlays.",
      "image": "/images/green-onyx.jpg",
      "isActive": true,
      "sortOrder": 7
    },
    "description": "Translucent Pakistani Green Onyx illuminated with ambient warm LED panels.",
    "tags": [
      "Onyx",
      "Backlit",
      "Exotic Stone"
    ]
  }
];

const mockSettings = {
  "factoryName": "Abdullah Marble Factory",
  "tagline": "Direct Quarry Slabs & Custom Fabrication • Fort Abbas Since 2012",
  "contact": {
    "owner1Name": "Malik Yasir Bashir",
    "owner1Phone": "0345-4792176",
    "owner2Name": "Malik Nasir Iqbal",
    "owner2Phone": "0342-7150318",
    "whatsapp": "0345-4792176",
    "email": "info@abdullahmarble.com"
  },
  "location": {
    "address": "Main Haroonabad Road, Near THQ Hospital, Fort Abbas, Bahawalnagar District, Punjab, Pakistan",
    "city": "Fort Abbas",
    "province": "Punjab",
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55835.45268482476!2d72.825227!3d29.192518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c8340d860d5b5%3A0x6b1cfb8849ad7e59!2sFort%20Abbas%2C%20Bahawalnagar%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
  }
};

module.exports = {
  mockCategories,
  mockProducts,
  mockGallery,
  mockSettings,
};
