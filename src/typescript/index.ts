console.log(1);

// const img: HTMLElement = document.querySelector('.atlas-grid-item__image');
//
// if (img) {
//     const maxHeight = img.offsetWidth;
//
//     [].slice.call(document.querySelectorAll('.atlas-grid-item__image')).forEach(element => {
//         console.log(element);
//         element.style.height = `${maxHeight}px`;
//     });
// }

const prismArea: HTMLElement = document.querySelector('.prism__area');
const prismPipette: HTMLElement = document.querySelector('.prism__pipette');
const prismBar: HTMLElement = document.querySelector('.prism__bar');
const prismSlit: HTMLElement = document.querySelector('.prism__slit');
const areaLeft: number = prismArea.getBoundingClientRect().left;
const areaTop: number = prismArea.getBoundingClientRect().top;
const barTop: number = prismBar.getBoundingClientRect().top;
console.log(`left: ${areaLeft} top: ${areaTop}`);

prismArea.addEventListener('mousedown', e => {
    prismPipette.style.transform = `translateX(${e.pageX - areaLeft}px) translateY(${e.pageY - areaTop}px)`;
    console.log(Math.min(e.pageX - areaLeft, prismArea.clientWidth));

    const move = e => {
        prismPipette.style.transform = `translateX(${Math.max(0, Math.min(e.pageX - areaLeft, prismArea.clientWidth))}px) translateY(${Math.max(0, Math.min(e.pageY - areaTop, prismArea.clientHeight))}px)`;

        console.log(e.pageX - areaLeft);
    };
    const up = e => {
        document.removeEventListener('mousemove', move, false);
    };


    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', up, false);
}, false);

prismBar.addEventListener('mousedown', e => {
    prismSlit.style.transform = `translateY(${e.pageY - barTop}px)`;
    const move = e => {
        prismSlit.style.transform = `translateY(${Math.max(0, Math.min(e.pageY - barTop, prismBar.clientHeight))}px)`;
    };
    const up = e => {
        document.removeEventListener('mousemove', move, false);
    };


    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', up, false);
}, false)

