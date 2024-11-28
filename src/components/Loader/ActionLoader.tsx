import HashLoader from "react-spinners/HashLoader";
import "./ActionLoader.scss"; // Import the SCSS file

const ActionLoader = () => {
  return (
    <div className="action-loader">
      <HashLoader
        size={50}
        color={"rgb(37 99 235 / 0.5)"}
        speedMultiplier={2}
      />
    </div>
  );
};

export default ActionLoader;
