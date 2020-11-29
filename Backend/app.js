require("dotenv").config();     
const express = require("express");
const bp = require("body-parser");
const firebaseApp=require(__dirname + "/firebaseApp.js");
const matchingAlgo=require(__dirname + "/matchingAlgo.js");
const cors = require('cors');

const app = express();

app.use(bp.urlencoded({
    extended: true
}));


app.use(cors()) 

function indexOfUid(array, item) {
    for (let i=0;i<array.length;i++) {
        if (array[i][1]==item) {
            return i;
        }
    }
    return -1;
}

app.get("/",(req,res)=>{
    res.write("<h1>This is the API of Roomner</h1>")
    res.write("<h1>/uid does matching algo calculation on provided uid</h1>")
    res.write("<h1>/end/uid negates all scores of uid and its occurence in others array</h1>")
    res.send();
})

app.get("/:id", (req, res) => {  
    const uid= req.params.id;   
    firebaseApp.database().ref('user').once('value')
    .then((usersObjRef)=>{

        var allUserObject=usersObjRef.val();
        const thisUserAnswerArray=allUserObject[uid].answerArray;

        const otherUsersAnswerArrays=Object.keys(allUserObject).map((otherUserUid)=>{
            return [otherUserUid,...allUserObject[otherUserUid].answerArray];
        })

        var scoresArray=[];
        scoresArray=otherUsersAnswerArrays.map((element)=>{
            //Match Score
            let result = matchingAlgo(thisUserAnswerArray,element);
            //Handle Gender Difference
            if(allUserObject[uid].userPersonalInfoObj.gender!=allUserObject[element[0]].userPersonalInfoObj.gender)
                result=result>0?result*(-1):result;
            //Handle Dont'Recommend
            if(allUserObject[uid].recommend==0||allUserObject[element[0]].recommend==0)
                result=result>0?result*(-1):result;
            //Handle Same User
            if(uid==element[0])
                result=result>0?result*(-1):result;
            //Return Score
            return [result,element[0]];
        })
        scoresArray.sort((a,b)=>{return b[0]-a[0]});

        firebaseApp.database().ref('userScore/'+uid).set({
            scoresArray:scoresArray
        })
        .then(response=>{
            firebaseApp.database().ref('userScore/').once('value')
            .then((userScoreObjRef)=>{
                var usersScoreObject=userScoreObjRef.val();
                var updates = {};
                scoresArray.forEach((element)=>{
                    let flagUpdateOrPush=0;
                    if(element[1]!=uid){
                        if(usersScoreObject[element[1]]){
                            usersScoreObject[element[1]].scoresArray.forEach((ele,i)=>{
                                if(ele[1]==uid){
                                    flagUpdateOrPush=1;
                                    usersScoreObject[element[1]].scoresArray[i]=[element[0],uid];
                                    var currArr=usersScoreObject[element[1]].scoresArray;
                                    currArr.sort((a,b)=>{return b[0]-a[0]});
                                    updates['userScore/'+element[1]+'/scoresArray']=currArr;
                                }
                            })
                            if(flagUpdateOrPush==0){
                                var currArr=[...usersScoreObject[element[1]].scoresArray,[element[0],uid]];
                                currArr.sort((a,b)=>{return b[0]-a[0]});
                                updates['userScore/'+element[1]+'/scoresArray']=currArr;
                            }
                        }//handled big error if some didnt pressed Ping API for first time and other did
                    }
                })
                firebaseApp.database().ref().update(updates)
                .then((response)=>{
                    const scoresArrayFiltered = scoresArray.filter((ele)=>{
                        return ele[0]>0;
                    })
                    const recommendationArray=scoresArrayFiltered.map((ele)=>{
                        return [allUserObject[ele[1]].userPersonalInfoObj,ele[0]]
                    })
                    res.send(recommendationArray)
                })
                .catch((error)=>{
                    res.send("RoomnerAPI : Error11")
                });
            })
            .catch((error)=>{
                res.send("RoomnerAPI : Error12")
            })
        })
        .catch((error)=>{
            res.send("RoomnerAPI : Error13")
        })
    })
    .catch((error)=>{
        res.send("RoomnerAPI : Error14")
    });
})

app.get("/end/:id",(req,res)=>{
    const uid= req.params.id;
    var updates = {};
    firebaseApp.database().ref('userScore').once('value')
    .then((userScoreObjRef)=>{
        let userScoreObj = userScoreObjRef.val();
        let userNegatedArray=userScoreObj[uid].scoresArray.map((pair)=>{
            if(pair[0]>0){
                return [(-1*pair[0]),pair[1]];
            }else{
                return [...pair];
            }
        })
        userNegatedArray.sort((a,b)=>{return b[0]-a[0]});
        updates['userScore/'+uid+'/scoresArray']=userNegatedArray;
        Object.keys(userScoreObj).map((otherUserUid)=>{
            if(otherUserUid!=uid){
                let negateIndex=indexOfUid(userScoreObj[otherUserUid].scoresArray,uid);

                let originalValue=userScoreObj[otherUserUid].scoresArray[negateIndex][0];
                originalValue=originalValue>0?(-1)*originalValue:originalValue;

                userScoreObj[otherUserUid].scoresArray[negateIndex][0]=originalValue;

                let newUserScoreArray=userScoreObj[otherUserUid].scoresArray;
                newUserScoreArray.sort((a,b)=>{return b[0]-a[0]});

                updates['userScore/'+otherUserUid+'/scoresArray']=newUserScoreArray;
            }
        })
        firebaseApp.database().ref().update(updates)
        .then((response)=>{
            res.send("RoomnerAPI : Your values are negated");
        })
        .catch((error)=>{
            res.send("RoomnerAPI : Error21 encountered");
        })
    })
    .catch((error)=>{
        res.send("RoomnerAPI : Error22 encountered");
    })
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
});

