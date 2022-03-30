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
    let path = build_x(draw);
    let path1 = build_x(draw);
    el.add(path1);
    el.add(path);

    switch (state[x][y]) {
        case 0:
            rect.fill(b0);
            path.addClass('hidden');
            break;
        case 1:
            rect.fill(bx);
            break;
        default:
            path.addClass('hidden');
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
    let path = draw.path('M 1000 1000 L 2000 2000');
    let path1 = draw.path('M 2000 1000 L 1000 2000');
    path.stroke({ color: 'black', width: 4, linecap: 'round', linejoin: 'round' });
    path1.stroke({ color: 'black', width: 4, linecap: 'round', linejoin: 'round' });
    //path.fill('#f06',);
    path.addClass('x');
    path1.addClass('x');
    return path

}
function build_o(draw) {
    let circle = draw.circle(cx = '400', cy = '300', r = '200');
    circle.stroke({color:'black',width:4,})
    circle.addClass('o');
    return circle
}
draw_field(draw);
