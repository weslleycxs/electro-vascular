let Default = {

    setCursor(x, y){

        $('.cursor').css({
            top: y,
            left: x
        });

    },

    openContextMenu(x, y, menu){

        $('.context-menu').css({
            top: y,
            left: x
        });

        $('.context-menu').html(`<ul></ul>`);

        let ul = $('.context-menu ul');

        ul.empty();

        for(let i in menu){

            let item = menu[i];

            if(typeof item == 'function'){

                let menuItem = $(`<li class="menu-item">${i}</li>`);

                menuItem.on('click', () => {
                        
                    item();
                    $('.context-menu').hide();

                });

                ul.append(menuItem);
                
            } else if(typeof item == 'object'){

                let menuItem = $(`<li class="menu-item">${i}</li>`);

                ul.append(menuItem);

                let subMenu = $(`<ul class="sub-menu"></ul>`);

                menuItem.append(subMenu);

                for(let j in item){

                    let subMenuItem = $(`<li class="menu-item">${j}</li>`);

                    subMenu.append(subMenuItem);

                    subMenuItem.on('click',() => {
                        
                        item[j]();
                        $('.context-menu').hide();
    
                    });

                }

            }

        }


        $('.context-menu').show();

    }
    
}

$('body').on('mousemove', function(e){
    
    let x = e.pageX;
    let y = e.pageY;

    Default.setCursor(x, y);

});

$('body').on('contextmenu', function(e){

    e.preventDefault();

    let x = e.pageX;
    let y = e.pageY;

    Default.openContextMenu(x, y, {
        'Resistor': () => {

            Viewport.add(new Resistor(x, y, 100));

        },

        'Bateria': () => {

            Viewport.add(new Battery(x, y, 1000, 5, 10))
 
        },

        'Indutor': () => {

            Viewport.add(new Inductor(x, y, 100));

        },

        'Diodo': {
            'LED': () => {
                
                Viewport.add(new LED(x, y));

            },

            'Zener': () => {

                Viewport.add(new Zener(x, y));

            }
            
        },

        'Transistor': {

            'NPN': () => {

                Viewport.add(new NPN(x, y));

            },

            'PNP': () => {

                Viewport.add(new PNP(x, y));

            },

            'JFET': () => {

                console.log('aaas')

                Viewport.add(new JFET(x, y));

            },

            'MOSFET': () => {

                Viewport.add(new MOSFET(x, y));

            }

        },

        'Capacitor': {
            'Eletrolítico': () => {

                console.log('Sub Menu 1');

            },

            'Poliester': () => {

                console.log('Sub Menu 2');

            }
        }
    });

});

// Close context menu when esc
$('body').on('keydown', function(e){

    if(e.keyCode == 27){
        $('.context-menu').hide();
    }

});

// Close context menu when clicked outside the context menu
$('body').on('click', function(e){

    if(!$(e.target).hasClass('menu-item')){
        $('.context-menu').hide();
    }

});
    