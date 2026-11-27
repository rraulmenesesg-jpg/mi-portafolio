const JSON_URL=new URL('./contacto.json',import.meta.url);
const TARGET='#contacto .contact-content';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(v){if(typeof v!=='string'||!v.trim())return null;try{const u=new URL(v,location.href);return ['http:','https:','mailto:','tel:'].includes(u.protocol)?v:null;}catch{return null;}}
async function init(){
 const target=document.querySelector(TARGET);if(!target)return console.error('[ContactoDebug] Contenedor no encontrado:',TARGET);
 try{
  const response=await fetch(JSON_URL);if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();
  if(!data||!Array.isArray(data.contacto)||data.contacto.length<2||!Array.isArray(data.redes)||!data.contacto.every(x=>x&&typeof x.titulo==='string'&&typeof x.valor==='string'&&safeURL(x.enlace))||!data.redes.every(x=>x&&typeof x.nombre==='string'&&typeof x.icono==='string'&&safeURL(x.url)))throw new TypeError('Estructura de contacto.json inválida.');
  const contact=(x,wa=false)=>`<div class="col-md-6 text-center mb-3"><h3 class="h5 fw-semibold text-muted mb-3">${esc(x.titulo)}</h3><a href="${esc(x.enlace)}" target="_blank" rel="noopener noreferrer" class="lead text-decoration-none ${wa?'text-success':'text-primary'}">${esc(x.valor)}</a><div class="mt-3"><a href="${esc(x.enlace)}" target="_blank" rel="noopener noreferrer" class="${esc(x.btnClase||'btn btn-outline-primary btn-sm')}">${wa?'<i class="bi bi-whatsapp me-1" aria-hidden="true"></i>':''}${esc(x.btnTexto||'Enviar mensaje')}</a></div></div>`;
  target.innerHTML=`<div class="row mb-4">${contact(data.contacto[0])}${contact(data.contacto[1],true)}</div><hr class="my-4"><div class="text-center"><h3 class="h5 fw-semibold text-muted mb-3">Perfiles profesionales</h3><div class="d-flex flex-wrap justify-content-center gap-2">${data.redes.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" class="${esc(x.clase||'btn btn-outline-primary')}"><i class="bi ${esc(x.icono)}" aria-hidden="true"></i> ${esc(x.nombre)}</a>`).join('')}</div></div>`;
  console.info('[ContactoDebug] Contacto renderizado.');
 }catch(e){console.error('[ContactoDebug] Error:',e);target.innerHTML='<p class="alert alert-warning">No se pudo cargar la información de contacto.</p>';}
}
init();
