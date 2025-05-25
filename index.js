import"./assets/styles-BK7AYJoX.js";import{a as i}from"./assets/vendor-N5iQpiFS.js";const r={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),notFound:document.querySelector(".not-found")};function g(e){r.categoriesList.innerHTML=e.map(t=>`<li class="categories__item">
   <button class="categories__btn" type="button">${t}</button>
 </li>`).join("")}function c(e){r.productsList.innerHTML=e.map(t=>`<li class="products__item" data-id="${t.id}">
    <img class="products__image" src="${t.images[0]}" alt="${t.title}"/>
    <p class="products__title">${t.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${t.brand}</p>
    <p class="products__category">Category: ${t.category}</p>
    <p class="products__price">Price: $${t.price}</p>
 </li>
`).join("")}function p(e){r.productsList.insertAdjacentHTML("beforeend",e.map(t=>`<li class="products__item" data-id="${t.id}" data-category="${t.category}">
    <img class="products__image" src="${t.images[0]}" alt="${t.title}"/>
    <p class="products__title">${t.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${t.brand}</p>
    <p class="products__category">Category: ${t.category}</p>
    <p class="products__price">Price: $${t.price}</p>
 </li>
`).join(""))}function _(e){Array.from(r.productsList.children).forEach(o=>{o.dataset.category.trim().toLowerCase()===e&&o.remove()})}const l="https://dummyjson.com/products",y="category-list",u=1,m=`https://dummyjson.com/products?limit=12&skip=${(u-1)*12}`,d=12;async function f(){try{return["All",...(await i.get(`${l}/${y}`)).data]}catch(e){console.error("Error fetching products:",e)}}async function a(){try{return(await i.get(`${m}`)).data.products}catch(e){console.error("Error fetching products:",e)}}async function L(e){try{const t=await i.get(`${l}/category/${e}?limit=${d}&skip=${(u-1)*d}`);return t.data.products.length===0?r.notFound.classList.add("not-found--visible"):r.notFound.classList.remove("not-found--visible"),t.data.products}catch(t){console.error("Error fetching products by category:",t)}}async function $(e){if(e.target.tagName!=="BUTTON")return;const t=e.target,o=t.textContent.trim().toLowerCase();if(o==="all"){r.categoriesList.querySelectorAll(".categories__btn").forEach(s=>{s!==t&&s.classList.remove("categories__btn--active")}),t.classList.add("categories__btn--active"),c(await a());return}if(r.categoriesList.querySelectorAll(".categories__btn").forEach(s=>{s.textContent.trim().toLowerCase()==="all"&&s.classList.remove("categories__btn--active")}),t.classList.toggle("categories__btn--active"),!t.classList.contains("categories__btn--active")){_(o),r.productsList.querySelectorAll(".products__item").length===0&&c(await a());return}r.productsList.querySelectorAll(".products__item").forEach(s=>{s.dataset.category||s.remove()});const n=await L(o);p(n)}b();C();async function b(){const e=await f();g(e)}async function C(){const e=await a();c(e)}r.categoriesList.addEventListener("click",$);
//# sourceMappingURL=index.js.map
