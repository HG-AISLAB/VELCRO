import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles.css";
import styled from "styled-components";
import {ToastParameter} from "./ToastParameter.js";
import {ToastDimension} from "./ToastDimension.js";


function GenerateButton(props){
    let [toastState1, setToastState1] = useState(false);
    let [toastState2, setToastState2] = useState(false);

    const onShow=(event)=>{
        event.preventDefault();
        var data = props.elements;
        data = (Object.values((Object.entries(data))));

        axios.post("/api/pth/")
        .then(function(response){
        console.log(response)
        })
        .catch(e => console.log(e))
    };

      function Rapid_parameter() {
		setToastState1(true);
	    return true;
      }


      function Dimension_error(arr) {
	    if (arr.length !== 0) {
		    setToastState2(true);
		return false;
	    }
	    return true;
      }


    const Inspect = async () => {
        var rapidArr = [];
        var matchArr = [];
        var not_matchIndex = [];
        const bringInfo = (node1, node2) => {
            var nodeArr1 = [];
            var nodeArr2 = [];
            var text_value1 = ''  // 변수 선언
            var text_value2 = ''
            var text2_value1 = ''
            var text2_value2 = ''
            var text3_value1 = ''
            var text3_value2 = ''
            var radio1_value1 = ''
            var radio1_value2 = ''
            var paramArr1 = String(node1.parameters).split(' \n ');
            var paramArr2 = String(node2.parameters).split(' \n ');


            for (var i=0; i<paramArr1.length; i++){

                var param1 = String(paramArr1[i]).replace('"', '');  // 쌍따옴표 제거  ex) 'p' : 0.5
                var param2 = String(paramArr2[i]).replace('"', '');
                var eachParam1 = String(param1).split(': ');  // 파라미터 이름과 값 분리  ex) ['p', 0.5]
                var eachParam2 = String(param2).split(': ');



                switch(i) {  // 파라미터별로 해당 객체 값 설정
                    case 0: // in_channel
                         text_value1 = String(eachParam1[1]);
                         text_value2 = String(eachParam2[1]);
                         nodeArr1.push(text_value1)
                        nodeArr2.push(text_value2)
                        break;
                    case 1: // out_channel
                         text2_value1 = String(eachParam1[1]);
                         text2_value2 = String(eachParam2[1]);
                         nodeArr1.push(text2_value1)
                        nodeArr2.push(text2_value2)
                        break;
                    case 2:  // kernel_size
                        var kernelArray1 = String(eachParam1[1]).split(', ');
                        var kernelArray2 = String(eachParam2[1]).split(', ');
                         text3_value1 = String(kernelArray1[0]).replace("(", "");
                         text3_value2 = String(kernelArray2[0]).replace("(", "");
                         nodeArr1.push(text3_value1)
                        nodeArr2.push(text3_value2)
                        break;
                    case 5: // bias
                        var paddingArray1 = String(eachParam1[1]).split(', ');
                        var paddingArray2 = String(eachParam2[1]).split(', ');
                         radio1_value1 = String(eachParam1[1]);
                         radio1_value2 = String(eachParam2[1]);
                         nodeArr1.push(radio1_value1)
                        nodeArr2.push(radio1_value2)
                }
            }
            var resultArr = [nodeArr1,nodeArr2]
            return (resultArr)
        }

        const Inspect_Rapid = (node1, node2) =>{
            if (node1[3] === 'False') {
                var num_param1 = Number(node1[0]) * Number(node1[1]) * (Number(node1[2]) ** 2)
            }else{ // True, 없을 때
                var num_param1 = Number(node1[0]) * Number(node1[1]) * (Number(node1[2]) ** 2) + Number(node1[1])
            }

            if (node2[3] === 'False') {
                var num_param2 = Number(node2[0]) * Number(node2[1]) * (Number(node2[2]) ** 2)
            }else{ // True, 없을 때
                var num_param2 = Number(node2[0]) * Number(node2[1]) * (Number(node2[2]) ** 2) + Number(node2[1])
            }
            rapidArr.push(Math.abs(num_param2 - num_param1))

        }

        const Inspect_match = (node1, node2) =>{

            if(Number(node1[1]) == Number(node2[0])){

                matchArr.push(true)
            }
            else{
                matchArr.push(false)

            }
        }
        const get_node = async () => {
          try {
            return await axios.get("/api/node/");
          } catch (error) {
            console.error(error);
          }
        };

        const cnode = await get_node();

        var convArr = [];
        var convIndex = [];
        for (var i = 0; i < cnode.data.length; i++) {
          var node1 = cnode.data[i]
            if (node1.layer === 'Conv2d') {
                convArr.push(node1)
                convIndex.push(node1.order)
                if(convArr.length === 2){

                    var nodeInfo = bringInfo(convArr[0], convArr[1])

                    Inspect_Rapid(nodeInfo[0], nodeInfo[1])
                    Inspect_match(nodeInfo[0], nodeInfo[1])

                    convArr.shift()
                }
            }

        }

            var rapid_index = rapidArr.indexOf(Math.max(...rapidArr));

            var rapid_node1 = convIndex[rapid_index]
            var rapid_node2 = convIndex[rapid_index + 1]



            var not_matchidx = [];
            for(var i=0;i<matchArr.length;i++){
                if(matchArr[i] == false){
                    not_matchidx.push(i)
                }
            }

            console.log(matchArr)
            console.log(convIndex)
            console.log(rapid_node1, rapid_node2)

            props.setRapid([...props.rapid,rapid_node1, rapid_node2])

            for(var i=0;i<not_matchidx.length;i++){
                props.setNoMatch([...props.noMatch, convIndex[not_matchidx[i]], convIndex[not_matchidx[i]+1]])

                console.log(convIndex[not_matchidx[i]],convIndex[not_matchidx[i]+1])
            }


//            console.log(convIndex[not_matchidx[0]],convIndex[not_matchidx[0]+1])
//            props.func((nds) => nds.push({
//                rapid:[rapid_node1, rapid_node2],
//                notmatch:[convIndex[not_matchidx[0]],convIndex[not_matchidx[0]+1]]
//            }))



            Rapid_parameter()
            Dimension_error(not_matchidx)

    }



    return(
        <div>
            <button style={{marginRight: 5}} class="btn_fin" onClick={onShow}> Generate </button>
            <button  className="inspect"  onClick={Inspect}>Inspect</button>
            {toastState1 === true ? (
		        <ToastParameter setToastState={setToastState1} />
	        ) : null}
	        {toastState2 === true ? (
		        <ToastDimension setToastState={setToastState2} />
	        ) : null}
        </div>
    )
}

export default GenerateButton;
