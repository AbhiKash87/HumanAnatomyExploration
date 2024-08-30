/* eslint-disable no-unused-vars */
import React from 'react'
import HumanSkel from '../Components/HumanSkel'
import BodyDetailed from '../Components/BodyDetailed'
import ThreeScene from './ThreeScene'
import { Skeleton } from 'three'
import ModelViewer from '../Components/ModelViewer'

const HumanAnatomy = () => {
  return (
    <div className='flex h-screen border-2 border-yellow-500'>
        <div className='w-full flex justify-center items-center bg-blue-500'>
        <div className="text-262626 bg-[#383838] h-screen text-white">
      <h1>Three.js Model Viewer</h1>
      <ModelViewer modelUrl="/models/scene.gltf" />
    </div>
        </div>
        <div className='w-full flex justify-center items-center bg-green-600'> 
            <BodyDetailed/>
        </div>
    </div>
  )
}

export default HumanAnatomy