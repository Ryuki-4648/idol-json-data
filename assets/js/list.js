/**
 * 絞り込み検索
 * 総合トップ：新製品・キャンペーン情報、お知らせ
*/




/* 絞り込み機能 */

// 絞り込みボタン：各項目必ず1つだけクリック
/*let yearBtn = '.js-sortYear';
let productBtn = '.js-sortProduct';
let categoryBtn = '.js-sortCategory';*/

let sortWrap = '.js-sortWrap';
let sortBtnItem = '.js-sortBtnItem';
let listItem = '.js-sortItem';
let hideClass = 'is-hide';
let sortseartchBtn = '.js-sortSearchBtn';

$(function(){
  $(window).on('load', function(){
    refine_search();
  })
  $(document).on('change', 'input', function(){
    refine_search();
  })
})

const refine_search = () => {

  // 非表示設定を解除
  $(listItem).removeClass(hideClass);

  // 検索条件項目をループ
  for (let i = 0; i < $(sortBtnItem).length; i++) {
    let sortBtnItemName = $(sortBtnItem).eq(i).find('input').attr('name'); // name属性(year,category,product)の取得
    let searchData = get_sort_item_name(sortBtnItemName); // ['2021'] ['遺伝子受託サービス'] ['キャンペーン']

    // 選択された条件がない＆すべてを選択の場合
    if(searchData.length === 0 || searchData[0] === '') {
      continue; // ループの先頭に戻る(処理を飛ばす)
    }

    // 一覧の項目をループ
    for ( let j = 0; j < $(listItem).length; j++ ) {
      let itemData = get_setting_name_in_item($(listItem).eq(j), sortBtnItemName); // [2022] ['フィルター'] ['キャンペーン']

      let check = array_match_check(itemData, searchData);

      if(!check) {
        $(listItem).eq(j).addClass(hideClass);
      } else {
        //$(listItem).eq(j).addClass('flag');
      }
    }
  }
}




/* 絞り込みボタンと一覧の出力 */

// チェックされた条件の一覧を取得する
const get_sort_item_name = (name) => {
  let searchData = [];
  // チェックされた値をループし、追加する
  $(`[name='${name}']:checked`).each(function(){
    searchData.push($(this).val()); // 核酸自動分離装置 とか 細胞・組織製品
  });
  return searchData; // 戻り値:配列
}

// j番目のlistItemとi番目のsortBtnItemのname属性を比較
const get_setting_name_in_item = (target, data) => {
  let itemData = target.data(data); // データ属性の取得
  if(!Array.isArray(itemData)){
    itemData = [itemData];
  }
  return itemData;
}


const array_match_check = (arr1, arr2) => {
  let arrCheck = false;
  //console.log(arr1);
  //console.log(arr2);
  for(let k = 0; k < arr1.length; k++){
    if(arr2.indexOf(arr1[k]) >= 0) {
      arrCheck = true;
      break;
    }
  }
  return arrCheck;
}



// 一覧：現在の西暦より6年以上前はdata-yearの値をpastに変更
$(function(){
  $('.js-itemYear').each((index, elm) => {
    //console.log('update 現在の西暦より6年以上前はdata-yearの値をpastに変更');
    let itemYear = $(elm).text();
    for(let i = 2000; i <= thisYear - 6; i++) {
      if (itemYear === `${i}`) {
        $(elm).parents('.js-sortItem').attr('data-year', 'past');
      }
    }
  })
  $('.js-newsItemYear').each((index, elm) => {
    console.log(index);
    //console.log('news 現在の西暦より6年以上前はdata-yearの値をpastに変更');
    let itemYear = $(elm).text();
    for(let i = 2000; i <= thisYear - 6; i++) {
      if (itemYear === `${i}`) {
        $(elm).parents('.js-sortItem').attr('data-year', 'past');
      }
    }
  })
})

// 新製品一覧
// jsonファイルからリスト出力
$.ajax({
  url: "/bio/assets/json/update.json",
  type: "GET",
  dataType: "json",
})
.done(function(data){
  let list = $('.js-jsonList');
  let topUpdateList = $('.js-topUpdateJsonList');
  $.each(data, function(i){
    let time = `<time class="c-list01__date js-itemDate"><span class="js-itemYear">${data[i].date.year}</span>.${data[i].date.month.toString().padStart(2, "0")}.${data[i].date.day.toString().padStart(2, "0")}</time>`;
    let category = `<span class="c-list01__label label-${data[i].categoryLabel} js-category">${data[i].category}</span>`;
    let product = `<span class="c-list01__label-product">${data[i].product}</span></div>`;
    let link = `<a href="${data[i].link}" class="c-list01__ttl ${data[i].pdf}" target="_blank">${data[i].title}</a>`;
    list.append(`<li class="c-list01__item js-sortItem" data-year='${data[i].date.year}年' data-category='${data[i].category}' data-product='${data[i].product}'><div class="c-list01__wrap">${time}${category}${product}${link}</li>`);
    if( i < 5 ) {
      topUpdateList.append(`<li class="c-list01__item js-sortItem" data-year='${data[i].date.year}年' data-category='${data[i].category}' data-product='${data[i].product}'><div class="c-list01__wrap">${time}${category}${product}${link}</li>`);
    }
    
  })
})
.fail(function(){
  console.log('Failed to load JSON file.');
})

// お知らせ一覧
// jsonファイルからリスト出力
$.ajax({
  url: "/bio/assets/json/news.json",
  type: "GET",
  dataType: "json",
})
.done(function(data){
  let list = $('.js-newsJsonList');
  let topNewsList = $('.js-topNewsJsonList');
  $.each(data, function(i){
    let time = `<time class="c-list01__date js-itemDate"><span class="js-newsItemYear">${data[i].date.year}</span>.${data[i].date.month.toString().padStart(2, "0")}.${data[i].date.day.toString().padStart(2, "0")}</time>`;
    let product = `<span class="c-list01__label-product">${data[i].product}</span></div>`;
    let link = `<a href="${data[i].link}" class="c-list01__ttl ${data[i].pdf}" target="_blank">${data[i].title}</a>`;
    list.append(`<li class="c-list01__item js-sortItem" data-year='${data[i].date.year}年' data-product='${data[i].product}'><div class="c-list01__wrap">${time}${product}${link}</li>`);
    if( i < 5 ) {
      topNewsList.append(`<li class="c-list01__item js-sortItem" data-year='${data[i].date.year}年' data-product='${data[i].product}'><div class="c-list01__wrap">${time}${product}${link}</li>`);
    }
  })
})
.fail(function(){
  console.log('Failed to load JSON file.');
})


//絞り込みボタン「年代」：現在の西暦～5年前までを表示
thisYear = new Date().getFullYear();
for(let i = thisYear - 5 ; i <= thisYear; i++) {
  //console.log(i);
  if (i === thisYear) {
    let output = `<li class="p-update__sort__item js-sortBtnItem"><label class="p-update__sort__label"><input type="radio" name="year" value="${i}年" class="js-sort js-sortYear" checked><span class="p-update__sort__text">${i}年</span></label></li>`;
    let newsOutput = `<li class="p-news__sort__item js-sortBtnItem"><label class="p-news__sort__label"><input type="radio" name="year" value="${i}年" class="js-sort js-sortYear" checked><span class="p-news__sort__text">${i}年</span></label></li>`;
    $('.js-yearList').prepend(output);
    $('.js-newsYearList').prepend(newsOutput);
  } else {
    let output = `<li class="p-update__sort__item js-sortBtnItem"><label class="p-update__sort__label"><input type="radio" name="year" value="${i}年" class="js-sort js-sortYear"><span class="p-update__sort__text">${i}年</span></label></li>`;
    let newsOutput = `<li class="p-news__sort__item js-sortBtnItem"><label class="p-news__sort__label"><input type="radio" name="year" value="${i}年" class="js-sort js-sortYear" checked><span class="p-news__sort__text">${i}年</span></label></li>`;
    $('.js-yearList').prepend(output);
    $('.js-newsYearList').prepend(newsOutput);
  }
}