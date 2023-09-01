import React from "react";
import axios from 'axios';

const AbstractNetwork_3 = ({ onClickLevel, onClickGroup}) => {

    var Gid = 0;
    const onClickAbstract = () => {
      console.log('난 3번')
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
            onClick={() => {
                onClickLevel(1);}}
          >
            Level 1
          </button>
          <button
            type="button"
            className="AbstractBtn"
            onClick={()=>{
                axios.post("/api/group/", {
                    group_id: ++Gid,
                    layer_type: ['Conv2d', 'BatchNorm2d', 'ReLU']
                }).then(function (response) {
                    console.log(response);
                }).catch(err => console.log(err))

                axios.post("/api/sort_group/").then(function(response2){
                    console.log(response2);
                }).catch(err => console.log(err));

                onClickLevel(2);
                onClickGroup(false);}}
          >
            Level 2
          </button>
          <button
            type="button"
            className="AbstractBtn"
            onClick={()=> {
                axios.post("/api/group/", {
                    group_id: ++Gid,
                    layer_type: ['Conv2d', 'BatchNorm2d', 'ReLU', 'Conv2d', 'BatchNorm2d', 'ReLU', 'MaxPool2d']
                }).then(function (response) {
                    console.log(response);
                }).catch(err => console.log(err))

                axios.post("/api/sort_group/").then(function(response2){
                    console.log(response2);
                }).catch(err => console.log(err))
                axios.post("/api/group/", {
                    group_id: ++Gid,
                    layer_type: ['Conv2d', 'BatchNorm2d', 'ReLU', 'Conv2d', 'BatchNorm2d', 'ReLU', 'Conv2d', 'BatchNorm2d', 'ReLU', 'MaxPool2d']
                }).then(function (response) {
                    console.log(response);
                }).catch(err => console.log(err))

                axios.post("/api/sort_group/").then(function(response2){
                    console.log(response2);
                }).catch(err => console.log(err))

                onClickLevel(3);
                onClickGroup(false);}}
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
                      <li>
                          <div className="dndnode_MaxPool2d">
                              MaxPool2d
                          </div>
                      </li>
                  </ul>
            </details>
            <details className="Group2">
              <summary className="layerName">Group 2</summary>
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
                      <li>
                          <div className="dndnode_MaxPool2d">
                              MaxPool2d
                          </div>
                      </li>
                  </ul>
            </details>
        </div>
      </aside>
    </div>
  );
};

export default AbstractNetwork_3;
