
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
const prism = {
    h: 0,
    s: 0,
    v: 0
};

const prismArea: HTMLElement = document.querySelector('.prism__area');
const prismPipette: HTMLElement = document.querySelector('.prism__pipette');
const prismBar: HTMLElement = document.querySelector('.prism__bar');
const prismSlit: HTMLElement = document.querySelector('.prism__slit');
const prismNew: HTMLElement = document.querySelector('.prism__new');
const prismCurrent: HTMLElement = document.querySelector('.prism__current');

const areaGetBoundingClientRect = prismArea.getBoundingClientRect();
const areaLeft: number = areaGetBoundingClientRect.left;
const areaTop: number = areaGetBoundingClientRect.top;
const barTop: number = prismBar.getBoundingClientRect().top;

const sensors: HTMLElement = [].slice.call(document.querySelectorAll('.prism__input-label + input'));

let h: number = sensors[0].value = 0;
let s: number = sensors[1].value = 0;
let v: number = sensors[2].value = 100;
prismArea.style.backgroundColor = `#${toHex(hsb2rgb(h, 100, 100).r)}${toHex(hsb2rgb(h, 100, 100).g)}${toHex(hsb2rgb(h, 100, 100).b)}`;
prismNew.style.backgroundColor = `#${toHex(hsb2rgb(h, s, v).r)}${toHex(hsb2rgb(h, s, v).g)}${toHex(hsb2rgb(h, s, v).b)}`;

function hsb2rgb(h, s ,v): {r: number; g: number; b: number;} {
    let r, g, b, i, f, p, q, t;

    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
    h /= 60;
    s /= 100;
    v /= 100;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0: {
            r = v;
            g = t;
            b = p;
            break;
        }

        case 1: {
            r = q;
            g = v;
            b = p;
            break;
        }

        case 2: {
            r = p;
            g = v;
            b = t;
            break;
        }

        case 3: {
            r = p;
            g = q;
            b = v;
            break;
        }

        case 4: {
            r = t;
            g = p;
            b = v;
            break;
        }

        default: {
            r = v;
            g = p;
            b = q;
        }
    }
    r = Math.round((r) * 255);
    g = Math.round((g) * 255);
    b = Math.round((b) * 255);

    sensors[3].value = r;
    sensors[4].value = g;
    sensors[5].value = b;

    return {r, g, b};
}

    function toHex(x) {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    function setNewColor() {
        prismNew.style.backgroundColor = `#${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).r)}${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).g)}${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).b)}`;
    }

    function getSaturation(e): number {
        return Math.floor((Math.max(0, Math.min(e.pageX - areaLeft, prismArea.clientWidth))) / 2.56);
    }

    function getValue(e): number {
        return Math.floor((256 - (Math.max(0, Math.min(e.pageY - areaTop, prismArea.clientHeight)))) / 2.56);
    }

    function getHue(e): number {
        return Math.round(360 - (Math.max(0, Math.min(e.pageY - barTop, prismBar.clientHeight)) * 1.40625));
    }

function getPosPipette(e) {
    let s: number = sensors[1].value = getSaturation(e);
    let b: number = sensors[2].value = getValue(e);
    hsb2rgb(sensors[0].value, s, b);
    document.querySelector('.prism__input > input').setAttribute('value', `#${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).r)}${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).g)}${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).b)}`);
    setNewColor();
}

function getPos(e) {
    let h, s, v: number;
    if(e.target.className == ('prism__area' || 'prism__pipette')) {
        prism.s = Math.floor((Math.max(0, Math.min(e.pageX - areaLeft, prismArea.clientWidth))) / 2.56);
        prism.v = Math.floor((256 - (Math.max(0, Math.min(e.pageY - areaTop, prismArea.clientHeight)))) / 2.56);
    }
    if(e.target.className == ('prism__bar' || 'prism__slit')) {
        prism.h = Math.round(360 - (Math.max(0, Math.min(e.pageY - barTop, prismBar.clientHeight)) * 1.40625));
        prism.h == 360 ? 0 : prism.h;
    }
    // h = Math.round(360 - (Math.max(0, Math.min(e.pageY - barTop, prismBar.clientHeight)) * 1.40625));
    // h = h == 360 ? 0 : h;
    // s = Math.floor((Math.max(0, Math.min(e.pageX - areaLeft, prismArea.clientWidth))) / 2.56);
    // v = Math.floor((256 - (Math.max(0, Math.min(e.pageY - areaTop, prismArea.clientHeight)))) / 2.56);
    console.log(e.target.className);
    console.log(prism);
    return prism;
}

function getPosSlit(e) {
    let h = getHue(e);
    sensors[0].value = h == 360 ? 0 : h;
    hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value);
    prismArea.style.backgroundColor = `#${toHex(hsb2rgb(sensors[0].value, 100, 100).r)}${toHex(hsb2rgb(sensors[0].value, 100, 100).g)}${toHex(hsb2rgb(sensors[0].value, 100, 100).b)}`;
    document.querySelector('.prism__input > input').setAttribute('value', `#${toHex(hsb2rgb(sensors[0].value, 100, 100).r)}${toHex(hsb2rgb(sensors[0].value, 100, 100).g)}${toHex(hsb2rgb(sensors[0].value, 100, 100).b)}`);
    setNewColor();
}

prismArea.addEventListener('mousedown', e => {
    prismPipette.style.transform = `translateX(${e.pageX - areaLeft}px) translateY(${e.pageY - areaTop}px)`;
    getPos(e);

    const move = e => {
        prismPipette.style.transform = `translateX(${Math.max(0, Math.min(e.pageX - areaLeft, prismArea.clientWidth))}px) translateY(${Math.max(0, Math.min(e.pageY - areaTop, prismArea.clientHeight))}px)`;
        getPosPipette(e);
        getPos(e);
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
    getPos(e);
    const move = e => {
        prismSlit.style.transform = `translateY(${Math.max(0, Math.min(e.pageY - barTop, prismBar.clientHeight))}px)`;
        getPosSlit(e);
        getPos(e);
    };
    const up = e => {
        document.removeEventListener('mousemove', move, false);
        document.removeEventListener('mousemove', up, false);
    };


    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', up, false);
}, false);

prismArea.addEventListener('dblclick', e => {
    const dblclick = e => {
        prismCurrent.style.backgroundColor = `#${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).r)}${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).g)}${toHex(hsb2rgb(sensors[0].value, sensors[1].value, sensors[2].value).b)}`;
    };
    const dblclickOff = e => {
        document.removeEventListener('dblclick', dblclick, false);
    };

    document.addEventListener('dblclick', dblclick, false);
    document.addEventListener('dblclick', dblclickOff, false);
});


