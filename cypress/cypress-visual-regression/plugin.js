const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

// TODO: allow user to define/update
const SNAPSHOT_DIRECTORY = process.env.SNAPSHOT_DIRECTORY || path.join(__dirname, '..', '..', 'cypress', 'snapshots');

function compareSnapshotsPlugin(args) {
  return new Promise((resolve, reject) => {
    const options = {
      actualImage: path.join(SNAPSHOT_DIRECTORY, 'actual', args.specDirectory, `${args.fileName}-actual.png`),
      expectedImage: path.join(SNAPSHOT_DIRECTORY, 'base', args.specDirectory, `${args.fileName}-base.png`),
      diffImage: path.join(SNAPSHOT_DIRECTORY, 'diff', args.specDirectory, `${args.fileName}-diff.png`)
    };

    const diffFolder = path.join(SNAPSHOT_DIRECTORY, 'diff');
    if (!fs.existsSync(diffFolder)) {
      mkdirp(diffFolder, err => {
        if (err) {
          console.log(err); // eslint-disable-line no-console
        }
      });
    }

    const specFolder = path.join(diffFolder, args.specDirectory);
    if (!fs.existsSync(specFolder)) {
      mkdirp(specFolder, err => {
        if (err) {
          console.log(err); // eslint-disable-line no-console
        }
      });
    }

    /* eslint-disable func-names */
    fs.createReadStream(options.actualImage).pipe(new PNG()).on('parsed', function () {
      const imgActual = this;
      console.log(imgActual.width);
      console.log(imgActual.height);
      fs.createReadStream(options.expectedImage).pipe(new PNG()).on('parsed', function () {
        const imgExpected = this;
        console.log(imgExpected.width);
        console.log(imgExpected.height);
        const diff = new PNG({
          width: imgActual.width,
          height: imgActual.height
        });

        const mismatchedPixels = pixelmatch(imgActual.data, imgExpected.data, diff.data, imgActual.width, imgActual.height, { threshold: 0.1 });

        diff.pack().pipe(fs.createWriteStream(options.diffImage));

        resolve({
          mismatchedPixels,
          percentage: (mismatchedPixels / imgActual.width / imgActual.height) ** 0.5
        });
      }).on('error', error => reject(error));
    }).on('error', error => reject(error));
    /* eslint-enable func-names */
  });
}

function getCompareSnapshotsPlugin(on) {
  on('task', { compareSnapshotsPlugin });
}

module.exports = getCompareSnapshotsPlugin;
