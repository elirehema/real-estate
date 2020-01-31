// Import product model
const Apartments = require('../Schemas/SchemaApartment');
const Cost = require('../Schemas/SchemaExtraCosts');
const Room = require('../Schemas/SchemaRoom');
const Term = require('../Schemas/SchemaTermsAndCondition');
const constants = require("../config/Constants");

/**Get All {@link Apartments} in the system no authentication required**/
exports.getAllApartments = async function (req, res) {
    await Apartments.find({})
        .populate({path: "rooms", module: constants.ROOMS_COLLECTION})
        .populate({path: "extraCosts", module: constants.COSTS_COLLECTION})
        .populate({path: "extraCosts", populate: {path: "termsAndConditions",model: constants.TERMANDCONDITION_COLLECTION}})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/**Get All {@link Apartments} in the system with Rooms only`` No authentication required``**/
exports.getAllApartmentsWithOnlyRooms = async function (req, res) {
    await Apartments.find({}).select('-extraCosts -roomImages')
        .populate({path: "rooms", module: constants.IMAGES_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/**Get All {@link Apartments} in the system with ExtraCosts included only`` No authentication required``**/
exports.getAllApartmentsWithOnlyExtraCosts = async function (req, res) {
    await Apartments.find({}).select('-rooms -roomImages')
        .populate({path: "extraCosts", module: constants.COSTS_COLLECTION})
        .populate({path: "extraCosts", populate: {path: "termsAndConditions",model: constants.TERMANDCONDITION_COLLECTION}})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/**Get All {@link Apartments} in the system with HouseRooms Images included only`` No authentication required``**/
exports.getAllApartmentsWithOnlyRoomImages = async function (req, res) {
    await Apartments.find({}).select('-rooms -extraCosts')
        .populate({path: "roomImages", module: constants.ROOMS_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/**Get All {@link Apartments} in the system no authentication required**/
exports.getAllApartmentExcludeRooms = async function (req, res) {
    await Apartments.find({}).select("-rooms -roomImages -extraCosts")
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/**Get All {@link Apartments} in the system no authentication required**/
exports.getAllApartmentIncludeRooms = async function (req, res) {
    await Apartments.find({}).select("-roomImages -extraCosts")
        .populate({path: "rooms", module: constants.ROOMS_COLLECTION})
        .populate({path: "extraCosts", module: constants.COSTS_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/** Get Single {@link Apartments} by Apartment ID, "No Auth is Optional" **/
exports.getAllApartmentById = async function (req, res) {
    await Apartments.findOne({_id: req.params.apartmentId})
        .populate({path: "rooms", module: constants.ROOMS_COLLECTION})
        .populate({path: "extraCosts", module: constants.COSTS_COLLECTION})
        .populate({path: "roomImages", module: constants.IMAGES_COLLECTION})
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            })
        })
};

/** Get all {@link Apartments} Room ID's ``No Authentication Required`` **/
exports.getAllApartmentRoomsId = async function (req, res) {
    await Apartments.findOne({_id: req.params.apartmentId}).select('rooms')
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'Returned successfully...',
                data: response
            });
        })
};

/** Get all {@link Apartments} Rooms ``No Authentication Required`` **/
exports.getAllApartmentRooms = async function (req, res) {
    await Apartments.findOne({_id: req.params.apartmentId}).select('rooms')
        .populate({path: "rooms", model: constants.ROOMS_COLLECTION})
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'Returned successfully...',
                data: response
            });
        })
};

/** Get all {@link Apartments} {@link Cost}**/
exports.getAllApartmentExtraCosts = async function (req, res) {
    await Apartments.findOne({_id: req.params.apartmentId}).select("extraCosts")
        .populate({path: "extraCosts", model: constants.COSTS_COLLECTION})
        .populate({path: "extraCosts", populate: {path: "termsAndConditions",model: constants.TERMANDCONDITION_COLLECTION}})
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'Returned successfully...',
                data: response
            });
        })
};

/** Get all {@link Apartments} {@link Cost} ID's**/
exports.getAllApartmentExtraCostsIds = async function (req, res) {
    await Apartments.findOne({_id: req.params.apartmentId}).select("extraCosts")
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'Returned successfully...',
                data: response
            });
        })
};

/**Get All {@link Cost} in the system ``NO authentication required``**/
exports.getAllCosts = async function (req, res) {
    await Cost.find({})
        .populate({path: "termsAndConditions", module: constants.TERMANDCONDITION_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Data retrieved successfully",
                data: response
            });
        });
};

/**Get  {@link Cost} by ID in the system ``NO authentication required``**/
exports.getCostById = async function (req, res) {
    await Cost.findOne({_id: req.params.costId})
        .populate({path: "termsAndConditions", module: constants.TERMANDCONDITION_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Data retrieved successfully",
                data: response
            });
        });
};

/** Get single {@link Term} by given Terms ID ``Authentication is Optional``**/
exports.getTermsByCostId = async function (req, res) {
    await Cost.findOne({_id:req.params.costId}).select("termsAndConditions")
        .exec(function (error, cost) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'Updates successfully!',
                data: cost
            });
        });
};

/** GET all Terms and Conditions in the system "No Authentication Required"**/
exports.getAllTermsAndConditions = async  function(req,res){
  await Term.find({})
      .exec(function (error, response) {
          if (error) {
              return res.json({
                  status: res.status(),
                  message: error,
              });
          }
          return res.json({
              status: res.statusCode,
              message: "Retrieved successfully",
              data: response
          });
      })
};
/**GET {@link Term} by it's ID `` Authentication is Optional**/
exports.getTermsByTermId = async function(req, res){
  await Term.findOne({_id: req.params.termId})
      .exec(function (error, response) {
          if (error) {
              return res.json({
                  status: res.status(),
                  message: error,
              });
          }
          return res.json({
              status: res.statusCode,
              message: "Retrieved successfully",
              data: response
          });
      });
};

/**Create new {@link Apartments} with request from body object, ``Authentication is Mandatory` **/
exports.createNewApartment = async function (req, res) {
    var apartment = new Apartments();
    apartment.apartmentName = req.body.name;
    apartment.apartmentType = req.body.type;
    apartment.longitude = req.body.longitude;
    apartment.latitude = req.body.latitude;
    apartment.paymentTerms = req.body.terms;
    apartment.amount = req.body.amount;
    apartment.description = req.body.description;
    apartment.thumbNail = req.body.image;
    apartment.roomImages = req.body.images;
    apartment.save(function (error) {
        if (error) {
            return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            })
        }
        return res.json({
            status: res.statusCode,
            message: 'New User created succesfully!',
            data: apartment
        });
    })

};

/** Add {@link Room} in a given {@link Apartments} ID ``Authentication is Mandatory `` **/
exports.addNewRoomInApartment = async function (req, res) {
    var room = new Room();
    Apartments.findOneAndUpdate(
        {_id: req.params.apartmentId},
        {$push: {rooms: room._id}},
        function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            room.title = req.body.title;
            room.name = req.body.name;
            room.description = req.body.description;
            room.total = req.body.total;
            room.size = req.body.size;
            room.save(function (err) {
                if (err) {
                    return res.json({status: res.statusCode, error: err.message});
                }
                return res.json({
                    status: res.statusCode,
                    message: 'New room created successfully...!',
                    data: room
                });
            });

        })

};

/** Add new {@link Term} in a given {@link Cost} ID ``Authentication is Mandatory `` **/
exports.createTermAndConditionsInCost = async function (req, res) {
    var term = new Term();
    Cost.findOneAndUpdate(
        {_id: req.params.costId},
        {$push: {termsAndConditions: term._id}},
        function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            term.title = req.body.title;
            term.descriptions = req.body.description;
            term.save(function (err) {
                if (err) {
                    return res.json({status: res.statusCode, error: err.message});
                }
                return res.json({
                    status: res.statusCode,
                    message: 'Updated successfully...!',
                    data: term
                });
            });

        })

};

/** Add {@link Cost} in a given {@link Apartments} ID ``Authentication is Mandatory `` **/
exports.addNewCostsInApartment = async function (req, res) {
    var cost = new Cost();
    Apartments.findOneAndUpdate(
        {_id: req.params.apartmentId},
        {$push: {extraCosts: cost._id}},
        function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            cost.name = req.body.name;
            cost.amount = req.body.amount;
            cost.paymentType = req.body.paymenttype;
            cost.save(function (err) {
                if (err) {
                    return res.json({status: res.statusCode, error: err.message});
                }
                return res.json({
                    status: res.statusCode,
                    message: 'New room created successfully...!',
                    data: cost
                });
            });

        })

};

/** Update Single {@link Apartments} by given Apartment ID ``Authentication is Mandatory``**/
exports.updateApartmentById = async function (req, res) {
    await Apartments.findById(req.params.apartmentId, function (error, apartment) {
        if (error) {
            return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            })
        }
        apartment.apartmentName = req.body.name;
        apartment.apartmentType = req.body.type;
        apartment.longitude = req.body.longitude;
        apartment.latitude = req.body.latitude;
        apartment.paymentTerms = req.body.terms;
        apartment.amount = req.body.amount;
        apartment.description = req.body.description;
        apartment.thumbNail = req.body.image;
        apartment.roomImages = req.body.images;
        apartment.save(function (error) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'New User created succesfully!',
                data: apartment
            });
        })

    })
};

/** Update Single {@link Cost} by given Cost ID ``Authentication is Mandatory``**/
exports.updateCostById = async function (req, res) {
    await Cost.findById(req.params.costId, function (error, cost) {
        if (error) {
            return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            })
        }
        cost.name = req.body.name;
        cost.amount = req.body.amount;
        cost.paymentType = req.body.paymenttype;
        cost.save(function (error) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: 'Updates successfully!',
                data: cost
            });
        })

    })
};

/**Update {@link Term} by it's own Id **/
exports.updateTermAndConditionById = async function(req, res){
    await Term.findById(req.params.termId, function (error, term) {

            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            term.title = req.body.title;
            term.descriptions = req.body.description;
            term.save(function (err) {
                if (err) {
                    return res.json({status: res.statusCode, error: err.message});
                }
                return res.json({
                    status: res.statusCode,
                    message: 'Updated successfully...!',
                    data: term
                });
            });

    })
}
/** Delete {@link Cost} by its ID **/
exports.deleteCostById = async function (req, res) {
    await Cost.remove({_id: req.params.costId}, function (err, response) {
        if (err) {
            return res.send(err);
        }
        return res.json({
            status: res.statusCode,
            message: 'Product deleted'
        });
    });
};
/** Delete {@link Apartments} by its ID **/
exports.delete = async function (req, res) {
    await Apartments.remove({_id: req.params.apartmentId}, function (err, response) {
        if (err) {
            return res.send(err);
        }
        return res.json({
            status: res.statusCode,
            message: 'Product deleted'
        });
    });
};