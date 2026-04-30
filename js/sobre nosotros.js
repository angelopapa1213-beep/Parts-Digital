const texts = [
"Nuestra misión es ayudar negocios a crecer con soluciones modernas.",

"Nuestra visión es convertirnos en una agencia líder reconocida por innovación.",

"Nuestro objetivo es aumentar ventas y presencia digital."
];

function changeTab(index){

document.getElementById("tabContent").innerText = texts[index];

document.querySelectorAll(".tab-btn").forEach(btn=>{
btn.classList.remove("active");
});

document.querySelectorAll(".tab-btn")[index].classList.add("active");

}

const reveals = document.querySelectorAll(".reveal");

function mostrarScroll(){

reveals.forEach(item => {

const top = item.getBoundingClientRect().top;
const windowHeight = window.innerHeight;

if(top < windowHeight - 80){
item.classList.add("active");
}

});

}

window.addEventListener("scroll", mostrarScroll);
window.addEventListener("load", mostrarScroll);
 
        const hamburger = document.getElementById('hamburger');
        const mainNav = document.getElementById('main-nav');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mainNav.classList.toggle('open');
        });

     
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });