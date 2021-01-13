#!/usr/bin/env node

// https://github.com/checkly/puppeteer-recorder/blob/master/scripts/zip.js

const fs = require('fs');
const path = require('path');
const zipFolder = require('zip-folder');

const DEST_DIR = path.join(__dirname, '../distribution');
const DEST_ZIP_DIR = path.join(__dirname, '../distribution-zip');

const extractExtensionData = () => {
    const extPackageJson = require('../package.json');

    return {
        name: 'clicker-chrome',
        version: extPackageJson.version
    };
}

const makeDestZipDirIfNotExists = () => {
    if (!fs.existsSync(DEST_ZIP_DIR)) {
        fs.mkdirSync(DEST_ZIP_DIR);
    }
}

const buildZip = (src, dist, zipFilename) => {
    console.info(`Building ${zipFilename}...`);

    return new Promise((resolve, reject) => {
        zipFolder(src, path.join(dist, zipFilename), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

const main = () => {
    const {name, version} = extractExtensionData();
    const zipFilename = `${name}-v${version}.zip`;

    makeDestZipDirIfNotExists();

    buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
        .then(() => console.info('OK'))
        .catch(console.err);
}

main();
