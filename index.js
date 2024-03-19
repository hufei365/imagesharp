#!/usr/bin/env node

import path from 'path';
import sharp from 'sharp'
import { glob } from 'glob'
import chalk from 'chalk';
import Ora from 'ora';

const spinner = Ora('Start to converting......');
function converting(text){
    spinner.start(text)
}

const { log, error, warn } = console;

function convertImageFormat(source, target, format) {
    converting(`${source}`)
    return new Promise((resolve, reject) => {
        sharp(source)
            .toFormat(format)
            .toFile(target, (err, info) => {
                if (err) {
                    log('\n'), spinner.fail(`Error!-${source}`)
                    console.error(err, '\n');
                } else {
                    spinner.succeed(`Done-${source}`)
                }
                spinner.stop();

                resolve();
            });
    })
}

async function main() {
    converting();

    const imagePath = process.argv[3];
    const format = process.argv[2]

    const isAbsolute = path.isAbsolute(imagePath)
    const files = await glob(imagePath);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = isAbsolute ? file : path.resolve(file)

        const fileName = path.basename(filePath);
        const outputFileName = fileName.replace(/\.[\da-z]+$/gi, `.${format}`)
        const outputFilePath = path.dirname(filePath) + '/' + outputFileName;

        await convertImageFormat(filePath, outputFilePath, format)
    }

    spinner.info('\nALL FINISHED！！！')
    // log(chalk.green("\nALL FINISHED!!!"))
}

main();