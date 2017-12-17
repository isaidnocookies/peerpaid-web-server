// Initializes the `upload` service on path `/upload`
const createService = require('feathers-mongoose');
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: '../uploads', storage: storage });
const crypt = require('../../lib/crypt');
const AWS = require('aws-sdk');
const config = require('config');

const awsKeys = config.get('awsKeys');

AWS.config.update({
  accessKeyId:  awsKeys.accessKeyId,
  secretAccessKey: awsKeys.secretAccessKey,
  region: 'us-west-2'
});

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list current buckets
// function buckets() {
//   // Create the parameters for calling createBucket
//   var bucketParams = {
//     Bucket : 'peerpaid-secure-documents'
//   };                    
                                  
// // Call S3 to create the bucket
// s3.createBucket(bucketParams, function(err, data) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('Success', data.Location);
//   }
// });

//   s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log('Error', err);
//     } else {
//       console.log('Bucket List', data);
//     }
//   });

//   // check if bucket exists
//   s3.headBucket(bucketParams, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log('Bucket exists',data);           // successful response
//   });

//   var listParams = {
//     Bucket : 'peerpaid-secure-documents',
//     MaxKeys: 4
//   };
//   s3.listObjects(listParams, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log('list objects',data);  
//   });
// }


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
    // buckets();
    var uploadService = app.service('upload');
    var userService = app.service('users');

    var upload = Object.assign({}, req.body, { files: {} });

    // console.log('/upload query: ', req.query);
    // console.log('/upload req.files: ', req.files);
    // console.log('upload: ', upload);
    var keys = Object.keys(req.files);
    if (keys.length === 1) {
      var key = keys[0];
      var file = req.files[key];
      var fileBuffer = file[0].buffer;
      var encryptedFile = crypt.encryptForFiatServer(fileBuffer, 'buffer');
      
      upload.fileName = req.query.fieldId || key;

      // console.log('/upload: ', upload);
      // console.log('/upload keys: ', keys);
      // console.log('/upload key: ', key);
      // console.log('/upload file: ', file);
      // console.log('/upload file buffer: ', fileBuffer);
      // console.log('/upload file encrypted buffer: ', encryptedFile);
      

      // console.log('/upload: ', upload);
      // console.log('/upload file after: ', upload.file);

      uploadService.create(upload, { provider: 'uploader', headers: req.headers }).then(function (result) {
        result.success = true;
        res.json(result);
        // console.log('/upload then result',result);

        // userService.get(result.owner).then(owner => {
        //   owner.documents = {...owner.documents};
        //   owner.documents.
        // });

        // call S3 to retrieve upload file to specified bucket - AWS-WORKS
        var uploadParams = {Bucket: 'peerpaid-dev-secure-documents', Key: '', Body: ''};
        uploadParams.Key = `${result.owner}/${result._id}`;
        uploadParams.Body = encryptedFile;

        // console.log('uploadParams:', uploadParams);

        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
          if (err) {
            console.log('Error', err);
          } if (data) {
            console.log('Document upload Successful, s3 location: ', data.Location);
          }
        });
        //end s3

      }).catch(function (error) {
        console.log('catch error: ', error);
        res.json({ error: error.message });
      });
    }
  });
  app.use('/upload', uploadService);


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('upload');

  service.hooks(hooks);
};
