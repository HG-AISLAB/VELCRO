import React from "react";
import {clickedNodeList} from "../page/Layer"
import axios from 'axios';
const AbstractNetwork = ({ onClickLevel }) => {
  const onDragStart = (event, nodeName, nodeColor, subpm) => {
    event.dataTransfer.setData("application/reactflow", nodeName);
    event.dataTransfer.setData("subparameters", subpm);
    event.dataTransfer.setData("colorNode", nodeColor);
    event.dataTransfer.effectAllowed = "move";
  };

  // var Gid = 0;
    const onClickAbstract = () => {
      // console.log(clickedNodeList);
      //
      // axios.post("/api/group/", {
      //   group_id: ++Gid,
      //   layer_type: clickedNodeList
      // }).then(function (response) {
      // console.log(response);
      // }).catch(err => console.log(err))
      //
      // axios.post("/api/sort_group/").then(function(response2){
      //   console.log(response2);
      // }).catch(err => console.log(err))

      

  };
  return (
    <div className="AbstractNetwork">
      <h2 className="AbstractText">Abstract Architecture</h2>

      <aside>
        <div className="AutoGroup">
          <div className="GroupText"> Auto Group </div>
          <button
            type="button"
            className="AbstractBtn"
            onClick={() => onClickLevel(1)}
          >
            Level 1
          </button>
          <button
            type="button"
            className="AbstractBtn"
            onClick={() => onClickLevel(2)}
          >
            Level 2
          </button>
          <button
            type="button"
            className="AbstractBtn"
            onClick={() => onClickLevel(3)}
          >
            Level 3
          </button>
        </div>
        <div className="CustomGroup">
          <div className="GroupText"> Custom Group </div>
          <button type="button" onClick={onClickAbstract} className="AbstractBtn">
            Group
          </button>
          <button type="button" className="AbstractBtn">
            Ungroup
          </button>
        </div>
        <div className="GroupInformation">
          <div className="GroupText"> Group Information </div>
        </div>
      </aside>
    </div>
  );
};

export default AbstractNetwork;
