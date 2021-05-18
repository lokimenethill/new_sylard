import exphbs from 'express-handlebars';
import path from 'path';
//exportando funcion de config
export default (app)=>{
    //registrando el motor de plkantillas 
    app.engine('hbs', exphbs({
        extname:'.hbs',
        defaultLayout:'main',
    }));

    //se selecciona el motor de plantillas
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname,'..','views'));
    return app;
}