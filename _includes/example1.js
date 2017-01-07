new Magister.Magister({
  school: 'xxxx',
  username: 'xxxx',
  password: 'xxxx'
}).ready(function (error) {
  if (error) return console.log('oops!', error);
  this.appointments(new Date(), function (error, result) {
    console.log(result[0].teachers()[0].fullName());
  });
});
