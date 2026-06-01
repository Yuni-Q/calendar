function n(r){return r===null?"기본값":r<=0?"끔":r>=60&&r%60===0?`${r/60}시간 전`:`${r}분 전`}export{n as f};
