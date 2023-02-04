class Resistor extends Component {

    constructor(x, y, resistance = 1000) {

        super(x, y);

        this.resistance = resistance;

        let leftTerminal = this.addLeftTerminal();
        let rightTerminal = this.addRightTerminal();



    }

    get dom(){

        if(this._dom) return this._dom;

        let dom = $(`<div class="component resistor"><span class="msg"></span></div>`);

        this._dom = dom;

        return this._dom;

    }

    render(){

        this.dom.css({
            top: this.y,
            left: this.x
        });

        this.dom.find('.msg').text(this.resistance + 'Ω');

        return this.dom;

    }

}