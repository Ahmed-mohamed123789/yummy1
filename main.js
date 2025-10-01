const size = $(".slider .link").outerWidth(true);

$('.slider').css({left: -size});

$(".slider ul li").css({position:'relative', opacity:0, top:'-30px'});

let flag = true;

$('.slider .icons .icon').on('click',function () {
  flag = !flag;

  if (flag) {
    $('.slider').animate({left: -size},500);
    $(".slider ul li").css({opacity:0, top:'-30px'});
  } else {
    $('.slider').animate({left: 0},300, function() {
      $(".slider ul li").each(function(index) {
        $(this)
          .delay(index*200) 
          .animate({opacity:1, top:'0px'},300);
      });
    });
  }
});





  
// خاص ب featch api home
$(document).ready(function () {
  $.ajax({
    url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      const meals = response.meals;
      const $row = $('.row');
      $row.empty();

      let html = '';
      meals.forEach(meal => {
        html += `
          <div class="col-lg-3 col-md-6 col-sm-12">
            <a href="detailsHome.html?id=${meal.idMeal}" class="d-block image-container">
              <img src="${meal.strMealThumb}" class="rounded-lg cursor-pointer" alt="${meal.strMeal}">
              <div class="overlay cursor-pointer">
                <h2 class="text-2xl fw-bolder overlay-text">${meal.strMeal}</h2>
              </div>
            </a>
          </div>
        `;
      });
      $row.html(html);

      const $images = $row.find('img');
      let loaded = 0;

      function hideLoadingIfDone() {
        if (loaded === $images.length) {
          $('#loading').fadeOut(400, function () {
            $(this).remove();
          });
        }
      }

      $images.each(function () {
        if (this.complete) {
          loaded++;
          hideLoadingIfDone();
        } else {
          $(this)
            .one('load', function () {
              loaded++;
              hideLoadingIfDone();
            })
            .one('error', function () {
              loaded++;
              hideLoadingIfDone();
            });
        }
      });
    },
    error: function () {
      $('#loading').fadeOut(400, function () {
        $(this).remove();
      });
    }
  });
});

// خاص بال  featch api search



