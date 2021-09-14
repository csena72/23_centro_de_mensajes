let productosWs = []; // esto va en sqlite

exports.homeRender = (req,resp) => {    
    resp.render('home', {productosWs: productosWs});
};
