import{j as d,k as e}from"./index-6133b7c3.js";const n=d("status",{state:()=>({loadingItem:""}),actions:{}}),i=n(),{VITE_PATH:s,VITE_URL:r}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"key0329",VITE_TEXT:"這是產品的環境",BASE_URL:"/2022-Vue-week6/",MODE:"production",DEV:!1,PROD:!0},h=d("cart",{state:()=>({cart:{}}),actions:{getCartsData(){e.get(`${r}/api/${s}/cart`).then(t=>{this.cart=t.data.data}).catch(t=>{alert(t.response.data.message)})},addToCart(t,a=1){const o={product_id:t,qty:a};i.loadingItem=t,e.post(`${r}/api/${s}/cart`,{data:o}).then(()=>{this.getCartsData(),i.loadingItem="",alert("已加入購物車")}).catch(c=>{alert(c.response.data.message)})},updateCartItem(t){const a={product_id:t.product.id,qty:t.qty};this.loadingItem=t.id,e.put(`${r}/api/${s}/cart/${t.id}`,{data:a}).then(()=>{this.getCartsData(),this.loadingItem="",alert("已更新購物車")}).catch(o=>{alert(o.response.data.message)})},deleteCartItem(t){this.loadingItem=t.id,e.delete(`${r}/api/${s}/cart/${t.id}`).then(()=>{this.getCartsData(),this.loadingItem="",alert("已刪除該筆訂單")}).catch(a=>{alert(a.response.data.message)})},deleteAllCart(){e.delete(`${r}/api/${s}/carts`).then(()=>{this.getCartsData(),alert("已清空購物車")}).catch(t=>{alert(t.response.data.message)})}}});export{h as c,n as s};