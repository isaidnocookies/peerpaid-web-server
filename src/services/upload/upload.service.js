// Initializes the `upload` service on path `/upload`
const createService = require('feathers-mongoose');
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');
var multer = require('multer');
const upload = multer({ dest: '../uploads' });

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'upload',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const uploadService = createService(options);

  /*
Content-Disposition: form-data; name="qquuid"
Content-Disposition: form-data; name="qqfilename"
Content-Disposition: form-data; name="qqtotalfilesize"
Content-Disposition: form-data; name="qqfile"; filename="Screen Shot 2017-11-14 at 12.44.37 PM.png"
*/

  var multerMiddle = upload.fields([
    { name: 'qquuid', maxCount: 1 },
    { name: 'qqfilename', maxCount: 1 },
    { name: 'qqtotalfilesize', maxCount: 1 },
    { name: 'qqfile', maxCount: 1 },
  ]);


  app.post('/upload',  multerMiddle, function (req, res, next) {

    var uploadService = app.service('upload');
    var userService = app.service('users');

    var upload = Object.assign({}, req.body, { files: {} });


    var keys = Object.keys(req.files);
    if (keys.length === 1) {
      var key = keys[0];
      var file = req.files[key];
      
      upload.fileName = req.query.fieldId || key;

      upload.file = file.map((file, index) => {
        //encrypt file,
        // place on S3,
        // Attach S3 location to the body,
        return Object.assign({}, file, {
          s3Location: 'location' + index
        });
      });





      uploadService.create(upload, { provider: 'uploader', headers: req.headers }).then(function (result) {
        result.success = true;
        res.json(result);

        // userService.get(result.owner).then(owner => {
        //   owner.documents = {...owner.documents};
        //   owner.documents.
        // });

      }).catch(function (error) {

        res.json({ error: error.message });
      });
    }
  });
  app.use('/upload', uploadService);


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('upload');

  service.hooks(hooks);
};
