import React from "react";
import {clickedNodeList} from "../page/Layer"
import axios from 'axios';
import NodeColorProp from "../../NodeColor";

const AbstractNetwork_2 = ({ onClickLevel, onClickGroup}) => {
  const onClickAbstract = () => {
      onClickGroup(false);
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
            <details className="Group1">
              <summary className="layerName">Group 1</summary>
                  <ul>
                      <li>
                          <div className="dndnode_Conv2d">
                              Conv2d
                          </div>
                      </li>
                      <li>
                          <div className="dndnode_BatchNorm2d">
                              BatchNorm2d
                          </div>
                      </li>
                      <li>
                          <div className="dndnode_ReLU">
                              ReLU
                          </div>
                      </li>
                  </ul>
            </details>
        </div>
      </aside>
    </div>
  );
};

export default AbstractNetwork_2;
