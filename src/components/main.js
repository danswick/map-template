import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './map-conatainer';
import ControlTextarea from '@mapbox/mr-ui/control-textarea';
import ControlSelect from '@mapbox/mr-ui/control-select';
import ControlSwitch from '@mapbox/mr-ui/control-switch';
import ControlCheckboxSet from '@mapbox/mr-ui/control-checkbox-set';
import _ from 'lodash';
import Button from '@mapbox/mr-ui/button';
import remark from 'remark';
import reactRenderer from 'remark-react';
import { stringify } from 'querystring';
import { printMap } from '../util/print-map';
import schoolsGeoJSON from '../../data/sfusd_school_pt.wgs84.json';
import MapLegend from './map-legend';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.layerIds = [
      'Bikeways',
      'SFMTA metro routes',
      'SFMTA bus routes',
      'SFUSD School Lands',
      'School Speed Zones',
      'Suggested walking distance'
    ];

    this.state = {
      docTitleText: '<pick a school>',
      styleUrl:
        'mapbox://styles/safe-routes-to-school/cjxc315vp53xs1cl4m5qi3y31',
      zoom: 11.35,
      center: [-122.4345, 37.7802],
      showTransitLayers: true,
      showBikeLayers: true,
      showWalkingIsochrone: true,
      formData: {
        zoom: '14',
        center: '-122.41918,37.77483',
        school: 20
      }
    };
  }

  componentWillMount() {
    this.schoolsList = schoolsGeoJSON.features.map((s, i) => {
      return {
        label: s.properties.facility_name,
        value: i
      };
    });
    this.schoolsList.sort((a, b) => {
      if (a.label < b.label) return -1;
      else if (a.label > b.label) return 1;
      else return 0;
    });
  }
  toReactDOM(markdown) {
    return remark()
      .use(reactRenderer)
      .processSync(markdown).contents;
  }

  onChangeText = val => {
    this.setState({
      docBodyText: val
    });
  };

  onChangeTitle = val => {
    this.setState({
      docTitleText: val
    });
  };

  onChangeStyle = val => {
    this.setState({
      styleUrl: val
    });
    this.updateMapFromForm();
    this.renderMap();
  };

  onChangeZoom = val => {
    const updatedFormData = _.set(this.state.formData, 'zoom', val);

    this.setState({
      formData: updatedFormData
    });
  };

  onChangeSchool = val => {
    const schoolFeature = schoolsGeoJSON.features[val];
    let updatedFormData = _.set(
      this.state.formData,
      'center',
      schoolFeature.geometry.coordinates
    );
    updatedFormData = _.set(this.state.formData, 'school', val);
    updatedFormData = _.set(this.state.formData, 'zoom', '14');
    this.setState({
      formData: updatedFormData,
      center: schoolFeature.geometry.coordinates,
      zoom: 15,
      docTitleText: schoolFeature.properties.facility_name
    });
  };

  onToggleBikeLayers = val => {
    const bikeLayers = ['Bikeways', 'Bikeshare Stations'];
    this.setState({ showBikeLayers: val });
    bikeLayers.forEach(layer => {
      this.state.mapObj.setLayoutProperty(
        layer,
        'visibility',
        val ? 'visible' : 'none'
      );
    });
  };

  onToggleTransitLayers = val => {
    const transitLayers = [
      'SFMTA route labels',
      'BART stations',
      'SFMTA stops',
      'SFMTA metro routes',
      'SFMTA bus routes',
    ];
    this.setState({ showTransitLayers: val });
    transitLayers.forEach(layer => {
      this.state.mapObj.setLayoutProperty(
        layer,
        'visibility',
        val ? 'visible' : 'none'
      );
    });
  };

  onToggleWalkingIsochrone = val => {
    this.setState({ showWalkingIsochrone: val });
  };
  updateMapFromForm = () => {
    const latLon = this.state.formData.center.split(',');
    this.setState({
      center: [latLon[0].trim(), latLon[1].trim()]
    });
    this.setState({
      zoom: parseInt(this.state.formData.zoom) || this.state.zoom
    });
  };

  updateFromMap = (center, zoom) => {
    const updatedWithCenter = _.set(this.state.formData, 'center', `${center}`);
    const updatedWithZoom = _.set(this.state.formData, 'zoom', zoom);
    this.setState({
      formData: updatedWithZoom
    });
  };

  getHash = () => {
    const hashArr = window.location.hash.split('/');
    return {
      zoom: hashArr[0],
      lon: hashArr[1],
      lat: hashArr[2]
    };
  };

  updateZoomAndCenter = () => {
    const vals = getHash();
    this.setState({
      zoom: vals.zoom,
      center: [vals.lon, vals.lat]
    });
  };

  returnMap = map => {
    this.setState({ mapObj: map });
    this.renderLegend(this.layerIds);
  };

  renderMap = () => {
    return (
      <MapContainer
        center={this.state.center}
        zoom={this.state.zoom}
        hasIsochrone={this.state.showWalkingIsochrone}
        styleUrl={this.state.styleUrl}
        onMove={this.updateFromMap}
        mapDivId="map"
        returnMap={this.returnMap}
      />
    );
  };

  renderLegend = layerIds => {
    const layerObj = layerIds.map(layerId => {
      const layer = this.state.mapObj.getLayer(layerId);
      return {
        layerId: layerId,
        layerType: layer.type,
        layerColor: layer.type.symbol
          ? '#fff'
          : this.state.mapObj.getPaintProperty(layerId, `${layer.type}-color`)
      };
    });
    const legendComp = <MapLegend layers={layerObj} mapLegendId="map-legend" />;
    this.setState({ legendComponent: legendComp });
  };

  exportMap = () => {
    printMap({ map: this.state.mapObj, filename: this.state.docTitleText });
  };

  render() {
    const { props, state } = this;
    return (
      <div id="main">
        <div id="formArea" className="grid px24 py24 mb36 border-b border--gray-light" style={{boxShadow: "rgba(0, 0, 0, 0.3) 0px 5px 8px -8px"}}>
          <h1 className="mb24 px24 txt-h1 mb12">SFMTA Safe Routes to School Map Exporter</h1>
          <div className="col col--12 mt12 ml24 mb36">
            <p className="ml12">Use the form below to set up your Safe Routes to School map:</p>
            <ol className="my12 ml36 txt-ol col col--12">
              <li className="txt-li">Select a school from the dropdown.</li>
              <li className="txt-li">Toggle transit, bicycle, or walk radius layers on and off (if desired).</li>
              <li className="txt-li">Click the "Export map" button to download a high-resolution image of the map.</li>
            </ol>
            <p className="txt-em">Note: the legend will not be included in the export. If you would like to include a legend, you can print to PDF or take a screenshot.</p>
          </div>
          <div className="col col--6 px24">
            <ControlSelect
              id="schoolSelect"
              label="School"
              themeControlSelectContainer="pt3"
              onChange={this.onChangeSchool}
              value={this.state.formData.school}
              options={this.schoolsList}
            />
            <ControlTextarea
              id="document-title"
              label="Title"
              themeControlTextarea="w-full scroll-auto round-1 input"
              placeholder="Give your document a title"
              value={this.state.docTitleText}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="col col--6 px24 pt24">
            <ControlSwitch
              id="toggleLayerBike"
              label="Bike route and bikeshare stations"
              onChange={this.onToggleBikeLayers}
              value={this.state.showBikeLayers}
            />
            <ControlSwitch
              id="toggleLayerTransit"
              label="Transit stations and lines"
              onChange={this.onToggleTransitLayers}
              value={this.state.showTransitLayers}
            />
            <ControlSwitch
              id="toggleWalkingIsochrone"
              label="10 minute walk radius"
              onChange={this.onToggleWalkingIsochrone}
              value={this.state.showWalkingIsochrone}
            />
          </div>
          <div className="ml24 my36  align-center ">
            <Button onClick={this.exportMap} variant="secondary">
              Export map
            </Button>
          </div>
        </div>
        <h2 className="mb12  px24 txt-h2">
          {this.state.docTitleText}
        </h2>
        <div id="mapArea" className="grid px12">
          <div
            className="relative"
            style={{ display: 'block', height: '936px', width: '792px' }}
          >
            {this.renderMap()}
            <div className="bg-white px12 pt12 absolute bottom left">
              {this.state.legendComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
