
//지뢰 배열
const bombNum = [];
while (bombNum.length < 15) {
    let randomNum = Math.floor(Math.random() * 100);
    if (!bombNum.includes(randomNum)) {
        bombNum.push(randomNum);
    }
}
let finish = false;

//DOMContentLoaded -> innerHTML 쓸때 라이프싸이클 마지막으로 조정하는값
document.addEventListener('DOMContentLoaded',function(){
    const board = document.getElementById('bomb-board');
    let html = '';
    for(var i=0;i<10;i++){
        html += "<tr>";
        for(var j=0;j<10;j++){
            html += "<td data-num='"+((i*10)+j)+"' oncontextmenu='return false;' onclick='clickTd(event)'>";
            html += " ";
            html += "</td>";
        }
        html += "</tr>";
    }
    board.innerHTML = html;
});
let mouseClick = 0;
let resultCnt = 0;
document.addEventListener('mousedown', function() {
    if(event.button === 0){
        mouseClick = 0;
    } else if(event.button === 2){
        mouseClick = 1;
        clickTd(event);
    }
});

function clickTd(event){
    if(finish === true){
        return false;
    }
    const target = event.target;
    let Num = parseInt(target.dataset.num);
    if(mouseClick === 0){
        if (bombNum.includes(Num)) {
            //지뢰 펑
            alert('지뢰발견');
            bombNum.forEach(element => {
                let bombtarget = document.querySelector('[data-num="'+element+'"]');
                bombtarget.innerHTML = "<img src='bomb.png' class='bomb'>"; 
            });
            finish = true;
        } else{
            // 지뢰 아닐때
            let bombIdx = 0;
            if(Num % 10 !== 9){
                if(bombNum.includes(Num+1)){
                    bombIdx++;
                }
                if(bombNum.includes(Num-9)){
                    bombIdx++;
                }
                if(bombNum.includes(Num+11)){
                    bombIdx++;
                }
            }
            if(Num % 10 !== 0){
                if(bombNum.includes(Num-1)){
                    bombIdx++;
                }
                if(bombNum.includes(Num-11)){
                    bombIdx++;
                }
                if(bombNum.includes(Num+9)){
                    bombIdx++;
                }
            }
            if(bombNum.includes(Num-10)){
                bombIdx++;
            }
            if(bombNum.includes(Num+10)){
                bombIdx++;
            }
            let bombtarget = document.querySelector('[data-num="'+Num+'"]');
            bombtarget.classList.remove('finish');
            if(bombIdx === 0){
                if(Num < 90){
                    let opentarget = document.querySelector('[data-num="'+(Num+10)+'"]');
                    opentarget.click();
                }
                if(Num > 9){
                    opentarget = document.querySelector('[data-num="'+(Num-10)+'"]');
                    opentarget.click();
                }
                if(Num % 10 !== 9){
                    let opentarget = document.querySelector('[data-num="'+(Num+1)+'"]');
                    opentarget.click();
                }
                if(Num % 10 !== 0){
                    let opentarget = document.querySelector('[data-num="'+(Num-1)+'"]');
                    opentarget.click();
                }  
            } else{
                bombtarget.innerHTML = bombIdx;
            }
            if(!bombtarget.classList.contains('open')){
                resultCnt++;
            } 
            bombtarget.classList.add('open');
            if(resultCnt >= 85){
                alert("지뢰찾기 성공!");
                finish = true;
            }
        }
    } else{
        let bombtarget = document.querySelector('[data-num="'+Num+'"]');
        bombtarget.innerHTML = '';
        bombtarget.classList.add('finish');
    }
}

function retry(){
    location.reload();
}
