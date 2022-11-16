import AddNewPosition from "@/components/pages/position/AddNewPosition";
import PositionList from "@/components/pages/position/PositionList";

const PositionManagement = () => {
  return (
    <div className="position-management">
      <AddNewPosition />
      <PositionList />
    </div>
  );
};

export default PositionManagement;
