/* eslint-disable*/
export const displayMap = location => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FyYWhsYWNoaWhlYiIsImEiOiJja2w2ZWh0dm8wb2l5MnNxcDA0dmVmdXAzIn0.ePp523YmpadLfoKg1Nl7kw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sarahlachiheb/ckl6f4x8p50u417mv06bb1wqg',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: true,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });

  map.addControl(new mapboxgl.NavigationControl());
};
