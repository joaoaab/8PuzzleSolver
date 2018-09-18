class Configuration {
    constructor(width, height, offset){
        this.div = createDiv('');
        this.div.position(width + (2 * offset), offset);
        this.div.addClass('configuration');

        

        // Left Collumn
        this.left_col = createDiv('');
        this.left_col.parent(this.div);
        this.left_col.addClass('div-col');

        this.label = createElement('h1', 'Algorithm Selection');
        this.label.parent(this.left_col);
        this.hr = createElement('hr');
        this.hr.parent(this.label);

        this.selector = createSelect();
        this.selector.addClass('form-control');
        this.selector.addClass('select-info');
        this.selector.id('algorithm-select');
        this.selector.option('A*');
        this.selector.option('BFS');
        this.selector.option('Best First Search');
        this.selector.parent(this.left_col);

        // Buttons div
        this.buttons = createDiv('');
        this.buttons.parent(this.left_col);
        this.buttons.addClass('buttons-div');
        this.control_buttons = createDiv('');
        this.control_buttons.addClass('btn-group');
        this.control_buttons.addClass('button-config');
        this.control_buttons.id('control-buttons');
        this.control_buttons.parent(this.buttons);

        // Play Button
        this.play_button = createButton('');
        this.play_button.id('play');
        this.play_button.addClass('btn');
        this.play_button.addClass('btn-lg');
        this.play_button.addClass('btn-outline-primary');
        this.play_button.attribute('title', 'Start Algorithm');
        this.play_button.html('<span class="glyphicon glyphicon-play"></span>');
        this.play_button.parent(this.control_buttons);

        // Replay Button
        this.replay_button = createButton('');
        this.replay_button.id('replay');
        this.replay_button.addClass('btn');
        this.replay_button.addClass('btn-lg');
        this.replay_button.addClass('btn-outline-danger');
        this.replay_button.attribute('title', 'Restart Algorithm');
        this.replay_button.html('<span class="glyphicon glyphicon-refresh"></span>')
        this.replay_button.parent(this.control_buttons);

        // Shuffle Button
        this.shuffle_button = createButton('');
        this.shuffle_button.id('shuffle');
        this.shuffle_button.addClass('btn');
        this.shuffle_button.addClass('btn-lg');
        this.shuffle_button.addClass('btn-outline-primary');
        this.shuffle_button.attribute('title', 'Shuffle Board');
        this.shuffle_button.html('<span class="glyphicon glyphicon-random"></span>')
        this.shuffle_button.parent(this.control_buttons);

        // Right Collumn
        this.right_col = createDiv('');
        this.right_col.parent(this.div);
        this.right_col.addClass('div-col');

    }
}