const w = 148;
const h = 148;
const background = '#14bdac';
const state = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
const b0 = 'green';
const bx = 'red';
let draw = SVG().addTo('#board').size('450', '450');

function new_item(draw, x, y) {
    var el = draw.rect(w, h);
    switch (state[x][y]) {
        case 0:
            el.fill(b0);
            break;
        case 1:
            el.fill(bx);
            break;
        default:
            el.fill(background);
    }
    el.on('click', function () { next_step(this, x, y) });
    return el;
}

function draw_field(draw) {
    new_item(draw, 0, 0)
    new_item(draw, 0, 1).move(w + 2, 0)
    new_item(draw, 0, 2).move(w + 2, 0).move(2 * (w + 2), 0)

    new_item(draw, 1, 0).move(0, h + 2)
    new_item(draw, 1, 1).move(w + 2, h + 2)
    new_item(draw, 1, 2).move(w + 2, h + 2).move(2 * (w + 2)), 2 * (h + 2)
    new_item(draw, 2, 0).move(0, h + 2).move(0, 2 * (h + 2))
    new_item(draw, 2, 1).move(w + 2, h + 2).move(w + 2, 2 * (h + 2))
    new_item(draw, 2, 2).move(w + 2, h + 2).move(2 * (w + 2), 2 * (h + 2))
};

var next_step = function (el, x, y) {
    if (state[x][y] == -1) {
        state[x][y] = 1;
        el.fill({ color: bx })
    }
}
function new_game() {
    console.log('new game start');
     for (i = 0; i < 3; ++i) {
         for (j = 0; j < 3; ++j)  {
             state[i][j] = -1
         }
   }
   draw_field(draw);
   console.log('new game end');
}


draw_field(draw);
