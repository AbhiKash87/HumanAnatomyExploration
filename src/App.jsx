/* eslint-disable no-unused-vars */
import { useContext } from "react";
import ModelViewer from "./Components/ModelViewer";
import ObjectRenderer from "./Components/ObjectRenderer ";
import { SelectedBodyPartContext } from "./SelectedBodyPartContext";
import BodyPartRender from "./Components/BodyPartRender";
import BodyDetailed from "./Components/BodyDetailed";

function App() {
  const { selectedBodyPart } = useContext(SelectedBodyPartContext);
  return (
    <>
      <div className="text-262626 bg-[#383838] h-[100vh] w-full text-white">
        <h1
          className="w-full flex justify-center items-center text-[1.25rem] font-bold text-white bg-gradient-to-r from-slate-600 to-slate-800 p-[6px] shadow-md"
          role="banner"
        >
          Explore Human Anatomy
        </h1>

        <div className="flex flex-row">
          <div className="flex justify-center items-center  h-[93vh] w-[30%] p-2 ">
            <ModelViewer modelUrl="/models/scene.gltf" />
          </div>
          <div className="flex justify-center items-center h-[93vh] w-[70%] ">
            <BodyDetailed />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
