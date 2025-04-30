import React from 'react';
import { 
  CircleDot, 
  Building, 
  User, 
  Hotel, 
  Car, 
  Package, 
  Warehouse,
  Fan, 
  Thermometer, 
  Flame, 
  Bed, 
  Sofa, 
  ArrowBigUp,
  Waves, 
  Palmtree, 
  Shield, 
  Camera, 
  Lock,
  Dumbbell, 
  Sparkles, 
  Wifi, 
  Home as HomeIcon, 
  Mountain,
  Building2, 
  UtensilsCrossed, 
  Bath
} from 'lucide-react';

export interface Amenity {
  name: string;
  value: string;
  category: string;
  icon: string; // Icon name as string
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

// Comprehensive list of over 200 amenities organized by category
export const ALL_AMENITIES: Amenity[] = [
  // BUILDING FEATURES
  { name: 'Elevator', value: 'elevator', category: 'building', icon: 'Elevator' },
  { name: 'Concierge', value: 'concierge', category: 'building', icon: 'UserRound' },
  { name: 'Doorman', value: 'doorman', category: 'building', icon: 'DoorOpen' },
  { name: 'Lobby', value: 'lobby', category: 'building', icon: 'Hotel' },
  { name: 'Parking', value: 'parking', category: 'building', icon: 'Car' },
  { name: 'Garage', value: 'garage', category: 'building', icon: 'Warehouse' },
  { name: 'Valet Parking', value: 'valet_parking', category: 'building', icon: 'CarFront' },
  { name: 'Storage', value: 'storage', category: 'building', icon: 'Package' },
  { name: 'Building Manager', value: 'building_manager', category: 'building', icon: 'UserCog' },
  { name: 'Mailroom', value: 'mailroom', category: 'building', icon: 'Mail' },
  { name: 'Package Room', value: 'package_room', category: 'building', icon: 'PackageOpen' },
  { name: 'Wheelchair Access', value: 'wheelchair_access', category: 'building', icon: 'Wheelchair' },
  { name: 'Bike Storage', value: 'bike_storage', category: 'building', icon: 'Bike' },
  { name: 'Waste Disposal', value: 'waste_disposal', category: 'building', icon: 'Trash2' },
  { name: 'Recycling Facilities', value: 'recycling', category: 'building', icon: 'Recycle' },
  
  // INTERIOR FEATURES
  { name: 'Air Conditioning', value: 'air_conditioning', category: 'interior', icon: 'Fan' },
  { name: 'Central Heating', value: 'central_heating', category: 'interior', icon: 'Thermometer' },
  { name: 'Fireplace', value: 'fireplace', category: 'interior', icon: 'Flame' },
  { name: 'High Ceilings', value: 'high_ceilings', category: 'interior', icon: 'ArrowBigUp' },
  { name: 'Hardwood Floors', value: 'hardwood_floors', category: 'interior', icon: 'Square' },
  { name: 'Marble Floors', value: 'marble_floors', category: 'interior', icon: 'Square' },
  { name: 'Tiled Floors', value: 'tiled_floors', category: 'interior', icon: 'SquarePattern' },
  { name: 'Carpet Floors', value: 'carpet_floors', category: 'interior', icon: 'Rug' },
  { name: 'Walk-in Closet', value: 'walk_in_closet', category: 'interior', icon: 'Shirt' },
  { name: 'Storage Space', value: 'storage_space', category: 'interior', icon: 'Archive' },
  { name: 'Furnished', value: 'furnished', category: 'interior', icon: 'Sofa' },
  { name: 'Semi-Furnished', value: 'semi_furnished', category: 'interior', icon: 'Armchair' },
  { name: 'Unfurnished', value: 'unfurnished', category: 'interior', icon: 'LayoutGrid' },
  { name: 'Built-in Wardrobes', value: 'built_in_wardrobes', category: 'interior', icon: 'BookOpen' },
  { name: 'Double-Glazed Windows', value: 'double_glazed_windows', category: 'interior', icon: 'WindowMaximize' },
  { name: 'Sound Insulation', value: 'sound_insulation', category: 'interior', icon: 'VolumeX' },
  { name: 'Thermal Insulation', value: 'thermal_insulation', category: 'interior', icon: 'Snowflake' },
  { name: 'Laundry Room', value: 'laundry_room', category: 'interior', icon: 'Shirt' },
  { name: 'Ceiling Fan', value: 'ceiling_fan', category: 'interior', icon: 'Fan' },
  { name: 'Crown Molding', value: 'crown_molding', category: 'interior', icon: 'Frame' },
  { name: 'Recessed Lighting', value: 'recessed_lighting', category: 'interior', icon: 'Lightbulb' },
  
  // OUTDOOR FEATURES
  { name: 'Swimming Pool', value: 'swimming_pool', category: 'outdoor', icon: 'Pool' },
  { name: 'Private Pool', value: 'private_pool', category: 'outdoor', icon: 'Pool' },
  { name: 'Shared Pool', value: 'shared_pool', category: 'outdoor', icon: 'Pool' },
  { name: 'Infinity Pool', value: 'infinity_pool', category: 'outdoor', icon: 'Pool' },
  { name: 'Garden', value: 'garden', category: 'outdoor', icon: 'Flower2' },
  { name: 'Private Garden', value: 'private_garden', category: 'outdoor', icon: 'PalmTree' },
  { name: 'Communal Garden', value: 'communal_garden', category: 'outdoor', icon: 'Trees' },
  { name: 'Balcony', value: 'balcony', category: 'outdoor', icon: 'PanelTop' },
  { name: 'Terrace', value: 'terrace', category: 'outdoor', icon: 'Panel' },
  { name: 'Patio', value: 'patio', category: 'outdoor', icon: 'Panel' },
  { name: 'Deck', value: 'deck', category: 'outdoor', icon: 'Panel' },
  { name: 'BBQ Area', value: 'bbq_area', category: 'outdoor', icon: 'UtensilsCrossed' },
  { name: 'Outdoor Kitchen', value: 'outdoor_kitchen', category: 'outdoor', icon: 'UtensilsCrossed' },
  { name: 'Outdoor Dining', value: 'outdoor_dining', category: 'outdoor', icon: 'UtensilsCrossed' },
  { name: 'Fire Pit', value: 'fire_pit', category: 'outdoor', icon: 'Flame' },
  { name: 'Jacuzzi', value: 'jacuzzi', category: 'outdoor', icon: 'Bath' },
  { name: 'Hot Tub', value: 'hot_tub', category: 'outdoor', icon: 'Bath' },
  { name: 'Sauna', value: 'sauna', category: 'outdoor', icon: 'Thermometer' },
  { name: 'Steam Room', value: 'steam_room', category: 'outdoor', icon: 'Cloud' },
  { name: 'Children Play Area', value: 'playground', category: 'outdoor', icon: 'Baby' },
  { name: 'Pet Area', value: 'pet_area', category: 'outdoor', icon: 'Cat' },
  { name: 'Gazebo', value: 'gazebo', category: 'outdoor', icon: 'Tent' },
  { name: 'Pergola', value: 'pergola', category: 'outdoor', icon: 'Tent' },
  { name: 'Water Feature', value: 'water_feature', category: 'outdoor', icon: 'Droplets' },
  { name: 'Pond', value: 'pond', category: 'outdoor', icon: 'Drop' },
  { name: 'Fountain', value: 'fountain', category: 'outdoor', icon: 'Droplets' },
  
  // SECURITY FEATURES
  { name: '24/7 Security', value: 'security_24_7', category: 'security', icon: 'Shield' },
  { name: 'Gated Community', value: 'gated_community', category: 'security', icon: 'Gate' },
  { name: 'Security Guard', value: 'security_guard', category: 'security', icon: 'ShieldAlert' },
  { name: 'CCTV', value: 'cctv', category: 'security', icon: 'Camera' },
  { name: 'Video Intercom', value: 'video_intercom', category: 'security', icon: 'Video' },
  { name: 'Intercom', value: 'intercom', category: 'security', icon: 'MessageSquare' },
  { name: 'Alarm System', value: 'alarm_system', category: 'security', icon: 'Bell' },
  { name: 'Smart Locks', value: 'smart_locks', category: 'security', icon: 'Lock' },
  { name: 'Biometric Access', value: 'biometric_access', category: 'security', icon: 'Fingerprint' },
  { name: 'Key Card Access', value: 'key_card_access', category: 'security', icon: 'CreditCard' },
  { name: 'Secure Parking', value: 'secure_parking', category: 'security', icon: 'Car' },
  { name: 'Fire Safety System', value: 'fire_safety', category: 'security', icon: 'Flame' },
  { name: 'Panic Button', value: 'panic_button', category: 'security', icon: 'AlertCircle' },
  { name: 'Emergency Response', value: 'emergency_response', category: 'security', icon: 'Siren' },
  { name: 'Safe', value: 'safe', category: 'security', icon: 'KeySquare' },
  
  // WELLNESS & RECREATION
  { name: 'Gym', value: 'gym', category: 'wellness', icon: 'Dumbbell' },
  { name: 'Fitness Center', value: 'fitness_center', category: 'wellness', icon: 'Dumbbell' },
  { name: 'Yoga Studio', value: 'yoga_studio', category: 'wellness', icon: 'UserCircle' },
  { name: 'Pilates Studio', value: 'pilates_studio', category: 'wellness', icon: 'UserCircle' },
  { name: 'Spa', value: 'spa', category: 'wellness', icon: 'Sparkles' },
  { name: 'Massage Room', value: 'massage_room', category: 'wellness', icon: 'Bed' },
  { name: 'Meditation Room', value: 'meditation_room', category: 'wellness', icon: 'Lotus' },
  { name: 'Tennis Court', value: 'tennis_court', category: 'wellness', icon: 'Racquet' },
  { name: 'Basketball Court', value: 'basketball_court', category: 'wellness', icon: 'Activity' },
  { name: 'Squash Court', value: 'squash_court', category: 'wellness', icon: 'Activity' },
  { name: 'Golf Course', value: 'golf_course', category: 'wellness', icon: 'Flag' },
  { name: 'Mini Golf', value: 'mini_golf', category: 'wellness', icon: 'Flag' },
  { name: 'Walking Track', value: 'walking_track', category: 'wellness', icon: 'Footprints' },
  { name: 'Jogging Track', value: 'jogging_track', category: 'wellness', icon: 'Footprints' },
  { name: 'Bike Path', value: 'bike_path', category: 'wellness', icon: 'Bike' },
  { name: 'Game Room', value: 'game_room', category: 'wellness', icon: 'Gamepad2' },
  { name: 'Billiards', value: 'billiards', category: 'wellness', icon: 'CircleDot' },
  { name: 'Table Tennis', value: 'table_tennis', category: 'wellness', icon: 'CircleDashed' },
  { name: 'Bowling Alley', value: 'bowling_alley', category: 'wellness', icon: 'CircleOff' },
  { name: 'Cinema Room', value: 'cinema_room', category: 'wellness', icon: 'Film' },
  { name: 'Library', value: 'library', category: 'wellness', icon: 'Library' },
  { name: 'Reading Room', value: 'reading_room', category: 'wellness', icon: 'BookOpen' },
  { name: 'Music Room', value: 'music_room', category: 'wellness', icon: 'Music' },
  { name: 'Art Studio', value: 'art_studio', category: 'wellness', icon: 'Palette' },
  
  // TECHNOLOGY
  { name: 'High-Speed Internet', value: 'high_speed_internet', category: 'technology', icon: 'Wifi' },
  { name: 'Fiber Optic Internet', value: 'fiber_optic', category: 'technology', icon: 'Zap' },
  { name: 'Smart Home System', value: 'smart_home', category: 'technology', icon: 'HomeIcon' },
  { name: 'Home Automation', value: 'home_automation', category: 'technology', icon: 'Power' },
  { name: 'Electric Vehicle Charging', value: 'ev_charging', category: 'technology', icon: 'BatteryCharging' },
  { name: 'Solar Panels', value: 'solar_panels', category: 'technology', icon: 'Sun' },
  { name: 'Energy Efficient', value: 'energy_efficient', category: 'technology', icon: 'Leaf' },
  { name: 'Smart Thermostat', value: 'smart_thermostat', category: 'technology', icon: 'Thermostat' },
  { name: 'Smart Lighting', value: 'smart_lighting', category: 'technology', icon: 'Lightbulb' },
  { name: 'Smart Blinds', value: 'smart_blinds', category: 'technology', icon: 'Blinds' },
  { name: 'Voice Control', value: 'voice_control', category: 'technology', icon: 'Mic' },
  { name: 'Video Doorbell', value: 'video_doorbell', category: 'technology', icon: 'BellRing' },
  { name: 'Satellite TV', value: 'satellite_tv', category: 'technology', icon: 'Tv' },
  { name: 'Cable TV', value: 'cable_tv', category: 'technology', icon: 'Tv' },
  { name: 'Surround Sound System', value: 'surround_sound', category: 'technology', icon: 'Radio' },
  { name: 'Wireless Speakers', value: 'wireless_speakers', category: 'technology', icon: 'Speaker' },
  { name: 'Home Theater', value: 'home_theater', category: 'technology', icon: 'Clapperboard' },
  
  // SERVICES
  { name: 'Housekeeping', value: 'housekeeping', category: 'services', icon: 'Brush' },
  { name: 'Laundry Service', value: 'laundry_service', category: 'services', icon: 'Shirt' },
  { name: 'Dry Cleaning Service', value: 'dry_cleaning', category: 'services', icon: 'Clothing' },
  { name: 'Room Service', value: 'room_service', category: 'services', icon: 'UtensilsCrossed' },
  { name: 'Catering Service', value: 'catering', category: 'services', icon: 'Utensils' },
  { name: 'Grocery Delivery', value: 'grocery_delivery', category: 'services', icon: 'ShoppingCart' },
  { name: 'Package Delivery', value: 'package_delivery', category: 'services', icon: 'Package' },
  { name: 'Mail Service', value: 'mail_service', category: 'services', icon: 'Mail' },
  { name: 'Childcare', value: 'childcare', category: 'services', icon: 'Baby' },
  { name: 'Pet Care', value: 'pet_care', category: 'services', icon: 'Dog' },
  { name: 'Car Wash', value: 'car_wash', category: 'services', icon: 'Car' },
  { name: 'Airport Shuttle', value: 'airport_shuttle', category: 'services', icon: 'Plane' },
  { name: 'Limousine Service', value: 'limousine', category: 'services', icon: 'Car' },
  { name: 'Maintenance Staff', value: 'maintenance', category: 'services', icon: 'Wrench' },
  { name: 'Technical Support', value: 'tech_support', category: 'services', icon: 'HeadsetHelp' },
  
  // ACCESSIBILITY
  { name: 'Wheelchair Friendly', value: 'wheelchair_friendly', category: 'accessibility', icon: 'Wheelchair' },
  { name: 'Step-Free Access', value: 'step_free', category: 'accessibility', icon: 'ArrowBigRightDash' },
  { name: 'Accessible Bathroom', value: 'accessible_bathroom', category: 'accessibility', icon: 'Bath' },
  { name: 'Accessible Kitchen', value: 'accessible_kitchen', category: 'accessibility', icon: 'UtensilsCrossed' },
  { name: 'Grab Rails', value: 'grab_rails', category: 'accessibility', icon: 'GripVertical' },
  { name: 'Visual Aids', value: 'visual_aids', category: 'accessibility', icon: 'Eye' },
  { name: 'Hearing Aids', value: 'hearing_aids', category: 'accessibility', icon: 'Ear' },
  { name: 'Braille Signage', value: 'braille', category: 'accessibility', icon: 'GanttChartSquare' },
  { name: 'Service Animal Friendly', value: 'service_animal', category: 'accessibility', icon: 'Paw' },
  
  // VIEWS
  { name: 'Sea View', value: 'sea_view', category: 'views', icon: 'Ship' },
  { name: 'Ocean View', value: 'ocean_view', category: 'views', icon: 'Waves' },
  { name: 'Lake View', value: 'lake_view', category: 'views', icon: 'Droplet' },
  { name: 'River View', value: 'river_view', category: 'views', icon: 'Waves' },
  { name: 'Mountain View', value: 'mountain_view', category: 'views', icon: 'Mountain' },
  { name: 'City View', value: 'city_view', category: 'views', icon: 'Building2' },
  { name: 'Skyline View', value: 'skyline_view', category: 'views', icon: 'Building' },
  { name: 'Garden View', value: 'garden_view', category: 'views', icon: 'Flower2' },
  { name: 'Park View', value: 'park_view', category: 'views', icon: 'Trees' },
  { name: 'Golf Course View', value: 'golf_view', category: 'views', icon: 'Flag' },
  { name: 'Desert View', value: 'desert_view', category: 'views', icon: 'Sunset' },
  { name: 'Panoramic View', value: 'panoramic_view', category: 'views', icon: 'PanelTop' },
  { name: 'Landmark View', value: 'landmark_view', category: 'views', icon: 'Landmark' },
  { name: 'Burj Khalifa View', value: 'burj_khalifa_view', category: 'views', icon: 'Building' },
  { name: 'Palm View', value: 'palm_view', category: 'views', icon: 'PalmTree' },
  
  // KITCHEN FEATURES
  { name: 'Fully Equipped Kitchen', value: 'equipped_kitchen', category: 'kitchen', icon: 'UtensilsCrossed' },
  { name: 'Open Kitchen', value: 'open_kitchen', category: 'kitchen', icon: 'RefrigeratorIcon' },
  { name: 'Breakfast Bar', value: 'breakfast_bar', category: 'kitchen', icon: 'Utensils' },
  { name: 'Kitchen Island', value: 'kitchen_island', category: 'kitchen', icon: 'Square' },
  { name: 'Walk-in Pantry', value: 'walk_in_pantry', category: 'kitchen', icon: 'Package' },
  { name: 'Butler Pantry', value: 'butlers_pantry', category: 'kitchen', icon: 'ChefHat' },
  { name: 'Wine Fridge', value: 'wine_fridge', category: 'kitchen', icon: 'Wine' },
  { name: 'Wine Cellar', value: 'wine_cellar', category: 'kitchen', icon: 'GlassWater' },
  { name: 'Granite Countertops', value: 'granite_countertops', category: 'kitchen', icon: 'Square' },
  { name: 'Marble Countertops', value: 'marble_countertops', category: 'kitchen', icon: 'Square' },
  { name: 'Quartz Countertops', value: 'quartz_countertops', category: 'kitchen', icon: 'Square' },
  { name: 'Stainless Steel Appliances', value: 'stainless_steel', category: 'kitchen', icon: 'RefrigeratorIcon' },
  { name: 'Gas Stove', value: 'gas_stove', category: 'kitchen', icon: 'Flame' },
  { name: 'Electric Stove', value: 'electric_stove', category: 'kitchen', icon: 'CircleOff' },
  { name: 'Induction Stove', value: 'induction_stove', category: 'kitchen', icon: 'Zap' },
  { name: 'Double Oven', value: 'double_oven', category: 'kitchen', icon: 'Square' },
  { name: 'Microwave', value: 'microwave', category: 'kitchen', icon: 'Sandwich' },
  { name: 'Dishwasher', value: 'dishwasher', category: 'kitchen', icon: 'Droplets' },
  { name: 'Garbage Disposal', value: 'garbage_disposal', category: 'kitchen', icon: 'Trash' },
  { name: 'Coffee Machine', value: 'coffee_machine', category: 'kitchen', icon: 'Coffee' },
  
  // BATHROOM FEATURES
  { name: 'En-suite Bathroom', value: 'ensuite', category: 'bathroom', icon: 'Bath' },
  { name: 'Guest Bathroom', value: 'guest_bathroom', category: 'bathroom', icon: 'User' },
  { name: 'Bathtub', value: 'bathtub', category: 'bathroom', icon: 'Bath' },
  { name: 'Jacuzzi Tub', value: 'jacuzzi_tub', category: 'bathroom', icon: 'Bath' },
  { name: 'Shower', value: 'shower', category: 'bathroom', icon: 'ShowerHead' },
  { name: 'Rain Shower', value: 'rain_shower', category: 'bathroom', icon: 'Cloud' },
  { name: 'Walk-in Shower', value: 'walk_in_shower', category: 'bathroom', icon: 'Door' },
  { name: 'Steam Shower', value: 'steam_shower', category: 'bathroom', icon: 'CloudFog' },
  { name: 'Double Vanity', value: 'double_vanity', category: 'bathroom', icon: 'PanelLeft' },
  { name: 'Heated Floors', value: 'heated_floors', category: 'bathroom', icon: 'Footprints' },
  { name: 'Heated Towel Rail', value: 'heated_towel_rail', category: 'bathroom', icon: 'Grip' },
  { name: 'Bidet', value: 'bidet', category: 'bathroom', icon: 'Bath' },
  { name: 'Smart Toilet', value: 'smart_toilet', category: 'bathroom', icon: 'Sparkles' },
  { name: 'Makeup Vanity', value: 'makeup_vanity', category: 'bathroom', icon: 'Lamp' },
  
  // BEDROOM FEATURES
  { name: 'Master Suite', value: 'master_suite', category: 'bedroom', icon: 'Bed' },
  { name: 'King Size Bed', value: 'king_bed', category: 'bedroom', icon: 'Bed' },
  { name: 'Queen Size Bed', value: 'queen_bed', category: 'bedroom', icon: 'Bed' },
  { name: 'Twin Beds', value: 'twin_beds', category: 'bedroom', icon: 'Bed' },
  { name: 'En-suite Bedroom', value: 'ensuite_bedroom', category: 'bedroom', icon: 'Bed' },
  { name: 'Dressing Room', value: 'dressing_room', category: 'bedroom', icon: 'Shirt' },
  { name: 'Built-in Closets', value: 'built_in_closets', category: 'bedroom', icon: 'AlignJustify' },
  { name: 'Blackout Curtains', value: 'blackout_curtains', category: 'bedroom', icon: 'Panel' },
  { name: 'Study Area', value: 'study_area', category: 'bedroom', icon: 'Pencil' },
  { name: 'Balcony Access', value: 'balcony_access', category: 'bedroom', icon: 'DoorOpen' },
  { name: 'TV', value: 'bedroom_tv', category: 'bedroom', icon: 'Tv' },
  { name: 'Reading Nook', value: 'reading_nook', category: 'bedroom', icon: 'BookOpen' },
  
  // UTILITIES
  { name: 'Central Water Heating', value: 'central_water_heating', category: 'utilities', icon: 'Droplet' },
  { name: 'Water Tank', value: 'water_tank', category: 'utilities', icon: 'Container' },
  { name: 'Water Purification System', value: 'water_purification', category: 'utilities', icon: 'Filter' },
  { name: 'Generator Backup', value: 'generator', category: 'utilities', icon: 'Zap' },
  { name: 'District Cooling', value: 'district_cooling', category: 'utilities', icon: 'Snowflake' },
  { name: 'Central Gas', value: 'central_gas', category: 'utilities', icon: 'Flame' },
  { name: 'Sewage Treatment', value: 'sewage_treatment', category: 'utilities', icon: 'Pipe' },
  { name: 'Water Well', value: 'water_well', category: 'utilities', icon: 'Flask' },
  { name: 'Septic Tank', value: 'septic_tank', category: 'utilities', icon: 'Container' },
  { name: 'Rainwater Harvesting', value: 'rainwater_harvesting', category: 'utilities', icon: 'CloudRain' },
  
  // TRANSPORTATION
  { name: 'Public Transportation', value: 'public_transport', category: 'transportation', icon: 'Bus' },
  { name: 'Metro Access', value: 'metro_access', category: 'transportation', icon: 'Train' },
  { name: 'Bus Stop', value: 'bus_stop', category: 'transportation', icon: 'Bus' },
  { name: 'Tram Stop', value: 'tram_stop', category: 'transportation', icon: 'Tram' },
  { name: 'Ferry Terminal', value: 'ferry', category: 'transportation', icon: 'Ship' },
  { name: 'Bicycle Friendly', value: 'bicycle_friendly', category: 'transportation', icon: 'Bike' },
  { name: 'Rideshare Pickup', value: 'rideshare', category: 'transportation', icon: 'Car' },
  { name: 'Airport Proximity', value: 'airport_proximity', category: 'transportation', icon: 'Plane' },
  { name: 'Helipad', value: 'helipad', category: 'transportation', icon: 'PlaneTakeoff' },
  
  // NEARBY
  { name: 'Shopping Mall', value: 'shopping_mall', category: 'nearby', icon: 'ShoppingBag' },
  { name: 'Supermarket', value: 'supermarket', category: 'nearby', icon: 'ShoppingCart' },
  { name: 'Pharmacy', value: 'pharmacy', category: 'nearby', icon: 'Pill' },
  { name: 'Hospital', value: 'hospital', category: 'nearby', icon: 'Stethoscope' },
  { name: 'Clinic', value: 'clinic', category: 'nearby', icon: 'HeartPulse' },
  { name: 'School', value: 'school', category: 'nearby', icon: 'GraduationCap' },
  { name: 'University', value: 'university', category: 'nearby', icon: 'Building' },
  { name: 'Daycare', value: 'daycare', category: 'nearby', icon: 'Baby' },
  { name: 'Restaurant', value: 'restaurant', category: 'nearby', icon: 'UtensilsCrossed' },
  { name: 'Café', value: 'cafe', category: 'nearby', icon: 'Coffee' },
  { name: 'Park', value: 'park', category: 'nearby', icon: 'Trees' },
  { name: 'Beach', value: 'beach', category: 'nearby', icon: 'Umbrella' },
  { name: 'Gym', value: 'nearby_gym', category: 'nearby', icon: 'Dumbbell' },
  { name: 'Spa', value: 'nearby_spa', category: 'nearby', icon: 'Sparkles' },
  { name: 'Bank', value: 'bank', category: 'nearby', icon: 'Landmark' },
  { name: 'ATM', value: 'atm', category: 'nearby', icon: 'CreditCard' },
  { name: 'Place of Worship', value: 'place_of_worship', category: 'nearby', icon: 'Church' },
  { name: 'Mosque', value: 'mosque', category: 'nearby', icon: 'Church' },
  { name: 'Church', value: 'church', category: 'nearby', icon: 'Church' },
  { name: 'Temple', value: 'temple', category: 'nearby', icon: 'Church' },
  { name: 'Synagogue', value: 'synagogue', category: 'nearby', icon: 'Church' },
  { name: 'Cinema', value: 'cinema', category: 'nearby', icon: 'Clapperboard' },
  { name: 'Theater', value: 'theater', category: 'nearby', icon: 'Theater' },
  { name: 'Museum', value: 'museum', category: 'nearby', icon: 'Landmark' },
  { name: 'Art Gallery', value: 'art_gallery', category: 'nearby', icon: 'Image' },
  { name: 'Nightclub', value: 'nightclub', category: 'nearby', icon: 'Music' },
  { name: 'Bar', value: 'bar', category: 'nearby', icon: 'Wine' },
  { name: 'Petrol Station', value: 'petrol_station', category: 'nearby', icon: 'Fuel' },
  { name: 'Police Station', value: 'police_station', category: 'nearby', icon: 'Shield' },
  { name: 'Fire Station', value: 'fire_station', category: 'nearby', icon: 'Flame' },
  { name: 'Post Office', value: 'post_office', category: 'nearby', icon: 'Mail' },
  { name: 'Vet', value: 'vet', category: 'nearby', icon: 'Dog' },
];

/**
 * Get an amenity by its value
 */
export function getAmenityByValue(value: string): Amenity | undefined {
  return ALL_AMENITIES.find(amenity => amenity.value === value);
}

/**
 * Get amenities by category
 */
export function getAmenitiesByCategory(category: string): Amenity[] {
  return ALL_AMENITIES.filter(amenity => amenity.category === category);
}

/**
 * Get icon name for an amenity value
 * Returns the icon name as a string which can be used with dynamic imports or icon libraries
 */
export function getAmenityIconName(amenityValue: string): string {
  // Map amenity values to icon names
  const iconMap: Record<string, string> = {
    // Building features
    'elevator': 'Building',
    'concierge': 'User',
    'doorman': 'User',
    'lobby': 'Building2',
    'parking': 'Car',
    'garage': 'Car',
    'valet_parking': 'Car',
    'secure_parking': 'Car',
    'storage': 'Package',
    'package_room': 'Package',
    'storage_space': 'Package',
    
    // Interior features
    'air_conditioning': 'Fan',
    'ceiling_fan': 'Fan',
    'central_heating': 'Thermometer',
    'fireplace': 'Flame',
    'furnished': 'Sofa',
    'semi_furnished': 'Sofa',
    
    // Outdoor features
    'swimming_pool': 'Waves',
    'private_pool': 'Waves',
    'shared_pool': 'Waves',
    'infinity_pool': 'Waves',
    'pool': 'Waves',
    'garden': 'Palmtree',
    'private_garden': 'Palmtree',
    'communal_garden': 'Palmtree',
    'balcony': 'ArrowBigUp',
    'terrace': 'ArrowBigUp',
    'patio': 'ArrowBigUp',
    'deck': 'ArrowBigUp',
    
    // Security features
    'security_24_7': 'Shield',
    'security_guard': 'Shield',
    'security': 'Shield',
    'cctv': 'Camera',
    'smart_locks': 'Lock',
    'key_card_access': 'Lock',
    
    // Wellness & Recreation
    'gym': 'Dumbbell',
    'fitness_center': 'Dumbbell',
    'spa': 'Sparkles',
    'massage_room': 'Sparkles',
    
    // Technology
    'high_speed_internet': 'Wifi',
    'fiber_optic': 'Wifi',
    'wifi': 'Wifi',
    'smart_home': 'Home',
    'home_automation': 'Home',
    
    // Views
    'sea_view': 'Waves',
    'ocean_view': 'Waves',
    'sea': 'Waves',
    'mountain_view': 'Mountain',
    'city_view': 'Building2',
    'city': 'Building2',
    
    // Kitchen and bathroom
    'modern_kitchen': 'UtensilsCrossed',
    'outdoor_kitchen': 'UtensilsCrossed',
    'kitchen': 'UtensilsCrossed',
    'equipped_kitchen': 'UtensilsCrossed',
    'jacuzzi': 'Bath',
    'hot_tub': 'Bath',
    'bathtub': 'Bath',
    'jacuzzi_tub': 'Bath',
  };
  
  // Return the icon name or default
  return iconMap[amenityValue] || 'CircleDot';
}

/**
 * Get a proper icon component for an amenity
 * This function uses dynamic mapping to return the appropriate icon component
 */
export function getAmenityIcon(amenityValue: string, className: string = 'h-5 w-5 text-[#D4AF37]'): React.ReactNode {
  // Get the icon name
  const iconName = getAmenityIconName(amenityValue);
  
  // Simple function to safely create icon elements
  const createIcon = (Component: React.ElementType) => React.createElement(Component, { className });
  
  // Map icon name to component - explicit mapping to avoid runtime errors
  switch (iconName) {
    case 'Building': return createIcon(Building);
    case 'User': return createIcon(User);
    case 'Building2': return createIcon(Building2);
    case 'Car': return createIcon(Car);
    case 'Package': return createIcon(Package);
    case 'Fan': return createIcon(Fan);
    case 'Thermometer': return createIcon(Thermometer);
    case 'Flame': return createIcon(Flame);
    case 'Sofa': return createIcon(Sofa);
    case 'Waves': return createIcon(Waves);
    case 'Palmtree': return createIcon(Palmtree);
    case 'ArrowBigUp': return createIcon(ArrowBigUp);
    case 'Shield': return createIcon(Shield);
    case 'Camera': return createIcon(Camera);
    case 'Lock': return createIcon(Lock);
    case 'Dumbbell': return createIcon(Dumbbell);
    case 'Sparkles': return createIcon(Sparkles);
    case 'Wifi': return createIcon(Wifi);
    case 'Home': return createIcon(HomeIcon);
    case 'Mountain': return createIcon(Mountain);
    case 'UtensilsCrossed': return createIcon(UtensilsCrossed);
    case 'Bath': return createIcon(Bath);
    default: return createIcon(CircleDot);
  }
}