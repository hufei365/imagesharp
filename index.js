#!/usr/bin/env node

const path = require('path')
const sharp = require('sharp')
const { glob } = require('glob')


console.log(`Start handle image......`)

const imagePath = process.argv[3];
const format = process.argv[2]


function convertImageFormat(source, target) {
    console.log(`${source} ------ Stared~~~`)
    sharp(source)
        .toFormat(format)
        .toFile(target, (err, info) => {
            if (err) {
                console.error(err)
                console.warn(`Current file is: ${source}\n`)
            } else {
                console.log(`${source} ------ Done!!!`)
            }
        });
}

async function main() {
    const isAbsolute = path.isAbsolute(imagePath)
    const files = await glob(imagePath);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = isAbsolute ? file : path.resolve(file)

        const fileName = path.basename(filePath);
        const outputFileName = fileName.replace(/\.[\da-z]+$/gi, `.${format}`)
        const outputFilePath = path.dirname(filePath) + '/' + outputFileName;

        convertImageFormat(filePath, outputFilePath)
    }

    console.log("Finished!")
}

main();