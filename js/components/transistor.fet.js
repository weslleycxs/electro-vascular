class JFET extends Transistor {

    constructor(x, y) {

        super(x, y);

    }

    get dom(){

        if(this._dom) return this._dom;

        let dom = $(`<div class="component transistor transistor-fet"><span class="msg"></span></div>`);

        this._dom = dom;

        return this._dom;

    }

    render(){

        this.dom.css({
            top: this.y,
            left: this.x
        });

        this.dom.find('.msg').text('FET');

        return this.dom;

    }

}