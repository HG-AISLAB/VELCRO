import React, { useEffect, useState } from "react";
import axios from "axios";
import NodeColorProp from "./NodeColor";
import GroupColorProp from "./GroupColor";
import BottleNeckimg from "./img/bottleneck.png";
import BasicBlockimg from "./img/basicblock.png";
import Layer from "./components/page/Layer"

function useInitialArch(level, group, setGroup, ungroup, setUngroup) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkFirst, setCheckFirst] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    console.log("useInitialArch useEffect");
    console.log("group", group);
    console.log("ungroup", ungroup);
    const init = async () => {
        function renderData(resData) {
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
                      // node id 의 순서를 리스트로 담는 변수
                      var GNodeIdList =[];
                      // json 파일에서 파일 output의 길이만큼 읽어옴
                      for (var i = 0; i < resData.data.output.length; i++) {
            //            let numId = i;
            //            let edgeId = i;
            //            let edgeNext = i + 1;
            //            let edgePrior = i;
                        let groupId = resData.data.output[i].groupId;
                        // group node라면 group 내에 있는 layer 갯수 몇개인지 담는 변수
                        let numGroupLayer = resData.data.output[i].layer.length;
                        let nodeLabel = resData.data.output[i].layer;
                        let nodeId = resData.data.output[i].nodeId;
                        let parameters = resData.data.output[i].parameters;
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
                          isGroup = false;
                        }
                        // Group인 경우는 0이 아닐 때 이다
                        else if(String(groupId) != 0){
                            isGroup = true;
                            isBlock = false;
                        }
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

                        GNodeIdList.push(node_id);
                        if (String(nodeLabel) === "Bottleneck") {
                           initElements.push(newResidualNode1);
                           node_id++;
                         } else if (String(nodeLabel) === "BasicBlock") {
                           initElements.push(newResidualNode2);
                           node_id++;
                         } else if (groupId != 0) {
                           initElements.push(newGroupNode);
                           node_id = numGroupLayer + node_id;
                         } else {
                           initElements.push(newNode);
                           node_id++;
                         }
                       }
                      //    edge 설정
                      console.log(GNodeIdList);
                      for (var j = 0; j < resData.data.output.length; j++) {
                        const newEdge = {
                          id: String(edge_id),
                          // id: "reactflow__edge-"+ `${edgePrior}` + "null" + `${edgeNext}` + "null",
                          source: String(GNodeIdList[j]),
                          sourceHandle: null,
                          target: String(GNodeIdList[j+1]),
                          targetHandle: null,
                        };
                        initElements.push(newEdge);
                        edge_id++;
                      }
                      //
                      console.log("initElements", initElements);
                      setData([...initElements]);
                      setIsLoading(false);

              }

        // ------Auto Group level1 ------\\
        if(level === 1 && checkFirst !== 1){
            console.log("// ------Auto Group level1 ------\\");
          if(checkFirst === 0 ){
            console.log("// ------Auto Group level1 맨 처음 실행코드------\\");

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
            axios.delete('/api/ungroupid/'.concat(j).concat('/'))
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
//          console.log(jsonData);
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

          console.log(initElements);
          setData([...initElements]);
          setIsLoading(false);
          setCheckFirst(1);
        }
          else{
           console.log("level1 두번째부터 실행하는 코드");
            axios.get("/api/group/").then(function(response2){

                    console.log("get 여기!!!!", response2.data);

                    console.log("get", response2.data[0].group_id);
                    var group_ids = 0
                    for (var a=0; a<response2.data.length; a++){

                        group_ids = response2.data[a].group_id
                        axios.post("/api/ungroupid/", {id: 1, ungroup_id: group_ids,}).then(function (response2){

                            axios.post("/api/sort_ungroup/").then(function (response3){
                                axios.delete('/api/group/'.concat(group_ids).concat('/'))
                                 .then(function (response) {})
                                 .catch(function (error) {})

                                console.log("이 json을 화면에 띄워주세요!", response3);
                                renderData(response3);
                            });
                        });
                    }
            });

            }
          }

        // ------ Custom Group ------\\
        else if (level===1 && checkFirst === 1){
            console.log("// ------Custom Group ------\\");
            // ------Custom Group 변동시 ------\\
            if(ungroup === true){
                console.log("ungroup==true");
                axios.post("/api/sort_ungroup/").then(function (response3){
                console.log(response3);
                renderData(response3);
                }).catch(err => console.log(err));
                setUngroup(false);
            }
           else if(group == true){
                //그룹 정보 삭제하기
                for (var j=0; j<60; j++){
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
                setGroup(false);
            }

           else{
            console.log("// ------Custom Group 변동시 group === false ------\\");
                axios.post("/api/sort_group/")
                .then(function(response2){
                    console.log("response2", response2);
                renderData(response2);
                })
                .catch(err => console.log(err));
            }
        }

        // ------ Auto group level 2 or level3 ------\\
        else if (level === 2){
            let Gid = 0;
            console.log("// ------ Auto group level2 ------\\");

            axios.get("/api/group/").then(function(response2){

                    console.log("get 여기!!!!", response2.data);

                    console.log("get", response2.data[0].group_id);
                    var group_ids = 0
                    for (var a=0; a<response2.data.length; a++){

                        group_ids = response2.data[a].group_id
                        axios.post("/api/ungroupid/", {id: 1, ungroup_id: group_ids,}).then(function (response2){

                            axios.post("/api/sort_ungroup/").then(function (response3){
                                axios.delete('/api/group/'.concat(group_ids).concat('/'))
                                 .then(function (response) {})
                                 .catch(function (error) {})

                                console.log("이 json을 화면에 띄워주세요!", response3);

//                                // AutoGroup Level2 백엔드 코드
                               var Gid = 0
                                axios.post("/api/group/", {
                                        group_id: ++Gid,
                                        layer_type: ['Conv2d', 'BatchNorm2d', 'ReLU']
                                    }).then(function (response) {
                                        console.log(response);
                                    }).catch(err => console.log(err))

                                    axios.post("/api/sort_group/").then(function(response2){
                                        console.log("level2 json", response2);
                                        renderData(response2);
                                    }).catch(err => console.log(err));


                            });

                        });
                    }
                });


            setCheckFirst(2);
        }
        else if(level===3){
        let Gid = 0;
             console.log("// ------ Auto group level3 ------\\");
            axios.get("/api/group/").then(function(response2){

                    console.log("get 여기!!!!", response2.data);

                    console.log("get", response2.data[0].group_id);
                    var group_ids = 0
                    for (var a=0; a<response2.data.length; a++){

                        group_ids = response2.data[a].group_id
                        axios.post("/api/ungroupid/", {id: 1, ungroup_id: group_ids,}).then(function (response2){

                            axios.post("/api/sort_ungroup/").then(function (response3){
                                axios.delete('/api/group/'.concat(group_ids).concat('/'))
                                 .then(function (response) {})
                                 .catch(function (error) {})

                                console.log("이 json을 화면에 띄워주세요!", response3);

//

                                // AutoGroup Level3 백엔드 코드
                                   axios.post("/api/group/", {
                                        group_id: ++Gid,
                                        layer_type: ["Conv2d", "BatchNorm2d", "ReLU", "Conv2d", "BatchNorm2d", "ReLU", "MaxPool2d"]
                                    }).then(function (response) {
                                        console.log(response);
                                    }).catch(err => console.log(err))

                                    axios.post("/api/sort_group/").then(function(response2){
                                        //console.log("level2 json", response2);
                                    }).catch(err => console.log(err));

                                   axios.post("/api/group/", {
                                        group_id: ++Gid,
                                        layer_type: ["Conv2d", "BatchNorm2d", "ReLU", "Conv2d", "BatchNorm2d", "ReLU", "Conv2d", "BatchNorm2d", "ReLU", "MaxPool2d"]
                                    }).then(function (response) {
                                        console.log(response);
                                    }).catch(err => console.log(err))

                                    axios.post("/api/sort_group/").then(function(response2){
                                        console.log("level3 json", response2);
                                        renderData(response2);
                                    }).catch(err => console.log(err));
                            });

                        });
                    }
                });

            setCheckFirst(2);

        }

    };
    init();
  }, [level, group, setGroup, ungroup, setUngroup]);

  return [data, setData, isLoading];
}

export default useInitialArch;
