/* eslint-disable react/prop-types */
import { Circle } from "react-leaflet";

const RadiusFilterComponent = ({ radiusFilter, setRadiusFilter }) => {
  return (
    <div>
      {!radiusFilter ? null : (
        <Circle
          center={[radiusFilter.city.lat, radiusFilter.city.lng]}
          radius={radiusFilter.radius * 1000}
          eventHandlers={{
            dblclick: (e) => {
              // stop propagation function on the event.
              e.originalEvent.view.L.DomEvent.stopPropagation(e);
              // double click the set radius filter will be set to null.
              // won't be a filter because we update our state.
              setRadiusFilter(null);
            },
          }}
          weight={1}
        />
      )}
    </div>
  );
};

export default RadiusFilterComponent;
