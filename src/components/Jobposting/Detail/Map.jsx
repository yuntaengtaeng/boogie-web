import React, { useEffect } from 'react';

const Map = ({ style, marker }) => {
  useEffect(() => {
    const { lat, lng } = marker;

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    if (!!marker) {
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [marker]);

  return <div id="map" style={style}></div>;
};

export default Map;
