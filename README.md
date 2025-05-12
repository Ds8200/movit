# Movit - Real-Time Bus Tracker

A Next.js 14 application that visualizes real-time bus locations in Israel on an interactive map using `rlayers` (React OpenLayers wrapper), leveraging the Open Bus Stride API.

## Features

- View all buses in real-time on a map
- Click a bus marker to display its route details
- Find the nearest bus stop using geolocation
- Calculate the best route to a specified destination
- Visualize bus routes, stops, and real-time positions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Map Library**: `rlayers` with OpenStreetMap tiles
- **State Management**: Jotai
- **Styling**: SCSS modules
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movit.git
   cd movit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with global SCSS
│   ├── page.tsx            # Main page with map and UI
│   ├── api/                # Next.js API routes for proxying Stride API
├── components/
│   ├── MapView/            # Map component with bus markers
│   ├── BusDetails/         # Sidebar for bus stops and times
│   ├── SearchRoute/        # Input for destination and route planning
│   ├── RouteResults/       # Panel for route details
├── store/
│   ├── atoms.ts            # Jotai atoms for state management
│   ├── selectors.ts        # Derived state selectors
├── types/
│   ├── api.ts              # API response types
│   ├── map.ts              # Map-related types
├── constants/
│   ├── index.ts            # API URLs and constants
├── styles/
│   ├── globals.scss        # Global styles and theme
```

## API Integration

The app uses the Open Bus Stride API endpoints:
- `/siri_vehicle_locations/list`: Real-time bus positions
- `/route_timetable/list`: Scheduled stop times
- `/gtfs_stops/list`: Stop details
- `/gtfs_routes/list`: Route details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Open Bus Stride API](https://github.com/hasadna/open-bus-pipelines/blob/main/STRIDE.md)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [rlayers](https://github.com/mmomtchev/rlayers)
