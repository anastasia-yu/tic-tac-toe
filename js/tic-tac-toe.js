const w = 148;
const h = 148;
const background = '#14bdac';

function new_item(draw) {
	return draw.rect(w, h).fill(background);
}

function draw_field(draw) {
	new_item(draw)
	new_item(draw).move(w + 2, 0)
	new_item(draw).move(w + 2, 0).move(2 * (w + 2), 0)

	new_item(draw).move(0, h + 2)
};



var draw = SVG().addTo('#board').size('450', '450');
draw_field(draw);
