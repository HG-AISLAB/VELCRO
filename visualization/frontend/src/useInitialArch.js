import React, { useEffect, useState } from "react";
import axios from "axios";
import NodeColorProp from "./NodeColor";
import GroupColorProp from "./GroupColor";
import BottleNeckimg from "./img/bottleneck.png";
import BasicBlockimg from "./img/basicblock.png";

function useInitialArch(level, group) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const init = async () => {

      if(level===1 && group === false) {
        var checkFirst = 0;

        if (checkFirst == 0) {
          //    axios.post("/api/start/", {
          //      start: 0,
          //    }).then(function(response){
          //        console.log(response)
          //        })
          //        .catch(e => console.log(e));

          // 노드 삭제하기
          for (var j = 0; j < 100; j++) {
            axios
              .delete("/api/node/".concat(j).concat("/"))
              .then(function (response) {
                // handle success
              })
              .catch(function (error) {
                // handle error
              })
              .then(function () {
                // always executed
              });
          }

          //엣지 삭제하기
          for (var j = 0; j < 100; j++) {
            axios
              .delete("/api/edge/".concat(j).concat("/"))
              .then(function (response) {
                // handle success
              })
              .catch(function (error) {
                // handle error
              })
              .then(function () {
                // always executed
              });
          }
          //그룹 정보 삭제하기
          for (var j=0; j<20; j++){
            axios.delete('/api/group/'.concat(j).concat('/'))
             .then(function (response) {
               // handle success
             })
             .catch(function (error) {
               // handle error
             })
             .then(function () {
               // always executed
             });
          }

          //그룹 정보 삭제하기
          for (var j=0; j<20; j++){
            axios.delete('/api/sort_group/'.concat(j).concat('/'))
             .then(function (response) {
               // handle success
             })
             .catch(function (error) {
               // handle error
             })
             .then(function () {
               // always executed
             });
          }
          const jsonData = require(`./VGG16_level${level}.json`);

          var node_id = 1;
          var edge_id = 1;
          var x_pos = 100;
          var y_pos = 100;
          var isBlock = undefined;

          var initElements = [];

          for (var i = 0; i < jsonData.node.length; i++) {
            let nodeOrder = jsonData.node[i].order;
            let nodeLabel = jsonData.node[i].layer;
            let nodeParam = jsonData.node[i].parameters;
            let nodeColor;
            if (nodeLabel === "Conv2d") {
              nodeColor = NodeColorProp.Conv;
            } else if (nodeLabel === "MaxPool2d") {
              nodeColor = NodeColorProp.Pooling;
            } else if (nodeLabel === "AvgPool2d") {
              nodeColor = NodeColorProp.Pooling;
            } else if (nodeLabel === "AdaptiveAvgPool2d") {
              nodeColor = NodeColorProp.Pooling;
            } else if (nodeLabel === "ZeroPad2d") {
              nodeColor = NodeColorProp.Padding;
            } else if (nodeLabel === "ConstantPad2d") {
              nodeColor = NodeColorProp.Padding;
            } else if (nodeLabel === "ReLU") {
              nodeColor = NodeColorProp.Activation;
            } else if (nodeLabel === "ReLU6") {
              nodeColor = NodeColorProp.Activation;
            } else if (nodeLabel === "Sigmoid") {
              nodeColor = NodeColorProp.Activation;
            } else if (nodeLabel === "LeakyReLU") {
              nodeColor = NodeColorProp.Activation;
            } else if (nodeLabel === "Tanh") {
              nodeColor = NodeColorProp.Activation;
            } else if (nodeLabel === "Softmax") {
              nodeColor = NodeColorProp.Activation;
            } else if (nodeLabel === "BatchNorm2d") {
              nodeColor = NodeColorProp.Normalization;
            } else if (nodeLabel === "Linear") {
              nodeColor = NodeColorProp.Linear;
            } else if (nodeLabel === "Dropout") {
              nodeColor = NodeColorProp.Dropout;
            } else if (nodeLabel === "BCELoss") {
              nodeColor = NodeColorProp.Loss;
            } else if (nodeLabel === "CrossEntropyLoss") {
              nodeColor = NodeColorProp.Loss;
            } else if (nodeLabel === "Flatten") {
              nodeColor = NodeColorProp.Utilities;
            } else if (nodeLabel === "Upsample") {
              nodeColor = NodeColorProp.Vision;
            } else if (nodeLabel === "MSELoss") {
              nodeColor = NodeColorProp.Loss;
            } else if (nodeLabel === "BasicBlock") {
              nodeColor = NodeColorProp.Residual;
            } else if (nodeLabel === "Bottleneck") {
              nodeColor = NodeColorProp.Residual;
            }

            if (i === 0) {
              x_pos = 100;
              y_pos = 100;
            } else if (isBlock) {
              if (y_pos + 330 <= 639) {
                y_pos += 330;
              } else {
                x_pos += 200;
                y_pos = 100;
              }
            } else if (y_pos < 589) {
              y_pos += 70;
            } else {
              x_pos += 200;
              y_pos = 100;
            }

            if (
              String(nodeLabel) === "BasicBlock" ||
              String(nodeLabel) === "Bottleneck"
            ) {
              isBlock = true;
            } else {
              isBlock = false;
            }

            const newNode = {
              id: String(nodeOrder),
              type: "default",
              position: { x: x_pos, y: y_pos },
              sort: "0",
              style: {
                background: `${nodeColor}`,
                width: 135,
                color: "black",
                fontSize: "20px",
                fontFamily: "Helvetica",
                boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)",
                borderRadius: "10px",
                border: "none",
              },
              data: {
                // index: `${nodeOrder}`,
                label: `${nodeLabel}`,
                subparam: `${nodeParam}`,
              },
            };

            const newResidualNode1 = {
              // 노드 내부에 residual block 이미지 넣기 - bottleneck
              id: String(nodeOrder),
              type: "default",
              position: { x: x_pos, y: y_pos },
              sort: "2",
              style: {
                background: `${nodeColor}`,
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
                label: `${nodeLabel}`,
                subparam: `${nodeParam}`,
              },
            };
            const newResidualNode2 = {
              // 노드 내부에 residual block 이미지 넣기 - basic block
              id: String(nodeOrder),
              type: "default",
              position: { x: x_pos, y: y_pos },
              sort: "1",
              style: {
                background: `${nodeColor}`,
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
                label: `${nodeLabel}`,
                subparam: `${nodeParam}`,
              },
            };

            //post the new node
            axios
              .post("/api/node/", {
                order: String(nodeOrder),
                layer: nodeLabel,
                parameters: nodeParam,
              })
              .then(function (response) {
                // console.log(response);
              });


            if (String(nodeLabel) === "Bottleneck") {
              initElements.push(newResidualNode1);
            } else if (String(nodeLabel) === "BasicBlock") {
              initElements.push(newResidualNode2);
            } else {
              initElements.push(newNode);
            }

            // node_id += 1;
            // if ((i % 8 === 7) || (y_pos  > 430)) {
            //   x_pos += 200;
            //   y_pos = 100;
            // } else if((String(nodeLabel) === 'BasicBlock') || (String(nodeLabel) === 'Bottleneck')){
            //   y_pos += 330;
            // } else {
            //   y_pos += 70;
            // }
            node_id += 1;
          }

          for (var j = 0; j < jsonData.edge.length; j++) {
            let edgeId = jsonData.edge[j].id;
            let edgeNext = jsonData.edge[j].next;
            let edgePrior = jsonData.edge[j].prior;

            const newEdge = {
              id: String(edgeId + node_id),
              // id: "reactflow__edge-"+ `${edgePrior}` + "null" + `${edgeNext}` + "null",
              source: String(edgeNext),
              sourceHandle: null,
              target: String(edgePrior),
              targetHandle: null,
            };

            // post the new edge
            axios
              .post("/api/edge/", {
                id: String(edgeId),
                prior: String(edgePrior),
                next: String(edgeNext),
              })
              .then(function (response) {
                // console.log(response);
              });

            initElements.push(newEdge);

            // _id = _id + 1;
          }
          checkFirst = 1;

          console.log(initElements);
          setData([...initElements]);
          setIsLoading(false);
        }
      }
      else if(level === 1 && group === true) {
        // AbstractNetwork_1의 onClickAbstract()안에 있는 response2의 json 파일을 가공한 결과 값을 동일하게 initElement[]에 넣는 것이 가장 중요
        // 화이팅
        axios.post("/api/sort_group/").then(function(response2){
          console.log(response2);
        }).catch(err => console.log(err))

      }
      else if((level === 2 && group === false) || (level === 3 && group === false)) {
        var checkFirst = 0;
        if (checkFirst == 0) {
          //    axios.post("/api/start/", {
          //      start: 0,
          //    }).then(function(response){
          //        console.log(response)
          //        })
          //        .catch(e => console.log(e));
          //그룹 정보 삭제하기
          for (var j=0; j<20; j++){
            axios.delete('/api/sort_group/'.concat(j).concat('/'))
             .then(function (response) {
               // handle success
             })
             .catch(function (error) {
               // handle error
             })
             .then(function () {
               // always executed
             });
          }
          const jsonData = require(`./VGG16_level${level}.json`);
          // node_id 와 edge_id로 json 파일을 읽어 순서대로 새로운 id 를 부여함
          var node_id = 1;
          var edge_id = 1;
          var x_pos = 100;
          var y_pos = 100;
          var isBlock = undefined;
          // isGroup 이 true 이면 배치 할 때 조금 더 멀리
          var isGroup = undefined;
          //파일을 읽어와 조건문을 통과한 다음 그에 맞는 노드와 엣지들이 이 배열에 들어가고
          //그 배열을 화면에 보여줌
          var initElements = [];
          // json 파일에서 파일 output의 길이만큼 읽어옴
          for (var i = 0; i < jsonData.output.length; i++) {
//            let numId = i;
//            let edgeId = i;
//            let edgeNext = i + 1;
//            let edgePrior = i;
            let groupId = jsonData.output[i].groupId;
            let nodeLabel = jsonData.output[i].layer;
            let nodeId = jsonData.output[i].nodeId;
            let groupColor;
            let nodeColor;
            if (groupId === 0) {
                if (nodeLabel === "Conv2d") {
                nodeColor = NodeColorProp.Conv;
              } else if (nodeLabel === "MaxPool2d") {
                nodeColor = NodeColorProp.Pooling;
              } else if (nodeLabel === "AvgPool2d") {
                nodeColor = NodeColorProp.Pooling;
              } else if (nodeLabel === "AdaptiveAvgPool2d") {
                nodeColor = NodeColorProp.Pooling;
              } else if (nodeLabel === "ZeroPad2d") {
                nodeColor = NodeColorProp.Padding;
              } else if (nodeLabel === "ConstantPad2d") {
                nodeColor = NodeColorProp.Padding;
              } else if (nodeLabel === "ReLU") {
                nodeColor = NodeColorProp.Activation;
              } else if (nodeLabel === "ReLU6") {
                nodeColor = NodeColorProp.Activation;
              } else if (nodeLabel === "Sigmoid") {
                nodeColor = NodeColorProp.Activation;
              } else if (nodeLabel === "LeakyReLU") {
                nodeColor = NodeColorProp.Activation;
              } else if (nodeLabel === "Tanh") {
                nodeColor = NodeColorProp.Activation;
              } else if (nodeLabel === "Softmax") {
                nodeColor = NodeColorProp.Activation;
              } else if (nodeLabel === "BatchNorm2d") {
                nodeColor = NodeColorProp.Normalization;
              } else if (nodeLabel === "Linear") {
                nodeColor = NodeColorProp.Linear;
              } else if (nodeLabel === "Dropout") {
                nodeColor = NodeColorProp.Dropout;
              } else if (nodeLabel === "BCELoss") {
                nodeColor = NodeColorProp.Loss;
              } else if (nodeLabel === "CrossEntropyLoss") {
                nodeColor = NodeColorProp.Loss;
              } else if (nodeLabel === "Flatten") {
                nodeColor = NodeColorProp.Utilities;
              } else if (nodeLabel === "Upsample") {
                nodeColor = NodeColorProp.Vision;
              } else if (nodeLabel === "MSELoss") {
                nodeColor = NodeColorProp.Loss;
              } else if (nodeLabel === "BasicBlock") {
                nodeColor = NodeColorProp.Residual;
              } else if (nodeLabel === "Bottleneck") {
                nodeColor = NodeColorProp.Residual;
              }
            }
            else if (groupId === 1) {
                groupColor = GroupColorProp.Group1;}
            else if (groupId === 2) {
                groupColor = GroupColorProp.Group2;}
            else if (groupId === 3) {
              groupColor = GroupColorProp.Group3;}
            else if (groupId === 4) {
                groupColor = GroupColorProp.Group4;}
            else if (groupId === 5) {
                groupColor = GroupColorProp.Group5;}
            else if (groupId === 6) {
                groupColor = GroupColorProp.Group6;}
            else if (groupId === 7) {
                groupColor = GroupColorProp.Group7;}
            else if (groupId === 8) {
                groupColor = GroupColorProp.Group8;}
            else if (groupId === 9) {
                groupColor = GroupColorProp.Group9;}
            else if (groupId === 10) {
                groupColor = GroupColorProp.Group10;}
            // 노드 위치 지정
            if (i === 0) {
              x_pos = 100;
              y_pos = 100;
            }
            else if (isBlock) {
              if (y_pos + 330 <= 639) {
                y_pos += 330;
              } else {
                x_pos += 200;
                y_pos = 100;
              }
            }
            else if(isGroup){
              if (y_pos + 330 <= 639) {
                y_pos += 200;
              } else {
                x_pos += 200;
                y_pos = 100;
              }

            }
            else if (y_pos < 589) {
              y_pos += 70;
            } else {
              x_pos += 200;
              y_pos = 100;
            }

            if (
                String(nodeLabel) === "BasicBlock" ||
                String(nodeLabel) === "Bottleneck"
            ) {
              isBlock = true;
            }
            // Group인 경우는 0이 아닐 때 이다
            else if(String(groupId) != 0)
                isGroup = true;

            else {
              isBlock = false;
              isGroup = false;
            }


            const newNode = {
              id: String(node_id),
              type: "default",
              position: {x: x_pos, y: y_pos},
              sort: "0",
              style: {
                background: `${nodeColor}`,
                width: 135,
                color: "black",
                fontSize: "20px",
                fontFamily: "Helvetica",
                boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)",
                borderRadius: "10px",
                border: "none",
              },
              data: {
                // index: `${nodeOrder}`,
                label: `${nodeLabel}`,
                // subparam: `${nodeParam}`,
              },
            };

            const newResidualNode1 = {
              // 노드 내부에 residual block 이미지 넣기 - bottleneck
              id: String(node_id),
              type: "default",
              position: {x: x_pos, y: y_pos},
              sort: "2",
              style: {
                background: `${nodeColor}`,
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
                label: `${nodeLabel}`,
                // subparam: `${nodeParam}`,
              },
            };

            const newResidualNode2 = {
              // 노드 내부에 residual block 이미지 넣기 - basic block
              id: String(node_id),
              type: "default",
              position: {x: x_pos, y: y_pos},
              sort: "1",
              style: {
                background: `${nodeColor}`,
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
                label: `${nodeLabel}`,
                // subparam: `${nodeParam}`,
              },
            };

            const newGroupNode = {
              id: String(node_id),
              type: "default",
              position: {x: x_pos, y: y_pos},
              sort: "3",
              style: {
                background: `${groupColor}`,
                height: "110px",
                width: 135,
                color: "black",
                fontSize: "20px",
                fontFamily: "Helvetica",
                boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)",
                borderRadius: "10px",
                border: "1px dashed #4E5058",
                textAlign: "center",  // 가로 가운데 정렬
                // 세로 가운데 정렬 (4개 다 써야됨)
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              },
              data: {
                label: `Group${groupId}`,
              },
            };

            //post the new node
            // axios
            //     .post("/api/node/", {
            //       order: String(nodeOrder),
            //       layer: nodeLabel,
            //       parameters: nodeParam,
            //     })
            //     .then(function (response) {
            //       // console.log(response);
            //     });
            // if (String(nodeLabel) === "Bottleneck") {
            //   initElements.push(newResidualNode1);
            // } else if (String(nodeLabel) === "BasicBlock") {
            //   initElements.push(newResidualNode2);
            // } else {
            //   initElements.push(newNode);
            // }

            // node_id += 1;
            // if ((i % 8 === 7) || (y_pos  > 430)) {
            //   x_pos += 200;
            //   y_pos = 100;
            // } else if((String(nodeLabel) === 'BasicBlock') || (String(nodeLabel) === 'Bottleneck')){
            //   y_pos += 330;
            // } else {
            //   y_pos += 70;
            // }
            // node_id += 1;

            if (String(nodeLabel) === "Bottleneck") {
               initElements.push(newResidualNode1);
             } else if (String(nodeLabel) === "BasicBlock") {
               initElements.push(newResidualNode2);
             } else if (groupId != 0) {
               initElements.push(newGroupNode);
             } else {
               initElements.push(newNode);
             }
             node_id++;
           }
          //    edge 설정

          for (var j = 0; j < jsonData.output.length; j++) {
            const newEdge = {
              id: String(edge_id + node_id -1),
              // id: "reactflow__edge-"+ `${edgePrior}` + "null" + `${edgeNext}` + "null",
              source: String(edge_id),
              sourceHandle: null,
              target: String(edge_id+1),
              targetHandle: null,
            };
            initElements.push(newEdge);
            edge_id++;
          }
          //
          checkFirst = 1;
          console.log("initElement");
          console.log(initElements);
          setData([...initElements]);
          setIsLoading(false);
          }
          setIsLoading(false);
      }
    };

    init();
  }, [level, group]);

  return [data, setData, isLoading];
}

export default useInitialArch;
