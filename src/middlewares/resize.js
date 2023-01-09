const sharp = require('sharp');

function resizeMiddleware(req, res, next) {
    // Vérification si il y a une image
    if (!req.body.image) {
        return next();
    }
    // Redimensionnement de l'image si elle dépasse les 200x200
    sharp(req.body.image)
        .resize({ width: 200, height: 200 })
        .toBuffer()
        .then(data => {
            req.body.image = data;
            next();
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = resizeMiddleware;