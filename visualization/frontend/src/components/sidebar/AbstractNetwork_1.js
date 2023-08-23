import React, { useState } from "react";
import { clickedNodeList } from "../page/Layer";
import axios from "axios";
import "../../styles.css";


let Gid = 0;
const AbstractNetwork_1 = ({ onClickLevel, onClickGroup }) => {

  const [currentGroupId, setCurrentGroupId] = useState(1);
  const [toggleList, setToggleList] = useState([]);
  const [groupedNodeList, setGroupedNodeList] = useState({});

  const onClickAbstract = () => {
    console.log("onClickAbstract 실행중~");
//    setCurrentGroupId(currentGroupId + 1);
//    console.log("currentGroupId", currentGroupId);
    console.log("Gid", Gid);
    console.log(clickedNodeList);
    onClickGroup(true);
    axios
      .post("/api/group/", {
        group_id: ++Gid,
        layer_type: clickedNodeList,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));

//    setToggleList([...toggleList, { id: Gid, nodes: clickedNodeList }]);
    setToggleList(prevToggleList => [...prevToggleList, { id: Gid, nodes: clickedNodeList }]);
//    console.log(onClickGroup);
//    onClickGroup(false);
  };

  const getToggleContent = (groupId) => {
    console.log("getToggleContent 실행중~");
    console.log("toggleList", toggleList);
    const groupInfo = toggleList.find((item) => item.id === groupId);
    if (groupInfo) {
      const groupNodes = groupInfo.nodes;
      return (
        <ul>
          {groupNodes.map((node, index) => (
            <li key={index}>{getNodeContent(node)}</li>
          ))}
        </ul>
      );

    } else {
      return null;
    }
  };

  const getNodeContent = (node) => {
      switch (node) {
        case 'Conv2d':
          return (
            <div className="dndnode_Conv2d">
              Conv2d
            </div>
          );
        case 'MaxPool2d':
          return (
            <div className="dndnode_MaxPool2d">
              MaxPool2d
            </div>
          );
        case 'AvgPool2d':
          return (
            <div className="dndnode_AvgPool2d">
              AvgPool2d
            </div>
          );
        case 'AdaptiveAvgPool2d':
          return (
            <div className="dndnode_AdaptiveAvgPool2d">
              AdaptiveAvgPool2d
            </div>
          );
        case 'ZeroPad2d':
          return (
            <div className="dndnode_ZeroPad2d">
              ZeroPad2d
            </div>
          );
        case 'ConstantPad2d':
          return (
            <div className="dndnode_ConstantPad2d">
              ConstantPad2d
            </div>
          );
        case 'ReLU':
          return (
            <div className="dndnode_ReLU">
              ReLU
            </div>
          );
        case 'ReLU6':
          return (
            <div className="dndnode_ReLU6">
              ReLU6
            </div>
          );
        case 'Sigmoid':
          return (
            <div className="dndnode_Sigmoid">
              Sigmoid
            </div>
          );
        case 'LeakyReLU':
          return (
            <div className="dndnode_LeakyReLU">
              LeakyReLU
            </div>
          );
        case 'Tanh':
          return (
            <div className="dndnode_Tanh">
              Tanh
            </div>
          );
        case 'Softmax':
          return (
            <div className="dndnode_Softmax">
              Softmax
            </div>
          );
        case 'BatchNorm2d':
          return (
            <div className="dndnode_BatchNorm2d">
              BatchNorm2d
            </div>
          );
        case 'Linear':
          return (
            <div className="dndnode_Linear">
              Linear
            </div>
          );
        case 'Dropout':
          return (
            <div className="dndnode_Dropout">
              Dropout
            </div>
          );
        case 'BCELoss':
          return (
            <div className="dndnode_BCELoss">
              BCELoss
            </div>
          );
        case 'CrossEntropyLoss':
          return (
            <div className="dndnode_CrossEntropyLoss">
              CrossEntropyLoss
            </div>
          );
        case 'Flatten':
          return (
            <div className="dndnode_Flatten">
              Flatten
            </div>
          );
        case 'Upsample':
          return (
            <div className="dndnode_Upsample">
              Upsample
            </div>
          );
        case 'MSELoss':
          return (
            <div className="dndnode_MSELoss">
              MSELoss
            </div>
          );

        default:
          return null;
    }
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
                Gid = 0;
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
                Gid = 0;
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
             {toggleList.map((item) => (
            <details key={item.id} className={`Group${item.id}`}>
              <summary className="layerName">Group {item.id}</summary>
              {getToggleContent(item.id)}
            </details>
          ))}
        </div>

      </aside>
    </div>
  );
};

export default AbstractNetwork_1;
