import{j as p,k as h,_ as m,a as g,f as i,m as c,r as b,o,c as a,e as t,F as d,h as k,n as y,t as n,b as f,w as v,d as l,i as T,p as V,l as I}from"./index-b003f6f4.js";import{s as S,c as E}from"./cartStore-8ab3b1a5.js";const{VITE_PATH:$,VITE_URL:w}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"key0329",VITE_TEXT:"這是產品的環境",BASE_URL:"/2022-Vue-week6/",MODE:"production",DEV:!1,PROD:!0},r=p("products",{state:()=>({products:[]}),actions:{getProductsData(){h.get(`${w}/api/${$}/products/all`).then(e=>{this.products=e.data.products}).catch(e=>{alert(e.response.data.message)})}}});const P={components:{RouterLink:g},computed:{...i(r,["products"]),...i(S,["loadingItem"])},methods:{...c(r,["getProductsData"]),...c(E,["addToCart"])},mounted(){this.getProductsData();const e=this.$loading.show();setTimeout(()=>{e.hide()},1e3)}},_=e=>(V("data-v-43b61874"),e=e(),I(),e),C=_(()=>t("h2",{class:"my-5"},"這是產品列表",-1)),D={class:"container"},L={class:"table align-middle"},R=_(()=>t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1)),x={style:{width:"200px"}},A={key:0,class:"h5"},B={key:1},N={class:"h6"},U={class:"h5"},F={class:"btn-group btn-group-sm"},H=["onClick"],O={key:0,class:"fas fa-spinner fa-pulse"};function j(e,z,M,X,q,G){const u=b("RouterLink");return o(),a(d,null,[C,t("div",D,[t("table",L,[R,t("tbody",null,[(o(!0),a(d,null,k(e.products,s=>(o(),a("tr",{key:s.id},[t("td",x,[t("div",{class:"product-pic",style:y({backgroundImage:`url(${s.imageUrl})`}),alt:""},null,4)]),t("td",null,n(s.title),1),t("td",null,[s.price===s.origin_price?(o(),a("div",A,n(s.price)+" 元 ",1)):(o(),a("div",B,[t("del",N,"原價 "+n(s.origin_price)+" 元",1),t("div",U,"現在只要 "+n(s.price)+" 元",1)]))]),t("td",null,[t("div",F,[f(u,{class:"btn btn-outline-secondary",to:`product/${s.id}`},{default:v(()=>[l(" 查看更多 ")]),_:2},1032,["to"]),t("button",{type:"button",class:"btn btn-outline-danger",onClick:J=>e.addToCart(s.id)},[s.id===e.loadingItem?(o(),a("i",O)):T("",!0),l(" 加到購物車 ")],8,H)])])]))),128))])])])],64)}const W=m(P,[["render",j],["__scopeId","data-v-43b61874"]]);export{W as default};
