var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-terser');
var concat = require('gulp-concat');

var config = {
  npmDir: './node_modules',
  publicDir: './public',
};

var tasklist = [
  'fonts_bs',
  'css_avnode_bs',
  'css_chromosphere_bs',
  'css_fotonica_bs',
  'css_flyer_bs',
  'css_lcf_bs',
  'css_linuxclub_bs',
  'css_lpm_bs',
  'css_shockart_bs',
  'css_vjtelevision_bs',
  'css_wam_bs',
  'css_flxer_bs',
  'css_gianlucadelgobbo_bs',
  'css_pac_bs',
  'compress_js_avnode',
  'compress_js_chromosphere',
  'compress_js_fotonica',
  'compress_js_flyer',
  'compress_js_lcf',
  'compress_js_linuxclub',
  'compress_js_lpm',
  'compress_js_shockart',
  'compress_js_vjtelevision',
  'compress_js_wam',
  'compress_js_flxer',
  'compress_js_gianlucadelgobbo'
];

const fonts_bs = () => {
  return gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest(config.publicDir + '/_common/fonts'));
}

const css_avnode_bs = () => {
  return gulp.src('./gulp/sass/avnode/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/avnode/css'));
}

const css_chromosphere_bs = () => {
  return gulp.src('./gulp/sass/chromosphere/*.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
      }))
      .pipe(gulp.dest(config.publicDir + '/chromosphere/css'));
}

const css_fotonica_bs = () => {
  return gulp.src('./gulp/sass/fotonica/*.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
      }))
      .pipe(gulp.dest(config.publicDir + '/fotonica/css'));
}

const css_flyer_bs = () => {
  return gulp.src('./gulp/sass/flyer/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/flyer/css'));
}

const css_lcf_bs = () => {
  return gulp.src('./gulp/sass/lcf/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/lcf/css'));
}

const css_linuxclub_bs = () => {
  return gulp.src('./gulp/sass/linuxclub/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/linuxclub/css'));
}

const css_lpm_bs = () => {
  return gulp.src('./gulp/sass/lpm/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/lpm/css'));
}

const css_shockart_bs = () => {
  return gulp.src('./gulp/sass/shockart/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/shockart/css'));
}

const css_vjtelevision_bs = () => {
  return gulp.src('./gulp/sass/vjtelevision/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/vjtelevision/css'));
}

const css_wam_bs = () => {
  return gulp.src('./gulp/sass/wam/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/wam/css'));
}

const css_flxer_bs = () => {
  return gulp.src('./gulp/sass/flxer/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/flxer/css'));
}

const css_gianlucadelgobbo_bs = () => {
  return gulp.src('./gulp/sass/gianlucadelgobbo/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/gianlucadelgobbo/css'));
}

const css_pac_bs = () => {
  return gulp.src('./gulp/sass/pac/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/pac/css'));
}


const compress_js = () => {
  return gulp.src([
      './gulp/js/_common/socialGalleryPluginLite.js',
      './gulp/js/_common/jquery-migrate.min.js',
      './gulp/js/_common/validator.js'
    ])
    .pipe(uglify({mangle: { reserved: ['glink'] } }))
    .pipe(gulp.dest(config.publicDir + '/_js/'));
}

const compress_js_avnode = () => {
  return gulp.src([
      config.npmDir + '/jquery/dist/jquery.min.js',
      config.npmDir + '/popper.js/dist/popper.min.js',
      config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
      './gulp/js/_common/jquery.isotope.min.js',
      './gulp/js/_common/imagesloaded.pkgd.min.js',
      './gulp/js/_common/cookielawinfo.min.js',
      './gulp/js/_common/swiper.js',
      './gulp/js/_common/script.js',
      //'./gulp/js/avnode/map.js',
      './gulp/js/avnode/script.js'
    ])
    .pipe(concat('combo.min.js'))
    .pipe(uglify({mangle: { reserved: ['glink'] } }))
    .pipe(gulp.dest(config.publicDir + '/avnode/js/'));
}

const compress_js_chromosphere = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/chromosphere/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/chromosphere/js/'));
}

const compress_js_fotonica = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/fotonica/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/fotonica/js/'));
}

const compress_js_flyer = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/flyer/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/flyer/js/'));
}

const compress_js_lcf = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/lcf/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/lcf/js/'));
}

const compress_js_linuxclub = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/linuxclub/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/linuxclub/js/'));
}

const compress_js_lpm = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    //'./gulp/js/lpm/map.js',
    './gulp/js/lpm/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/lpm/js/'));
}

const compress_js_shockart = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/shockart/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/shockart/js/'));
}

const compress_js_vjtelevision = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/jquery-ui.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/video.min.js',
    './gulp/js/_common/videojs-playlist.min.js',
    './gulp/js/_common/videojs-logo.min.js',
    './gulp/js/_common/script.js',
    './gulp/js/vjtelevision/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/vjtelevision/js/'));
}

const compress_js_wam = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/wam/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/wam/js/'));
}

const compress_js_flxer = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/flxer/script.js',
    './gulp/js/flxer/shaderback.js'
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/flxer/js/'));
}

const compress_js_gianlucadelgobbo = () => {
  return gulp.src([
    config.npmDir + '/jquery/dist/jquery.min.js',
    config.npmDir + '/popper.js/dist/popper.min.js',
    config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
    './gulp/js/_common/jquery.isotope.min.js',
    './gulp/js/_common/imagesloaded.pkgd.min.js',
    './gulp/js/_common/cookielawinfo.min.js',
    './gulp/js/_common/swiper.js',
    './gulp/js/_common/script.js',
    './gulp/js/gianlucadelgobbo/script.js',
  ])
  .pipe(concat('combo.min.js'))
  .pipe(uglify({mangle: { reserved: ['glink'] } }))
  .pipe(gulp.dest(config.publicDir + '/gianlucadelgobbo/js/'));
}

const compress_js_pac = () => {
  return gulp.src([
      config.npmDir + '/jquery/dist/jquery.min.js',
      config.npmDir + '/popper.js/dist/popper.min.js',
      config.npmDir + '/bootstrap/dist/js/bootstrap.min.js',
      './gulp/js/_common/jquery.isotope.min.js',
      './gulp/js/_common/imagesloaded.pkgd.min.js',
      './gulp/js/_common/cookielawinfo.min.js',
      './gulp/js/_common/swiper.js',
      './gulp/js/_common/video.min.js',
      './gulp/js/_common/videojs-playlist.min.js',
      './gulp/js/_common/videojs-logo.min.js',
        './gulp/js/_common/script.js',
      //'./gulp/js/pac/map.js',
      './gulp/js/pac/script.js'
    ])
    .pipe(concat('combo.min.js'))
    .pipe(uglify({mangle: { reserved: ['glink'] } }))
    .pipe(gulp.dest(config.publicDir + '/pac/js/'));
}

gulp.task('default', gulp.series(compress_js,css_pac_bs,css_avnode_bs, css_chromosphere_bs, css_fotonica_bs, css_flyer_bs, css_lcf_bs, css_linuxclub_bs, css_lpm_bs, css_shockart_bs, css_vjtelevision_bs, css_wam_bs, css_flxer_bs, css_gianlucadelgobbo_bs, compress_js_pac, compress_js_avnode, compress_js_chromosphere, compress_js_fotonica, compress_js_flyer, compress_js_lcf, compress_js_linuxclub, compress_js_lpm, compress_js_shockart, compress_js_vjtelevision, compress_js_wam, compress_js_flxer, compress_js_gianlucadelgobbo, css_avnode_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_gianlucadelgobbo,css_gianlucadelgobbo_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_flyer,css_flyer_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_flxer,css_flxer_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_vjtelevision,css_vjtelevision_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_fotonica,css_fotonica_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_pac,css_pac_bs));
//gulp.task('default', gulp.series(compress_js, compress_js_lcf,css_lcf_bs));
