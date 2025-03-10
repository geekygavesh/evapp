
import MapComponent from '../components/MapComponent';

function Stations() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Find Charging Stations</h1>
      <MapComponent />
      {/* Later, you can add more markers or list of stations */}
    </div>
  );
}

export default Stations;
