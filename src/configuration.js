class Configuration {
    constructor(width, height, offset){
        this.div = createDiv('');
        this.div.position(width + (2 * offset), offset);
        this.div.addClass('configuration');

        this.label = createElement('h1', 'Algorithm Selection');
        this.label.parent(this.div);

        this.left_col = createDiv('');
        this.left_col.parent(this.div);
        this.left_col.addClass('div-col');

        this.select = createSelect();
        this.select.addClass('form-control');
        this.select.id('algorithm-select');
        this.select.parent(this.div);
    }
}