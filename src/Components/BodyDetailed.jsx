/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import ObjectRenderer from "./ObjectRenderer ";
import { SelectedBodyPartContext } from "../SelectedBodyPartContext";
import BodyPartRender from "./BodyPartRender";

const BodyDetailed = () => {
  const { selectedBodyPart } = useContext(SelectedBodyPartContext);

  return (
    <>
    {selectedBodyPart ? (
      <BodyPartRender objectData={selectedBodyPart} />
    ) : (
      <div className="p-6 md:p-10 text-base md:text-lg lg:text-xl text-justify max-w-full">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl mb-4">
          The human body is an extraordinary machine composed of countless
          interconnected systems, with the skeleton serving as its crucial
          framework. The human skeleton, made up of 206 bones, provides
          structure and support, enabling movement and protecting vital organs.
        </h1>
        <p>
          What’s fascinating is that bones are not just rigid structures; they
          are living tissues that constantly regenerate and adapt. Every 7-10
          years, most of the bone in the human body is replaced as old bone is
          broken down and new bone is formed. This process, known as remodeling,
          helps maintain the strength and integrity of the skeleton throughout a
          person’s life.
        </p>
        <p className="mt-4">
          Additionally, bones are lightweight yet incredibly strong, thanks to
          their unique composition of collagen (a protein) and calcium
          phosphate, which gives them their rigidity. The skeleton is also home
          to the marrow, where blood cells are produced, highlighting its vital
          role in both the structural and functional aspects of the human body.
        </p>
      </div>
    )}
  </>
  
  );
};

export default BodyDetailed;
