// const gulp = require('gulp');
// const del = require('del');
// const sass = require('gulp-sass')(require('sass'));
// const rename = require('gulp-rename');
// const path = require('path');
import gulp from 'gulp';
import {deleteAsync as del} from 'del';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
// const sass = require('gulp-sass')(require('sass'));
import rename from 'gulp-rename';
import tap from 'gulp-tap'
import debug from 'gulp-debug'
import path from 'path';

const sass = gulpSass(sassCompiler)

export const buildCSS = gulp.series(buildExamplesSCSS)

async function buildExamplesSCSS() {
  const parentDir = path.dirname(new URL(import.meta.url).pathname)
  const srcDir = path.join(parentDir, 'src')
  const scssGlob = path.join(srcDir, '**/*.scss')
  gulp.src(scssGlob)
    // .pipe(debug()) // Optional: Log the files that match the glob pattern
    .pipe(tap((file) => {
      // Access the filename here
      const filePath = file.path
      const fileDir = path.dirname(filePath)
      compileSCSSToCSS(filePath, fileDir)
    }))
}

async function compileSCSSToCSS(source, targetDir) {
  const srcPosix = source.split(path.sep).join(path.posix.sep).split(path.posix.sep).join(path.posix.sep)
  const srcDirNamePosix = path.dirname(srcPosix)
  const fileNameScss = srcPosix.split(path.posix.sep)[srcPosix.split(path.posix.sep).length - 1]
  const fileNameCss = fileNameScss.substring(0, fileNameScss.length - 4) + 'css';


  const targetDirNamePosix = targetDir ? targetDir.split(path.sep).join(path.posix.sep).split(path.posix.sep).join(path.posix.sep) : srcDirNamePosix
  const targetPosix = [targetDirNamePosix, fileNameScss].join(path.posix.sep)
  const targetCSSFilePosix = targetPosix.substring(0, targetPosix.length - 4) + 'css';

  await del(targetCSSFilePosix, {force: true})

  return {
    pipe: gulp.src(srcPosix)
      .pipe(sass().on('error', sass.logError))
      .pipe(rename(fileNameCss))
      .pipe(gulp.dest(targetDirNamePosix)),
    cssFilePosix: targetCSSFilePosix, dirNamePosix: srcDirNamePosix, fileNamePosix: srcPosix
  }
}


function cleanDist() {
  return del('dist', {force: true});
}

function cleanPackage() {
  return del('package', {force: true});
}

// # Public tasks

// exports.clean = gulp.parallel(cleanDist, cleanPackage);

// // TODO: add proxy respvis.js for typescript support in all concerned directories
// exports.build = gulp.series(
//   exports.clean,
//   gulp.parallel(
//     gulp.series(bundleJSProduction, bundleDeclaration),
//     buildLibSCSS
//   ),
//   createExampleDependencies,
//   copyExampleDependencies,
//   copyExamples
// );
//
//
// exports.serve = gulp.series(exports.build, watcher)

export default buildCSS;
