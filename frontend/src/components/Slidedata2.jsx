import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import datavis from "./ui/datavis.jpeg";
import { Link } from "react-router-dom";

const Slidedata2 = () => {
  return (
    <div className="flex flex-col items-center px-5 pb-5">
      <div className="relative w-[75%] h-[400px] bg-gray-200 border rounded-xl px-10 pb-10">
        <div className="text-center font-bold p-5">
          Water Data Quality Visualization
        </div>
        <div className="flex justify-between gap-8 items-center pb-10">
          <img src={datavis} className="rounded-full w-[50%]"></img>
          <span className="font-mono">
            Visualize and Compare Different Water Data Quality...{" "}
          </span>
        </div>
        <button className="bg-blue-500 rounded-full text-center px-4 py-2 hover:bg-blue-300">
          <Link to="" className="text-white">
            View Data Visuals
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Slidedata2;
