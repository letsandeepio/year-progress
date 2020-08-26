Date.prototype.isLeapYear = function () {
  const year = this.getFullYear();
  if ((year & 3) != 0) return false;
  return year % 100 != 0 || year % 400 == 0;
};

// Get Day of Year
Date.prototype.getDOY = function () {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = this.getMonth();
  const dn = this.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};

module.exports = () => {
  const cliProgress = require('cli-progress');
  const _colors = require('colors');

  console.log('\n' + new Date().getFullYear() + '\n');

  const b1 = new cliProgress.SingleBar({
    format: `${_colors.cyan('{bar}')}| {percentage}% || {value}/{total} Days`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });

  b1.start(365, 0, {
    speed: 'N/A'
  });

  b1.update(new Date().getDOY());

  b1.stop();

  if (process.argv.slice(2)[0] === 'about') {
    console.log(
      '\nA simple command-line app for displaying current year progress (inspired by Google Engineer @filiphracek). See https://twitter.com/year_progress \n\nDeveloped by Sandeep Chopra (https://github.com/letsandeepio/)\n\nMIT License 2020'
    );
  }
};
