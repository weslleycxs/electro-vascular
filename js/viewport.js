let Viewport = {

    instances: [],

    add(instance){

        this.instances.push(instance);

        $('.viewport').append(instance.dom);

    },

    render(){

        for(let instance of Viewport.instances){

            instance.render();

        }

    }

}

requestAnimationFrame(function loop(){

    Viewport.render();

    requestAnimationFrame(loop);

});