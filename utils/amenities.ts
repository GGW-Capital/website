export interface Amenity {
  name: string;
  value: string | { current: string };
  category: string;
  description?: string;
}

export const AMENITY_CATEGORIES = [
  { id: 'building', name: 'Building Features' },
  { id: 'interior', name: 'Interior Features' },
  { id: 'outdoor', name: 'Outdoor Features' },
  { id: 'security', name: 'Security Features' },
  { id: 'wellness', name: 'Wellness & Recreation' },
  { id: 'technology', name: 'Technology' },
  { id: 'services', name: 'Services' },
  { id: 'accessibility', name: 'Accessibility' },
  { id: 'views', name: 'Views' },
  { id: 'kitchen', name: 'Kitchen Features' },
  { id: 'bathroom', name: 'Bathroom Features' },
  { id: 'bedroom', name: 'Bedroom Features' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'nearby', name: 'Nearby Amenities' },
];

// Helper function to get value string from amenity value
function getValueString(value: string | { current: string }): string {
  if (typeof value === 'string') {
    return value;
  } else if (value && typeof value === 'object' && 'current' in value) {
    return value.current;
  }
  return '';
}

// Comprehensive list of over 200 amenities organized by category
export const ALL_AMENITIES: Amenity[] = [
  // BUILDING FEATURES
  { name: 'Elevator', value: 'elevator', category: 'building' },
  { name: 'Concierge', value: 'concierge', category: 'building' },
  { name: 'Doorman', value: 'doorman', category: 'building' },
  { name: 'Lobby', value: 'lobby', category: 'building' },
  { name: 'Parking', value: 'parking', category: 'building' },
  { name: 'Garage', value: 'garage', category: 'building' },
  { name: 'Valet Parking', value: 'valet_parking', category: 'building' },
  { name: 'Storage', value: 'storage', category: 'building' },
  { name: 'Building Manager', value: 'building_manager', category: 'building' },
  { name: 'Mailroom', value: 'mailroom', category: 'building' },
  { name: 'Package Room', value: 'package_room', category: 'building' },
  { name: 'Wheelchair Access', value: 'wheelchair_access', category: 'building' },
  { name: 'Bike Storage', value: 'bike_storage', category: 'building' },
  { name: 'Waste Disposal', value: 'waste_disposal', category: 'building' },
  { name: 'Recycling Facilities', value: 'recycling', category: 'building' },
  
  // INTERIOR FEATURES
  { name: 'Air Conditioning', value: 'air_conditioning', category: 'interior' },
  { name: 'Central Heating', value: 'central_heating', category: 'interior' },
  { name: 'Fireplace', value: 'fireplace', category: 'interior' },
  { name: 'High Ceilings', value: 'high_ceilings', category: 'interior' },
  { name: 'Hardwood Floors', value: 'hardwood_floors', category: 'interior' },
  { name: 'Marble Floors', value: 'marble_floors', category: 'interior' },
  { name: 'Tiled Floors', value: 'tiled_floors', category: 'interior' },
  { name: 'Carpet Floors', value: 'carpet_floors', category: 'interior' },
  { name: 'Walk-in Closet', value: 'walk_in_closet', category: 'interior' },
  { name: 'Storage Space', value: 'storage_space', category: 'interior' },
  { name: 'Furnished', value: 'furnished', category: 'interior' },
  { name: 'Semi-Furnished', value: 'semi_furnished', category: 'interior' },
  { name: 'Unfurnished', value: 'unfurnished', category: 'interior' },
  { name: 'Built-in Wardrobes', value: 'built_in_wardrobes', category: 'interior' },
  { name: 'Double-Glazed Windows', value: 'double_glazed_windows', category: 'interior' },
  { name: 'Sound Insulation', value: 'sound_insulation', category: 'interior' },
  { name: 'Thermal Insulation', value: 'thermal_insulation', category: 'interior' },
  { name: 'Laundry Room', value: 'laundry_room', category: 'interior' },
  { name: 'Ceiling Fan', value: 'ceiling_fan', category: 'interior' },
  { name: 'Crown Molding', value: 'crown_molding', category: 'interior' },
  { name: 'Recessed Lighting', value: 'recessed_lighting', category: 'interior' },
  
  // OUTDOOR FEATURES
  { name: 'Swimming Pool', value: 'swimming_pool', category: 'outdoor' },
  { name: 'Private Pool', value: 'private_pool', category: 'outdoor' },
  { name: 'Shared Pool', value: 'shared_pool', category: 'outdoor' },
  { name: 'Infinity Pool', value: 'infinity_pool', category: 'outdoor' },
  { name: 'Garden', value: 'garden', category: 'outdoor' },
  { name: 'Private Garden', value: 'private_garden', category: 'outdoor' },
  { name: 'Communal Garden', value: 'communal_garden', category: 'outdoor' },
  { name: 'Balcony', value: 'balcony', category: 'outdoor' },
  { name: 'Terrace', value: 'terrace', category: 'outdoor' },
  { name: 'Patio', value: 'patio', category: 'outdoor' },
  { name: 'Deck', value: 'deck', category: 'outdoor' },
  { name: 'BBQ Area', value: 'bbq_area', category: 'outdoor' },
  { name: 'Outdoor Kitchen', value: 'outdoor_kitchen', category: 'outdoor' },
  { name: 'Outdoor Dining', value: 'outdoor_dining', category: 'outdoor' },
  { name: 'Fire Pit', value: 'fire_pit', category: 'outdoor' },
  { name: 'Jacuzzi', value: 'jacuzzi', category: 'outdoor' },
  { name: 'Hot Tub', value: 'hot_tub', category: 'outdoor' },
  { name: 'Sauna', value: 'sauna', category: 'outdoor' },
  { name: 'Steam Room', value: 'steam_room', category: 'outdoor' },
  { name: 'Children Play Area', value: 'playground', category: 'outdoor' },
  { name: 'Pet Area', value: 'pet_area', category: 'outdoor' },
  { name: 'Gazebo', value: 'gazebo', category: 'outdoor' },
  { name: 'Pergola', value: 'pergola', category: 'outdoor' },
  { name: 'Water Feature', value: 'water_feature', category: 'outdoor' },
  { name: 'Pond', value: 'pond', category: 'outdoor' },
  { name: 'Fountain', value: 'fountain', category: 'outdoor' },
  
  // SECURITY FEATURES
  { name: '24/7 Security', value: 'security_24_7', category: 'security' },
  { name: 'Gated Community', value: 'gated_community', category: 'security' },
  { name: 'Security Guard', value: 'security_guard', category: 'security' },
  { name: 'CCTV', value: 'cctv', category: 'security' },
  { name: 'Video Intercom', value: 'video_intercom', category: 'security' },
  { name: 'Intercom', value: 'intercom', category: 'security' },
  { name: 'Alarm System', value: 'alarm_system', category: 'security' },
  { name: 'Smart Locks', value: 'smart_locks', category: 'security' },
  { name: 'Biometric Access', value: 'biometric_access', category: 'security' },
  { name: 'Key Card Access', value: 'key_card_access', category: 'security' },
  { name: 'Secure Parking', value: 'secure_parking', category: 'security' },
  { name: 'Fire Safety System', value: 'fire_safety', category: 'security' },
  { name: 'Panic Button', value: 'panic_button', category: 'security' },
  { name: 'Emergency Response', value: 'emergency_response', category: 'security' },
  { name: 'Safe', value: 'safe', category: 'security' },
  
  // WELLNESS & RECREATION
  { name: 'Gym', value: 'gym', category: 'wellness' },
  { name: 'Fitness Center', value: 'fitness_center', category: 'wellness' },
  { name: 'Yoga Studio', value: 'yoga_studio', category: 'wellness' },
  { name: 'Pilates Studio', value: 'pilates_studio', category: 'wellness' },
  { name: 'Spa', value: 'spa', category: 'wellness' },
  { name: 'Massage Room', value: 'massage_room', category: 'wellness' },
  { name: 'Meditation Room', value: 'meditation_room', category: 'wellness' },
  { name: 'Tennis Court', value: 'tennis_court', category: 'wellness' },
  { name: 'Basketball Court', value: 'basketball_court', category: 'wellness' },
  { name: 'Squash Court', value: 'squash_court', category: 'wellness' },
  { name: 'Golf Course', value: 'golf_course', category: 'wellness' },
  { name: 'Mini Golf', value: 'mini_golf', category: 'wellness' },
  { name: 'Walking Track', value: 'walking_track', category: 'wellness' },
  { name: 'Jogging Track', value: 'jogging_track', category: 'wellness' },
  { name: 'Bike Path', value: 'bike_path', category: 'wellness' },
  { name: 'Game Room', value: 'game_room', category: 'wellness' },
  { name: 'Billiards', value: 'billiards', category: 'wellness' },
  { name: 'Table Tennis', value: 'table_tennis', category: 'wellness' },
  { name: 'Bowling Alley', value: 'bowling_alley', category: 'wellness' },
  { name: 'Cinema Room', value: 'cinema_room', category: 'wellness' },
  { name: 'Library', value: 'library', category: 'wellness' },
  { name: 'Reading Room', value: 'reading_room', category: 'wellness' },
  { name: 'Music Room', value: 'music_room', category: 'wellness' },
  { name: 'Art Studio', value: 'art_studio', category: 'wellness' },
  
  // TECHNOLOGY
  { name: 'High-Speed Internet', value: 'high_speed_internet', category: 'technology' },
  { name: 'Fiber Optic Internet', value: 'fiber_optic', category: 'technology' },
  { name: 'Smart Home System', value: 'smart_home', category: 'technology' },
  { name: 'Home Automation', value: 'home_automation', category: 'technology' },
  { name: 'Electric Vehicle Charging', value: 'ev_charging', category: 'technology' },
  { name: 'Solar Panels', value: 'solar_panels', category: 'technology' },
  { name: 'Energy Efficient', value: 'energy_efficient', category: 'technology' },
  { name: 'Smart Thermostat', value: 'smart_thermostat', category: 'technology' },
  { name: 'Smart Lighting', value: 'smart_lighting', category: 'technology' },
  { name: 'Smart Blinds', value: 'smart_blinds', category: 'technology' },
  { name: 'Voice Control', value: 'voice_control', category: 'technology' },
  { name: 'Video Doorbell', value: 'video_doorbell', category: 'technology' },
  { name: 'Satellite TV', value: 'satellite_tv', category: 'technology' },
  { name: 'Cable TV', value: 'cable_tv', category: 'technology' },
  { name: 'Surround Sound System', value: 'surround_sound', category: 'technology' },
  { name: 'Wireless Speakers', value: 'wireless_speakers', category: 'technology' },
  { name: 'Home Theater', value: 'home_theater', category: 'technology' },
  
  // SERVICES
  { name: 'Housekeeping', value: 'housekeeping', category: 'services' },
  { name: 'Laundry Service', value: 'laundry_service', category: 'services' },
  { name: 'Dry Cleaning Service', value: 'dry_cleaning', category: 'services' },
  { name: 'Room Service', value: 'room_service', category: 'services' },
  { name: 'Catering Service', value: 'catering', category: 'services' },
  { name: 'Grocery Delivery', value: 'grocery_delivery', category: 'services' },
  { name: 'Package Delivery', value: 'package_delivery', category: 'services' },
  { name: 'Mail Service', value: 'mail_service', category: 'services' },
  { name: 'Childcare', value: 'childcare', category: 'services' },
  { name: 'Pet Care', value: 'pet_care', category: 'services' },
  { name: 'Car Wash', value: 'car_wash', category: 'services' },
  { name: 'Airport Shuttle', value: 'airport_shuttle', category: 'services' },
  { name: 'Limousine Service', value: 'limousine', category: 'services' },
  { name: 'Maintenance Staff', value: 'maintenance', category: 'services' },
  { name: 'Technical Support', value: 'tech_support', category: 'services' },
  
  // ACCESSIBILITY
  { name: 'Wheelchair Friendly', value: 'wheelchair_friendly', category: 'accessibility' },
  { name: 'Step-Free Access', value: 'step_free', category: 'accessibility' },
  { name: 'Accessible Bathroom', value: 'accessible_bathroom', category: 'accessibility' },
  { name: 'Accessible Kitchen', value: 'accessible_kitchen', category: 'accessibility' },
  { name: 'Grab Rails', value: 'grab_rails', category: 'accessibility' },
  { name: 'Visual Aids', value: 'visual_aids', category: 'accessibility' },
  { name: 'Hearing Aids', value: 'hearing_aids', category: 'accessibility' },
  { name: 'Braille Signage', value: 'braille', category: 'accessibility' },
  { name: 'Service Animal Friendly', value: 'service_animal', category: 'accessibility' },
  
  // VIEWS
  { name: 'Sea View', value: 'sea_view', category: 'views' },
  { name: 'Ocean View', value: 'ocean_view', category: 'views' },
  { name: 'Lake View', value: 'lake_view', category: 'views' },
  { name: 'River View', value: 'river_view', category: 'views' },
  { name: 'Mountain View', value: 'mountain_view', category: 'views' },
  { name: 'City View', value: 'city_view', category: 'views' },
  { name: 'Skyline View', value: 'skyline_view', category: 'views' },
  { name: 'Garden View', value: 'garden_view', category: 'views' },
  { name: 'Park View', value: 'park_view', category: 'views' },
  { name: 'Golf Course View', value: 'golf_view', category: 'views' },
  { name: 'Desert View', value: 'desert_view', category: 'views' },
  { name: 'Panoramic View', value: 'panoramic_view', category: 'views' },
  { name: 'Landmark View', value: 'landmark_view', category: 'views' },
  { name: 'Burj Khalifa View', value: 'burj_khalifa_view', category: 'views' },
  { name: 'Palm View', value: 'palm_view', category: 'views' },
  
  // KITCHEN FEATURES
  { name: 'Fully Equipped Kitchen', value: 'equipped_kitchen', category: 'kitchen' },
  { name: 'Open Kitchen', value: 'open_kitchen', category: 'kitchen' },
  { name: 'Separate Kitchen', value: 'separate_kitchen', category: 'kitchen' },
  { name: 'Island Kitchen', value: 'island_kitchen', category: 'kitchen' },
  { name: 'Breakfast Bar', value: 'breakfast_bar', category: 'kitchen' },
  { name: 'Granite Countertops', value: 'granite_countertops', category: 'kitchen' },
  { name: 'Marble Countertops', value: 'marble_countertops', category: 'kitchen' },
  { name: 'Quartz Countertops', value: 'quartz_countertops', category: 'kitchen' },
  { name: 'Stainless Steel Appliances', value: 'stainless_steel', category: 'kitchen' },
  { name: 'Dishwasher', value: 'dishwasher', category: 'kitchen' },
  { name: 'Microwave', value: 'microwave', category: 'kitchen' },
  { name: 'Oven', value: 'oven', category: 'kitchen' },
  { name: 'Gas Stove', value: 'gas_stove', category: 'kitchen' },
  { name: 'Electric Stove', value: 'electric_stove', category: 'kitchen' },
  { name: 'Induction Stove', value: 'induction_stove', category: 'kitchen' },
  { name: 'Range Hood', value: 'range_hood', category: 'kitchen' },
  { name: 'Refrigerator', value: 'refrigerator', category: 'kitchen' },
  { name: 'Double-Door Refrigerator', value: 'double_door_fridge', category: 'kitchen' },
  { name: 'Wine Refrigerator', value: 'wine_fridge', category: 'kitchen' },
  { name: 'Coffee Machine', value: 'coffee_machine', category: 'kitchen' },
  { name: 'Pantry', value: 'pantry', category: 'kitchen' },
  { name: 'Storage Cabinets', value: 'storage_cabinets', category: 'kitchen' },
  { name: 'Garbage Disposal', value: 'garbage_disposal', category: 'kitchen' },
  
  // BATHROOM FEATURES
  { name: 'En-Suite Bathroom', value: 'en_suite', category: 'bathroom' },
  { name: 'Master Bathroom', value: 'master_bathroom', category: 'bathroom' },
  { name: 'Guest Bathroom', value: 'guest_bathroom', category: 'bathroom' },
  { name: 'Powder Room', value: 'powder_room', category: 'bathroom' },
  { name: 'Bathtub', value: 'bathtub', category: 'bathroom' },
  { name: 'Jacuzzi Tub', value: 'jacuzzi_tub', category: 'bathroom' },
  { name: 'Rain Shower', value: 'rain_shower', category: 'bathroom' },
  { name: 'Walk-in Shower', value: 'walk_in_shower', category: 'bathroom' },
  { name: 'Glass Shower', value: 'glass_shower', category: 'bathroom' },
  { name: 'Steam Shower', value: 'steam_shower', category: 'bathroom' },
  { name: 'Double Sink', value: 'double_sink', category: 'bathroom' },
  { name: 'Heated Floors', value: 'heated_floors', category: 'bathroom' },
  { name: 'Heated Towel Racks', value: 'heated_towel_racks', category: 'bathroom' },
  { name: 'Bidet', value: 'bidet', category: 'bathroom' },
  { name: 'Smart Toilet', value: 'smart_toilet', category: 'bathroom' },
  { name: 'Toilet with Washlet', value: 'washlet', category: 'bathroom' },
  { name: 'Marble Finishes', value: 'marble_finishes', category: 'bathroom' },
  { name: 'Vanity', value: 'vanity', category: 'bathroom' },
  { name: 'Storage Cabinet', value: 'bathroom_storage', category: 'bathroom' },
  
  // BEDROOM FEATURES
  { name: 'Master Bedroom', value: 'master_bedroom', category: 'bedroom' },
  { name: 'Walk-in Wardrobe', value: 'walk_in_wardrobe', category: 'bedroom' },
  { name: 'Built-in Closet', value: 'built_in_closet', category: 'bedroom' },
  { name: 'En-Suite Bedroom', value: 'en_suite_bedroom', category: 'bedroom' },
  { name: 'King Size Bed', value: 'king_bed', category: 'bedroom' },
  { name: 'Queen Size Bed', value: 'queen_bed', category: 'bedroom' },
  { name: 'Twin Beds', value: 'twin_beds', category: 'bedroom' },
  { name: 'Blackout Curtains', value: 'blackout_curtains', category: 'bedroom' },
  { name: 'Dressing Table', value: 'dressing_table', category: 'bedroom' },
  { name: 'Study Desk', value: 'study_desk', category: 'bedroom' },
  { name: 'Reading Nook', value: 'reading_nook', category: 'bedroom' },
  { name: 'TV in Bedroom', value: 'tv_bedroom', category: 'bedroom' },
  { name: 'Private Balcony', value: 'private_balcony', category: 'bedroom' },
  
  // UTILITIES
  { name: 'Central Water Heating', value: 'central_water_heating', category: 'utilities' },
  { name: 'Individual Water Heating', value: 'individual_water_heating', category: 'utilities' },
  { name: 'Gas Supply', value: 'gas_supply', category: 'utilities' },
  { name: 'District Cooling', value: 'district_cooling', category: 'utilities' },
  { name: 'Water Tank', value: 'water_tank', category: 'utilities' },
  { name: 'Backup Generator', value: 'backup_generator', category: 'utilities' },
  { name: 'Backup Water Supply', value: 'backup_water', category: 'utilities' },
  { name: 'Sewage System', value: 'sewage_system', category: 'utilities' },
  { name: 'Septic Tank', value: 'septic_tank', category: 'utilities' },
  { name: 'Water Filter System', value: 'water_filter', category: 'utilities' },
  { name: 'Rainwater Harvesting', value: 'rainwater_harvesting', category: 'utilities' },
  { name: 'Ventilation System', value: 'ventilation', category: 'utilities' },
  { name: 'Air Purifier', value: 'air_purifier', category: 'utilities' },
  { name: 'Dehumidifier', value: 'dehumidifier', category: 'utilities' },
  
  // TRANSPORTATION
  { name: 'Public Transportation', value: 'public_transport', category: 'transportation' },
  { name: 'Metro Station', value: 'metro_station', category: 'transportation' },
  { name: 'Bus Station', value: 'bus_station', category: 'transportation' },
  { name: 'Tram Station', value: 'tram_station', category: 'transportation' },
  { name: 'Ferry Terminal', value: 'ferry_terminal', category: 'transportation' },
  { name: 'Taxi Stand', value: 'taxi_stand', category: 'transportation' },
  { name: 'Rideshare Access', value: 'rideshare', category: 'transportation' },
  { name: 'Bike Sharing', value: 'bike_sharing', category: 'transportation' },
  { name: 'Car Sharing', value: 'car_sharing', category: 'transportation' },
  { name: 'Shuttle Service', value: 'shuttle', category: 'transportation' },
  { name: 'School Bus Service', value: 'school_bus', category: 'transportation' },
  { name: 'Community Transport', value: 'community_transport', category: 'transportation' },
  
  // NEARBY AMENITIES
  { name: 'Shopping Mall', value: 'shopping_mall', category: 'nearby' },
  { name: 'Supermarket', value: 'supermarket', category: 'nearby' },
  { name: 'Restaurants', value: 'restaurants', category: 'nearby' },
  { name: 'Cafes', value: 'cafes', category: 'nearby' },
  { name: 'Schools', value: 'schools', category: 'nearby' },
  { name: 'Universities', value: 'universities', category: 'nearby' },
  { name: 'Hospitals', value: 'hospitals', category: 'nearby' },
  { name: 'Clinics', value: 'clinics', category: 'nearby' },
  { name: 'Pharmacies', value: 'pharmacies', category: 'nearby' },
  { name: 'Parks', value: 'parks', category: 'nearby' },
  { name: 'Beaches', value: 'beaches', category: 'nearby' },
  { name: 'Nightlife', value: 'nightlife', category: 'nearby' },
  { name: 'Movie Theater', value: 'movie_theater', category: 'nearby' },
  { name: 'Religious Facilities', value: 'religious_facilities', category: 'nearby' },
  { name: 'Sports Complex', value: 'sports_complex', category: 'nearby' },
  { name: 'Childcare Facilities', value: 'childcare_facilities', category: 'nearby' },
  { name: 'Pet Facilities', value: 'pet_facilities', category: 'nearby' },
  { name: 'Banks', value: 'banks', category: 'nearby' },
  { name: 'Post Office', value: 'post_office', category: 'nearby' },
  { name: 'Business Center', value: 'business_center', category: 'nearby' },
  { name: 'Conference Facilities', value: 'conference_facilities', category: 'nearby' },
  { name: 'Tourist Attractions', value: 'tourist_attractions', category: 'nearby' },
  { name: 'Cultural Venues', value: 'cultural_venues', category: 'nearby' },
];

// Function to get amenities by category
export function getAmenitiesByCategory(category: string): Amenity[] {
  return ALL_AMENITIES.filter(amenity => amenity.category === category);
}

// Function to find an amenity by value
export function findAmenityByValue(value: string): Amenity | undefined {
  return ALL_AMENITIES.find(amenity => getValueString(amenity.value) === value);
}

// Function to filter amenities by search term
export function searchAmenities(searchTerm: string): Amenity[] {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return ALL_AMENITIES.filter(amenity => {
    const valueString = getValueString(amenity.value);
    
    return amenity.name.toLowerCase().includes(lowerSearchTerm) || 
      valueString.toLowerCase().includes(lowerSearchTerm) ||
      (amenity.description && amenity.description.toLowerCase().includes(lowerSearchTerm));
  });
}
