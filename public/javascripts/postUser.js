(function () {
  var follow = document.getElementById('follow');
  var unfollow = document.getElementById('unfollow');
  var input = document.getElementById('field');

  follow.addEventListener('click',function (){
    if (input.value.length === 0) {
      return;
    }
    axios.post('/index/follow', {
      user: input.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  unfollow.addEventListener('click',function (){
    if (input.value.length === 0) {
      return;
    }
    axios.post('/index/unfollow', {
      user: input.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
})();
