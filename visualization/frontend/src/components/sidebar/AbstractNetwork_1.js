import React, { useState, useEffect } from "react";
import { clickedNodeList } from "../page/Layer";
import axios from "axios";
import "../../styles.css";

let Gid_1 = 0;
let Gid_2 = 0;
let Gid_3 = 0;
var cF = 0;
let accumulatedToggleList = [];
let nodeList = [];

const getNodeContent = (node) => {
  switch (node) {
    case "Conv2d":
      return <div className="dndnode_Conv2d">Conv2d</div>;
    case "MaxPool2d":
      return <div className="dndnode_MaxPool2d">MaxPool2d</div>;
    case "AvgPool2d":
      return <div className="dndnode_AvgPool2d">AvgPool2d</div>;
    case "AdaptiveAvgPool2d":
      return <div className="dndnode_AdaptiveAvgPool2d">AdaptiveAvgPool2d</div>;
    case "ZeroPad2d":
      return <div className="dndnode_ZeroPad2d">ZeroPad2d</div>;
    case "ConstantPad2d":
      return <div className="dndnode_ConstantPad2d">ConstantPad2d</div>;
    case "ReLU":
      return <div className="dndnode_ReLU">ReLU</div>;
    case "ReLU6":
      return <div className="dndnode_ReLU6">ReLU6</div>;
    case "Sigmoid":
      return <div className="dndnode_Sigmoid">Sigmoid</div>;
    case "LeakyReLU":
      return <div className="dndnode_LeakyReLU">LeakyReLU</div>;
    case "Tanh":
      return <div className="dndnode_Tanh">Tanh</div>;
    case "Softmax":
      return <div className="dndnode_Softmax">Softmax</div>;
    case "BatchNorm2d":
      return <div className="dndnode_BatchNorm2d">BatchNorm2d</div>;
    case "Linear":
      return <div className="dndnode_Linear">Linear</div>;
    case "Dropout":
      return <div className="dndnode_Dropout">Dropout</div>;
    case "BCELoss":
      return <div className="dndnode_BCELoss">BCELoss</div>;
    case "CrossEntropyLoss":
      return <div className="dndnode_CrossEntropyLoss">CrossEntropyLoss</div>;
    case "Flatten":
      return <div className="dndnode_Flatten">Flatten</div>;
    case "Upsample":
      return <div className="dndnode_Upsample">Upsample</div>;
    case "MSELoss":
      return <div className="dndnode_MSELoss">MSELoss</div>;

    default:
      return null;
  }
};
const ToggleContent = ({ groupInfo }) => {
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

const AbstractNetwork_1 = ({
  onClickLevel,
  onClickGroup,
  group,
  onClickUngroup,
  ungroup,
}) => {
  const [currentGroupId, setCurrentGroupId] = useState(1);
  //  const [toggleList, setToggleList] = useState([]);
  const get_layer_type = [];
  const addToToggleList = (id, nodes) => {
    //  setToggleList(accumulatedToggleList => [
    //    ...accumulatedToggleList,
    //    { id: id, nodes: nodes }
    //  ]);
    //  accumulatedToggleList.push(toggleList);
    accumulatedToggleList.push({ id: id, nodes: nodes });
  };

  useEffect(() => {
    const handleChangeGroup = async () => {
      if (group === false && cF === 1) {
        // group 값이 false로 변경되었을 때 실행할 로직
        /* setToggleList(prevToggleList => [...prevToggleList, { id: Gid_1, nodes: clickedNodeList }]);
         if (clickedNodeList.length > 1) {
            nodeList = clickedNodeList;
            addToToggleList(Gid_1, nodeList);
        } 
      */
        cF = 0;
      } else {
        if (clickedNodeList.length > 1) {
          try {
            const res = await axios.post("/api/group/", {
              group_id: ++Gid_1,
              layer_type: clickedNodeList,
            });

            nodeList = clickedNodeList;
            addToToggleList(Gid_1, nodeList);
          } catch {
            console.error("/api/group post 요청 에러");
          }
        }
        onClickGroup(false);
        cF = 1;
        console.log(" accumulatedToggleList", accumulatedToggleList);
      }
    };
    handleChangeGroup();
  }, [group]);

  const onClickUnAbstract = () => {
    console.log(ungroup);
    // 배열에서 숫자만 추출하는 함수
    function extractNumbers(arr) {
      const result = [];
      for (const item of arr) {
        // 정규 표현식을 사용하여 숫자만 추출
        const matches = item.match(/\d+/);
        if (matches) {
          // 추출된 숫자를 정수로 변환하여 결과 배열에 추가
          return parseInt(matches[0], 10);
        }
      }
      return -1;
    }

    const ungroup_ids = extractNumbers(clickedNodeList);
    console.log(ungroup_ids); // 1 이렇게 숫자 하나 나옴

    axios
      .delete("/api/group/" + ungroup_ids + "/")
      .then(function (response) {
        //console.log(response);
      })
      .catch((err) => console.log(err));

    axios
      .post("/api/ungroupid/", { id: 1, ungroup_id: ungroup_ids })
      .then(function (response2) {
        //console.log(response2);
        axios
          .post("/api/sort_ungroup/")
          .then(function (response3) {
            console.log(response3);
          })
          .catch((err) => console.log(err));
      });
    //        setToggleList([...toggleList, { id: currentGroupId, nodes: clickedNodeList }]);

    // 토글 값 변경
    // accumulatedToggleList에서 id가 ungroup_ids와 일치하지 않는 항목만 필터링하여 새로운 배열 생성
    const newToggleList = accumulatedToggleList.filter(
      (item) => item.id !== ungroup_ids
    );

    // 새로운 배열을 설정하여 해당 항목을 제거
    accumulatedToggleList = newToggleList;

    console.log("accumulatedToggleList", accumulatedToggleList);
    onClickUngroup(true);
    console.log("unroup 후", ungroup);
  };

  const getToggleContent = (groupId) => {
    console.log("getToggleContent 실행중~");

    const groupInfo = accumulatedToggleList.find((item) => item.id === groupId);
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
              Gid_1 = 0;
              Gid_2 = 0;
              Gid_3 = 0;
              accumulatedToggleList = [];
              onClickLevel(1);
            }}
          >
            Level 1
          </button>
          <button
            type="button"
            className="AbstractBtn"
            onClick={async () => {
              try {
                //@TODO : 현재 있는 모든 그룹 언그룹하는 로직
                const res = await axios.post("/api/group/", {
                  group_id: 1,
                  layer_type: ["Conv2d", "BatchNorm2d", "ReLU"],
                });

                addToToggleList(1, ["Conv2d", "BatchNorm2d", "ReLU"]);
              } catch {
                console.error("/api/group post 요청 에러");
              }
              onClickLevel(2);
              onClickGroup(false);
            }}
          >
            Level 2
          </button>
          <button
            type="button"
            className="AbstractBtn"
            onClick={async () => {
              const group1 = [
                "Conv2d",
                "BatchNorm2d",
                "ReLU",
                "Conv2d",
                "BatchNorm2d",
                "ReLU",
                "MaxPool2d",
              ];
              const group2 = [
                "Conv2d",
                "BatchNorm2d",
                "ReLU",
                "Conv2d",
                "BatchNorm2d",
                "ReLU",
                "Conv2d",
                "BatchNorm2d",
                "ReLU",
                "MaxPool2d",
              ];
              try {
                //@TODO : 현재 있는 모든 그룹 언그룹하는 로직
                await axios.post("/api/group/", {
                  group_id: 1,
                  layer_type: group1,
                });
                addToToggleList(1, group1);
                await axios.post("/api/group/", {
                  group_id: 2,
                  layer_type: group2,
                });
                addToToggleList(2, group2);
              } catch {
                console.error("/api/group post 요청 에러");
              }
              onClickLevel(3);
              onClickGroup(false);
            }}
          >
            Level 3
          </button>
        </div>
        <div className="CustomGroup">
          <div className="GroupText"> Custom Group </div>
          <button
            type="button"
            onClick={() => onClickGroup(true)}
            className="AbstractBtn"
          >
            Group
          </button>
          <button
            type="button"
            onClick={onClickUnAbstract}
            className="AbstractBtn"
          >
            Ungroup
          </button>
        </div>
        <div className="GroupInformation">
          <div className="GroupText"> Group Information </div>
          {accumulatedToggleList.map((item) => (
            <details key={item.id} className={`Group${item.id}`}>
              <summary className="layerName">Group {item.id}</summary>
              <ToggleContent groupInfo={item} />
            </details>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default AbstractNetwork_1;
