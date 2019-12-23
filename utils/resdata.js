//公共数据输出
/*初始化返回数据类*/
module.exports =function(suc,res,err){
    this.suc=suc==1?true:false;
    this.stateCode=suc==1?0:-1;
    suc!==1?this.msg=err||"操作失败":'';
    this.data=(suc==1&&res)?res:0;
};

