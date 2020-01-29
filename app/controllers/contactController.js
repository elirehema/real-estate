// contactController.js
// Import contact model
Contact = require('../Schemas/contactModel');
// Handle index actions
exports.index = async function (req, res) {
    await Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: res.statusCode,
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};
// Handle create contact actions
exports.new = async function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // save the contact and check for errors
    await contact.save(function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err });
        }
        res.json({
            status: res.statusCode,
            message: 'New contact created!',
            data: contact
        });
    });
};
// Handle view contact info
exports.view = async function (req, res) {
    await Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
            if(!contact){
                console.log('No contacts found!')
            }else{
        res.json({
            status: res.statusCode,
            message: 'Contact details loading..',
            data: contact
        
        });
    }
    });
};
// Handle update contact info
exports.update = async  function (req, res) {
    await Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: res.statusCode,
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = async function (req, res) {
   await  Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Contact deleted'
        });
    });
};