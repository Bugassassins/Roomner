function matchingAlgo(subject1,subject2){
    var p_res=0;
    var q_res=0;
    var totp=0;
    var totq=0;
    var res;
    for(var i=0;i<15;i++){
        if(subject1[i][1]==subject2[i+1][0]){
            p_res+=subject1[i][2];
        } 
        if(subject1[i][0]==subject2[i+1][1]){
            q_res+=subject2[i+1][2];
        }
        totp+=subject1[i][2];
        totq+=subject2[i+1][2];
    }
    var percent_p=p_res/totp;
    var percent_q=q_res/totq;
    res=Math.sqrt(percent_p*percent_q);
    return res;
}
module.exports=matchingAlgo;