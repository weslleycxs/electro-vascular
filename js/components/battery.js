class Battery extends Component {

    constructor(x, y, capacity = 0, voltage = 0, resistance = 0) {

        super(x, y);

        this.resistance = resistance;
        this.capacity   = capacity;
        this._voltage   = voltage;

        this.positiveTerminal = null;
        this.negativeTerminal = null;

    }

    connectToPositiveTerminal(component) {

        this.positiveTerminal = component;

    }

    connectToNegativeTerminal(component) {

        this.negativeTerminal = component;

    }

    charge() {

        let current = this.voltadeDiff(this.positiveTerminal) / this.resistance;

        let charge = current * this.capacity;

        this._voltage += charge;

    }

    discharge() {

        let current = this.voltadeDiff(this.positiveTerminal) / this.resistance;

        let charge = current * this.capacity;

        this._voltage -= charge;

    }

    get voltage() {

        return this.voltadeDiff(this.positiveTerminal) - this.voltadeDiff(this.negativeTerminal);

    }

    get dom(){

        if(this._dom) return this._dom;

        let dom = $(`<div class="component battery"></div>`);

        this._dom = dom;

        return this._dom;

    }

    isCharging(){

        return this.voltadeDiff(this.positiveTerminal) > this.voltadeDiff(this.negativeTerminal);

    }

    haveLoadConnected(){

        return this.positiveTerminal && this.negativeTerminal;

    }

    isCurrentFlowing(){

        return this.haveLoadConnected() && this._voltage > 0 && this.voltadeDiff(this.positiveTerminal) > 0 && this.voltadeDiff(this.negativeTerminal) > 0;

    }

    calculateCurrent(){

        return this.voltadeDiff(this.positiveTerminal) / this.resistance;

    }

    tick(){

        // if(this.isCharging()){
        //     console.log('Is charging')
        //     this.charge();
        //     return;
        // }

        // if(this.isCurrentFlowing()){

        //     let current = this.calculateCurrent();

        //     this.discharge();
        //     this.negativeTerminal.charge(current);
        //     this.positiveTerminal.discharge(current);

        // }

    }

    render(){

        this.tick();

        this.dom.text('Battery: ' + this._voltage + 'V');

        return this.dom;

    }

}