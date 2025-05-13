'use client';

import { useEffect, useState } from 'react';
import { RMap, ROSM, RLayerVector, RFeature, RStyle, ROverlay, RControl } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { BusLocation } from '@/types/bus';
import 'ol/ol.css';
import 'rlayers/control/layers.css';

interface ClientMapProps {
  busLocations: BusLocation[];
  center: [number, number];
  zoom: number;
}

function MapComponent({ busLocations, center, zoom }: ClientMapProps) {
  return (
    <div className="map-container" style={{ width: '100%', height: '100%' }}>
      <RMap
        width="100%"
        height="100%"
        initial={{ center: fromLonLat(center), zoom }}
        className="map"
      >
        <ROSM />
        <RControl.RScaleLine />
        <RControl.RZoom />
        <RControl.RFullScreen />
        <RLayerVector>
          {busLocations.map((bus) => (
            <RFeature
              key={bus.id}
              geometry={new Point(fromLonLat([bus.longitude, bus.latitude]))}
            >
              <RStyle>
                <ROverlay>
                  <div className="bus-marker">
                    <span className="bus-number">{bus.routeNumber}</span>
                  </div>
                </ROverlay>
              </RStyle>
            </RFeature>
          ))}
        </RLayerVector>
      </RMap>
    </div>
  );
}

export default function ClientMap(props: ClientMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="map-container" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading map...</div>
      </div>
    );
  }

  return <MapComponent {...props} />;
} 