import React, { useState, useRef, useEffect } from "react";

import "../../styles.css";

import CustomEdge from "../CustomEdge";
import EditModal from "../layer/PopupModal";
import MaxPoolModal from "../layer/MaxPool";
import AvgPool2d from "../layer/AvgPool2d";
import AdaptiveAvgPool2d from "../layer/AdaptiveAvgPool2d";
import BatchNorm2d from "../layer/BatchNorm2d";
import Linear from "../layer/Linear";
import Dropout from "../layer/Dropout";
import ConstantPad2d from "../layer/ConstantPad2d";
import BCELoss from "../layer/BCELoss";
import LeakyReLU from "../layer/LeakyReLU";
import ReLU from "../layer/ReLU";
import ReLU6 from "../layer/ReLU6";
import Sigmoid from "../layer/Sigmoid";
import Softmax from "../layer/Softmax";
import Tanh from "../layer/Tanh";
import ZeroPad2d from "../layer/ZeroPad2d";
import CrossEntropyLoss from "../layer/CrossEntropyLoss";
import MSELoss from "../layer/MSELoss";
import Flatten from "../layer/Flatten";
import Upsample from "../layer/Upsample";
import BasicBlock from "../layer/BasicBlock";
import Bottleneck from "../layer/Bottleneck";

import axios from "axios";

import ReactFlow, {
  addEdge,
  MiniMap,
  ReactFlowProvider,
  removeElements,
  Controls,
  ControlButton,
} from "react-flow-renderer";
import GenerateButton from "../GenerateButton";
import Tab from "../sidebar/Tab";
import LayerToggle from "../sidebar/LayerToggle";
import NetworkInformation from "../sidebar/NetworkInformation";
import arange_icon from "../../img/swap.png";
import BasicBlockimg from "../../img/basicblock.png";
import BottleNeckimg from "../../img/bottleneck.png";
import AbstractNetwork_1 from "../sidebar/AbstractNetwork_1";
import AbstractNetwork_2 from "../sidebar/AbstractNetwork_2";
import AbstractNetwork_3 from "../sidebar/AbstractNetwork_3";
import useInitialArch from "../../useInitialArch";
import NodeColorProp from "../../NodeColor";
import GroupColorProp from "../../GroupColor";

let id = 1;
const getId = () => `${id}`;
let nowc = 0;
const edgeTypes = {
  custom: CustomEdge,
};
let nowp = "";
var checkFirst = 0;
let initRunningStateTime = 100;
var running_id = 0;
var sortCount = 1;
var sortHeight = 0;
let sortList = [];
let clickedNodeList = [];
let clickedNodeIdList = [];
function LayerList() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [elements, setElements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState("");
  const [idState, setIdState] = useState("");
  const [paramState, setParam] = useState();
  const [group, setGroup] = useState(false);
  const [level, setLevel] = useState(1);
  const [ungroup, setUngroup] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [elements, setElements, isLoading] = useInitialArch(level, group, setGroup, ungroup, setUngroup, isSort, setIsSort);
  const [rapid, setRapid] = useState([]);
  const [noMatch, setNoMatch] = useState([]);

//  const get_inspect = (e) => {
//    setInspect(e);
//  }
// function renderData(resData) {
//                       // node_id 와 edge_id로 json 파일을 읽어 순서대로 새로운 id 를 부여함
//                       var node_id = 1;
//                       var edge_id = 1;
//                       var x_pos = 100;
//                       var y_pos = 100;
//                       var isBlock = undefined;
//                       // isGroup 이 true 이면 배치 할 때 조금 더 멀리
//                       var isGroup = undefined;
//                       //파일을 읽어와 조건문을 통과한 다음 그에 맞는 노드와 엣지들이 이 배열에 들어가고
//                       //그 배열을 화면에 보여줌
//                       var initElements = [];
//                       // node id 의 순서를 리스트로 담는 변수
//                       var GNodeIdList =[];
//                       // json 파일에서 파일 output의 길이만큼 읽어옴
//                       for (var i = 0; i < resData.data.output.length; i++) {
//             //            let numId = i;
//             //            let edgeId = i;
//             //            let edgeNext = i + 1;
//             //            let edgePrior = i;
//                         let groupId = resData.data.output[i].groupId;
//                         // group node라면 group 내에 있는 layer 갯수 몇개인지 담는 변수
//                         let numGroupLayer = resData.data.output[i].layer.length;
//                         let nodeLabel = resData.data.output[i].layer;
//                         let nodeId = resData.data.output[i].nodeId;
//                         let parameters = resData.data.output[i].parameters;
//                         let groupColor;
//                         let nodeColor;
//                         if (groupId === 0) {
//                             if (nodeLabel === "Conv2d") {
//                             nodeColor = NodeColorProp.Conv;
//                           } else if (nodeLabel === "MaxPool2d") {
//                             nodeColor = NodeColorProp.Pooling;
//                           } else if (nodeLabel === "AvgPool2d") {
//                             nodeColor = NodeColorProp.Pooling;
//                           } else if (nodeLabel === "AdaptiveAvgPool2d") {
//                             nodeColor = NodeColorProp.Pooling;
//                           } else if (nodeLabel === "ZeroPad2d") {
//                             nodeColor = NodeColorProp.Padding;
//                           } else if (nodeLabel === "ConstantPad2d") {
//                             nodeColor = NodeColorProp.Padding;
//                           } else if (nodeLabel === "ReLU") {
//                             nodeColor = NodeColorProp.Activation;
//                           } else if (nodeLabel === "ReLU6") {
//                             nodeColor = NodeColorProp.Activation;
//                           } else if (nodeLabel === "Sigmoid") {
//                             nodeColor = NodeColorProp.Activation;
//                           } else if (nodeLabel === "LeakyReLU") {
//                             nodeColor = NodeColorProp.Activation;
//                           } else if (nodeLabel === "Tanh") {
//                             nodeColor = NodeColorProp.Activation;
//                           } else if (nodeLabel === "Softmax") {
//                             nodeColor = NodeColorProp.Activation;
//                           } else if (nodeLabel === "BatchNorm2d") {
//                             nodeColor = NodeColorProp.Normalization;
//                           } else if (nodeLabel === "Linear") {
//                             nodeColor = NodeColorProp.Linear;
//                           } else if (nodeLabel === "Dropout") {
//                             nodeColor = NodeColorProp.Dropout;
//                           } else if (nodeLabel === "BCELoss") {
//                             nodeColor = NodeColorProp.Loss;
//                           } else if (nodeLabel === "CrossEntropyLoss") {
//                             nodeColor = NodeColorProp.Loss;
//                           } else if (nodeLabel === "Flatten") {
//                             nodeColor = NodeColorProp.Utilities;
//                           } else if (nodeLabel === "Upsample") {
//                             nodeColor = NodeColorProp.Vision;
//                           } else if (nodeLabel === "MSELoss") {
//                             nodeColor = NodeColorProp.Loss;
//                           } else if (nodeLabel === "BasicBlock") {
//                             nodeColor = NodeColorProp.Residual;
//                           } else if (nodeLabel === "Bottleneck") {
//                             nodeColor = NodeColorProp.Residual;
//                           }
//                         }
//                         else if (groupId === 1) {
//                             groupColor = GroupColorProp.Group1;}
//                         else if (groupId === 2) {
//                             groupColor = GroupColorProp.Group2;}
//                         else if (groupId === 3) {
//                           groupColor = GroupColorProp.Group3;}
//                         else if (groupId === 4) {
//                             groupColor = GroupColorProp.Group4;}
//                         else if (groupId === 5) {
//                             groupColor = GroupColorProp.Group5;}
//                         else if (groupId === 6) {
//                             groupColor = GroupColorProp.Group6;}
//                         else if (groupId === 7) {
//                             groupColor = GroupColorProp.Group7;}
//                         else if (groupId === 8) {
//                             groupColor = GroupColorProp.Group8;}
//                         else if (groupId === 9) {
//                             groupColor = GroupColorProp.Group9;}
//                         else if (groupId === 10) {
//                             groupColor = GroupColorProp.Group10;}
//                         // 노드 위치 지정
//                         if (i === 0) {
//                           x_pos = 100;
//                           y_pos = 100;
//                         }
//                         else if (isBlock) {
//                           if (y_pos + 330 <= 639) {
//                             y_pos += 330;
//                           } else {
//                             x_pos += 200;
//                             y_pos = 100;
//                           }
//                         }
//                         else if(isGroup){
//                           if (y_pos + 330 <= 639) {
//                             y_pos += 200;
//                           } else {
//                             x_pos += 200;
//                             y_pos = 100;
//                           }
//
//                         }
//                         else if (y_pos < 589) {
//                           y_pos += 70;
//                         } else {
//                           x_pos += 200;
//                           y_pos = 100;
//                         }
//
//                         if (
//                             String(nodeLabel) === "BasicBlock" ||
//                             String(nodeLabel) === "Bottleneck"
//                         ) {
//                           isBlock = true;
//                           isGroup = false;
//                         }
//                         // Group인 경우는 0이 아닐 때 이다
//                         else if(String(groupId) != 0){
//                             isGroup = true;
//                             isBlock = false;
//                         }
//                         else {
//                           isBlock = false;
//                           isGroup = false;
//                         }
//
//                         const newNode = {
//                           id: String(node_id),
//                           type: "default",
//                           position: {x: x_pos, y: y_pos},
//                           sort: "0",
//                           style: {
//                             background: `${nodeColor}`,
//                             width: 135,
//                             color: "black",
//                             fontSize: "20px",
//                             fontFamily: "Helvetica",
//                             boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)",
//                             borderRadius: "10px",
//                             border: "none",
//                           },
//                           data: {
//                             // index: `${nodeOrder}`,
//                             label: `${nodeLabel}`,
//                             // subparam: `${nodeParam}`,
//                           },
//                         };
//
//                         const newResidualNode1 = {
//                           // 노드 내부에 residual block 이미지 넣기 - bottleneck
//                           id: String(node_id),
//                           type: "default",
//                           position: {x: x_pos, y: y_pos},
//                           sort: "2",
//                           style: {
//                             background: `${nodeColor}`,
//                             fontSize: "20px",
//                             width: "135px",
//                             height: "280px",
//                             boxShadow: "7px 7px 7px 0px rgba(0,0,0,.20)",
//                             border: "0px",
//                             borderRadius: "10px",
//                             backgroundImage: `url(${BottleNeckimg})`, //사진 나오게
//                             backgroundPosition: "center",
//                             backgroundSize: "135px 280px",
//                             backgroundRepeat: "no-repeat",
//                             color: "rgba(0, 0, 0, 0)",
//                           },
//                           data: {
//                             label: `${nodeLabel}`,
//                             // subparam: `${nodeParam}`,
//                           },
//                         };
//
//                         const newResidualNode2 = {
//                           // 노드 내부에 residual block 이미지 넣기 - basic block
//                           id: String(node_id),
//                           type: "default",
//                           position: {x: x_pos, y: y_pos},
//                           sort: "1",
//                           style: {
//                             background: `${nodeColor}`,
//                             fontSize: "20px",
//                             width: "135px",
//                             height: "280px",
//                             boxShadow: "7px 7px 7px 0px rgba(0,0,0,.20)",
//                             border: "0px",
//                             borderRadius: "10px",
//                             backgroundImage: `url(${BasicBlockimg})`, //사진 나오게
//                             backgroundPosition: "center",
//                             backgroundSize: "135px 280px",
//                             backgroundRepeat: "no-repeat",
//                             color: "rgba(0, 0, 0, 0)",
//                           },
//                           data: {
//                             label: `${nodeLabel}`,
//                             // subparam: `${nodeParam}`,
//                           },
//                         };
//
//                         const newGroupNode = {
//                           id: String(node_id),
//                           type: "default",
//                           position: {x: x_pos, y: y_pos},
//                           sort: "3",
//                           style: {
//                             background: `${groupColor}`,
//                             height: "110px",
//                             width: 135,
//                             color: "black",
//                             fontSize: "20px",
//                             fontFamily: "Helvetica",
//                             boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)",
//                             borderRadius: "10px",
//                             border: "1px dashed #4E5058",
//                             textAlign: "center",  // 가로 가운데 정렬
//                             // 세로 가운데 정렬 (4개 다 써야됨)
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             flexDirection: "column",
//                           },
//                           data: {
//                             label: `Group${groupId}`,
//                           },
//                         };
//
//                         GNodeIdList.push(node_id);
//                         if (String(nodeLabel) === "Bottleneck") {
//                            initElements.push(newResidualNode1);
//                            node_id++;
//                          } else if (String(nodeLabel) === "BasicBlock") {
//                            initElements.push(newResidualNode2);
//                            node_id++;
//                          } else if (groupId != 0) {
//                            initElements.push(newGroupNode);
//                            node_id = numGroupLayer + node_id;
//                          } else {
//                            initElements.push(newNode);
//                            node_id++;
//                          }
//                        }
//                       //    edge 설정
//                       console.log(GNodeIdList);
//                       for (var j = 0; j < resData.data.output.length; j++) {
//                         const newEdge = {
//                           id: String(edge_id),
//                           // id: "reactflow__edge-"+ `${edgePrior}` + "null" + `${edgeNext}` + "null",
//                           source: String(GNodeIdList[j]),
//                           sourceHandle: null,
//                           target: String(GNodeIdList[j+1]),
//                           targetHandle: null,
//                         };
//                         initElements.push(newEdge);
//                         edge_id++;
//                       }
//                       //
//                       console.log("initElements", initElements);
//                       setElements([...initElements]);
//               }
  useEffect(() => {
    const get_params = async () => {
      try {
        await axios
          .get(
            "/api/node/"
              .concat(String(idState))
              .concat("/")
          )
          .then((response) => {
            setParam(response.data.parameters);
          });
      } catch (error) {
        console.error(error);
      }
    };
    get_params();
  }, [idState]);



  useEffect(()=>{
    const get_node = async () => {
      try {
        return await axios.get("/api/node/");
      } catch (error) {
        console.error(error);
      }
    };


    console.log(noMatch)

    for(var i=0;i<elements.length;i++){

        if (Number(elements[i].id) === rapid[0]){
            elements[rapid[0]-1].style = {
        ...elements[rapid[0]-1].style,
        border: "5px solid #0067A3",

      }
      elements[rapid[1]-1].style = {
        ...elements[rapid[1]-1].style,
        border: "5px solid #0067A3",

      }
            setElements([...elements]);

        }

        if (Number(elements[i].id) === noMatch[0]){
            elements[noMatch[0]-1].style = {
        ...elements[noMatch[0]-1].style,
        border: "5px solid #DD636E",

      }
      elements[noMatch[1]-1].style = {
        ...elements[noMatch[1]-1].style,
        border: "5px solid #DD636E",

      }
            setElements([...elements]);
        }
    }


  },[rapid, noMatch])



  const onSortNodes = (sortList) => {
    console.log("back code");
    console.log(sortList);
    if(level ===1){
        sortList = sortList.split(",");
        console.log(sortList);
    }

    var sortedElements = elements.slice(); // elements 배열을 복사하여 새로운 배열을 생성합니다.
    console.log(sortedElements);
    console.log(" my code ");
    let sort_x_pos = 100 + sortCount;
    let sort_y_pos = 100 + sortCount;

    var sampleElements = []
    for (var i = 0; i < sortList.length; i++) {
      for (var j = 0; j < sortedElements.length; j++) {
         if (Number(sortedElements[j].id) === Number(sortList[i])) {
            sampleElements.push(sortedElements[j]);
         }
      }
    }

    for (var i = 0; i < sortList.length; i++) {
      for (var j = 0; j < sortedElements.length; j++) {
        if (Number(sortedElements[j].source) === Number(sortList[i])) {
            sampleElements.push(sortedElements[j]);
         }
      }
    }

    console.log("sampleElement = ", sampleElements);

    sortedElements = sampleElements;
    console.log("sortedElement = ", sortedElements)

    sortedElements[0].position = {
            x: sort_x_pos,
            y: sort_y_pos,
    };

    let isBlock = undefined;
    let isGroup = undefined;

    for (var i = 1; i < sortList.length; i++) {
      for (var j = 1; j < sortedElements.length; j++) {

        if (sortedElements[j - 1].sort === "3"){
            // 그룹노드인경우
                isGroup = true;
                isBlock = false;
        } else if (sortedElements[j - 1].sort === "1" || sortedElements[j - 1].sort === "2"){
            //  Residual 인 경우
                isGroup = false;
                isBlock = true;
        } else {
            isBlock = false;
            isGroup = false;
        }
        if (Number(sortedElements[j].id) === Number(sortList[i])) {
          if (isBlock) {
            if (sort_y_pos + 330 <= 639) {
              sort_y_pos += 330;
            } else {
              sort_x_pos += 200;
              sort_y_pos = 100 + sortCount;
            }
          } else if(isGroup){
              if (sort_y_pos + 200 <= 639) {
                sort_y_pos += 200;
              } else {
                sort_x_pos += 200;
                sort_y_pos = 100 + sortCount;
              }
          }
          else if (sort_y_pos < 589) {
            if (sortedElements[j].sort !== undefined) {
              sort_y_pos += 70;
            }
          } else {
            sort_x_pos += 200;
            sort_y_pos = 100 + sortCount;
          }

          sortedElements[j].position = {
            x: sort_x_pos,
            y: sort_y_pos,
          };

//          console.log(sort_x_pos, sort_y_pos);
//          console.log(sortedElements[j].position);
//          console.log(isBlock);
//          console.log(sortedElements[j].sort);

//          if (
//            sortedElements[j].sort === "0"
//          ) {
//            isBlock = false;
//            isGroup = false;
//          }else if (
//            sortedElements[j].sort === "3" &&
//            sortedElements[j].sort !== undefined
//          ) {
//            isBlock = false;
//            isGroup = true;
//          }
//          else {
//            isBlock = true;
//            isGroup = false;
//          }
        }
      }
    }
    setElements(sortedElements);
    console.log(elements);
    sortCount *= -1;
  };

  // 정렬한 노드 list 받아오기
  const sortActive = (event) => {
    setIsSort(true);
    console.log("isSort", isSort);
    // if(level === 1){
    //     console.log(level)
    //     console.log("생성버튼클릭");
    //     axios
    //       .delete("/api/sort/1/")
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch((e) => console.log(e));
    //     console.log("delete done");
    //     axios
    //       .post("/api/sort/")
    //       .then(function (response) {
    //         console.log(response);
    //         axios
    //           .get("/api/sort/1/")
    //           .then(function (response2) {
    //             console.log("정렬된 list: ", response2.data.sorted_ids);
    //             onSortNodes(response2.data.sorted_ids);
    //           });
    //       })
    //       .catch((e) => console.log(e));
    //     console.log("post done");
    // }
    // else{
    //     // level 2, 3 인 경우
    //
    //     // var nodeIdList =[];
    //     //
    //     // //level 2인 경우 노드 갯수 25개
    //     // if (level ===2){
    //     //     for (var i = 0 ; i<51; i++)
    //     //         nodeIdList.push(i+1);
    //     // }
    //     // // level 3인 경우 노드 갯수 12개
    //     // else{
    //     //     for (var i = 0 ; i<51; i++)
    //     //         nodeIdList.push(i+1);
    //     // }
    //     //
    //     // onSortNodes(nodeIdList);
    //     // axios.post("/api/sort_group/").then(function(response2){
    //     //                             console.log("level22222222 json", response2);
    //     //                             renderData(response2);
    //     //                         }).catch(err => console.log(err));
    //     setIsSort(true);
    //     console.log("isSort", isSort);
    // }
  };

  const onLoad = (rFInstance) => setReactFlowInstance(rFInstance);

  //
  /*
  if (checkFirst === 0) {
    console.log("실행");
    // axios.post("/api/running/",{     // status_report에 started 저장 (메인페이지 첫 실행시)
    //       timestamp: Date.now(),
    //       msg: 'started'
    //     }).then(function(response){
    //       console.log(response)
    //     }).catch(err=>console.log(err));
    //       // Initializate selected architecture
    // var initElement = initialArch();

    var initElement = nodeData;
    let tmp = [];
    for (var i = 0; i < initElement.length; i++) {
      tmp.push(initElement[i]);
      // setElements((es) => es.concat(initElement[i]));
    }
    setElements([...tmp]);
    checkFirst = 1;
  }
  */

  const notRunningState = setInterval(() => {
    ////    console.log("[post] 동작 중지");
    //    running_id += 1;
    axios
      .post("/api/status_report/", {
        timestamp: Date.now(),
        //      running: 0,
      })
      .then(function (response) {
        //console.log(timestamp)
      })
      .catch((e) => console.log(e));
  }, initRunningStateTime * 1000);

  const onRunningState = () => {
    //    console.log("[post] 동작 중");

    running_id += 1;
    axios
      .post("/api/running/", {
        id: running_id,
        running: 1,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const onRunningStateClick = (e) => {
    e.preventDefault();
    clearInterval(notRunningState);
    //onRunningState();
    clearInterval(notRunningState);
    notRunningState();
  };

  const onConnect = async (params) => {
    setElements((els) => addEdge(params, els));
    // edge create **********************

    const get_edge = async () => {
      try {
        return await axios.get("/api/edge/");
      } catch (error) {
        console.error(error);
      }
    };
    const cedge = await get_edge();
    var maxId = 0;
    for (var i = 0; i < cedge.data.length; i++) {
      if (maxId < cedge.data[i].id) {
        maxId = cedge.data[i].id;
      }
    }
    axios
      .post("/api/edge/", {
        id: maxId + 1,
        prior: params.source,
        next: params.target,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const onDeleteEdge = (e) => {
    console.log(e.target);
  };

  const onElementsRemove = (remove) => {
    setElements((els) => removeElements(remove, els));
    deleteModal(remove);
  };

  const openModal = async (node) => {
    // const get_params = async () => {
    //   try {
    //     await axios.get('/api/node/'.concat(String(idState)).concat('/')).then((response) => {
    //        setParam(response.data.parameters);
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // await get_params();
    // console.log('get param double click')
    if(state.includes('Group')) {
      setModalOpen(false);
    }
    else {
      await setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveModal = () => {
    setModalOpen(false);
  };

  const deleteModal = (remove) => {
    axios
      .get(
        "/api/node/".concat(String(idState)).concat("/")
      )
      .then(function (response) {
        console.log(response);
      });
    console.log("remove", remove);
    if (remove[0].data) {
      console.log("node");
      axios.delete(
        "/api/node/".concat(String(idState)).concat("/")
      );
      axios.get("/api/edge/").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          if (String(response.data[i].prior) === String(idState)) {
            axios.delete(
              "/api/edge/"
                .concat(String(response.data[i].id))
                .concat("/")
            );
          }
          if (String(response.data[i].next) === String(idState)) {
            axios.delete(
              "/api/edge/"
                .concat(String(response.data[i].id))
                .concat("/")
            );
          }
        }
      });
    } else {
      console.log("edge");
      axios.get("/api/edge/").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          if (String(response.data[i].prior) === String(remove[0].source)) {
            if (String(response.data[i].next) === String(remove[0].target)) {
              axios.delete(
                "/api/edge/"
                  .concat(String(response.data[i].id))
                  .concat("/")
              );
            }
          }
        }
      });
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const onPaneClick = (event) => {
    clickedNodeList = [];
    clickedNodeIdList = [];
  }
  const onNodeClick = async (event, node) => {
    console.log(node);
    // if(modalOpen === true) {
    //   const get_params = async () => {
    //     try {
    //       await axios.get('/api/node/'.concat(String(idState)).concat('/')).then((response) => {
    //         setParam(response.data.parameters);
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    //   await setState(node.data.label);
    //   await setIdState(node.id);
    //   await get_params();
    //   console.log('get param one click');
    // }
    // else{
    await setState(node.data.label);
    await setIdState(node.id);
    // console.log(node.position);
    //
    // setColorState(node.borderColor);

     const isCtrlKey = event.ctrlKey || event.metaKey || event.shiftKey;

      if (isCtrlKey) {
        node.selected = true;
        if (node.selected === true && !clickedNodeIdList.includes(node.id)) {
          clickedNodeList.push(node.data.label);
          clickedNodeIdList.push(node.id);
        }
        console.log(clickedNodeList);
        console.log(clickedNodeIdList);
      }
      else {
        node.selected = false;
        clickedNodeList = [];
        clickedNodeIdList = [];
        console.log(clickedNodeList);
        console.log(clickedNodeIdList);
      }
    // }
  };

  const onDrop = async (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const name = event.dataTransfer.getData("application/reactflow");
    const color = event.dataTransfer.getData("colorNode");
    const subp = event.dataTransfer.getData("subparameters");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 72,
      y: event.clientY - reactFlowBounds.top - 10,
    });
    const get_node = async () => {
      try {
        return await axios.get("/api/node/");
      } catch (error) {
        console.error(error);
      }
    };

    const cnode = await get_node();

    console.log(`[onDrop]`);
    console.log(cnode);
    // cnode의 order값이 가장 큰 값 탐색
    var maxOrder = 0;
    for (var i = 0; i < cnode.data.length; i++) {
      if (maxOrder < cnode.data[i].order) {
        maxOrder = cnode.data[i].order;
      }
    }

    // 가장 큰 order+1로 id값 설정
    const nid = maxOrder + 1;
    id = nid;

    //node create **********************
    //const cnode = plusId()
    axios
      .post("/api/node/", {
        order: id,
        layer: name,
        parameters: subp,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
    //node create **********************

    const newNode = {
      id: getId(),
      type: "default",
      position,
      sort: "0",
      inspected:false,
      style: {
        background: `${color}`,
        width: 135,
        fontSize: "20px",
        fontFamily: "Helvetica",
        boxShadow: "7px 7px 7px 0px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        border: "none",
      },
      data: {
        label: `${name}`,
        subparam: `${subp}`,
      },
    };

    const newResidualNode1 = {
      // 노드 내부에 residual block 이미지 넣기 - bottleneck
      id: getId(),
      type: "default",
      position,
      sort: "2",
      style: {
        background: `${color}`,
        fontSize: "20px",
        width: "135px",
        height: "280px",
        boxShadow: "7px 7px 7px 0px rgba(0,0,0,.20)",
        border: "0px",
        borderRadius: "10px",
        backgroundImage: `url(${BottleNeckimg})`, //사진 나오게
        backgroundPosition: "center",
        backgroundSize: "135px 280px",
        backgroundRepeat: "no-repeat",
        color: "rgba(0, 0, 0, 0)",
      },
      data: {
        label: `${name}`,
        subparam: `${subp}`,
      },
    };
    const newResidualNode2 = {
      // 노드 내부에 residual block 이미지 넣기 - basic block
      id: getId(),
      type: "default",
      position,
      sort: "1",
      style: {
        background: `${color}`,
        fontSize: "20px",
        width: "135px",
        height: "280px",
        boxShadow: "7px 7px 7px 0px rgba(0,0,0,.20)",
        border: "0px",
        borderRadius: "10px",
        backgroundImage: `url(${BasicBlockimg})`, //사진 나오게
        backgroundPosition: "center",
        backgroundSize: "135px 280px",
        backgroundRepeat: "no-repeat",
        color: "rgba(0, 0, 0, 0)",
      },
      data: {
        label: `${name}`,
        subparam: `${subp}`,
      },
    };

    if (name == "Bottleneck") {
      setElements((nds) => nds.concat(newResidualNode1));
    } else if (name == "BasicBlock") {
      setElements((nds) => nds.concat(newResidualNode2));
    } else {
      setElements((nds) => nds.concat(newNode));
    }
  };

  const C = () => {
    if (state === "Conv2d")
      return (
        <EditModal
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></EditModal>
      );
    if (state === "MaxPool2d")
      return (
        <MaxPoolModal
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></MaxPoolModal>
      );
    if (state === "AvgPool2d")
      return (
        <AvgPool2d
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></AvgPool2d>
      );
    if (state === "AdaptiveAvgPool2d")
      return (
        <AdaptiveAvgPool2d
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></AdaptiveAvgPool2d>
      );
    if (state === "Softmax")
      return (
        <Softmax
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Softmax>
      );
    if (state === "ConstantPad2d")
      return (
        <ConstantPad2d
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></ConstantPad2d>
      );
    if (state === "BatchNorm2d")
      return (
        <BatchNorm2d
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></BatchNorm2d>
      );

    if (state === "MSELoss")
      return (
        <MSELoss
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></MSELoss>
      );
    if (state === "Tanh")
      return (
        <Tanh
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Tanh>
      );
    if (state === "Sigmoid")
      return (
        <Sigmoid
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Sigmoid>
      );
    if (state === "CrossEntropyLoss")
      return (
        <CrossEntropyLoss
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></CrossEntropyLoss>
      );
    if (state === "Linear")
      return (
        <Linear
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Linear>
      );
    if (state === "Dropout")
      return (
        <Dropout
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Dropout>
      );
    if (state === "ZeroPad2d")
      return (
        <ZeroPad2d
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></ZeroPad2d>
      );
    if (state === "BCELoss")
      return (
        <BCELoss
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></BCELoss>
      );
    if (state === "LeakyReLU")
      return (
        <LeakyReLU
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></LeakyReLU>
      );
    if (state === "ReLU")
      return (
        <ReLU
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></ReLU>
      );
    if (state === "ReLU6")
      return (
        <ReLU6
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></ReLU6>
      );
    if (state === "Flatten")
      return (
        <Flatten
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Flatten>
      );
    if (state === "BasicBlock")
      return (
        <BasicBlock
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></BasicBlock>
      );
    if (state === "Bottleneck")
      return (
        <Bottleneck
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Bottleneck>
      );
    else
      return (
        <Upsample
          params={paramState}
          layer={idState}
          open={modalOpen}
          save={saveModal}
          close={closeModal}
          header={state}
          setState={setIdState}
        ></Upsample>
      );
  };

  const [tabToggle, setTabToggle] = useState(1);
  const tabOnClick = (path) => {
    console.log(path);
    if (path == "info icon") {
      setTabToggle(2);
    } else if (path == "layer icon") {
      setTabToggle(1);
    } else if (path == "abstract icon") {
      setTabToggle(3);
    }
  };

  // const onSortNodes = () => {
  //     console.log('back code');
  //     sortActive();
  //     console.log(sortList);
  //   console.log(' my code ');
  //   const sortList = [1, 2, 288, 4, 5, 6, 7, 8, 9]; // 정렬된 노드 ID 리스트
  //   const sortedElements = elements.slice(); // elements 배열을 복사하여 새로운 배열을 생성합니다.
  //   let sort_x_pos = 100 + sortCount;
  //   let sort_y_pos = 100 + sortCount;
  //
  //
  //   for(var i = 0; i < sortList.length; i++) {
  //     for (var j = 0; j < sortedElements.length; j++) {
  //       if (sortedElements[j].id === sortList[i]) {
  //         console.log('arrange');
  //         console.log(sortList[i]);
  //         // node = sortedElements[j];
  //
  //         if ((i % 8 === 0) && (i >= 8)){
  //           sort_x_pos += 200;
  //           sort_y_pos = 100;
  //         } else if (i>=1) {
  //           sort_y_pos += 70;
  //         };
  //
  //         sortedElements[j].position = {
  //           x: sort_x_pos,
  //           y: sort_y_pos,
  //         };
  //
  //         console.log(sort_x_pos, sort_y_pos);
  //         console.log(sortedElements[j].position)
  //       }
  //     }
  //   }
  //    setElements(sortedElements);
  //   console.log(elements)
  //   sortCount *= -1;
  //   };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
     <div className="FullPage">
      <div className="Sidebar">
        <Tab tabOnClick={tabOnClick} />
        {tabToggle === 2 ? (
          <NetworkInformation />
        ) : (tabToggle === 3 && level === 1) ? (
          <AbstractNetwork_1 onClickLevel={setLevel} onClickGroup={setGroup} group = {group}
           onClickUngroup = {setUngroup} ungroup = {ungroup} />
        ) : (tabToggle === 3 && level === 2) ? (
          <AbstractNetwork_2 onClickLevel={setLevel} onClickGroup={setGroup}/>
        ) : (tabToggle === 3 && level === 3) ? (
          <AbstractNetwork_3 onClickLevel={setLevel} onClickGroup={setGroup}/>
        ) : (
          <LayerToggle />
        )}
        {/*<LayerToggle/>*/}
        <div className="LayerInfo">
          <h3>Layer Information</h3>
          {/*<div className="Modal">*/}
          <C />
        </div>
      </div>

      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              //            onClick={onRunningStateClick}
              onConnect={onConnect}
              elements={elements}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapToGrid={true}
              edgeTypes={edgeTypes}
              key="edges"
              onNodeDoubleClick={openModal}
              onEdgeDoubleClick={onDeleteEdge}
              onElementsRemove={onElementsRemove}
              onElementClick={onNodeClick}
              onPaneClick={onPaneClick}
            >
              <Controls showZoom="" showInteractive="" showFitView="">
                {/*정렬된 노드 get 요청*/}
                <ControlButton onClick={sortActive} title="action">
                  <img src={arange_icon} />
                </ControlButton>
              </Controls>
              <div
                className="reactBtn"
                style={{ position: "absolute", zIndex: 100 }}
              >
                <GenerateButton elements={elements} setNoMatch={setNoMatch} noMatch={noMatch} setRapid={setRapid} rapid={rapid}/>
              </div>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default function Layer() {
  return <LayerList />;
}

export {clickedNodeList}
