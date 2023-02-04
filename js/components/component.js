class Component {

    constructor(x, y, resistance = 0, capacitance = 0, inductance = 0, temperature = 0) {

        this.x = x;
        this.y = y;
        this.resistance  = resistance;
        this.capacitance = capacitance;
        this.inductance  = inductance;
        this.temperature = temperature;

        this.terminals = [];

        this._dom = null;

        this.position = {
            x: x,
            y: y
        }
        
    }

    voltadeDiff(component) {

        let componentVoltage = 0;

        if(component) componentVoltage = component.voltage;

        return this.voltage - componentVoltage;

    }

    get dom() {

        if(this._dom) return this._dom;

        let dom = $(`<div class="component">Generic</div>`);

        this._dom = dom;

        return this._dom;

    }

    set position({x, y}) {

        this.x = x;
        this.y = y;
        
        this.dom.css({
            top: y,
            left: x
        });

        // This makes the component draggable

        this.dom.draggable({

            containment: '.viewport',

            stop: (event, ui) => {

                console.log(ui.position);

                this.position = ui.position;

            }

        });

    }

    addTopTerminal() {

        let terminal = $(`<div class="terminal top"></div>`);

        this.dom.append(terminal);
        this.terminals.push(terminal);

        this.recalcTerminalPositions();

        return terminal;

    }

    addBottomTerminal() {

        let terminal = $(`<div class="terminal bottom"></div>`);

        this.dom.append(terminal);
        this.terminals.push(terminal);

        this.recalcTerminalPositions();

        return terminal;

    }

    addLeftTerminal() {

        let terminal = $(`<div class="terminal left"></div>`);

        this.dom.append(terminal);
        this.terminals.push(terminal);

        this.recalcTerminalPositions();

        return terminal;

    }

    addRightTerminal() {

        let terminal = $(`<div class="terminal right"></div>`);

        this.dom.append(terminal);
        this.terminals.push(terminal);

        this.recalcTerminalPositions();

        return terminal;

    }

    recalcTerminalPositions() {

        ['top', 'bottom', 'left', 'right'].forEach((position, index) => {

            let terminal = this.dom.find(`.terminal.${position}`);

            if(terminal.length) {

                terminal.css({
                    top: (index * 25) + 'px'
                });

            }

        });

    }

}