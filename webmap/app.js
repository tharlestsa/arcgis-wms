const map = L.map("map").setView([-15.721751, -48.0073979], 12);
const wmsUrl = "https://portal1.snirh.gov.br/ana/services/SFI/CAR_LimitePropriedade_mar2023/MapServer/WMSServer";

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
}).addTo(map);

const wmsLayer = L.tileLayer.wms(wmsUrl, {
    dpiMode: 7,
    format: 'image/png',
    layers: 0,
    styles: 'default'
}).addTo(map);

const getFeatureInfoUrl = (latlng) => {
    const point = map.latLngToContainerPoint(latlng, map.getZoom());
    const size = map.getSize();
        
    let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: 'default',
        transparent: false,
        version: '1.1.1',      
        format: 'image/png',
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        query_layers: 0,
        info_format: 'application/geo+json'
    };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
    return wmsUrl + L.Util.getParamString(params, wmsUrl, true);
}

function getFeatureInfo(e) {
  const url = getFeatureInfoUrl(e.latlng);
  if (!url) return;

  axios.post(`http://wms.arcgis:8080/proxy`, {"url": url}, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (response) {
    data = response.data
    let features = data.features;

    if (features.length > 0) {
      let content = `<h4>${features[0].layerName.toUpperCase()}</h4>`;

      features.forEach((feature) => {
        for (const property in feature.properties) {
            content += `<p>${property.toUpperCase()}: <b>${feature.properties[property]}</b></p>`;
        }
      });

      L.popup({maxWidth: 1000})
        .setLatLng(e.latlng)
        .setContent(content)
        .openOn(map);
    }
  })
  .catch(console.error)
}

map.on("click", getFeatureInfo);