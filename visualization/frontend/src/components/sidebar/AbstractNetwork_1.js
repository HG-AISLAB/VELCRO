import React, { useState } from "react";
import {clickedNodeList} from "../page/Layer"
import axios from 'axios';
import "../../styles.css";

const AbstractNetwork_1 = ({ onClickLevel, onClickGroup}) => {
  const [currentGroupId, setCurrentGroupId] = useState(1);
  const [toggleList, setToggleList] = useState([]);
  var Gid = 0;


  const onClickAbstract = () => {
      console.log(clickedNodeList);
      // 클릭한 노드리스트가 2개 이상일 때에만 group 만듦
      if(clickedNodeList.length > 1){
      setCurrentGroupId(currentGroupId + 1)
      console.log("currentGroupId", currentGroupId);
        axios.post("/api/group/", {
        group_id: currentGroupId,
        layer_type: clickedNodeList
      }).then(function (response) {
      console.log(response);
      }).catch(err => console.log(err))
      onClickGroup(true);
      setToggleList([...toggleList, currentGroupId]); // 새로운 토글을 배열에 추가
    }
  };
  const getToggleContent = (currentGroupId) => {
  console.log("나 실행중!!!@");
    if (toggleList.includes(currentGroupId))  {
       console.log("클릭한 그룹에 대한 내용을 동적으로 생성하여 반환");
      return (
        <ul>
          {clickedNodeList.map((node, index) => (
            <li key={index}>
              {getNodeContent(node)}
            </li>
          ))}
        </ul>
      );
    } else {
        console.log("실패쓰");
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
        case 'BatchNorm2d':
          return (
            <div className="dndnode_BatchNorm2d">
              BatchNorm2d
            </div>
          );
        case 'ReLU':
          return (
            <div className="dndnode_ReLU">
              ReLU
            </div>
          );
        case 'MaxPool2d':
          return (
            <div className="dndnode_MaxPool2d">
              MaxPool2d
            </div>
          );


        // 다른 노드 타입에 대한 처리를 추가할 수 있음
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
            {toggleList.map((currentGroupId) => (
                <details key={currentGroupId} className={`Group${currentGroupId}`}>
                  <summary className="layerName">Group {currentGroupId}</summary>
                  {getToggleContent(currentGroupId)}
                </details>
              ))}

        </div>

      </aside>
    </div>
  );
};

export default AbstractNetwork_1;
