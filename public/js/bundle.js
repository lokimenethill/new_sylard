(()=>{"use strict";console.log("webpack junciona"),((o="hola")=>{alert(o)})(),async function(){console.log("llamando");const o=await new Promise((o=>{setTimeout((()=>{o("resuelto")}),2e3)}));console.log(o)}()})();