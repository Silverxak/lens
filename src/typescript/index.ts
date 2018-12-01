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

const areaGetBoundingClientRect = prismArea.getBoundingClientRect();
const areaLeft: number = areaGetBoundingClientRect.left;
const areaTop: number = areaGetBoundingClientRect.top;
const barTop: number = prismBar.getBoundingClientRect().top;

prismArea.addEventListener('mousedown', e => {
    prismPipette.style.transform = `translateX(${e.pageX - areaLeft}px) translateY(${e.pageY - areaTop}px)`;

    const move = e => {
        prismPipette.style.transform = `translateX(${Math.max(0, Math.min(e.pageX - areaLeft, prismArea.clientWidth))}px) translateY(${Math.max(0, Math.min(e.pageY - areaTop, prismArea.clientHeight))}px)`;
    };
    const up = e => {
        document.removeEventListener('mousemove', move, false);
        document.removeEventListener('mousemove', up, false);
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
        document.removeEventListener('mousemove', up, false);
    };


    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', up, false);
}, false);

