(()=>{"use strict";const e=class{constructor(e=!1){this.isCPU=e}getPossibleTargets(e){let t=e.board,l=[];return t.forEach((e=>{e.forEach((e=>{e.isStruck||l.push({x:e.x,y:e.y})}))})),l}pickRandomTarget(e){let t=this.getPossibleTargets(e);return t[Math.floor(Math.random()*t.length)]}},t=(e,t="")=>({length:e,timesHit:0,shipName:t,hit(){this.timesHit+=1},isSunk(){return this.timesHit==this.length}}),l=e=>({board:(e=>{let t=[];for(let l=0;l<e;l++){let r=[];for(let t=0;t<e;t++)r.push({x:t,y:l,contents:null,isStruck:!1});t.push(r)}return t})(e),ships:[t(5,"Carrier"),t(4,"Battleship"),t(3,"Destroyer"),t(3,"Submarine"),t(2,"Patrol Boat")],getCell(e,t){return this.board[t][e]},placeShip(e,t,l,r){if(r)for(let r=0;r<this.ships[e].length;r++)this.getCell(t,l+r).contents=this.ships[e];else for(let r=0;r<this.ships[e].length;r++)this.getCell(t+r,l).contents=this.ships[e]},isValidPlacement(t,l,r,a){let s=!0,n=this.ships[t].length;if(a)if(r+n>e)s=!1;else for(let e=0;e<this.ships[t].length;e++)this.getCell(l,r+e).contents&&(s=!1);else if(l+n>e)s=!1;else for(let e=0;e<this.ships[t].length;e++)this.getCell(l+e,r).contents&&(s=!1);return s},recieveAttack(e,t){this.getCell(e,t).contents&&this.getCell(e,t).contents.hit(),this.getCell(e,t).isStruck=!0},areAllShipsSunk(){return this.ships.every((e=>e.isSunk()))},randomlyPlaceShips(){for(let t=0;t<this.ships.length;t++){let l=Math.floor(Math.random()*e),r=Math.floor(Math.random()*e),a=Math.random()<.5;for(;!this.isValidPlacement(t,l,r,a);)l=Math.floor(Math.random()*e),r=Math.floor(Math.random()*e),a=Math.random()<.5;this.placeShip(t,l,r,a)}},printBoard(){let e="";for(let t=0;t<this.board.length;t++){let l="";for(let e=0;e<this.board.length;e++)null==this.getCell(e,t).contents?this.getCell(e,t).isStruck?l+="[X]":l+="[ ]":this.getCell(e,t).isStruck?l+="[ⓧ]":l+="[O]";e+=`${l}\n`}return e}}),r=document.querySelector(".p1Board"),a=document.querySelector(".p2Board"),s=document.querySelector(".p1ShipsSunk"),n=document.querySelector(".p2ShipsSunk"),i=document.querySelector(".p1Name"),o=document.querySelector(".p2Name"),h=new class{constructor(){this.p1=new e,this.p2=new e(!0),this.p1Gameboard=l(10),this.p2Gameboard=l(10),this.gameIsOver=!1}};let d=0;function p(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function c(e){if(!h.gameIsOver){h.p2Gameboard.recieveAttack(e.x,e.y),p(a),a.appendChild(u(2,h.p2Gameboard,c));let t=h.p2.pickRandomTarget(h.p1Gameboard);h.p1Gameboard.recieveAttack(t.x,t.y),p(r),r.appendChild(u(1,h.p1Gameboard,c)),m(),console.log(`clicked cell: ${e.x}, ${e.y}`),(h.p1Gameboard.areAllShipsSunk()||h.p2Gameboard.areAllShipsSunk())&&(h.gameIsOver=!0,function(){let e=h.p1Gameboard.areAllShipsSunk(),t=h.p2Gameboard.areAllShipsSunk();e&&!t?(i.textContent+=" LOSES",o.textContent+=" WINS",alert("Game over! Player 2 Wins!")):t&&!e?(i.textContent+=" WINS",o.textContent+=" LOSES",alert("Game over! Player 1 Wins!")):(i.textContent+=" DRAWS",o.textContent+=" DRAWS",alert("Game over! Draw!"))}())}}function m(){s.textContent="",n.textContent="",h.p1Gameboard.ships.forEach((e=>{e.isSunk()&&(s.textContent+=`🛳️${e.shipName}(${e.length})`)})),h.p2Gameboard.ships.forEach((e=>{e.isSunk()&&(n.textContent+=`🛳️${e.shipName}(${e.length})`)}))}function u(e,t,l){const r=document.createElement("div");let a=t.board;for(let s=0;s<a.length;s++)for(let n=0;n<a[s].length;n++){let a=t.getCell(n,s),i="";const o=document.createElement("button");o.style.height="100%",o.style.borderWidth="1px",i="lightsteelblue",a.isStruck||2!=e||o.addEventListener("click",(()=>{l(a)})),a.contents?a.isStruck?(i="black",o.textContent="💥",o.style.fontSize="1.5em"):i="grey":a.isStruck&&(i="darkcyan",o.textContent="❌"),2!=e||a.isStruck||(i="darkgrey"),o.style.backgroundColor=i,r.appendChild(o)}return r.style.display="grid",r.style.gridTemplateRows=`repeat(${t.board.length}, 1fr)`,r.style.gridTemplateColumns=`repeat(${t.board[0].length}, 1fr)`,r.style.width="100%",r.style.height="100%",r}!function e(){p(r);const t=document.createElement("div");let l=h.p1Gameboard.board;if(d<h.p1Gameboard.ships.length){for(let r=0;r<l.length;r++)for(let a=0;a<l[r].length;a++){let l=h.p1Gameboard.getCell(a,r),s="";const n=document.createElement("button");n.style.height="100%",n.style.borderWidth="1px",l.contents?s="black":n.addEventListener("click",(()=>{if(d<h.p1Gameboard.ships.length){let t=confirm(`Place ${h.p1Gameboard.ships[d].shipName} vertically? \n OK = Vertical, Cancel = Horizontal`);h.p1Gameboard.isValidPlacement(d,l.x,l.y,t)?(h.p1Gameboard.placeShip(d,l.x,l.y,t),d+=1):alert("Invalid placement! Try again"),e()}})),n.style.backgroundColor=s,t.appendChild(n)}t.style.display="grid",t.style.gridTemplateRows=`repeat(${h.p1Gameboard.board.length}, 1fr)`,t.style.gridTemplateColumns=`repeat(${h.p1Gameboard.board[0].length}, 1fr)`,t.style.width="100%",t.style.height="100%",r.appendChild(t),alert(`Placing ${h.p1Gameboard.ships[d].shipName} (${h.p1Gameboard.ships[d].length} unit)`)}else alert("Ships placed! Game start!"),h.p2Gameboard.randomlyPlaceShips(),r.appendChild(u(1,h.p1Gameboard,c)),a.appendChild(u(2,h.p2Gameboard,c)),m()}()})();