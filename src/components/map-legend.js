import React from 'react';
import PropTypes from 'prop-types';
import BikeIcon from '../../icons/bicycle-share-15.svg';
import ParkingIcon from '../../icons/parking-15.svg';
import CrossingGuardIcon from '../../icons/police-15.svg';

export default class MapLegend extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    layers: PropTypes.arrayOf(PropTypes.shape({
      layerId: PropTypes.string,
      layerType: PropTypes.string,
      layerColor: PropTypes.string
    })),
    mapLegendId: PropTypes.string.isRequired
  }

  renderItem(layer) {
    return (
      <div key={layer.layerId} className="legend-row">
        <span style={{backgroundColor: layer.layerColor}} className="round inline-block legend-key w24 h12 mr12"></span>
        <span className="legend-description">{layer.layerId}</span>
      </div>
    )
  }

  render() {
    if (!this.mapLegendId)
    return (
      <div id={this.props.mapLegendId}>
        {     
          this.props.layers.map(layer => {
            return this.renderItem(layer);
          })
        }
      <div className="legend-row mb6">
        <span className="inline-block w24 h18 mr12"><BikeIcon /></span><span>Bike share station</span>
      </div>
      <div className="legend-row mb6">
        <span className="inline-block w24 h18 mr12"><ParkingIcon /></span><span>Off-street parking</span>
      </div>
      <div className="legend-row mb6">
        <span className="inline-block w24 h18 mr12"><CrossingGuardIcon /></span><span>Crossing guard</span>
      </div>
      </div>
    )
  }
}