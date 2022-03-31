const w = 148;
const h = 148;
const background = '#14bdac';
const state = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
const b0 = 'green';
const bx = 'red';
let draw = SVG().addTo('#board').size('450', '450');

function new_item(draw, x, y) {
    let el = draw.group();
    let rect = draw.rect(w, h);
    rect.addClass('rect');
    el.add(rect);
    let el_x = build_x(draw);
    let el_0 = build_0(draw);
    el.add(el_x);
    el.add(el_0);

    switch (state[x][y]) {
        case 0:
            rect.fill(b0);
            el_x.addClass('hidden');
            break;
        case 1:
            rect.fill(bx);
            el_0.addClass('hidden');
            break;
        default:
            el_x.addClass('hidden');
            el_0.addClass('hidden');
            rect.fill(background);
    }
    el.on('click', function () { next_step(el, x, y) });
    return el;
}

function draw_field(draw) {
    new_item(draw, 0, 0)
    new_item(draw, 0, 1).move(w + 2, 0)
    new_item(draw, 0, 2).move(2 * (w + 2), 0)
    new_item(draw, 1, 0).move(0, h + 2)
    new_item(draw, 1, 1).move(w + 2, h + 2)
    new_item(draw, 1, 2).move(2 * (w + 2), h + 2)
    new_item(draw, 2, 0).move(0, 2 * (h + 2))
    new_item(draw, 2, 1).move(w + 2, 2 * (h + 2))
    new_item(draw, 2, 2).move(2 * (w + 2), 2 * (h + 2))
}

var next_step = function (el, x, y) {
    if (state[x][y] == -1) {
        state[x][y] = 1;
        el.find('.x').removeClass('hidden');
    }
}
function new_game() {
    console.log('new game start');
    for (i = 0; i < 3; ++i) {
        for (j = 0; j < 3; ++j) {
            state[i][j] = -1
        }
    }
    draw_field(draw);
    console.log('new game end');
}
function build_x(draw) {
    let el = draw.group();
    let l1 = draw.path('M24,16 L122,132');
    let l2 = draw.path('M122,16 L24,132');
    l1.stroke({ color: 'black', width: 8, linecap: 'round', linejoin: 'round' });
    l2.stroke({ color: 'black', width: 8, linecap: 'round', linejoin: 'round' });
    el.add(l1);
    el.add(l2);

    el.addClass('x');
    return el;

}
function build_0(draw) {
    let circle = draw.ellipse(80,112).fill('transparent').move(34, 16);
    circle.stroke({color:'black',width:8})
    circle.addClass('0');
    return circle
}
function build_cross_line(draw, cross_num) {
    let line;
    switch (cross_num) {
        case 0:
            line = draw.path('M16,74 L432,38');
            break;
        case 1:
            line = draw.path('M16,164 L432,222');
            break;
        case 2:
            line = draw.path('M 16,370 L 432,392');
            break;
        case 3:
            line = draw.path('M 48,16 L 74,432');
            break;
        case 4:
            line = draw.path('M196,16 L222,432');
            break;
        case 5:
            line = draw.path('M340,16 L374,432');
            break;
        case 6:
            line = draw.path('M16,24 L432,410');
            break;
        case 7:
            line = draw.path('M 16,420 L 432,34')
        default:
            console.log("unexpected param value :" + cross_num)
    }

    line.stroke({ color: 'red', width: 8, linecap: 'round', linejoin: 'round' });
    return line;
}
console.log(draw_field(draw));